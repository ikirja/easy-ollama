import { Uri, WebviewOptions, WebviewPanelOptions } from 'vscode';

export default function getWebviewOptions(extensionUri: Uri): WebviewOptions & WebviewPanelOptions {
	return {
		enableScripts: true,
		localResourceRoots: [Uri.joinPath(extensionUri, 'assets')],
		retainContextWhenHidden: true
	};
}