import ServerHealth from '../models/ServerHealth.js';
import os, { loadavg, totalmem, freemem } from 'os';
import diskusage from 'diskusage';
import systeminformation from 'systeminformation';
import path from 'path';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export async function checkServer(res) {
  try {
    // Get CPU usage (1 minute load average) and convert to percentage
    const cpuUsage = (loadavg()[0] / os.cpus().length) * 100;

    // Get Memory usage and convert to GB
    const totalMemoryGB = totalmem() / (1024 ** 3);
    const freeMemoryGB = freemem() / (1024 ** 3);
    const memoryUsage = totalMemoryGB - freeMemoryGB;

    // Get Disk usage (on the system's root directory, or specify any other directory) and convert to GB
    const diskInfo = diskusage.checkSync(path.parse(process.cwd()).root);
    const totalDiskGB = diskInfo.total / (1024 ** 3);
    const freeDiskGB = diskInfo.free / (1024 ** 3);
    const romUsage = totalDiskGB - freeDiskGB;

    // Fetch network stats (sent and received bytes) and convert to GB
    const networkStats = await systeminformation.networkStats();

    // For simplicity, assuming you have a single network interface
    const netStats = networkStats[0];  // The first network interface, you can adjust this if needed

    // Calculate bandwidth usage (in bytes) and convert to GB
    const bytesSentGB = netStats.tx_bytes / (1024 ** 3);
    const bytesReceivedGB = netStats.rx_bytes / (1024 ** 3);
    const bandwidth = bytesSentGB + bytesReceivedGB;

    // Send response with CPU, memory, and disk usage
    res.json({ cpuUsage, memoryUsage, romUsage, bandwidth });
    console.log({ cpuUsage, memoryUsage, romUsage, bandwidth });
    return { cpuUsage, memoryUsage, romUsage, bandwidth };
  } catch (error) {
    console.error('Error checking server health:', error);
    res.status(500).json({ error: 'Failed to check server health' });
  }
}

socket.on('connect', () => {
  console.log('Server connected');
});

socket.on('disconnect', () => {
  console.log('Server disconnected');
});

socket.on('checkServer', async (msg) => {
  console.log('message from server: ' + msg);
  const result = await checkServer({ json: () => {}, status: () => ({ json: () => {} }) });
  // console.log(result);
  // await ServerHealth.writeData(result.cpuUsage, result.memoryUsage, result.romUsage, result.bandwidth);
});