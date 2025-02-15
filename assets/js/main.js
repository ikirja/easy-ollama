(function () {
  const vscode = acquireVsCodeApi();
  const promptInput = document.getElementById('prompt-input');
  const sendButton = document.getElementById('send-button');
  const responseWindow = document.getElementById('response-window');
  const topDiv = document.getElementById('top');
  const bottomDiv = document.getElementById('bottom');

  sendButton.addEventListener('click', () => {
    const text = promptInput.value;
    vscode.postMessage({ command: 'prompt', text });
  });

  window.addEventListener('message', event => {
    const { command, text } = event.data;
    
    if (command === 'promptResponseStart'){
      disableControl(true);
    }

    if (command === 'promptResponse') {
      responseWindow.innerText = text;
      bottomDiv.scrollIntoView();
    }

    if (command === 'promptResponseEnd'){
      disableControl(false);
      topDiv.scrollIntoView();
    }
  });

  function disableControl(disable) {
    promptInput.disabled = disable;
    sendButton.disabled = disable;
  }
})();