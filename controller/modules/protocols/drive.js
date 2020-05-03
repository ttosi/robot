const drive =  {
  motor: {
    left: 0x01,
    right: 0x02,
  },
  command: {
    forward: 0x01,
    reverse: 0x02,
    spinLeft: 0x03,
    spinRight: 0x04,
    stop: 0x05,
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