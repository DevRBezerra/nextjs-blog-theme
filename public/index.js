const tmi = require('tmi.js');
const express = require('express');
const app = express();

// Configuração do bot
const opts = {
  identity: {
    username: 'RenanSilvestreB',  // Nome de usuário do bot
    password: 'qu16w4jigyastjjyo19jfswo7bmz6g'  // Token OAuth do bot
  },
  channels: [
    'vladdraco01',  // Canal 1
    'manothrp',     // Canal 2
    'hotzgod',
    'AntonioBubsy'// Canal 3
  ]
};

// Criação do cliente (bot)
const client = new tmi.Client(opts);

// Mensagens que o bot vai responder automaticamente
const sorteioMessages = [
  'Um sorteio 1k GP foi iniciado para Viewer.',
  'Um sorteio 1k GP foi iniciado para Viewer. Use !sorteio para participar do sorteio.',
  'Um sorteio SORTEIO 2K GP POR HORA ! está sendo realizado para Viewer usar !sorteio para participar.',
  'Um SORTEIO VALENDO 1000 GP foi iniciado para Viewer. Digite !sorteio para entrar no sorteio!!!',
  'Streamlabs: Um SORTEIO VALENDO 1000 GP está rolando para Viewer digite !sorteio para entrar.',
  'Streamlabs: - Um SORTEIO VALENDO 1000 GP foi iniciado para Viewer. Digite !sorteio para entrar no sorteio!!!',
  'Streamlabs: < Um sorteio Sorteio de 1k de GP foi iniciado para Viewer. Use !sorteio para participar do sorteio.',
  'Um sorteio Sorteio de 1k de GP foi iniciado para Viewer. Use !sorteio para participar do sorteio.'// Nova variação
];

// Mensagens que indicam que o bot ganhou o sorteio
const wonMessages = [
  '@RenanSilvestreB ganhou um SORTEIO 2K GP POR HORA !!',
  '@RenanSilvestreB Ganhou o SORTEIO VALENDO 1000 GP!',
  '@RenanSilvestreB ganhou um Sorteio de 1k de GP!'
];

// Evento que ocorre quando o bot se conecta ao chat
client.on('connected', (address, port) => {
  console.log(`Bot conectado em ${address}:${port}`);
});

// Função para verificar se a mensagem contém as palavras-chave e responder
const handleMessage = (channel, message) => {
  const messageLower = message.toLowerCase();

  // Verifica se a mensagem é sobre sorteios
  if (sorteioMessages.some(msg => messageLower.includes(msg.toLowerCase()))) {
    client.say(channel, '!sorteio');
  }

  // Verifica se a mensagem indica que o bot ganhou
  if (wonMessages.some(msg => messageLower.includes(msg.toLowerCase()))) {
    client.say(channel, 'Boaa');
  }
};

// Evento que ocorre quando uma nova mensagem chega no chat
client.on('message', (channel, tags, message, self) => {
  if (self) return;  // Ignora mensagens enviadas pelo próprio bot

  console.log(`${tags['display-name']}: ${message}`);
  handleMessage(channel, message);
});

// Conectar o bot à Twitch
client.connect();

// Servidor Express para manter o bot ativo
app.get('/', (req, res) => {
  res.send('Bot is running!');
});

// Rodando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
