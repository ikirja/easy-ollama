import * as vscode from 'vscode';
import { EasyOllamaPanel } from './panel';

export function registerCommandOpenPanel(context: vscode.ExtensionContext): vscode.Disposable {
  return vscode.commands.registerCommand('easy-ollama.openEasyOllamaPanel', () => {
    EasyOllamaPanel.createOrShow(context.extensionUri);
  });
}