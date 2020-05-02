const font = require("oled-font-5x7");
const config = require("../config");
const Oled = require("./sh1106");
const sysinfo = require("./sysinfo");
const sh1106 = new Oled();

let monitorInterval = {};

const oled = {
  async init() {
    return new Promise(async (resolve, reject) => {
      await sh1106.turnOnDisplay();
      await sh1106.clearDisplay();
      await sh1106.dimDisplay(0xff);
      await sh1106.rotateDisplay();
      resolve("oled initialized");
    });
  },
  async startMonitoring() {
    return new Promise(async (resolve, reject) => {
      sh1106.clearDisplay();
      sh1106.drawRect(2, 2, 126, 62, "WHITE", false);
      sh1106.writeString(41, 22, font, "ENABLING", "WHITE", false);
      sh1106.writeString(36, 34, font, "MONITORING", "WHITE", false);
      sh1106.update();

      let firstRefresh = true;

      monitorInterval = setInterval(async () => {
        const data = await sysinfo.get();
        if (firstRefresh) {
          sh1106.clearDisplay();
          sh1106.drawRect(2, 2, 126, 62, "WHITE", false);
          firstRefresh = false;
        }

        sh1106.writeString(10, 8, font, `IP: ${data.ip}`, "WHITE", false);
        sh1106.writeString(10, 19, font, `VOLTS: ${data.volts}   `, "WHITE", false);
        sh1106.writeString(10, 30, font, `LOAD: ${data.cpu}      `, "WHITE", false);
        sh1106.writeString(10, 41, font, `MEM FREE: ${data.mem}  `, "WHITE", false);
        sh1106.writeString(10, 52, font, `DSK FREE: ${data.disk} `, "WHITE", false);
        sh1106.update(1);
      }, config.oledRefreshInterval);
      resolve("monitoring started");
    });
  },
  async disableMonitoring() {
    return new Promise(async (resolve, reject) => {
      sh1106.clearDisplay();
      sh1106.drawRect(2, 2, 126, 62, "WHITE", false);
      sh1106.writeString(36, 22, font, "MONITORING", "WHITE", false);
      sh1106.writeString(41, 34, font, "DISABLED", "WHITE", false);
      sh1106.update();

      clearInterval(monitorInterval);
      resolve("monitoring disabled");
    });
  }
};

module.exports = oled;