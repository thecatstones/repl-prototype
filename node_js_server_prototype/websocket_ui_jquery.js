$(function() {
  const handleKeydown = (event) => {
    const ctrlC = event.ctrlKey && event.key === 'c';
    const enter = event.key === 'Enter';

    if (ctrlC || enter) executeCommand(event, ctrlC);
  }

  const executeCommand = (event, ctrlC) => {
    const command = $('[name=command]').val();
    const language = $('[name=language]').val();

    socket.emit('execute', { command, language, ctrlC });

    $('[name=command]').val('');
  }

  $('button').on('click', executeCommand);
  $(document).on('keydown', handleKeydown);
});