const drive = require("./modules/drive.js");

(async () => {
  drive.queue.add();
  drive.queue.add();
  //drive.queue.execute();
  
  // await drive.forward(2, 1);
  // console.log("forward complete!!!");

  // await drive.reverse(2, 1);
  // console.log("reverse complete!!!");

  // await drive.spinRight();
  // console.log("spin right done!!!");

  // await drive.spinLeft();
  // console.log("spin left done!!!");

  // await drive.stop();
  // console.log("stopped!!!");
})();
