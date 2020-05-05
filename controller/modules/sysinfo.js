const config = require("../config");
const si = require("systeminformation");
const bus = require("./bus.js");

// cat /sys/class/thermal/thermal_zone0/temp
// (40780 / 1000).toFixed(1)

const sysinfo = {
  async get() {
    return new Promise(async (resolve, reject) => {
      const voltage = await this.getVoltage();
      const load = await si.currentLoad();
      const network = await si.networkInterfaces();
      const mem = await si.mem();
      const motorTemps = await this.getMotorTemps();

      resolve({
        ip: `${network.find((n) => n.ifaceName === "wlan0").ip4}`,
        volts: `${voltage}v`,
        cpu: `${load.currentload.toFixed(1)}%`,
        mem: `${(100 - ((mem.free / mem.total) * 100)).toFixed(1)}%`,
        temps: `L${motorTemps[0]} R${motorTemps[1]}`
      })
    });
  },
  getVoltage() {
    return new Promise(async (resolve, reject) => {
      const volts = (await bus.read(
        config.slaves.sensors,
        config.sensors.command.voltage,
        0x04)
      ).reverse();

      const voltage = this.getFloat(volts)
      resolve(!isNaN(voltage) ? voltage : "0.00");
    });
  },
  getMotorTemps() {
    return new Promise(async (resolve, reject) => {
      const temps = (await bus.read(
        config.slaves.sensors,
        config.sensors.command.motorTemps,
        0x08)
      ).reverse();

      const leftTemp = this.getFloat(temps.slice(0, 4));
      const rightTemp = this.getFloat(temps.slice(4, 8));

      resolve([leftTemp, rightTemp]);
    });
  },
  getFloat(buffer) {
    const arrBuffer = new ArrayBuffer(4);
    const view = new DataView(arrBuffer);
    
    buffer.forEach((byte, index) => view.setUint8(index, byte));

    const val = view.getFloat32(0).toFixed(1);
    return !isNaN(val) ? val : "0.00";
  }
}

module.exports = sysinfo;
