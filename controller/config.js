const config = {
  isDebug: true,
  logging: {
    logToConsole: true,
    logToFile: false,
  },
  slaves: {
    drive: 0x10,
    pixels: 0x11,
    sensors: 0x12,
    oled: 0x3c
  }
}

module.exports = config;