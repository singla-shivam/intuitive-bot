const d = require('dialogflow')
/**
 * @type {object}
 * @property {EntityTypesClient} v2.EntityTypesClient
 */
const dialogflow = d

/** @type v2.EntityTypesClient */
const entitiesClient = new dialogflow.EntityTypesClient();

// if you delete and create new entities please update their UUID's here
const PROJECT_ID = 'intuitivebot'
const BRAND_ENTITY_ID = "0f38f58a-4b6a-49ae-91ea-c26fe4e12719"
const TAG_ENTITY_ID = "56171131-b860-4fc9-b3bc-2af2ebc126b2"

const agentPath = entitiesClient.projectAgentPath(PROJECT_ID)

const brandEntityPath = entitiesClient.entityTypePath(PROJECT_ID, BRAND_ENTITY_ID)
const tagEntityPath = entitiesClient.entityTypePath(PROJECT_ID, TAG_ENTITY_ID)

/**
 * Update a particular entity object
 * @param {EntityType} entity
 * @param {string[]} values
 * @param {string[][]} synonyms
 * @return {Promise<void>}
 */
async function updateEntity(entity, values, synonyms) {
  const entities = entity.entities
  values.forEach(
    (value, i) => entities.push({
      value: value,
      synonyms: synonyms[i]
    })
  )

  const request = {
    entityType: entity,
    updateMask: {
      paths: ['entities'],
    },
  }
  return entitiesClient.updateEntityType(request)
}


module.exports = {entitiesClient, agentPath, brandEntityPath, tagEntityPath, updateEntity}
