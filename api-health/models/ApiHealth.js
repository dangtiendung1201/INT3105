import db from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const API_NAME = process.env.API_NAME || 'api0';
const API_URL = process.env.API_URL || 'https://dantri.com.vn';

const API_NAMETAG = API_NAME + ":" + API_URL;

class ApiHealth {
    static async writeData(apiUrl, responseTime, status) {
        console.log("apiUrl:", apiUrl);
        console.log("responseTime:", responseTime);
        console.log("status:", status);
        const measurement = 'api_health';
        const tags = { host: API_NAMETAG };
        const fields = { responseTime, status };
        try {
            console.log('Ghi dữ liệu vào InfluxDB...');
            await db.sendToInfluxDB(measurement, tags, fields);
            console.log('Thành công.');
        } catch (error) {
            console.error('Lỗi khi ghi dữ liệu:', error);
        }
    }
}

export default ApiHealth;