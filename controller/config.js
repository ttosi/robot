const config = {
  isDebug: true,
  oledRefreshInterval: 5 * 1000,
  logging: {
    logToConsole: true,
    logToFile: false,
  },
  slaves: {
    drive: 0x10,
    sensors: 0x11,
    oled: 0x3c
  },
  sensors: {
    command: {
      pixels: 0x50,
      voltage: 0x56
    }
  }
}

module.exports = config;