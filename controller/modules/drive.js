const config = require("../config");
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.drive;

// buffer[0] = [motor selection]
// buffer[1] = [left motor revolutions (negative is reverse)]
// buffer[2] = [right motor revolutions (negative is reverse)]
// buffer[3] = [speed]

exports.forward = async (revs = 1, speed = 1, accel = 1) => {
  const forward = Buffer.from([protocol.motor.both, revs, -revs, speed, accel]);
  sendCommand();
  return await bus.write(SLAVE_ADDRESS, forward);
};

exports.reverse = async (revs = 1, speed = 1, accel = 1) => {
  const reverse = Buffer.from([protocol.motor.both, -revs, revs, speed, accel]);
  return await bus.write(SLAVE_ADDRESS, reverse);
};

exports.spinLeft = async (revs = 1, speed = 1, accel = 5) => {
  const spinLeft = Buffer.from([protocol.motor.both, -revs, -revs, speed, accel]);
  return await bus.write(SLAVE_ADDRESS, spinLeft);
};

exports.spinRight = async (revs = 1, speed = 1, accel = 5) => {
  const spinRight = Buffer.from([protocol.motor.both, revs, revs, speed, accel]);
  return await bus.write(SLAVE_ADDRESS, spinRight);
};

exports.stop = () => {
  return await bus.write(SLAVE_ADDRESS, Buffer.from([protocol.motor.stop]));
};

const protocol = {
  motor: {
    stop: 0x00,
    left: 0x01,
    right: 0x02,
    both: 0x03,
  },
  direction: {
    forward: 0x01,
    backward: 0x02,
  },
};

// exports.move = () => {
//     const left = Buffer.from([protocol.motor.left, -0x03, 0x01]);
//     const right = Buffer.from([protocol.motor.right, 0x03, 0x01]);

//     bus.write(SLAVE_ADDRESS, left);
//     bus.write(SLAVE_ADDRESS, right);
//   };
