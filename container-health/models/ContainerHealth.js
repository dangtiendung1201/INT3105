import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const CONTAINER_NAME = process.env.CONTAINER_NAME || 'container0';

class ContainerHealth {
  static async writeData(cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus) {
    const measurement = 'container_health';
    const tags = { host: CONTAINER_NAME };
    const fields = { cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus };
    await db.sendToInfluxDB(measurement, tags, fields);
  }
}

export default ContainerHealth;
