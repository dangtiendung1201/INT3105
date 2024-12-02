import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

class ContainerHealth {
  static async writeData(id, cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus) {
    const measurement = 'container_health';
    const tags = { host: id };
    const fields = { cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus };
    await db.sendToInfluxDB(measurement, tags, fields);
  }
}

export default ContainerHealth;
