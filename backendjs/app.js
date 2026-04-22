require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const app      = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/pacientes', require('./src/routes/pacientes'));

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno dodo servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));