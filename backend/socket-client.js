import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconnected from server');
});

socket.on('message', (msg) => {
    console.log('message from server: ' + msg);
});

// Example of sending a message to the server
socket.emit('message', 'Hello, server!');