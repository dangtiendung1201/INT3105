import ApiHealth from '../models/ApiHealth.js';
import axios from 'axios';

const acceptedStatusCodes = process.env.ACCEPTED_STATUS_CODES ? process.env.ACCEPTED_STATUS_CODES.split(',').map(Number) : [200];

export async function checkApi(req, res) {
    const { url } = req.body;
    const timeout = 5000;
    try {
        const start = Date.now();
        const response = await axios.head(url, {
            timeout: timeout,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
        });
        const responseTime = Date.now() - start;
        console.log(responseTime);
        if (acceptedStatusCodes.includes(response.status)) {
            console.log("OK");
            try {
                await ApiHealth.writeData(url, responseTime, 1);
            }
            catch (error) {
                console.log('Error:', error);
            }
        }
    } catch (error) {
        console.log('Error:', error.response ? error.response.status : error.message);
        try {
            await ApiHealth.writeData(url, timeout, 0);
        }
        catch (error) {
            console.log('Error:', error);
        }
    }
}
