import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import Traffic from './models/Traffic.js';

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

const TRAFFIC_NAMES = process.env.TRAFFIC_NAME.split(',');
const TRAFFIC_ENDPOINTS = process.env.TRAFFIC_ENDPOINT.split(',');
const TRAFFIC_NAMETAG = TRAFFIC_NAMES.map((name, index) => name + ':' + TRAFFIC_ENDPOINTS[index]);

console.log('PORT:', PORT);
console.log('TRAFFIC_NAMETAG:', TRAFFIC_NAMETAG);

// Middleware
app.use(json());

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen on the 'traffic' event named in TRAFFIC_NAMETAG
  TRAFFIC_NAMETAG.forEach((nameTag) => {
    socket.on(nameTag, (msg) => {
      // Print all contents of the message
      console.log(msg);

      // Write data to InfluxDB concurrently
      Traffic.writeData(msg.nameTag, 1).catch((err) => {
        console.error(`Error writing data for ${nameTag}:`, err);
      });
    });
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
