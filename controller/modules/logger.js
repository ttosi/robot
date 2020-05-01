require("sugar-date").extend();
const config = require("../config");

const logger = {
  log() {
    if (config.isDebug && config.logging.logToConsole) {
      // const date = new Date();
      const args = Array.prototype.slice.call(arguments);
      const dateTimeString = new Date().format("{hh}:{mm}")

      args.unshift(`[${dateTimeString}]`);
      console.log.apply(console, args);
    }
  }
}

module.exports = logger;