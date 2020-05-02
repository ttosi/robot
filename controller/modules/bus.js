const raspi = require("raspi");
const I2C = require("raspi-i2c").I2C;
const i2c = new I2C();

const bus = {
  init() {
    return new Promise((resolve, reject) => {
      raspi.init(() => {
        resolve("master i2c inititalized");
      });
    });
  },
  writeSync(address, buffer) {
    return new Promise((resolve, reject) => {
      i2c.writeSync(address, buffer);
      // poll for long running task to complete,
      // waiting for uC to return 0xff
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
  },
  write(address, buffer) {
    i2c.write(address, buffer);
  },
  read(address, register, length) {
    return new Promise((resolve, reject) => {
      i2c.writeByte(address, register);
      i2c.read(address, length, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
}

module.exports = bus;
