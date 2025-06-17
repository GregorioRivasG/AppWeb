import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes';
import orderRouter from './routes/order.routes';
import productRouter from './routes/product.routes';
import connectDBMongo from './config/db';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);

connectDBMongo().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor funcionando en puerto: ${PORT}`);
    });
});