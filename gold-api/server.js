const express = require('express');
const axios = require('axios');
const prometheusApiMetrics = require('prometheus-api-metrics');

const app = express();

// Middleware cho Prometheus metrics
app.use(prometheusApiMetrics());

// API để trả về giá vàng
app.get('/api/gold', async (req, res) => {
    try {
      const response = await axios.get('http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v');
      const SJCdata = response.data.DataList.Data.find(item => item["@row"] === "7"); // Lấy dữ liệu vàng SJC từ API thực tế
      const goldPrice = SJCdata['@pb_7'] // Lấy giá mua vào
      res.json(goldPrice); // Trả về dữ liệu
    } catch (error) {
      console.error('Error fetching gold price:', error);
      res.status(500).json({ error: 'Unable to fetch gold price' });
    }
});

// Khởi động server
const port = 5000;
app.listen(port, () => {
  console.log(`Gold API is running on port ${port}`);
});
