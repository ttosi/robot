// drive command(speed, accel, revs)
const drive = require("./modules/drive.js");
const bus = require("./modules/bus.js");
const oled = require("./modules/oled.js");

(async () => {
  console.log(await bus.init());
  // console.log(await oled.init());

  // console.log(await oled.startMonitoring());
  console.log(await drive.forward(2, 1, 2));
})();
