import * as vscode from 'vscode';

const DEFAULT_MODEL = 'deepseek-r1';

export default function getModel(): string {
  return vscode.workspace.getConfiguration('easy-ollama').get('model') || DEFAULT_MODEL;
}