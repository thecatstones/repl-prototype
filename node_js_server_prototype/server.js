const express = require('express');
const bodyParser = require('body-parser');
const Repl = require('./Repl.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/repl', (req, res) => {
  const { command, language } = req.body;
  let concatResult;

  if (Repl.hasNoExistingProcess(language)) Repl.exec(language);
  const repl = Repl.getProcess();

  const writeToRepl = new Promise((resolve, reject) => {
    let result = '';
    const outputBuffer = Repl.isNewProcess() ? 180 : 10;

    repl.stdin.write(command + "\n");

    concatResult = (data) => {
      result += data;
      console.log('DATA RECEIVED:' + data);
    }
    repl.stdout.on('data', concatResult);

    setTimeout(() => resolve(result), outputBuffer); // capture all outputs to stdout by setting a delay
  });

  writeToRepl.then(data => {
    repl.stdout.removeListener('data', concatResult);
    res.json(data);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
})