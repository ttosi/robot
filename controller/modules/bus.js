const raspi = require("raspi");
const I2C = require("raspi-i2c").I2C;

exports.write = (address, buffer) => {
  return new Promise((resolve, reject) => {
    raspi.init(() => {
      const i2c = new I2C();
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
  });
};
