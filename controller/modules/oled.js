const font = require("oled-font-5x7");
const Oled = require("./sh1106");
const sysinfo = require("./sysinfo");

const oled = new Oled();

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
    oled.clearDisplay();
    oled.drawRect(2, 2, 126, 62, "WHITE", false);
    oled.update();
    
    setInterval(async () => {
      const data = await sysinfo.get();
      // oled.clearDisplay();
      // oled.drawRect(2, 2, 126, 62, "WHITE", false);
      // oled.update();

      oled.writeString(10, 9, font, `IP: ${data.ip}`, "WHITE", false);
      oled.writeString(10, 20, font, `LOAD: ${data.cpu}    `, "WHITE", false);
      oled.writeString(10, 31, font, `MEM FREE: ${data.mem}`, "WHITE", false);
      oled.writeString(10, 42, font, `DSK FREE: ${data.disk}`, "WHITE", false);
      oled.writeString(10, 53, font, `NUM PROCS: ${data.procs}`, "WHITE", false);
      oled.update(1);
    }, 3000);

    resolve("monitoring started");
  });
};

// oled.clearDisplay();
//     oled.drawRect(2, 2, 126, 62, "WHITE", false);
//     oled.writeString(10, 7, font, `IP: 192.168.0.52`, "WHITE", false);
//     oled.writeString(10, 18, font, `CPU LOAD: 1.8%`, "WHITE", false);
//     oled.writeString(10, 29, font, `MEM FREE: 82.1%`, "WHITE", false);
//     oled.writeString(10, 40, font, `DSK FREE: 64.7%`, "WHITE", false);
//     oled.update();