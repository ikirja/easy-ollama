import * as vscode from 'vscode';
import { registerCommandOpenPanel } from './webview';
import { getCurrentEasyOllamaStatusBar } from './status-bar';

export function activate(context: vscode.ExtensionContext) {
	const disposable = registerCommandOpenPanel(context);
	const statusBar = getCurrentEasyOllamaStatusBar();

	context.subscriptions.push(disposable);
	context.subscriptions.push(statusBar.getStatusBarItem());
	
	statusBar.updateStatusBarItem('idle');
	statusBar.showStatusBarItem(true);
}

export function deactivate() {}
