import express from 'express';
import { createServer } from 'http';
import { Server as socketIo } from 'socket.io';
import readline from 'readline';

const app = express();
const server = createServer(app);
const io = new socketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    io.emit('message', input);
});