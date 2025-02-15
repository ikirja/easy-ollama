import { Uri, Webview } from 'vscode';
import getModel from './get-model';

export default function getHtml(webview: Webview, styleUri: Uri, scriptUri: Uri, nonce: string): string {
  const model = getModel();

  return /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${styleUri}" rel="stylesheet">
      <title>Easy-Ollama Chat</title>
    </head>
    <body>
      <div id="top"></div>

      <h1 class="text-3xl font-bold mb-5">Easy-Ollama Chat</h1>
      <div class="text-xl mb-5">Model selected: ${model}</div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          Description and instructions to this extensions.
        </div>
        <div class="w-full flex flex-col justify-center items-center mb-5">
          <div class="w-full flex justify-center items-center mb-5">
            <input
              id="prompt-input"
              class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm disabled:opacity-25"
              name="ask"
              placeholder="Ask me anything..."
            />
            <button
              id="send-button"
              class="cursor-pointer rounded-full bg-purple-700 hover:bg-purple-800 active:bg-purple-900 text-white ms-3 px-3 py-2 disabled:opacity-25"
            >
              Send
            </button>
          </div>

          <div id="response-window" class="w-full min-h-50 text-black bg-white border border-slate-300 rounded-md py-2 px-3 shadow-md">
            Answer will be displayed here.
          </div>
        </div>
      </div>

      <div id="bottom"></div>

      <script nonce="${nonce}" src="${scriptUri}"></script>
    </body>
    </html>
  `;
}