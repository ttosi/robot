// drive command(speed, accel, revs)

const config = require("./config");
const logger = require("./modules/logger");
const bus = require("./modules/bus.js");
const drive = require("./modules/drive.js");
const oled = require("./modules/oled.js");
const pixels = require("./modules/pixels");

logger.log("initializing robot...");

(async () => {
  logger.log(await bus.init());
  logger.log(await oled.init());

  logger.log(await pixels.send(
    pixels.command.solid,
    pixels.color.green,
    pixels.brightness.low));
  logger.log(await oled.startMonitoring());
  // await drive.forward(2, 1, 2);
})();
