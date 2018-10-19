const express = require('express');
const bodyParser = require('body-parser');
const stdinWrite = require('./shell.js');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/repl', (req, res) => {
  const command = req.body.command;
  const child = stdinWrite(command + "\n");

  // child.stdout.on('data', data => {
  //   console.log("DATA", data);
  //   res.write(data);
  // });
  
  // child.stdout.pipe(res);
  // res.end();

  const writtenPromise = new Promise((resolve, reject) => {
    child.stdout.on('data', data => {
      console.log("DATA", data);
      resolve(data);
    });
  });

  writtenPromise.then(result => {
    child.stdout.pipe(res);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
})