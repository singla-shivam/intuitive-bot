const yaml = require('js-yaml')
const fs = require('fs')
const {entitiesClient, tagEntityPath, updateEntity} = require('./')

const QUANTIFIER_REGEX = /\d(l|ml|g|mg|kg|ton)/
const quantifiersSynonyms = {
  "l": ['L', 'l', 'litre', 'Litre'],
  "ml": ['mL', 'ml', 'milli litre', 'milli Litre'],
}

// TODO add [2 litre] as synonym of 2litre
// TODO add [4 pieces] as synonym of 4pc
/**
 * @param {string[]} tags
 * @param {string[][]} synonyms
 * @return {Promise<void>}
 */
async function updateTag(tags, synonyms) {
  return _getTagEntity()
    .then((responses) => {
      /** @type EntityType*/
      const entity = responses[0]
      if (!entity) throw new Error("Entity not found")
      return entity
    })
    .then((tagEntity) => {
      return updateEntity(tagEntity, tags, synonyms)
    })
    .catch((e) => {
      console.error(JSON.stringify(e))
    })
}


/**
 *
 * @param {Product} product
 * @return {Promise<void>}
 */
async function updateEntityOnProductAdd(product) {
  const tags = product.tags || {}
  const possibleTags = product.name.split(' ')
  let previousTag = ''
  possibleTags.forEach(tag => {
    if (previousTag) {
      // if previous tag was a number
      tags[previousTag + ' ' + tag] = true
      previousTag = ''
    } else if (!(+tag)) {
      // tag is a string
      tags[tag] = true
    } else {
      // tag is a number
      previousTag = tag
    }
  })

  const tagsArray = _removeBrandTags(tags, product.brand)
  const synonyms = _addSynonyms(tagsArray)

  await updateTag(tagsArray, synonyms)
}

/**
 * Remove tags which are brand name
 * @param {Object<string, boolean>} tags
 * @param {string} brand
 * @return {string[]}
 * @private
 */
function _removeBrandTags(tags, brand) {
  /** @type {Object<string, boolean>}*/
  const brandTags = {}
  brand.split(' ').forEach(a => brandTags[a] = true)

  // filer the brand name from possible tags
  for(let tag in tags) {
    if(brandTags[tag]) delete tags[tag]
  }
  tags[brand] = true
  return Object.keys(tags)
}

/**
 * Add synonyms corresponding to tags
 * @param {string[]} tags
 * @return {string[][]}
 * @private
 */
function _addSynonyms(tags) {
  console.log(tags)
  const synonymsInFile = _readSynonyms()
  const synonyms = new Array(tags.length)

  tags.forEach((tag, i) => {
    let originalTag = tag
    tag = tag.toLowerCase()
    if(synonymsInFile[originalTag]) synonyms[i] = synonymsInFile[originalTag]
    else if(QUANTIFIER_REGEX.test(tag)) {
      let quantifier
      let value
      for(let i = 0, len = tag.length; i < len; i++) {
        if(tag.charCodeAt(i) > 57) {
          quantifier = tag.slice(i)
          value = tag.slice(0, i)
          break
        }
      }
      let synonymsOfTag = []
      quantifiersSynonyms[quantifier].forEach(s => {
        synonymsOfTag.push(value + " " + s)
      })

      synonyms[i] = synonymsOfTag
    } else synonyms[i] = [originalTag]
    // synonyms[i]
  })

  return synonyms
}

/**
 * Reads synonyms from the file and returns them
 * @return {Synonyms}
 * @private
 */
function _readSynonyms() {
  return yaml.safeLoad(fs.readFileSync(`${__dirname}/../data/synonyms.yaml`, 'utf8'))
}

/**
 * @return {Promise<EntityType[]>}
 * @private
 */
async function _getTagEntity() {
  return entitiesClient
    .getEntityType({
      name: tagEntityPath
    })
}

module.exports = {updateTag, updateEntityOnProductAdd}
