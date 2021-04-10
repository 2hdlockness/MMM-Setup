const tools = require("../../tools/tools.js")

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

function ReadResponse(req) {
  var response = {
    module: "MMM-GoogleAssistant",
    position: req.query.position,
    config: {
      debug: tools.stringToBool(req.query.debug),
      assistantConfig: {
        lang: req.query.lang,
        credentialPath: req.query.credentials,
        tokenPath: req.query.token,
        latitude: Number(req.query.latitude),
        longitude: Number(req.query.longitude),
      },
      responseConfig: {
        useScreenOutput: tools.stringToBool(req.query.useScreenOutput),
        screenOutputCSS: req.query.screenOutputCSS,
        screenOutputTimer: Number(req.query.screenOutputTimer),
        activateDelay: Number(req.query.activateDelay),
        useAudioOutput: tools.stringToBool(req.query.useAudioOutput),
        useChime: tools.stringToBool(req.query.useChime),
        newChime: tools.stringToBool(req.query.newChime),
        useNative: tools.stringToBool(req.query.useNative),
        playProgram: req.query.playProgram
      },
      micConfig: {
        recorder: req.query.recorder,
        device: req.query.device
      },
      snowboy: {
        audioGain: Number(req.query.audioGain),
        Frontend: tools.stringToBool(req.query.Frontend),
        Model: req.query.Model,
        Sensitivity: Number(req.query.Sensitivity)
      },
      A2DServer: {
        useA2D: tools.stringToBool(req.query.useA2D),
        stopCommand: req.query.stopCommand
      },
      recipes: tools.stringToArray(req.query.recipes),
    }
  }
  return response
}

exports.default = defaultModule
exports.readResponse = ReadResponse
