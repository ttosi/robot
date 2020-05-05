const drive = {
  motor: {
    left: 0x01,
    right: 0x02,
  },
  commands: {
    forward: {
      cmd: 0x01,
      name: "forward",
      ml: 1,
      mr: -1
    },
    reverse: {
      cmd: 0x02,
      name: "reverse",
      ml: -1,
      mr: 1
    },
    spinLeft: {
      cmd: 0x03,
      name: "spinLeft",
      ml: -1,
      mr: -1
    },
    spinRight: {
      cmd: 0x04,
      name: "spinRight",
      ml: 1,
      mr: 1
    },
    stop: {
      cmd: 0x05,
      name: "stop",
      ml: 0,
      mr: 0
    }
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
  }
};

module.exports = drive;