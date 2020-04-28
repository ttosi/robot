const drive = require("./modules/drive.js");

// command(speed, accel, revs)

(async () => {
  await drive.forward(7, 4, 6);
  console.log("forward done!!!");
  // await drive.spinLeft(2, 1, 0.57);
  // console.log("spin left done!!!");

  // await drive.forward(2, 1, 2);
  // console.log("forward done!!!");
  // await drive.spinLeft(2, 1, 0.57);
  // console.log("spin left done!!!")

  // await drive.forward(2, 1, 2);
  // console.log("forward done!!!");
  // await drive.spinLeft(2, 1, 0.57);
  // console.log("spin left done!!!");

  // await drive.forward(2, 1, 2);
  // console.log("forward done!!!");
  await drive.spinLeft(7, 3, 4);
  console.log("spin left done!!!");
})();
