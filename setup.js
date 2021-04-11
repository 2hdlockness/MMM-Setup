const path = require("path")
const fs = require("fs")
const open = require("open")
const tools = require("./tools/tools.js")
var express = require("express")
var log = (...args) => { /* do nothing */ }
try {
  var config = require("./config.js")
  if (config.debug) log = (...args) => { console.log("[DEBUG]", ...args) }
} catch (e) { return console.log("please config your config.js file!") }

var app = express()
this.wantedConfigModule = null
this.moduleFile = null

/** Read MagicMirror Config **/
function readConfig() {
  let file = path.resolve(__dirname, "../../config/config.js")
  if (fs.existsSync(file)) {
    var MMConfig = require(file)
  }
  else return console.log("Error: MagicMirror config.js not found !?")
  return MMConfig
}

function readAllNameInstalled() {
  try {
    var allModulesName = []
    var ModulesInConfig = MMConfig.modules.find(m => {
      if (tools.bugsounetModules.includes(m.module)) allModulesName.push(m.module)
    })
    return allModulesName
  } catch (e) {
    console.log("Error: " + e)
  }
}

/** Read wanted config module **/
function readModules(config, module) {
  if (!module) return console.log("no module specified")
  try {
    moduleFile = require("./HTML/modules/" + module +"/" + module + ".js")
    var configModule = config.modules.find(m => m.module == module)
    configModule.config = tools.mergeConfig( {} , moduleFile.default.config, configModule.config )
  } catch (e) {
    console.log("Error: " + e)
  }
  if (!configModule) return console.log("module not found!")
  return configModule
}

/** Main **/

var MMConfig = readConfig()
var allModulesInstalled= readAllNameInstalled()
var allModules= tools.bugsounetModules
log("Find", allModulesInstalled.length, "@bugsounet Modules:", allModulesInstalled)

app.use('/resources', express.static('./HTML/resources'))

app.get('/', function (req, res) {
  this.wantedConfigModule = null
  this.moduleFile = null
  res.sendFile( __dirname + "/HTML/index.htm")
})

app.get('/installed', function (req, res) {
  this.wantedConfigModule = null
  this.moduleFile = null
  res.sendFile( __dirname + "/HTML/installed.htm")
})

allModules.forEach( module => {
  log("Create route for", module)
  app.get("/"+ module, (req,res) => {
    this.wantedConfigModule = readModules(MMConfig, module)
    this.moduleFile = require("./HTML/modules/" + module +"/" + module + ".js")
    if (!this.wantedConfigModule) return res.end("error!")
    log("Config Found: ", this.wantedConfigModule.module)
    log(module + " actual config:", this.wantedConfigModule)
    res.sendFile( __dirname+ "/HTML/modules/" + module + "/index.htm")
  })
 }
)

app.get("/config", (req, res) => {
   res.json(this.wantedConfigModule)
   log("Send config...")
})

app.get("/allmodulesInstalled", (req,res) => {
  res.json(allModulesInstalled)
  log("Send All Modules names...")
})

app.get("/allmodules", (req,res) => {
  res.json(allModules)
  log("Send All Modules names...")
})

app.get('/Save', (req, res) => {
/** response received translate **/
   response = this.moduleFile.readResponse(req.query)
   newConfig = tools.mergeConfig( {} , this.wantedConfigModule, response )
   log("Request change:", newConfig)
   var referrer = req.get('Referrer')
   log("Referrer is:", referrer)
   log("Merging to config.js file...")
   MMConfig.modules.find((m,i) => {
     if (m.module == response.module) {
       log("Modify:", response.module )
       delete(MMConfig.modules[i])
       MMConfig.modules[i] = newConfig
       log("Done.")
     }
   })
   log("Result:", MMConfig)
   log("Save to config.js File... @todo mouahahah")
   /** Todo : save to config.js file! **/
   tools.saveConfig(MMConfig)
   log("Yeah I have the callback done...")
   res.redirect(referrer)
   res.end("ok!")
})

app.use(function(req, res, next) {
  console.log("Error! Don't find:", req.url)
  res.status(404).send("-404- Sorry, I can't find that!");
})

var server = app.listen(8081, "127.0.0.1", function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Running configuration app on http://"+ host + ":" + port)
   open("http://"+ host + ":" + port).catch(() => console.log("Failed to open browser!"))
})
/** end of main **/

