import express, { json } from 'express';
import ServerHealth from './models/ApiHealth.js';
import { checkApi } from './controllers/apiController.js';

const app = express();

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3001;

const interval = process.env.INTERVAL || 5000;
const timeout = process.env.TIMEOUT || 5000;

const API_NAME = process.env.API_NAME || 'api0';
const API_URL = process.env.API_URL || 'https://dantri.com.vn';

console.log('PORT:', PORT);

console.log('Interval:', interval);
console.log('Timeout:', timeout);

console.log('API_NAME:', API_NAME);
console.log('API_URL:', API_URL);

// Middleware
app.use(json());

// Call the checkApi function every interval
setInterval(() => {
    checkApi({ body: { url: API_URL } });
}, interval);

app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});
