import express, { json } from 'express';
import { checkApi } from './controllers/apiController.js';

const app = express();

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3001;

const interval = process.env.INTERVAL || 5000;
const timeout = process.env.TIMEOUT || 5000;

const API_NAMES = process.env.API_NAME.split(',');
const API_URLS = process.env.API_URL.split(',');

console.log('PORT:', PORT);

console.log('Interval:', interval);
console.log('Timeout:', timeout);

console.log('API_NAME:', API_NAMES);
console.log('API_URL:', API_URLS);

// Middleware
app.use(json());

// Call the checkApi function every interval
setInterval(() => {
    // checkApi({ body: { url: API_URL } });
    API_NAMES.forEach((name, index) => {
        checkApi({ body: { url: API_URLS[index] } });
    });
}, interval);

app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});