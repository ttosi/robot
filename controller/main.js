const drive = require("./modules/drive.js");

(async () => {
  await drive.forward(2, 1);
  console.log("forward complete!!!");

//   await drive.reverse(2, 1);
//   console.log("reverse complete!!!");

//   await drive.spinRight();
//   console.log("spin right done!!!");

//   await drive.spinLeft();
//   console.log("spin left done!!!");

//   drive.stop();
//   console.log("stopped!!!");
})();
