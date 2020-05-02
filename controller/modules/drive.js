// drive command(speed, accel, revs)
//  byte[0] = [motor selection]
//  byte[1-4] = [speed]
//  byte[5-8] = [acceleration]
//  byte[9-12] = [revolutions]

const config = require("../config");
const logger = require("./logger")
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.drive;

const _getCommandBuffer = (speed, accel, revs) => {
  const floatArray = new Float32Array([speed, accel, revs]);
  const buffer = new Int8Array(floatArray.buffer);
  return buffer;
}

// TODO: need to move methods to one
const drive = {
  motor: {
    stop: 0x00,
    left: 0x01,
    right: 0x02,
    both: 0x03,
  },
  acceleration: {
    slow: 0x01,
    medium: 0x03,
    fast: 0x06
  },
  speed: {
    slow: 0x01,
    medium: 0x03,
    fast: 0x06
  },
  queue: {
    execute() { },
    add() { },
    remove() { }
  },
  async forward(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive forward: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.left, ..._getCommandBuffer(speed, accel, revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.right, ..._getCommandBuffer(speed, accel, -revs)])
      )
    ]);
  },
  async reverse(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive reverse: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.left, ...getCommandBuffer(speed, accel, -revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.right, ...getCommandBuffer(speed, accel, revs)])
      )
    ]);
  },
  async spinLeft(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive spin left: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.left, ...getCommandBuffer(speed, accel, -revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.right, ...getCommandBuffer(speed, accel, -revs)])
      )
    ]);
  },
  async spinRight(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive spin right: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.left, ...getCommandBuffer(speed, accel, revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([this.motor.right, ...getCommandBuffer(speed, accel, revs)])
      ),
    ]);
  },
  async stop() {
    logger.log(`drive all stop`);
    return Promise.resolve(() => {
      bus.writeSync(SLAVE_ADDRESS, Buffer.from([protocol.motor.stop]));
    });
  }
}

module.exports = drive;