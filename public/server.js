const express = require('express');
const app = express();

// Rota simples para manter o servidor vivo
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Rodando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
