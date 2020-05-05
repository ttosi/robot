const config = require("./config");
const logger = require("./modules/logger");
const bus = require("./modules/bus.js");
const drive = require("./modules/drive.js");
const dp = require("./modules/protocols/drive");
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
  // logger.log(await pixels.send(
  //   pixels.command.solid,
  //   pixels.color.blue,
  //   pixels.brightness.low));
  logger.log(await oled.startMonitoring());

  // Promise.all([
  //   pixels.send(
  //     pixels.command.strobe, pixels.color.blue, pixels.brightness.low),
  //   drive.execute(
  //     1,
  //     dp.command.spinLeft,
  //     dp.speed.medium,
  //     dp.acceleration.slow)
  // ]).then((res) => {
  //   res.forEach(r => logger.log(r));
  // });

  // drive.queue.add([1, dp.commands.spinLeft, dp.speed.slow, dp.acceleration.slow])
  // drive.queue.add([1, dp.commands.forward, dp.speed.slow, dp.acceleration.slow])
  // drive.queue.execute().then(d => console.log(d));
  // logger.log(await drive.execute(
  //   1,
  //   dp.commands.forward,
  //   dp.speed.fast,
  //   dp.acceleration.slow));
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

  setTimeout(() => {
    logger.log("controller sucessfully down");
    process.exit();
  }, 1250);
});
