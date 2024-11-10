import db from '../config/db.js';

class ServerHealth {
  static async writeData(cpuUsage, memoryUsage, romUsage, bandwidth) {
    const measurement = 'server_health';
    const tags = { host: 'server1' };
    const fields = { cpuUsage, memoryUsage, romUsage, bandwidth };
    console.log('hihi');
    await db.sendToInfluxDB(measurement, tags, fields);
  }
}

export default ServerHealth;
