const express = require('express');
const bodyParser = require('body-parser');
const { stdinWrite, getChildProcess } = require('./shell.js');
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/repl', (req, res) => {
  let concatResult;
  let command = req.body.command;
  command = command + "\n";
  const child = getChildProcess();

  const writeToChild = new Promise((resolve, reject) => {
    stdinWrite(command);
    let result = '';
    concatResult = (data) => result += data;
    child.stdout.on('data', concatResult);
    setTimeout(() => resolve(result), 3)
  });

  writeToChild.then(data => {
    child.stdout.removeListener('data', concatResult);
    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
})