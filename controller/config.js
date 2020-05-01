const config = {
  isDebug: true,
  oledRefreshInterval: 2 * 1000,
  logging: {
    logToConsole: true,
    logToFile: false,
  },
  slaves: {
    drive: 0x10,
    sensors: 0x11,
    oled: 0x3c
  }
}

module.exports = config;