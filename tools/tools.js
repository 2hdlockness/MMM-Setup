var bugsounetModules = [
  "MMM-Saint",
  "MMM-GoogleAssistant",
  "MMM-FranceInfo",
  "MMM-FTV",
  "MMM-TelegramBot",
  "MMM-Assistant2Display",
  "MMM-UpdateNotification",
  "MMM-Tools",
  "MMM-Shom",
  "MMM-NewsFeed",
  "MMM-FreeboxTV",
  "MMM-Weather",
  "MMM-Snowboy",
  "MMM-Freebox",
  "MMM-NewPIR",
  "MMM-Alexa",
  "MMM-Horoscope",
  "MMM-Xbox",
  "MMM-AirParif",
  "MMM-TimeTable",
  "MMM-GABackground",
  "MMM-FreeBox4G",
  "MMM-NotificationReceived",
  "MMM-Speedtest",
  "MMM-ScreenManager",
  "MMM-Pronote"
]

function mergeConfig(result) {
  var stack = Array.prototype.slice.call(arguments, 1)
  var item
  var key
  while (stack.length) {
    item = stack.shift()
    for (key in item) {
      if (item.hasOwnProperty(key)) {
        if (
          typeof result[key] === "object" && result[key]
          && Object.prototype.toString.call(result[key]) !== "[object Array]"
        ) {
          if (typeof item[key] === "object" && item[key] !== null) {
            result[key] = mergeConfig({}, result[key], item[key])
          } else {
            result[key] = item[key]
          }
        } else {
          result[key] = item[key]
        }
      }
    }
  }
  return result
}

function stringToBool(string) {
  switch(string.toLowerCase().trim())
  {
    case true:
    case "true":
    case "yes":
    case 1:
      return true;
    case false:
    case "false":
    case "no":
    case 0:
    case null:
      return false;
    default:
      return false;
  }
}

/** convert string to Array **/
function stringToArray(string) {
  if (string) return string.split(',')
  else return []
}

exports.mergeConfig = mergeConfig
exports.stringToBool = stringToBool
exports.stringToArray = stringToArray
exports.bugsounetModules = bugsounetModules
