const raspi = require("raspi");
const I2C = require("raspi-i2c").I2C;

const TEST_SLAVE_ADDRESS = 0x11;

raspi.init(() => {
  const i2c = new I2C();
  i2c.write(TEST_SLAVE_ADDRESS, Buffer.from([0x50, 0x51, 0x52, 0x54]), () => {
    console.log(`Data written to ${TEST_SLAVE_ADDRESS}`);
    console.log(i2c.readByteSync(TEST_SLAVE_ADDRESS));
  });
});
