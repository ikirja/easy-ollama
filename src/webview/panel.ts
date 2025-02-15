import * as vscode from 'vscode';
import ollama from 'ollama';
import {
	errorHandler,
	getHtml,
	getModel,
	getNonce,
	getWebviewOptions
} from './helpers';

export class EasyOllamaPanel {
	public static currentPanel: EasyOllamaPanel | undefined;

	public static readonly viewType = 'easyOllamaPanel';

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: vscode.Uri;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: vscode.Uri) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (EasyOllamaPanel.currentPanel) {
			EasyOllamaPanel.currentPanel._panel.reveal(column);
			return;
		}

		const panel = vscode.window.createWebviewPanel(
			EasyOllamaPanel.viewType,
			'EasyOllamaPanel',
			column || vscode.ViewColumn.One,
			getWebviewOptions(extensionUri)
		);

		EasyOllamaPanel.currentPanel = new EasyOllamaPanel(panel, extensionUri);
	}

	public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		EasyOllamaPanel.currentPanel = new EasyOllamaPanel(panel, extensionUri);
	}

	private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
		this._panel = panel;
		this._extensionUri = extensionUri;

		this._update();

		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		this._panel.onDidChangeViewState(() => {
			if (this._panel.visible) {
				this._update();
			}
		}, null, this._disposables);

		this._panel.webview.onDidReceiveMessage(async (message: any) => {
			if (message.command === 'prompt') {
				const prompt = message.text;
				let responseText = '';

				try {
					this._panel.webview.postMessage({ command: 'promptResponseStart', text: 'start' });

					const streamResponse = await ollama.chat({
						model: getModel(),
						messages: [{ role: 'user', content: prompt }],
						stream: true
					});

					for await (const part of streamResponse) {
						responseText += part.message.content;
						this._panel.webview.postMessage({ command: 'promptResponse', text: responseText });
					}

					this._panel.webview.postMessage({ command: 'promptResponseEnd', text: 'end' });
				} catch (error) {
					errorHandler('make sure that Ollama is running in background');
				}
			}
		}, null, this._disposables);
	}

	public dispose() {
		EasyOllamaPanel.currentPanel = undefined;

		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _update() {
		const webview = this._panel.webview;
		const nonce = getNonce();

		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'assets/js', 'main.js');
		const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

		const stylePath = vscode.Uri.joinPath(this._extensionUri, 'assets/css', 'output.css');
		const styleUri = webview.asWebviewUri(stylePath);

		this._panel.title = 'Easy-Ollama Chat';
		this._panel.webview.html = getHtml(webview, styleUri, scriptUri, nonce);
	}
}