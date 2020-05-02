const config = require("../config");
const si = require("systeminformation");
const bus = require("./bus.js");

const sysinfo = {
  async get() {
    return new Promise(async (resolve, reject) => {
      const voltage = await this.getVoltage();
      const load = await si.currentLoad();
      const network = await si.networkInterfaces();
      const mem = await si.mem();
      const disk = await si.fsSize();
      const procs = await si.processes();

      resolve({
        ip: `${network.find((n) => n.ifaceName === "wlan0").ip4}`,
        volts: `${voltage}v`,
        cpu: `${load.currentload.toFixed(1)}%`,
        mem: `${(100 - ((mem.free / mem.total) * 100)).toFixed(1)}%`,
        disk: `${100 - (disk.find((d) => d.fs === "/dev/root").use.toFixed(1))}%`
      })
    });
  },
  getVoltage() {
    return new Promise(async (resolve, reject) => {
      const voltage = (await bus.read(
        config.slaves.sensors,
        config.sensors.command.voltage,
        0x04)
      ).reverse();
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      
      voltage.forEach((byte, index) => 
        view.setUint8(index, byte)
      );
      const floatVoltage = view.getFloat32(0).toFixed(2);
      
      resolve(!isNaN(floatVoltage) ? floatVoltage : "0.00");
    });
  }
}

module.exports = sysinfo;
