const path = require("path")
const fs = require("fs")
const open = require("open")
const tools = require("./tools/tools.js")
var express = require("express")
var app = express()
this.wantedConfigModule = null
this.moduleFile = null

/** Read MagicMirror Config **/
function readConfig() {
  let file = path.resolve(__dirname, "../../config/config.js")
  if (fs.existsSync(file)) {
    var MMConfig = require(file)
  }
  else return console.log("config.js not found !?")
  return MMConfig
}

function readAllName() {
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
    moduleFile = require("./modules/" + module +"/" + module + ".js")
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
var allModules= readAllName()
console.log("Find", allModules.length, "@bugsounet Modules:", allModules)

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile( __dirname + "/index.htm")
})

allModules.forEach( module => {
  console.log("Create route for", module)
  app.get("/"+ module, (req,res) => {
    this.wantedConfigModule = readModules(MMConfig, module)
    this.moduleFile = require("./modules/" + module +"/" + module + ".js")
    if (!this.wantedConfigModule) return res.end("error!")
    console.log("Config Found: ", this.wantedConfigModule.module)
    console.log(module + " actual config:", this.wantedConfigModule)
    res.sendFile( __dirname+ "/modules/" + module + "/index.htm")
  })
 }
)

app.get("/config", (req, res) => {
   res.json(this.wantedConfigModule)
   console.log("send config")
})

app.get('/process_get', (req, res) => {
   var self = this
/** response received translate **/
   console.log(self.moduleFile, this.wantedConfigModule)
   response = this.moduleFile.readResponse(req)
   newConfig = tools.mergeConfig( {} , this.wantedConfigModule, response )
   console.log ("Request change:", newConfig)
   res.end("ok!")
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Running configuration app on http://127.0.0.1:" + port)
   open("http://127.0.0.1:8081").catch(() => console.log("Failed to open browser!"))
})
/** end of main **/
