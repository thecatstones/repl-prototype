// const Repl = require('../Repl.js');
const Shell = require('shelljs');
const readline = require('readline');

// const repl = Shell.exec('irb', {async: true, shell: '/bin/bash'}, (code, stdout, stderr) => {
//   console.log(code, stdout, stderr);
// });

// repl.stdin.write('puts "hi"\n');
// repl.stdin.write('[1,2,3].map(&:to_s)\n');
// repl.stdin.end();

// Node
const repl = Shell.exec('node', {shell: '/bin/bash'}, (code, stdout, stderr) => {
  // console.log(code, stdout, stderr);
});

repl.stdout.on('data', data => {
  console.log('DATA', data);
});

// repl.stdout.on('end', data => {
//   console.log('DATA', data);
// });

// repl.stdout.on('readable', () => {
//   console.log(repl.stdout.read());
//   let data;
//   while (null !== (data = repl.stdout.read())) {
//     console.log('DATA', data);
//   }
// });

// repl.stdin.cork();
console.log(repl.stdin.write('[1,2,3];\n', () => {
  console.log('FLUSHED!');
  // console.log(repl.stdout.read());
  // repl.stdin.pipe(repl.stdout);
  process.nextTick(() => repl.stdin.uncork());
  // repl.stdin.write('console.log("hello2");\n');

}));

repl.stdin.end();

// repl.stdin.on('finish', () => {
//   console.error('All writes are now complete.');
// });

// Repl.exec('ruby');

// Repl.stdoutOn('data', data => {
//   console.log('=> ' + data);
// });

// Repl.stdinWrite('puts "hi"\n');
// Repl.stdinWrite('puts "hello"\n');

// Repl.exec('javascript');

// Repl.stdoutOn('data', data => {
//   console.log('=> ' + data);
// });

// Repl.stdinWrite('console.log("hello");\n');
// Repl.stdinWrite('console.log([1,2,3]);\n');
// Repl.stdin().end();


// Repl.exec('python');

// Repl.stdoutOn('data', data => {
//   console.log('=> ' + data);
// });

// // Repl.stdin().cork();
// Repl.stdinWrite('print (2 + 3)\n');
// process.nextTick(() => { 
//   Repl.stdin().uncork();
//   Repl.stdin().uncork();
// });
// Repl.stdinWrite('[1] + [2]\n');