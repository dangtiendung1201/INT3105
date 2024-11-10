const express = require('express');
const axios = require('axios');
const prometheusApiMetrics = require('prometheus-api-metrics');

const app = express();

app.use(prometheusApiMetrics());

// API để trả về giá ngoại tệ
app.get('/api/forex', async (req, res) => {
  // Giả lập giá ngoại tệ (có thể kết nối API thực tế)
  const forexRates = {
    USD: 24000,
    EUR: 26000,
    JPY: 180
  };
  res.json(forexRates);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Forex API is running on port ${port}`);
});
