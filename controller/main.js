const drive = require("./modules/drive.js");

(async () => {
  await drive.forward(3, 5, 5);
  console.log("forward done!!!");

  await drive.spinRight(1, 1, 1);
  console.log("spin right done!!!");

  await drive.reverse(3, 5, 1);
  console.log("forward done!!!");

  await drive.spinLeft(1, 1, 2);
  console.log("spin right done!!!");

  await drive.forward(3, 5, 5);
  console.log("forward done!!!");

})();
