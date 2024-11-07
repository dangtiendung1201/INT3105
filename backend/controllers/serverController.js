import create from '../models/ServerHealth.js';
import { loadavg, totalmem, freemem } from 'os';

export async function checkServer(req, res) {
  const cpuUsage = loadavg()[0];
  const memoryUsage = (totalmem() - freemem()) / totalmem();
  await create({ cpuUsage, memoryUsage });
  res.json({ cpuUsage, memoryUsage });
}
