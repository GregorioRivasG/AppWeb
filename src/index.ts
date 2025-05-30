import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes';

import connectDBMongo from './config/db';

const app = express();

// Asignar puerto
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/v1/auth', authRouter);

connectDBMongo().then(() => {

        // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`El servidor funciona en el puerto: ${PORT}`);
    });

});

