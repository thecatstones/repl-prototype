const term = new Terminal();
term.open(document.getElementById('terminal'));
term.write('REPL Prototype \x1B[1;3;31mxterm.js\x1B[0m $ ');

const $ = (selector) => document.querySelector(selector);

document.addEventListener('DOMContentLoaded', () => {
  let state = {
    line: '',
  }

  const evaluate = (line) => (
    fetch('/input', {
      method: 'POST',
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: line,
    })
  );

  const handleTerminalKeypress = (event) => {
    const textArea = $('.xterm-helper-textarea');
    if (event.target !== textArea) return;
    term.write(event.key);
    state.line += event.key;
  }

  const handleEnterReleased = () => {
    term.write('\r\n');

    evaluate(state.line)
    .then(response => response.text())
    .then(data => {
      term.write(data);
      state.line = '';
    });  
  }

  const handleBackspaceReleased = () => {
    term.write('\b \b');
    state.line = state.line.slice(0, -1);
    console.log(state.line);
  }

  document.addEventListener('keypress', handleTerminalKeypress);

  document.addEventListener('keyup', event => {
    console.log(state.line);
    const key = event.key;
    if (key == 'Enter') return handleEnterReleased();
    if (key == 'Backspace') return handleBackspaceReleased();
  });
});

