require("sugar-date").extend();
const config = require("../config");

const logger = {
  log() {
    if (config.isDebug && config.logging.logToConsole) {
      const args = Array.prototype.slice.call(arguments);
      const dateTimeString = new Date().format("{MM}/{dd}/{yyyy} {hh}:{mm}:{ss}.{ms}")

      args.unshift(`[${dateTimeString}]`);
      console.log.apply(console, args);
    }
  }
}

module.exports = logger;