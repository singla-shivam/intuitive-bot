// this file imports all the methods from the directory
// and exports them
const {handleGuarantyIntent} = require('./guaranty')
const {handleWarrantyIntent} = require('./warranty')
const {handleDiscountIntent} = require('./discount')
const {handleYoutubeIntent} = require('./youtube')
const {handleScreenSizeIntent} = require('./screen-size')
const {handleScreenResolutionIntent} = require('./screen-resolution')
const {handleBuildQualityIntent} = require('./build-quality')
const {handleConnectivityIntent} = require('./connectivity')
const {handleColorIntent} = require('./color')
const {handleScreenShareIntent} = require('./screen-share')

async function handleFaq(agent) {
  switch (agent.parameters.subAction) {
    case 'discount': {
      await handleDiscountIntent(agent)
      break
    }
    case 'guaranty': {
      await handleGuarantyIntent(agent)
      break
    }
    case 'warranty': {
      await handleWarrantyIntent(agent)
      break
    }
    case 'youtube': {
      await handleYoutubeIntent(agent)
      break
    }
    case 'screen-size': {
      await handleScreenSizeIntent(agent)
      break
    }
    case 'screen-resolution': {
      await handleScreenResolutionIntent(agent)
      break
    }
    case 'screen-share': {
      await handleScreenShareIntent(agent)
      break
    }
    case 'build-quality': {
      await handleBuildQualityIntent(agent)
      break
    }
    case 'connectivity': {
      await handleConnectivityIntent(agent)
      break
    }
    case 'color': {
      await handleColorIntent(agent)
      break
    }
  }
}

module.exports = {
  handleFaq,
  handleGuarantyIntent,
  handleWarrantyIntent,
  handleDiscountIntent,
  handleYoutubeIntent,
  handleScreenSizeIntent,
  handleScreenResolutionIntent,
  handleBuildQualityIntent,
  handleConnectivityIntent,
  handleColorIntent,
  handleScreenShareIntent
}