import * as vscode from 'vscode';

export default function errorHandler(message: string) {
  vscode.window.showErrorMessage(`Error: ${message}`);
}