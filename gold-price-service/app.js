import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/gold-price', (req, res) => {
    res.json({ goldPrice: 1800 });
});

app.listen(PORT, () => {
    console.log(`Gold Price API is running on port ${PORT}`);
});
