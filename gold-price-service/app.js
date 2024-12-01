import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { io } from 'socket.io-client';
import pidusage from 'pidusage';
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NAMETAG = process.env.NAMETAG || 'Gold Price API';
console.log('PORT:', PORT);

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';
console.log('SOCKET_URL:', SOCKET_URL);
const socket = io(SOCKET_URL);

var trafficCounter = 0;

app.use(morgan('combined'));

// Middleware đo lường tài nguyên
app.use((req, res, next) => {
    pidusage(process.pid, (err, stats) => {
        if (err) {
            console.error("Error getting stats:", err);
            return;
        }

        const cpuUsage = stats.cpu;
        const memoryUsage = (stats.memory / 1024 / 1024).toFixed(2); // MB

        // In thông số hệ thống vào console
        console.log(`CPU Usage: ${cpuUsage}%`);
        console.log(`Memory Usage: ${memoryUsage} MB`);

        // Increment traffic counter and emit event
        trafficCounter++;

        socket.emit(NAMETAG, { trafficCounter, cpuUsage, memoryUsage });

        // Gọi next() sau khi đo lường xong
        next();
    });
});

app.get('/gold-price', (req, res) => {
    res.json({ goldPrice: 1.1 });
});

app.listen(PORT, () => {
    console.log(`Gold Price API is running on port ${PORT}`);
});

socket.on('connect', () => {
    console.log('Server connected');
});

socket.on('disconnect', () => {
    console.log('Server disconnected');
});
