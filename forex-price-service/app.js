import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { io } from 'socket.io-client';
 
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const NAMETAG = process.env.NAMETAG || 'Forex Price API';
console.log('PORT:', PORT);

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3000';
console.log('SOCKET_URL:', SOCKET_URL);
const socket = io(SOCKET_URL);

var trafficCounter = 0;

app.use(morgan('combined'), (req, res, next) => {
    trafficCounter++;
    socket.emit(NAMETAG, trafficCounter);
    console.log(1);
    next();
});

app.get('/forex-price', (req, res) => {
    res.json({ forexPrice: 1.1 });
});

app.listen(PORT, () => {
    console.log(`Forex Price API is running on port ${PORT}`);
});

async function checkTraffic() {
    return { trafficCounter };    
}

socket.on('connect', () => {
    console.log('Server connected');
  });
  
  socket.on('disconnect', () => {
    console.log('Server disconnected');
  });
