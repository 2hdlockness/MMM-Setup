$.getJSON("http://127.0.0.1:8082/allModulesInstalled" , (modules) => {
  var body = document.getElementsByTagName("body")[0]
  modules.forEach(moduleName => {
    console.log(moduleName)
    var module = document.createElement("div")
    module.id = moduleName
    var a = document.createElement('a')
    var link = document.createTextNode(moduleName)
    a.appendChild(link)
    a.title = moduleName
    a.href = "./" + moduleName
    module.appendChild(a)
    body.appendChild(module)
  })
})
