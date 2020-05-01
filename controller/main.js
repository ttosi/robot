// drive command(speed, accel, revs)

const config = require("./config");
const logger = require("./modules/logger");
const drive = require("./modules/drive.js");
const bus = require("./modules/bus.js");
const oled = require("./modules/oled.js");

logger.log("initializing robot...");

(async () => {
  logger.log(await bus.init());
  logger.log(await oled.init());
  logger.log(await oled.startMonitoring());

  await drive.forward(2, 1, 2);
})();
