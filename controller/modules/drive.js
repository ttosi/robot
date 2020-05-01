// byte[0] = [motor selection]
// byte[1-4] = [speed]
// byte[5-8] = [acceleration]
// byte[9-12] = [revolutions]

const config = require("../config");
const logger = require("./logger")
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.drive;

const protocol = {
  motor: {
    stop: 0x00,
    left: 0x01,
    right: 0x02,
    both: 0x03,
  }
};

const _getCommandBuffer = (speed, accel, revs) => {
  const floatArray = new Float32Array([speed, accel, revs]);
  const buffer = new Int8Array(floatArray.buffer);
  return buffer;
}

const drive = {
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
        Buffer.from([protocol.motor.left, ..._getCommandBuffer(speed, accel, revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.right, ..._getCommandBuffer(speed, accel, -revs)])
      )
    ]);
  },
  async reverse(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive reverse: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, -revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, revs)])
      )
    ]);
  },
  async spinLeft(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive spin left: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, -revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, -revs)])
      )
    ]);
  },
  async spinRight(speed = 1, accel = 1, revs = 1) {
    logger.log(`drive spin right: s=${speed}, a=${accel}, r=${revs}`);
    return Promise.all([
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, revs)])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, revs)])
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



// exports.queue = {
//   commands: [],
//   add(cmd) {
//     console.log("add");
//     this.commands.push(cmd);
//   },
//   remove() {
//     console.log("remove");
//   },
//   execute() {
//     console.log("execute");
//     console.log(this.commands);
//   },
// };

// getCommandBuffer = (speed, accel, revs) => {
//   const floatArray = new Float32Array([speed, accel, revs]);
//   const buffer = new Int8Array(floatArray.buffer);
//   return buffer;
// }

// exports.forward = async (speed = 1, accel = 1, revs = 1) => {
//   return Promise.all([
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, revs)])
//     ),
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, -revs)])
//     )
//   ]);
// };

// exports.reverse = async (speed = 1, accel = 1, revs = 1) => {
//   return Promise.all([
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, -revs)])
//     ),
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, revs)])
//     )
//   ]);
// };

// exports.spinLeft = async (speed = 1, accel = 1, revs = 1) => {
//   return Promise.all([
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, -revs)])
//     ),
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, -revs)])
//     )
//   ]);
// };

// exports.spinRight = async (speed = 1, accel = 1, revs = 1) => {
//   return Promise.all([
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.left, ...getCommandBuffer(speed, accel, revs)])
//     ),
//     bus.writeSync(
//       SLAVE_ADDRESS,
//       Buffer.from([protocol.motor.right, ...getCommandBuffer(speed, accel, revs)])
//     ),
//   ]);
// };

// exports.stop = () => {
//   return Promise.resolve(() => {
//     bus.writeSync(SLAVE_ADDRESS, Buffer.from([protocol.motor.stop]));
//   });
// };



module.exports = drive;