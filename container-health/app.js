
import { io } from 'socket.io-client';
import dotenv from 'dotenv';
import Docker from 'dockerode';
// import dockerstats from 'dockerstats';
const docker = new Docker();

dotenv.config();

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';
console.log('SOCKET_URL:', SOCKET_URL);
const socket = io(SOCKET_URL);

export async function checkContainer(containerID, res) {
  try {
    const container = docker.getContainer(containerID);

    const containerInfo = await container.inspect();
    const stats = await container.stats({ stream: false });

    // console.log('Container stats:', stats);
    // console.log('Block IO:', stats.blkio_stats);

    // Get CPU usage
    const cpuUsage = stats.cpu_stats.cpu_usage.total_usage / stats.cpu_stats.system_cpu_usage * 100;
    // Get Memory usage
    const memoryUsage = stats.memory_stats.usage / stats.memory_stats.limit * 100;
    // Get Network IO
    const netInput = stats.networks.eth0.rx_bytes;
    const netOutput = stats.networks.eth0.tx_bytes;
    // Get Block IO
    const blockInput = stats.blkio_stats.io_service_bytes_recursive[0].value;
    const blockOutput = stats.blkio_stats.io_service_bytes_recursive[1].value;
    // Get Health status
    const containerStatus = containerInfo.State.Status;
    const healthStatus = containerStatus === 'running' ? 1 : 0;

    // Send response with CPU, memory, and disk usage
    res.json({ cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus });
    console.log({ cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus });
    return { cpuUsage, memoryUsage, netInput, netOutput, blockInput, blockOutput, healthStatus };
  } catch (error) {
    console.error('Error checking container health:', error);
    res.status(500).json({ error: 'Failed to check container health' });
  }
}

socket.on('connect', () => {
  console.log('Server connected');
});

socket.on('disconnect', () => {
  console.log('Server disconnected');
});

socket.on('checkContainer', async (msg) => {
  console.log('message from server: ' + msg);
  const result = await checkContainer(msg, { json: () => {}, status: () => ({ json: () => {} }) });
  console.log(result);

  // Send message to socket server
  socket.emit('containerHealth', result);
});