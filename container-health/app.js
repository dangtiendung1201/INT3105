import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import ContainerHealth from './models/ContainerHealth.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3002;

const interval = process.env.INTERVAL || 5000;
const CONTAINER_ID = process.env.CONTAINER_ID || 'container0';

console.log('PORT:', PORT);
console.log('Interval:', interval);
console.log('CONTAINER_ID:', CONTAINER_ID);

// Middleware
app.use(json());

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  setInterval(() => {
    socket.emit('checkContainer', CONTAINER_ID);
  }
    , interval);
  socket.on('containerHealth', async (msg) => {
    // Print all contents of the message
    console.log(msg);

    // Write data to InfluxDB
    await ContainerHealth.writeData(msg.cpuUsage, msg.memoryUsage, msg.netInput, msg.netOutput, msg.blockInput, msg.blockOutput, msg.healthStatus);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
