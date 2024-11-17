import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import ServerHealth from './models/ServerHealth.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const interval = process.env.INTERVAL || 5000;
const SERVER_NAME = process.env.SERVER_NAME || 'server0';

console.log('PORT:', PORT);
console.log('Interval:', interval);
console.log('SERVER_NAME:', SERVER_NAME);

// Middleware
app.use(json());

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  setInterval(() => {
    socket.emit('checkServer', 'Checking server health...');
  }
    , interval);
  socket.on('serverHealth', async (msg) => {
    console.log('message from client: ' + msg);

    // Print all contents of the message
    console.log(msg);

    // Print specific contents of the message
    console.log('CPU Usage:', msg.cpuUsage);
    console.log('Memory Usage:', msg.memoryUsage);
    console.log('ROM Usage:', msg.romUsage);
    console.log('Bandwidth:', msg.bandwidth);

    // Write data to InfluxDB
    await ServerHealth.writeData(msg.cpuUsage, msg.memoryUsage, msg.romUsage, msg.bandwidth);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
