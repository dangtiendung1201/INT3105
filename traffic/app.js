import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
// import Traffic from './models/Traffic.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3004;

const interval = process.env.INTERVAL || 5000;

const TRAFFIC_NAMES = process.env.TRAFFIC_NAME.split(',');
const TRAFFIC_ENDPOINTS = process.env.TRAFFIC_ENDPOINT.split(',');
const TRAFFIC_NAMETAG = TRAFFIC_NAMES.map((name, index) => name + ':' + TRAFFIC_ENDPOINTS[index]);

console.log('PORT:', PORT);
console.log('Interval:', interval);
console.log('TRAFFIC_NAMETAG:', TRAFFIC_NAMETAG);

// Middleware
app.use(json());

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  setInterval(() => {
    for (let i = 0; i < TRAFFIC_NAMETAG.length; i++) {
      socket.emit('checkTraffic', TRAFFIC_NAMETAG[i]);
    }
  }
    , interval);
  socket.on('receiveCounter', async (msg) => {
    // Print all contents of the message
    console.log(msg);

    // Write data to InfluxDB
    await Traffic.writeData(msg.nameTag, msg.counter);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
