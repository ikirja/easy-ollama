import * as vscode from 'vscode';
import { EasyOllamaPanel } from './webview/panel';

export function activate(context: vscode.ExtensionContext) {
	const openPanel = vscode.commands.registerCommand('easy-ollama.openEasyOllamaPanel', () => {
		EasyOllamaPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(openPanel);
}

export function deactivate() {}
