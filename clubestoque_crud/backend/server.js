require('dotenv').config();
const express = require('express');
const cors = require('cors');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categorias', categoriaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
