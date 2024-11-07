import create from '../models/ContainerHealth.js';
import Docker from 'dockerode';
const docker = new Docker();

export async function checkContainer(req, res) {
  const { containerName, interval } = req.body;
  try {
    const container = docker.getContainer(containerName);
    const stats = await container.stats({ stream: false });
    const cpuUsage = stats.cpu_stats.cpu_usage.total_usage;
    const memoryUsage = stats.memory_stats.usage;
    await create({ containerName, cpuUsage, memoryUsage });
    res.json({ cpuUsage, memoryUsage, status: 'UP' });
  } catch (error) {
    res.json({ status: 'DOWN' });
  }
}
