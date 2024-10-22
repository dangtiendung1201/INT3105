const express = require('express');
const axios = require('axios');
const prometheusApiMetrics = require('prometheus-api-metrics');

const app = express();

// Middleware cho Prometheus metrics
app.use(prometheusApiMetrics());

// API để trả về giá vàng
app.get('/api/gold', async (req, res) => {
  // Giả lập giá vàng (có thể kết nối API thực tế nếu muốn)
  const goldPrice = { gold_price: 5600000 }; // Giá vàng giả lập
  res.json(goldPrice);
});

// Khởi động server
const port = 5000;
app.listen(port, () => {
  console.log(`Gold API is running on port ${port}`);
});
