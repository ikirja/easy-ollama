(function () {
  const vscode = acquireVsCodeApi();
  const codeBlock = document.getElementById('code');
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

    if (command === 'promptResponseEnd') {
      disableControl(false);
      topDiv.scrollIntoView();
    }

    if (command === 'promptResponseCodeSnippet') {
      const id = String(Math.random()).split('.')[1];
      const code = /*html*/`
        <div class="relative text-black bg-white border border-slate-300 rounded-md py-2 px-3 shadow-md mb-5">
          <button id="${id}" class="absolute top-2 right-2 bg-green-400 hover:bg-green-600 active:bg-green-800 border border-slate-300 rounded-md py-2 px-3 shadow-md cursor-pointer">Copy</button>
          <pre data-id="${id}"></pre>
        </div>  
      `;
      codeBlock.innerHTML = codeBlock.innerHTML + code;

      const preBlock = document.querySelector(`[data-id="${id}"]`);
      const button = document.getElementById(id);
      preBlock.textContent = text;

      button.addEventListener('click', (event) => {
        navigator.clipboard.writeText(text);
      });
    }
  });

  function disableControl(disable) {
    promptInput.disabled = disable;
    sendButton.disabled = disable;
  }
})();