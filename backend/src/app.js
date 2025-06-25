require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => { 
        const duration = Date.now() - start;
        console.log(`[HTTP Request] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms - IP: ${req.ip}`);
    });
    next();
});

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'API ProcuraPet - Backend Ativo!' });
});

app.use('/api/usuarios', userRoutes);

app.use((req, res, next) => {
    console.warn(`[404 Not Found] Rota não encontrada: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: 'Recurso não encontrado.' });
});

app.use((err, req, res, next) => {
    console.error(`[500 Server Error] Erro não tratado: ${err.message}`, { 
        stack: err.stack, 
        url: req.originalUrl,
        method: req.method
    });
    res.status(err.status || 500).json({ 
        message: err.customMessage || 'Ocorreu um erro inesperado no servidor.'
    });
});

module.exports = app;