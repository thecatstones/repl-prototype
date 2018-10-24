const Repl = require('./Repl.js');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './websocket.html'));
});

app.get('/websocket_ui_jquery.js', (req, res) => {
  res.sendFile(path.join(__dirname, './websocket_ui_jquery.js'))
});

const server = http.Server(app);
server.listen(3000);

const io = socketIo(server);

io.on('connection', socket => {
  socket.on('execRepl', ({ language }) => {
    console.log(language);
    Repl.exec(language);

    Repl.stdoutOn('data', data => {
      io.emit('output', { output: data });
    });
  });

  socket.on('execute', ({ command, language, ctrlC }) => {
    if (Repl.hasNoExistingProcess(language)) Repl.exec(language);

    if (ctrlC) {
      Repl.getProcess().kill('SIGINT');
      return;
    }
    Repl.stdinWrite(command + "\r\n");
  });
});

