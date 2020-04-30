const rpio = require("rpio");
const Oled = require("sh1106-js");
const font = require("oled-font-5x7");
const PngJs = require("pngjs").PNG;
const fs = require("fs");

rpio.init({
  gpiomem: false,
  mapping: "physical",
});
const oled = new Oled({ rpio });

exports.init = async () => {
  return new Promise(async (resolve, reject) => {
    await oled.turnOnDisplay();
    await oled.clearDisplay();
    await oled.dimDisplay(0xff);
    await oled.rotateDisplay();
    resolve("oled initialized");
  });
};

exports.startMonitoring = async () => {
  return new Promise(async (resolve, reject) => {
    await oled.clearDisplay();
    await oled.drawRect(2, 2, 126, 62, "WHITE", false);
    await oled.writeString(10, 7, font, `IP: 192.168.0.52`, "WHITE", false);
    await oled.writeString(10, 18, font, `x CPU LOAD: 1.8%`, "WHITE", false);
    await oled.writeString(10, 29, font, `MEM FREE: 82.1%`, "WHITE", false);
    await oled.writeString(10, 40, font, `DSK FREE: 64.7%`, "WHITE", false);
    await oled.writeString(10, 51, font, `MEMORY: 87%`, "WHITE", false);
    await oled.update();
    resolve("monitoring started");
  });
};
