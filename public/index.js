const tmi = require('tmi.js');
const express = require('express');
const app = express();

// Configuração do bot
const opts = {
  identity: {
    username: 'RenanSilvestreB',  // Nome de usuário do bot
    password: 'w88qws6jp5x04mpb6hywif337i1g52'  // Token OAuth do bot
  },
  channels: [
    'vladdraco01',  // Canal 1
    'manothrp',     // Canal 2
    'hotzgod'       // Canal 3
  ]
};

// Criação do cliente (bot)
const client = new tmi.Client(opts);

// Evento que ocorre quando o bot se conecta ao chat
client.on('connected', (address, port) => {
  console.log(`Bot conectado em ${address}:${port}`);
});

// Evento que ocorre quando uma nova mensagem chega no chat
client.on('message', (channel, tags, message, self) => {
  if(self) return;  // Ignora mensagens enviadas pelo próprio bot

  console.log(`${tags['display-name']}: ${message}`);

  // Verifica se a mensagem contém a frase sobre sorteio 1k
  if(message.includes('Um sorteio 1k GP foi iniciado para Viewer.')) {
    client.say(channel, '!sorteio');
  }

  if(message.includes('Um sorteio 1k GP foi iniciado para Viewer. Use !sorteio para participar do sorteio.')) {
    client.say(channel, '!sorteio');
  }

  if(message.includes('Um sorteio SORTEIO 2K GP POR HORA ! está sendo realizado para Viewer usar !sorteio para participar.')) {
    client.say(channel, '!sorteio');
  }

  if(message.includes('@RenanSilvestreB ganhou um SORTEIO 2K GP POR HORA !!')) {
    client.say(channel, 'Boaa');
  }
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
