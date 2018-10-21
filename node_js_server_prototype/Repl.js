const shell = require('shelljs');

const Repl = (function() {
  let process = null;
  let runningLanguage = null;
  let newProcess = true;

  return {
    REPLS: {
      ruby: 'irb',
      js: 'node',
    },

    exec(language) {
      if (process !== null) process.kill();
      process = shell.exec(this.REPLS[language], {async: true});
      runningLanguage = language;
      newProcess = true;
      return process;
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