$.getJSON("http://" + config.listening + ":" + config.port + "/allModules" , (modules) => {
  var body = document.getElementsByTagName("body")[0]
  modules.forEach(moduleName => {
    var module = document.createElement("div")
    module.id = moduleName
    var a = document.createElement('a')
    var link = document.createTextNode(moduleName)
    a.appendChild(link)
    a.title = moduleName
    a.href = "./" + moduleName + "/installer.html"
    module.appendChild(a)
    body.appendChild(module)
  })
})
