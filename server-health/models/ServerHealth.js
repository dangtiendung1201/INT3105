import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const SERVER_NAME = process.env.SERVER_NAME || 'server0';

class ServerHealth {
  static async writeData(cpuUsage, memoryUsage, romUsage, bandwidth) {
    const measurement = 'server_health';
    const tags = { host: SERVER_NAME };
    const fields = { cpuUsage, memoryUsage, romUsage, bandwidth };
    await db.sendToInfluxDB(measurement, tags, fields);
  }
}

export default ServerHealth;
