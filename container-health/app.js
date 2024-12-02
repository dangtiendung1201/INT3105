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
const CONTAINER_IDS = process.env.CONTAINER_ID.split(',');
const SECRET_KEY = process.env.SECRET_KEY || 'secret';

console.log('PORT:', PORT);
console.log('Interval:', interval);
console.log('CONTAINER_ID:', CONTAINER_IDS);

// Middleware
app.use(json());

// Socket.io setup
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('Token:', token);
  if (token === SECRET_KEY) {
    return next();
  }
  return next(new Error('Authentication error'));
});

io.on('connection', (socket) => {
  console.log('New client connected');
  CONTAINER_IDS.forEach((id) => {
    setInterval(() => {
      socket.emit('checkContainer', id);
    }, interval);
  });
  CONTAINER_IDS.forEach((id) => {
    socket.on(id, (msg) => {
      // Print all contents of the message
      console.log(msg);
      console.log(id);

      // Write data to InfluxDB concurrently
      ContainerHealth.writeData(id, msg.cpuUsage, msg.memoryUsage, msg.netInput, msg.netOutput, msg.blockInput, msg.blockOutput, msg.healthStatus).catch((err) => {
        console.error(`Error writing data for ${id}:`, err);
      });
    });
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
