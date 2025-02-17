import { EasyOllamaStatusBar } from './status-bar-item';

const easyOllamaStatusBar = new EasyOllamaStatusBar();

export function getCurrentEasyOllamaStatusBar(): EasyOllamaStatusBar {
  return easyOllamaStatusBar;
}
