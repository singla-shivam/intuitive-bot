const {firestore} = require('firebase-admin')

/**
 * @typedef OptionsAddData
 * @template T
 * @property {string} path
 * @property {T} value
 * @property {boolean} [merge] - Changes the behavior of a set() call to only replace the values specified in its data argument.
 * Fields omitted from the set() call remain untouched.
 * @property {boolean} [update] - To update the data. Less priority than delete
 * @property {boolean} [delete] - To delete the data. Has highest priority
 */

/**
 * @typedef AndQuery
 * @type {Array}
 * @template T
 * @property {string} 0 - The path to compare
 * @property {FirebaseFirestore.WhereFilterOp} 1 - The operation string (e.g "<", "<=", "==", ">", ">=").
 * @property {T} 2 - The value for comparison
 */

/**
 * @typedef OptionsGetData
 * @template T
 *
 * @property {string} path
 * @property {number} limit
 * @property {AndQuery[]} [andQueries]
 */

/**
 *
 * @param options {OptionsAddData}
 * @return {Promise<T>}
 */
async function addData(options) {
  const paths = options.path.split('/')

  // document id must be provided to delete the document
  if (paths.length % 2 === 1 && (options.delete)) throw new Error("Document id must be provided to delete the document")

  // get the deepest referenced collection and document
  const [collection, document] = findCollectionDocument(paths)

  try {
    let d

    // if the document id is provided
    if (paths.length % 2 === 0) d = document
    else d = collection.doc()

    if (!options.value.id) options.value.id = d.id
    if (options.delete) await d.delete()
    else if (options.update) await d.update(options.value)
    else await d.set(options.value, {
        merge: options.merge
      })

    return options.value
  } catch (e) {
    throw e
  }
}

/**
 * Get data with and queries supported by firestore
 * @template Data
 * @param options {OptionsGetData}
 * @return {Promise<Data[]>} - return array of data
 */
async function getData(options) {
  const paths = options.path.split('/')
  const isDocIdProvided = !(paths.length % 2)

  if(options.andQueries && isDocIdProvided) throw new Error("And queries can not run on document")

  /** @type FirebaseFirestore.CollectionReference */
  let [collection, document] = findCollectionDocument(paths)

  if(isDocIdProvided) {
    const doc = await document.get()
    return [doc.data()]
  }

  /** @type FirebaseFirestore.Query */
  let query  = collection
  if(options.andQueries && options.andQueries.length !== 0) query = queriedCollection(collection, options.andQueries)

  if(options.limit) query = collection.limit(options.limit)

  return  (await query.get()).docs
}

/**
 * Returns the deepest referenced collection and document extracted from [paths]
 * @param {string[]} paths
 * @return {(FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>|CollectionReference<DocumentData>|DocumentReference<T>)[]}
 */
function findCollectionDocument(paths) {
  let collection = firestore.collection(paths[0])
  /** @type DocumentReference<T> */
  let document;

  for (let i = 1, len = paths.length; i < len; i++) {
    if (i % 2 === 1) document = collection.doc(paths[i])
    else collection = document.collection(paths[i])
  }

  return [collection, document]
}

/**
 * @param {FirebaseFirestore.Query} collection
 * @param {AndQuery[]} andQueries
 * @return {FirebaseFirestore.Query}
 */
function queriedCollection(collection, andQueries) {
  andQueries.forEach(q => collection = collection.where(q[0], q[1], q[2]))
  return collection
}

export {addData}
