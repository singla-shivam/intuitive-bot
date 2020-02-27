const d = require('dialogflow')
const yaml = require('js-yaml')
const fs = require('fs')

/**
 * @typedef Synonyms
 * @type {Object.<string, []>}
 */

/**
 * @type {object}
 * @property {v2.EntityTypesClient} EntityTypesClient
 */
const dialogueFlow = d

/** @type v2.EntityTypesClient */
const entitiesClient = new dialogueFlow.EntityTypesClient();

// if you delete and create new entities please update their UUID's here
const PROJECT_ID = 'intuitivebot'
const TAG_ENTITY_ID = "56171131-b860-4fc9-b3bc-2af2ebc126b2"

const agentPath = entitiesClient.projectAgentPath(PROJECT_ID)

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


module.exports = {entitiesClient, agentPath, tagEntityPath, updateEntity}
