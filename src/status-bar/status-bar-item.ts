import * as vscode from 'vscode';

export class EasyOllamaStatusBar {
  private readonly _statusBarItem: vscode.StatusBarItem;

  constructor() {
    this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
  }

  public getStatusBarItem(): vscode.StatusBarItem {
    return this._statusBarItem;
  }

  public showStatusBarItem(show: boolean): void {
    if (show) {
      this._statusBarItem.show();
    } else {
      this._statusBarItem.hide();
    }
  }

  public updateStatusBarItem(text: string): void {
    let str = `Easy-Ollama: ${text}`;
    this._statusBarItem.text = str;
  }
}
