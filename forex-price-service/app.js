import express from 'express';
const app = express();
const PORT = process.env.PORT || 3002;

app.get('/forex-price', (req, res) => {
    res.json({ forexPrice: 1.1 });
});

app.listen(PORT, () => {
    console.log(`Forex Price API is running on port ${PORT}`);
});
