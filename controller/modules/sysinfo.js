const si = require("systeminformation");

const sysinfo = {
  async get() {
    return new Promise(async (resolve, reject) => {
      const load = await si.currentLoad();
      const network = await si.networkInterfaces();
      const mem = await si.mem();
      const disk = await si.fsSize();
      const procs = await si.processes();

      resolve({
        ip: `${network.find((n) => n.ifaceName === "wlan0").ip4}`,
        cpu: `${load.currentload.toFixed(1)}%`,
        mem: `${(100 - ((mem.free / mem.total) * 100)).toFixed(1)}%`,
        disk: `${100 - (disk.find((d) => d.fs === "/dev/root").use.toFixed(1))}%`,
        procs: `${procs.all}`
      })
    });
  }
}

module.exports = sysinfo;
