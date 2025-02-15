import * as vscode from 'vscode';

export default function getModel(): string {
  return vscode.workspace.getConfiguration('easy-ollama').get('model') || 'deepseek-r1';
}