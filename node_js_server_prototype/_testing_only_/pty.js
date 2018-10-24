const os = require('os');
const pty = require('node-pty');
const REPL = 'irb';

const repl = pty.spawn(REPL, [], {
  name: REPL,
  cols: 80,
  rows: 1,
  cwd: process.env.HOME,
  env: process.env  
});

repl.on('data', data => {
  console.log(data);
});

repl.write('[1,2,3]');
repl.write('[1,2,3]');
// repl.write('\x03');
// repl.write('\x03');
// console.log(repl);
// repl.write('console.log(1)\n');
// repl.write('[1,2,3].map(x => x * 2);\n');
// repl.write('console.log("hello world!")\n');
