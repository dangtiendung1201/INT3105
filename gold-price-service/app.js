import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { io } from 'socket.io-client';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/gold-price', (req, res) => {
    res.json({ goldPrice: 1800 });
});

app.listen(PORT, () => {
    console.log(`Gold Price API is running on port ${PORT}`);
});
dotenv.config();

const NAMETAG = process.env.NAMETAG || 'Gold Price API';
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL);

app.use(morgan('combined'), (req, res, next) => {
    socket.emit(NAMETAG, '1');
    next();
});

socket.on('connect', () => {
    console.log('Server connected');
});

socket.on('disconnect', () => {
    console.log('Server disconnected');
});