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
      process = shell.exec(this.REPLS[language], {async: true});
      runningLanguage = language;
      newProcess = true;
    },

    stdinWrite(string) {
      process.stdin.write(string);
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