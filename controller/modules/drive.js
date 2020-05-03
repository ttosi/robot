const config = require("../config");
const protocol = require("./protocols/drive");
const logger = require("./logger")
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.drive;

console.log(protocol)

const drive = {
  queue: {
    execute() { },
    add() { },
    remove() { }
  },
  async execute(cmd = 1, revs = 1, speed = 1, accel = 1) {
    logger.log(`drive: ${_getLogValues(cmd, revs, speed, accel)}`);
    const revDirs = _getMotorDirections(cmd, revs);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.left, ..._getCommandBuffer(speed, accel, revDirs[0])])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.right, ..._getCommandBuffer(speed, accel, revDirs[1])])
      )
    ]);
  }
}

const _getCommandBuffer = (speed, accel, revs) => {
  const floatArray = new Float32Array([speed, accel, revs]);
  const buffer = new Int8Array(floatArray.buffer);
  return buffer;
}

const _getLogValues = (command, revs, speed, accel) => {
  const cmd = Object.keys(protocol.command).find(c => protocol.command[c] == command);
  const spd = Object.keys(protocol.speed).find(s => protocol.speed[s] == speed) || speed;
  const acl = Object.keys(protocol.acceleration).find(a => protocol.acceleration[a] == accel) || accel;
  return `cmd=${cmd}, revs=${revs}, spd=${spd}, acl=${acl}`;
};

const _getMotorDirections = (command, revs) => {
  let revsLeft = revs;
  let revsRight = revs;

  switch (command) {
    case 0x01:
      revsRight = -revsRight;
      break;
    case 0x02:
      revsLeft = -revsLeft;
      break;
    case 0x03:
      revsLeft = -revsLeft;
      revsRight = -revsRight;
      break;
    case 0x04:
      revsLeft = revsLeft;
      revsRight = revsRight;
      break;
    case 0x05:
      revsLeft = 0;
      revsRight = 0;
      break;
  }
  return [revsLeft, revsRight];
};

module.exports = drive;