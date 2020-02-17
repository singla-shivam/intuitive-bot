const {entitiesClient, brandEntityPath, updateEntity} = require('./')

/**
 *
 * @param {string} brandName
 * @return {Promise<void>}
 */
async function updateBrand(brandName) {
  return _getBrandEntity()
    .then((responses) => {
      /** @type EntityType*/
      const entity = responses[0]
      if (!entity) throw new Error("Entity not found")
      return entity
    })
    .then((brandEntity) => {
      return updateEntity(brandEntity, [brandName], [[brandName]])
    })
    .catch((e) => {
      console.error(JSON.stringify(e))
    })
}

/**
 *
 * @return {Promise<EntityType[]>}
 * @private
 */
async function _getBrandEntity() {
  return entitiesClient
    .getEntityType({
      name: brandEntityPath
    })
}

module.exports = {updateBrand}
