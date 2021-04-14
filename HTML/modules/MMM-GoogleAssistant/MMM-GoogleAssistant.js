const tools = require("../../../tools/tools.js")

var defaultModule = {
  module: "MMM-GoogleAssistant",
  position: "fullscreen_above",
  disabled: false,
  configDeepMerge: true,
  config: {
    debug:false,
    assistantConfig: {
      lang: "en-US",
      credentialPath: "credentials.json",
      tokenPath: "token.json",
      latitude: 51.508530,
      longitude: -0.076132,
    },
    responseConfig: {
      useScreenOutput: true,
      screenOutputCSS: "screen_output.css",
      screenOutputTimer: 5000,
      screenRotate: false,
      activateDelay: 250,
      useAudioOutput: true,
      useChime: true,
      newChime: false,
      useNative: false,
      playProgram: "mpg321"
    },
    micConfig: {
      recorder: "arecord",
      device: null,
    },
    snowboy: {
      useSnowboy: true,
      usePMDL: false,
      PMDLPath: "../../../components",
      audioGain: 2.0,
      Frontend: true,
      Model: "jarvis",
      Sensitivity: null
    },
    A2DServer: {
      useA2D: false,
      stopCommand: "stop",
      useYouTube: false,
      youtubeCommand: "youtube",
      displayResponse: true
    },
    recipes: [],
    NPMCheck: {
      useChecker: true,
      delay: 10 * 60 * 1000,
      useAlert: true
    }
  }
}

function readResponse(req) {
  try {
    var response = {
      module: "MMM-GoogleAssistant",
      position: req.position,
      disabled: tools.stringToBool(req.disabled),
      config: {
        debug: tools.stringToBool(req.debug),
        assistantConfig: {
          lang: req.lang,
          credentialPath: req.credentials,
          tokenPath: req.token,
          latitude: Number(req.latitude),
          longitude: Number(req.longitude),
        },
        responseConfig: {
          useScreenOutput: tools.stringToBool(req.useScreenOutput),
          screenOutputCSS: req.screenOutputCSS,
          screenOutputTimer: Number(req.screenOutputTimer),
          activateDelay: Number(req.activateDelay),
          useAudioOutput: tools.stringToBool(req.useAudioOutput),
          useChime: tools.stringToBool(req.useChime),
          newChime: tools.stringToBool(req.newChime),
          useNative: tools.stringToBool(req.useNative),
          playProgram: req.playProgram
        },
        micConfig: {
          recorder: req.recorder,
          device: req.device
        },
        snowboy: {
          useSnowboy: tools.stringToBool(req.useSnowboy),
          usePMDL: tools.stringToBool(req.usePMDL),
          audioGain: Number(req.audioGain),
          Frontend: tools.stringToBool(req.Frontend),
          Model: tools.stringToBool(req.usePMDL) ? req.PMDLName : req.Model,
          Sensitivity: Number(req.Sensitivity) || null
        },
        A2DServer: {
          useA2D: tools.stringToBool(req.useA2D),
          stopCommand: req.stopCommand,
          useYouTube: tools.stringToBool(req.useYouTube),
          youtubeCommand: req.youtubeCommand,
          displayResponse: tools.stringToBool(req.displayResponse)
        },
        recipes: tools.stringToArray(req.recipes),
      }
    }
    return response
  } catch (e) {
    console.log("Fatal... Bad Response Format in readResponse() !")
  }
}

exports.default = defaultModule
exports.readResponse = readResponse
