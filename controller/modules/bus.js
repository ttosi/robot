const raspi = require("raspi");
const I2C = require("raspi-i2c").I2C;
const i2c = new I2C();

exports.init = () => {
  return new Promise((resolve, reject) => {
    raspi.init(() => {
      resolve("master i2c inititalized");
    });
  });
};

// firmware requires a sent byte of 0xff which
// signals any long waiting commands have completed
exports.writeSync = (address, buffer) => {
  return new Promise((resolve, reject) => {
    i2c.writeSync(address, buffer);
    const check = setInterval(() => {
      i2c.readByte(address, (err, data) => {
        if (err) reject(err);
        if (data === 0xff) {
          clearInterval(check);
          resolve(true);
        }
      });
    }, 100);
  });
};
