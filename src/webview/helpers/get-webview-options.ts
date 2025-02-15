import { Uri, WebviewOptions } from 'vscode';

export default function getWebviewOptions(extensionUri: Uri): WebviewOptions {
	return {
		enableScripts: true,
		localResourceRoots: [Uri.joinPath(extensionUri, 'assets')]
	};
}