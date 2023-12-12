import express from 'express';
import productsRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

const PORT = 8080;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('<h1>Product Manager</h1>')
})

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})