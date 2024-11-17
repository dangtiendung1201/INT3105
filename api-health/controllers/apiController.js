import ApiHealth from '../models/ApiHealth.js';
import axios from 'axios';

export async function checkApi(req, res) {
    const { url, interval } = req.body;
    const timeout = 5000;
    try {
        const start = Date.now();
        await axios.head(url, {
            timeout: timeout,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
        });
        const responseTime = Date.now() - start;
        // await ApiHealth.writeData( url, responseTime, 1 );
        res.json({ responseTime, status: 'UP' });
    } catch (error) {
        // await ApiHealth.writeData( url, timeout, 0 );

        console.log(error);

        res.json({ status: 'DOWN' });
    }
}