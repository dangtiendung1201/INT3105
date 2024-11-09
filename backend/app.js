import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import db from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import containerRoutes from './routes/containerRoutes.js';
import serverRoutes from './routes/serverRoutes.js';
import readline from 'readline';

const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT = 3000;

// Connect to database
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Middleware
app.use(json());

// Routes
app.use('/api', apiRoutes);
app.use('/container', containerRoutes);
app.use('/server', serverRoutes);

let interval = 1000;
// // Input interval time from user and set the value to the interval variable
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('Enter interval time in milliseconds: ', (time) => {
//   interval = time;
//   rl.close();
// });

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  // socket.on('startServerCheck', async ({ interval }) => {
  //   setInterval(async () => {
  //     const result = await healthChecks.checkServerHealth();
  //     io.emit('serverHealthUpdate', result);
  //     await ServerHealth.create(result);
  //   }, interval);
  // });
  // After the interval time, send a message to the client
  setInterval(() => {
    socket.emit('checkServer', 'Checking server health...');
  }
  , interval);
  socket.on('disconnect', () => console.log('Client disconnected'));
});



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
