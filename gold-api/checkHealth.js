import axios from 'axios';

const pushGatewayUrl = 'http://localhost:9091/metrics/job/api_health_check';

async function checkHealth(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            return "UP";
        } else {
            return "DOWN";
        }
    } catch (error) {
        return "DOWN";
    }
}

// Sử dụng hàm
checkHealth("https://musical-winner-j6vp47rwjvj2j6j-5000.app.github.dev/api/gold").then(status => {
    console.log(`API is ${status}`);
});