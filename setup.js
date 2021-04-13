const path = require("path")
const fs = require("fs")
const tools = require("./tools/tools.js")
var express = require("express")
var cors = require('cors')

var log = (...args) => { /* do nothing */ }
try {
  var config = require("./config.js")
  if (config.debug) log = (...args) => { console.log("[DEBUG]", ...args) }
} catch (e) { return console.log("please config your config.js file!") }

main()

/** main function **/
function main() {
  console.log("MMM-Setup Application v"+ require("./package.json").version)
  if (config.testingMode) console.log("TestingMode is activated, don't worry.. no change will be apply!")
  this.Client = express()
  this.Server = express()
  this.wantedConfigModule = null
  this.moduleFile = null
  this.MMConfig = readConfig()
  this.allModulesInstalled= readAllNameInstalled()
  this.allModules= tools.bugsounetModules.sort()
  log("Find", allModulesInstalled.length, "@bugsounet Modules:", allModulesInstalled)
  CreateClient()
  CreateServer()
}

/** Read MagicMirror Config **/
function readConfig() {
  let file = path.resolve(__dirname, "../../config/config.js")
  if (fs.existsSync(file)) MMConfig = require(file)
  else return console.log("Error: MagicMirror config.js not found !?")
  return MMConfig
}

function readAllNameInstalled() {
  try {
    var allModulesName = []
    var ModulesInConfig = MMConfig.modules.find(m => {
      if (tools.bugsounetModules.includes(m.module)) allModulesName.push(m.module)
    })
    return allModulesName.sort()
  } catch (e) {
    console.log("Error! " + e)
  }
}

/** Read wanted config module **/
function readModules(config, module) {
  if (!module) return console.log("Error: no module specified")
  try {
    moduleFile = require("./HTML/modules/" + module +"/" + module + ".js")
    var configModule = config.modules.find(m => m.module == module)
    configModule.config = tools.mergeConfig( {} , moduleFile.default.config, configModule.config )
  } catch (e) {
    console.log("Error! " + e)
  }
  if (!configModule) return console.log("Error: module not found!")
  return configModule
}

/** Client Part **/
function CreateClient() {
  this.Client.use('/resources', express.static('./HTML/resources'))
  this.Client.use('/js', express.static('./HTML/js'))
  this.Client.use('/css', express.static('./HTML/css'))

  this.Client.get('/', (req, res) => {
    this.wantedConfigModule = null
    this.moduleFile = null
    res.sendFile( __dirname + "/HTML/index.htm")
  })

  this.Client.get('/installed', (req, res) => {
    this.wantedConfigModule = null
    this.moduleFile = null
    res.sendFile( __dirname + "/HTML/installed.htm")
  })

  this.allModules.forEach( module => {
    log("[Client] Create route for", module)
    this.Client.get("/"+ module, (req,res) => {
      this.wantedConfigModule = readModules(MMConfig, module)
      this.moduleFile = require("./HTML/modules/" + module +"/" + module + ".js")
      if (!this.wantedConfigModule) return res.end("error!")
      log("[Client] Config Found: ", this.wantedConfigModule.module)
      res.sendFile( __dirname+ "/HTML/modules/" + module + "/index.htm")
    })
   }
  )

  this.Client.get("/stop", (req,res) => {
    log("[Client] Stop!")
    res.end("Thanks for using MMM-Setup!")
    process.exit()
  })

  this.Client.use(function(req, res, next) {
    console.log("[Client] Error! Don't find:", req.url)
    res.status(404).send("-404- Sorry, I can't find that!");
  })

  var client = Client.listen(8081, "0.0.0.0", async function () {
    var port = client.address().port
    var host = await tools.getIP()
    host.forEach(network => {
      console.log("MMM-Setup listening on " + (network.default ? "default interface " : "") + "http://"+ network.ip + ":" + port)
    })
  })
}

/** Server Part **/
function CreateServer() {
  this.Server.use(cors())

  this.Server.get("/config", (req, res) => {
    res.json(this.wantedConfigModule)
    log("[Server] Send config...", this.wantedConfigModule)
  })

  this.Server.get("/allmodulesInstalled", (req,res) => {
    res.json(this.allModulesInstalled)
    log("[Server] Send All Modules @bugsounet modules installed...", this.allModulesInstalled)
  })

  this.Server.get("/allmodules", (req,res) => {
    res.json(this.allModules)
    log("[Server] Send All @bugsounet modules names...", this.allModules)
  })

  this.Server.get('/Save', (req, res) => {
    /** response received translate **/
    var response = this.moduleFile.readResponse(req.query)
    var newConfig = tools.mergeConfig( {} , this.wantedConfigModule, response )
    log("[Server] Request change:", newConfig)
    var referrer = req.get('Referrer')
    log("[Server] Referrer is:", referrer)
    log("[Server] Merging to config.js file...")
    this.MMConfig.modules.find((m,i) => {
      if (m.module == response.module) {
        log("[Server] Modify:", response.module )
        delete(this.MMConfig.modules[i])
        this.MMConfig.modules[i] = newConfig
        log("[Server] Done.")
      }
    })
    log("[Server] Result:", this.MMConfig)
    if (config.testingMode) console.log("[Server] Testing mode, Save is disabled!")
    else {
      log("[Server] Save to config.js File...")
      tools.saveConfig(this.MMConfig,config.debug)
    }
    res.redirect(referrer)
    res.end("ok!")
  })

  this.Server.use((req, res, next) => {
    console.log("[Server] Error! Don't find:", req.url)
    res.status(404).send("-404- Fatal error!");
  })

  var server = Server.listen(8082, "localhost", () => {
    var port = server.address().port
    log("[Server] Started on port", port)
  })
}
