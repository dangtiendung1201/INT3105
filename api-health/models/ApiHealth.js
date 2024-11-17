import db from '../config/db.js';

class ApiHealth {
    static async writeData(apiUrl, responseTime, status) {
        console.log("apiUrl:", apiUrl);
        console.log("responseTime:", responseTime);
        console.log("status:", status);
        const measurement = 'api_health';
        const tags = { host: 'api1' };
        const fields = { apiUrl, responseTime, status };
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