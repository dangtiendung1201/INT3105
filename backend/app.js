import express, { json } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import db from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';
import containerRoutes from './routes/containerRoutes.js';
import serverRoutes from './routes/serverRoutes.js';

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

// Socket.io setup
io.on('connection', (socket) => {
  console.log('New client connected');
  require('./utils/socketHandler')(socket, io);
  socket.on('disconnect', () => console.log('Client disconnected'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
