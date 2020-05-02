const config = require("../config");
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.sensors;
const SENSOR_PIXEL_COMMAND = config.sensors.command.pixels;

const pixels = {
  command: {
    off: 0x00,
    test: 0x01,
    solid: 0x02,
    forward: 0x03,
    reverse: 0x04,
    spinLeft: 0x05,
    spinRight: 0x06,
    strobe: 0x07,
    breathe: 0x08,
    rainbow: 0x09
  },
  color: {
    red: [0xff, 0x00, 0x00],
    green: [0x00, 0xff, 0x00],
    blue: [0x00, 0x00, 0xff],
    black: [0x00, 0x00, 0x00],
  },
  brightness: {
    low: 0x10,
    medium: 0x60,
    high: 0xff
  },
  async send(command, color, brightness) {
    return new Promise(async (resolve, reject) => {
      await bus.write(SLAVE_ADDRESS, Buffer.from([SENSOR_PIXEL_COMMAND, command, ...color, brightness]));
      resolve(`pixels: cmd=${Object.keys(this.command)[command]}`);
    });
  }
};

module.exports = pixels;