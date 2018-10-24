const child_pty = require('child_pty');

// var child = child_pty.spawn('node');

// child.stdout.on('resize', function() {
//   console.log('New columns: ' + this.columns);
//   console.log('New rows:    ' + this.rows);
// }).pipe(process.stdout);

// child.stdin.write('console.log(1 + 2);\n');
// child.stdin.write('console.log([1,2,3]);\n');

var child = child_pty.spawn('irb');
child.stdout.resize({ columns: 80, rows: 30 });

child.stdout.on('data', data => {
  console.log(data.toString());
});
child.stdin.write('puts 1 + 2\n');
child.stdin.write('\x03');
// child.stdin.write('[1,2,3].map(&:to_s)\n');