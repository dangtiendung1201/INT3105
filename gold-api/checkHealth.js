import axios from 'axios';

const pushGatewayUrl = 'http://localhost:9091/metrics/job/api_health_check';

async function checkHealth(apiUrl) {
    try {
        //Ping đến API và lưu lại 2 trường status và timestamp
        const response = await axios.head(apiUrl);
        const healthStatus = {
            status: response.status === 200 ? 1 : 0
        };

        const metrics = `api_status{url="${apiUrl}"} ${healthStatus.status}`;
        console.log(metrics)
        
        // Gửi trực tiếp metrics tới Pushgateway
        await axios.post(pushGatewayUrl, metrics, {
            headers: {
                'Content-Type': 'application/vnd.google.protobuf; proto=io.prometheus.client.MetricFamily; encoding=delimited' // Chỉnh đúng loại Content-Type cho Prometheus
            }
        });

        console.log(`Metrics pushed successfully: ${metrics}`);
    } catch (error) {
        console.error(`Error fetching API health: ${error}`);
    }
}

// Kiểm tra API mỗi 10 giây
setInterval(() => checkHealth('https://www.facebook.com/'), 1000);