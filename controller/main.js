const config = require("./config");
const logger = require("./modules/logger");
const bus = require("./modules/bus.js");
const drive = require("./modules/drive.js");
const oled = require("./modules/oled.js");
const pixels = require("./modules/pixels");

logger.log("initializing...");
logger.log(
  `controller ${config.versions.controller},`,
  `drive ${config.versions.controller},`,
  `sensors ${config.versions.sensorsFirmware}`
);

(async () => {
  logger.log(await bus.init());
  logger.log(await oled.init());
  logger.log(await pixels.send(
    pixels.command.solid,
    pixels.color.blue,
    pixels.brightness.low));
  logger.log(await oled.startMonitoring());
  // await drive.forward(
  //   drive.speed.medium,
  //   drive.acceleration.medium,
  //   2);
})();

process.on('SIGINT', async () => {
  console.log(`\b\b${"-".repeat(50)}`);
  logger.log("shutting down...");
  logger.log(await oled.disableMonitoring());
  logger.log(await oled.off());
  logger.log(await pixels.send(
    pixels.command.solid,
    pixels.color.black,
    pixels.brightness.low));
  
  logger.log("controller sucessfully down");
  setTimeout(() => {
    process.exit();
  }, 1250);
});
