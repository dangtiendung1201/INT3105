import axios from 'axios';
// import os from 'os';

const url = 'https://musical-winner-j6vp47rwjvj2j6j-5000.app.github.dev/api/gold';

const urlHealthPromise = (url) => {
    return new Promise(async (resolveInner, rejectInner) => {
        try {
            const response = await axios.head(url);
            resolveInner(response);
        } catch (error) {
            rejectInner(error);
        }
    });
};

const getApplicationHealth = async (url) => {
    const startTime = Date.now(); // Lấy thời gian bắt đầu

    let response;
    try {
        // Đợi Promise hoàn thành và lấy kết quả
        response = await urlHealthPromise(url);
    } catch (error) {
        console.error('Error checking health:', error);
        return { error: 'Failed to check health' };
    }

    const endTime = Date.now(); // Lấy thời gian kết thúc
    const responseTime = (endTime - startTime) / 1000; // Tính response time (ms -> seconds)

    return {
        uptime: `${process.uptime().toFixed(2)} Seconds`,
        responseTime: `${responseTime.toFixed(2)} Seconds`,
        memoryUsage: {
            heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        },
        status: response ? response.status : 'Unknown',
    };
};

// Ví dụ sử dụng



setInterval(() => {
    getApplicationHealth(url)
    .then(healthData => console.log('Health Data:', healthData))
    .catch(error => console.error('Error:', error));
}, 10000);
