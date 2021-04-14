$.getJSON("http://" + config.listening + ":" + config.port + "/config" , (queryConfig) => {
  console.log("config Object:", queryConfig)
  document.getElementById("module").innerHTML= queryConfig.module
  document.getElementById("position").value= queryConfig.position
  document.getElementById("disabled").value= queryConfig.disabled
  document.getElementById("debug").value= queryConfig.config.debug
  /** assistantConfig **/
  document.getElementById("lang").value= queryConfig.config.assistantConfig.lang
  document.getElementById("credentials").value= queryConfig.config.assistantConfig.credentialPath
  document.getElementById("token").value= queryConfig.config.assistantConfig.tokenPath
  document.getElementById("latitude").value= queryConfig.config.assistantConfig.latitude
  document.getElementById("longitude").value= queryConfig.config.assistantConfig.longitude
  /** responseConfig **/
  document.getElementById("useScreenOutput").value= queryConfig.config.responseConfig.useScreenOutput
  document.getElementById("screenOutputCSS").value= queryConfig.config.responseConfig.screenOutputCSS
  document.getElementById("screenOutputTimer").value= queryConfig.config.responseConfig.screenOutputTimer
  document.getElementById("activateDelay").value= queryConfig.config.responseConfig.activateDelay
  document.getElementById("useAudioOutput").value= queryConfig.config.responseConfig.useAudioOutput
  document.getElementById("useChime").value= queryConfig.config.responseConfig.useChime
  document.getElementById("newChime").value= queryConfig.config.responseConfig.newChime
  document.getElementById("useNative").value= queryConfig.config.responseConfig.useNative
  document.getElementById("playProgram").value= queryConfig.config.responseConfig.playProgram
  /** micConfig **/
  document.getElementById("recorder").value= queryConfig.config.micConfig.recorder
  document.getElementById("device").value= queryConfig.config.micConfig.device
  /** snowboy **/
  document.getElementById("useSnowboy").value= queryConfig.config.snowboy.useSnowboy
  document.getElementById("usePMDL").value= queryConfig.config.snowboy.usePMDL
  document.getElementById("audioGain").value= queryConfig.config.snowboy.audioGain
  document.getElementById("Frontend").value= queryConfig.config.snowboy.Frontend
  document.getElementById("Model").value= queryConfig.config.snowboy.usePMDL ? "other" : queryConfig.config.snowboy.Model
  document.getElementById("Sensitivity").value= queryConfig.config.snowboy.Sensitivity
  if (queryConfig.config.snowboy.usePMDL) document.getElementById("PMDLName").value= queryConfig.config.snowboy.Model
  /** A2DServer **/
  document.getElementById("useA2D").value= queryConfig.config.A2DServer.useA2D
  document.getElementById("stopCommand").value= queryConfig.config.A2DServer.stopCommand
  document.getElementById("useYouTube").value= queryConfig.config.A2DServer.useYouTube
  document.getElementById("youtubeCommand").value= queryConfig.config.A2DServer.youtubeCommand
  document.getElementById("displayResponse").value= queryConfig.config.A2DServer.displayResponse
  /** Recipes **/
  document.getElementById("recipes").value= queryConfig.config.recipes
  /** return url for save config **/
  document.getElementById("configSave").action= "http://" + config.listening +":" + config.port + "/Save"
});
