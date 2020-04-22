// buffer[0] = [motor selection]
// buffer[1] = [speed]
// buffer[2] = [acceleration]
// buffer[3] = [revolutions]
const config = require("../config");
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.drive;

exports.queue = {
  commands: [1,2,3],
  add(cmd) {
    console.log('add');
    this.commands.push(cmd);
  },
  remove() {
    console.log('remove');
  },
  execute() {
    console.log('execute')
    console.log(this.commands);
  }
}

exports.forward = async (speed = 1, accel = 1, revs = 1) => {
  return Promise.all([
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.left, speed, accel, revs])
    ),
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.right, speed, accel, -revs])
    ),
  ]);
};

exports.reverse = async (revs = 1, speed = 1, accel = 1) => {
  return Promise.all([
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.left, speed, accel, -revs])
    ),
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.right, speed, accel, revs])
    ),
  ]);
};

exports.spinLeft = async (revs = 1, speed = 1, accel = 5) => {
  return Promise.all([
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.left, speed, accel, revs])
    ),
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.right, speed, accel, revs])
    ),
  ]);
};

exports.spinRight = async (revs = 1, speed = 1, accel = 5) => {
  return Promise.all([
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.left, speed, accel, -revs])
    ),
    bus.write(
      SLAVE_ADDRESS,
      Buffer.from([protocol.motor.right, speed, accel, -revs])
    ),
  ]);
};

exports.stop = () => {
  return Promise.resolve(() => {
    bus.write(SLAVE_ADDRESS, Buffer.from([protocol.motor.stop]));
  });
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
