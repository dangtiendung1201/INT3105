import ServerHealth from '../models/ServerHealth.js';
import { loadavg, totalmem, freemem } from 'os';
import diskusage from 'diskusage';
import systeminformation from 'systeminformation';
import path from 'path';

export async function checkServer(req, res) {
  // Get CPU usage (1 minute load average)
  const cpuUsage = loadavg()[0];

  // Get Memory usage
  const memoryUsage = (totalmem() - freemem()) / totalmem();

  // Get Disk usage (on the system's root directory, or specify any other directory)
  const diskInfo = diskusage.checkSync(path.parse(process.cwd()).root);  // e.g., on Linux `/`, or on Windows `C:\\`
  const romUsage = (diskInfo.total - diskInfo.free) / diskInfo.total;

  // Fetch network stats (sent and received bytes)
  const networkStats = await systeminformation.networkStats();

  // For simplicity, assuming you have a single network interface
  const netStats = networkStats[0];  // The first network interface, you can adjust this if needed

  // Calculate bandwidth usage (in bytes)
  const bytesSent = netStats.tx_bytes;
  const bytesReceived = netStats.rx_bytes;

  const bandwidth = bytesSent + bytesReceived;

  // Save server health data into database
  await ServerHealth.create({ cpuUsage, memoryUsage, romUsage, bandwidth });

  // Send response with CPU, memory, and disk usage
  res.json({ cpuUsage, memoryUsage, romUsage, bandwidth });
  console.log({ cpuUsage, memoryUsage, romUsage, bandwidth });
}
