# Easy-Ollama VSCode extension

Extension for use of Ollama inside VSCode.

## Features

Easy-Ollama extension provides simple interface to interact with Ollama service inside your usual workspace in Visual Studio Code. It allows to send prompt to one of predefined models, shows generated text. And, if there's any code in response, it will show code snippets, with ability to copy it to clipboard.

## Currently supported languages for code snippets:
- HTML
- CSS
- JavaScript

## Example
Here's an example of usage:

![How to use](https://easyoneweb.ru/easy-ollama.gif)

> Tip: Currently there's no chat capability, so one prompt - one answer, without previous context. Please, keep that in mind.

## Requirements

To use Easy-Ollama extension, you need to preinstall Ollama (https://ollama.com), download models, and run Ollama service on your local device. Please, refer to docs on Ollama website. Currently supported models: DeepSeek-R1, Llama 3.2. VSCode minimum version: 1.97.0.

## Extension Settings

This extension contributes the following settings:

* `easy-ollama.model`: Choose between models to use.

## Known Issues

There are currently no known issues.

## Release Notes

### 0.2.0

Added Clear Snippets button to remove snippets. State for webview, which is destroyed on closing Easy-Ollama panel, but keeps data when switching tabs.

### 0.1.0

Initial working version.

---

## For more information

* [GitHub](https://github.com/ikirja/easy-ollama)
* [EasyOneWeb LLC](https://easyoneweb.ru)

**Enjoy!**
