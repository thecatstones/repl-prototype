const shell = require('shelljs');

const child = shell.exec('irb', {async: true});

function stdinWrite(string) {
  child.stdin.write(string);
  return child;
}

stdinWrite('"----- Hello from IRB! -----"\n');

module.exports = stdinWrite;