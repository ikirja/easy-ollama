(function () {
  const vscode = acquireVsCodeApi();
  const codeBlock = document.getElementById('code');
  const clearSnippetsButton = document.getElementById('clear-snippets-button');
  const promptInput = document.getElementById('prompt-input');
  const sendButton = document.getElementById('send-button');
  const responseWindow = document.getElementById('response-window');
  const topDiv = document.getElementById('top');
  const bottomDiv = document.getElementById('bottom');

  stateRestore();

  clearSnippetsButton.addEventListener('click', () => {
    codeBlock.innerHTML = '';
    stateSet();
  });

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
      const html = /*html*/`
        <div class="relative text-black bg-white border border-slate-300 rounded-md py-2 px-3 shadow-md mb-5">
          <button id="${id}" class="absolute top-2 right-2 bg-green-400 hover:bg-green-600 active:bg-green-800 border border-slate-300 rounded-md py-2 px-3 shadow-md cursor-pointer">Copy</button>
          <pre data-id="${id}"></pre>
        </div>  
      `;
      codeBlock.innerHTML = codeBlock.innerHTML + html;
      document.querySelector(`[data-id="${id}"]`).textContent = text;
    }

    setCopyButtonsController();
    stateSet();
  });

  function disableControl(disable) {
    promptInput.disabled = disable;
    sendButton.disabled = disable;
  }

  function setCopyButtonsController() {
    const preBlocks = document.querySelectorAll('pre');

    preBlocks.forEach(block => {
      const id = block.dataset.id;
      const button = document.getElementById(id);

      button.addEventListener('click', () => {
        navigator.clipboard.writeText(block.textContent);
      });
    });
  }

  function stateRestore() {
    const previousState = vscode.getState();

    if (!previousState) {
      return;
    }

    codeBlock.innerHTML = previousState.codeSnippets;
    promptInput.value = previousState.prompt;
    responseWindow.innerText = previousState.response;

    setCopyButtonsController();
  }

  function stateSet() {
    const codeSnippets = codeBlock.innerHTML;
    const prompt = promptInput.value;
    const response = responseWindow.innerText;

    vscode.setState({
      codeSnippets,
      prompt,
      response
    });
  }
})();