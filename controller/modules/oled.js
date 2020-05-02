const font = require("oled-font-5x7");
const config = require("../config");
const Oled = require("./sh1106");
const sysinfo = require("./sysinfo");

const sh1106 = new Oled();

const _monitorInterval = () => { };

const oled = {
  async init() { },
  async startMonitoring() { },
  async stopMonitoring() { }
};

exports.init = async () => {
  return new Promise(async (resolve, reject) => {
    await sh1106.turnOnDisplay();
    await sh1106.clearDisplay();
    await sh1106.dimDisplay(0xff);
    await sh1106.rotateDisplay();
    resolve("oled initialized");
  });
};

exports.startMonitoring = async () => {
  return new Promise(async (resolve, reject) => {
    sh1106.clearDisplay();
    sh1106.drawRect(2, 2, 126, 62, "WHITE", false);
    sh1106.update();

    setInterval(async () => {
      const data = await sysinfo.get();
      sh1106.writeString(10, 9, font, `IP: ${data.ip}`, "WHITE", false);
      sh1106.writeString(10, 20, font, `VOLTS: ${data.volts}   `, "WHITE", false);
      sh1106.writeString(10, 31, font, `LOAD: ${data.cpu}      `, "WHITE", false);
      sh1106.writeString(10, 42, font, `MEM FREE: ${data.mem}  `, "WHITE", false);
      sh1106.writeString(10, 53, font, `DSK FREE: ${data.disk} `, "WHITE", false);
      sh1106.update(1);
    }, config.oledRefreshInterval);

    resolve("monitoring started");
  });
};