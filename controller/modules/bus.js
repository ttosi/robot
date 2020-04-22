const raspi = require("raspi");
const I2C = require("raspi-i2c").I2C;
const i2c = new I2C();
raspi.init(() => {
  console.log("master i2c inititalized");
});

exports.write = (address, buffer) => {
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
