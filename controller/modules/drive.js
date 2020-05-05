const config = require("../config");
const protocol = require("./protocols/drive");
const logger = require("./logger")
const bus = require("./bus");
const SLAVE_ADDRESS = config.slaves.drive;

const drive = {
  queue: {
    async execute() {
      this.commands.forEach(async c => {
        await drive.execute(...c);
        // console.log(c)
      })
    },
    add(command) {
      this.commands.push(command);
    },
    remove() { },
    commands: []
  },
  async execute(revs = 1, cmd = 1, speed = 1, accel = 1) {
    const revDirs = _getMotorDirections(cmd, revs);
    
    return Promise.all([
      // setTimeout(() => {
      //   console.log(`drive: ${_getLogValues(revs * cmd.ml, cmd, speed, accel)}`)
      //   // return ["st1", revDirs[0]]
      // }, 1000),
      // setTimeout(() => {
      //   console.log(`drive: ${_getLogValues(revs * cmd.mr, cmd, speed, accel)}`)
      //   // return ["st2", revDirs[1]]
      // }, 1000)
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([
          protocol.motor.left,
          ..._getCommandBuffer(speed, accel, revs * cmd.ml)
        ])
      ),
      bus.writeSync(
        SLAVE_ADDRESS,
        Buffer.from([protocol.motor.right,
          ..._getCommandBuffer(speed, accel, revs * cmd.mr)
        ])
      )
    ]).then(d => {
      return `drive: ${_getLogValues(revs * cmd.mr, cmd, speed, accel)}`
      // return d
    });
  }
}

const _getCommandBuffer = (speed, accel, revs) => {
  const floatArray = new Float32Array([speed, accel, revs]);
  const buffer = new Int8Array(floatArray.buffer);
  return buffer;
}

const _getLogValues = (revs, command, speed, accel) => {
  // const cmd = Object.keys(protocol.commands).find(c => protocol.commands[c].cmd == command);
  const spd = Object.keys(protocol.speed).find(s => protocol.speed[s] == speed) || speed;
  const acl = Object.keys(protocol.acceleration).find(a => protocol.acceleration[a] == accel) || accel;
  return `cmd=${command.name}, revs=${revs}, spd=${spd}, acl=${acl}`;
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