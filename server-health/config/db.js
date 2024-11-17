import axios from 'axios';
import { Agent } from 'http';
import dotenv from 'dotenv';

dotenv.config();

const GRAFANA_INFLUXDB_URL_WRITE = process.env.GRAFANA_INFLUXDB_URL_WRITE;
const GRAFANA_USERNAME = process.env.GRAFANA_USERNAME;
const GRAFANA_API_TOKEN = process.env.GRAFANA_API_TOKEN;

console.log(GRAFANA_INFLUXDB_URL_WRITE, GRAFANA_USERNAME, GRAFANA_API_TOKEN);

const axiosInstance = axios.create({
    baseURL: GRAFANA_INFLUXDB_URL_WRITE,
    method: 'post',
    auth: {
        username: GRAFANA_USERNAME,
        password: GRAFANA_API_TOKEN,
    },
    headers: {
        Authorization: `Bearer ${GRAFANA_USERNAME}:${GRAFANA_API_TOKEN}`,
        'Content-Type': 'text/plain',
    },
    httpAgent: new Agent({ keepAlive: true }),
});

async function sendToInfluxDB(measurement, tags, fields) {
    const tagsString = Object.entries(tags).map(([key, value]) => `${key}=${value}`).join(',');
    const fieldsString = Object.entries(fields).map(([key, value]) => `${key}=${value}`).join(',');
    const body = `${measurement},${tagsString} ${fieldsString}`;
    // const body = 'test,bar_label=abc,source=grafana_cloud_docs metric=69';
    // const body = 'server_health,bar_label=abc,source=grafana_cloud_docs test1=35.2,test2=35.2,test3=35.2,test4=35.2';

    try {
        const response = await axiosInstance({
            method: 'post',
            data: body
        });

        // Print the response
        console.log(response.data);
        console.log('Metric sent to InfluxDB:', body);
    } catch (error) {
        console.error('Error posting data:', error);
    }
}

export default { sendToInfluxDB };