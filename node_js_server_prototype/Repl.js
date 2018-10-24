const shell = require('shelljs');

const Repl = (function() {
  let process = null;
  let runningLanguage = null;
  let newProcess = true;

  return {
    REPLS: {
      ruby: 'irb',
      javascript: 'node',
      python: 'python',
    },

    exec(language) {
      if (process !== null) process.kill();
      process = shell.exec('stdbuf -i0 -oL -eL ' + this.REPLS[language], {async: true, shell: '/bin/bash'});
      runningLanguage = language;
      newProcess = true;
      return process;
    },

    stdin() {
      return process.stdin;
    },

    stdinWrite(string) {
      process.stdin.write(string);
    },

    stdoutOn(event, callback) {
      process.stdout.on(event, callback);
    },

    getProcess() {
      return process;
    },

    runningLanguage() {
      return runningLanguage;
    },

    hasNoExistingProcess(language) {
      return process === null || language !== runningLanguage;
    },

    isNewProcess() {
      const isNew = newProcess;
      newProcess = false;
      return isNew;
    },
  }
})();

module.exports = Repl;