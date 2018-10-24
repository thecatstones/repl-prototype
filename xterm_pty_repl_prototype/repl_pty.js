var os = require('os');
var pty = require('node-pty');

const Repl = {
  new(lang) {
    return Object.create(this.init(lang));
  },

  init(lang) {
    this.process = pty.spawn(lang);
    return this;
  },

  on(event, callback) {
    this.process.on(event, callback);
  },

  async write(string) {
    return new Promise((resolve, reject) => {
      let result = '';

      this.process.write(string + "\n");

      this.process.on('data', data => result += data);
      setTimeout(() => resolve(result), 10); 
      // wait for output to buffer
    });
  }
};
// Initialize node-pty with an appropriate shell
// const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL'];
// const ptyProcess = pty.spawn(shell, [], {
//   name: 'xterm-color',
//   cols: 80,
//   rows: 30,
//   cwd: process.cwd(),
//   env: process.env
// });

// // Initialize xterm.js and attach it to the DOM
// const xterm = new Terminal();
// xterm.open(document.getElementById('xterm'));

// // Setup communication between xterm.js and node-pty
// xterm.on('data', (data) => {
//   ptyProcess.write(data);
// });
// ptyProcess.on('data', data => {
//   xterm.write(data);
// });

module.exports = Repl;