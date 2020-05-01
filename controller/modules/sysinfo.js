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

// promises style - new since version 3
// si.cpu()
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));

// si.currentLoad()
//   .then((data) => console.log(`load: ${data.currentload.toFixed(1)}%`))
//   .catch((error) => console.error(error));

// // si.fullLoad()
// //   .then((data) => console.log(data))
// //   .catch((error) => console.error(error));

// si.mem().then((data) => {
//   console.log(`mem free: ${((data.free / data.total) * 100).toFixed(1)}%`);
// });

// si.networkInterfaces()
//   .then((data) => {
//     console.log(`wlan0: ${data.find((n) => n.ifaceName === "wlan0").ip4}`);
//   })
//   .catch((error) => console.error(error));

// si.fsSize()
//   .then((data) => {
//     console.log(
//       `disk free: ${100 - (data.find((d) => d.fs === "/dev/root").use.toFixed(1))}%`
//     );
//   })
//   .catch((error) => console.error(error));

// si.networkStats('wlan0')
//   .then((data) => {
//       console.log(`rx/tx: ${(data.find(n => n.iface === 'wlan0').rx_bytes / 1024).toFixed(1)}/${(data.find(n => n.iface === 'wlan0').tx_bytes / 1024).toFixed(1)} mb`)
//   })
//   .catch((error) => console.error(error));

// si.disksIO()
//   .then((data) => console.log(`total I/O: ${data.tIO} bytes`))
//   .catch((error) => console.error(error));

// // si.wifiNetworks()
// //   .then((data) => console.log(data))
// //   .catch((error) => console.error(error));