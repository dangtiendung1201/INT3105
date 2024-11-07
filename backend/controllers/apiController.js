import { create } from '../models/ApiHealth.js';
import axios from 'axios';

export async function checkApi(req, res) {
  const { url, interval } = req.body;
  try {
    const start = Date.now();
    await axios.get(url);
    const responseTime = Date.now() - start;
    await create({ apiUrl: url, responseTime, status: 'UP' });
    res.json({ responseTime, status: 'UP' });
  } catch (error) {
    res.json({ status: 'DOWN' });
  }
}
