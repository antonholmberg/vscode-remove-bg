// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import { addSuffix } from "./fileUtils";
import removeBackground from "./removeBg";

function loadApiKey(): string | undefined {
  const config = vscode.workspace.getConfiguration("remove-bg");
  return config.get("apiKey");
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "remove-bg" is now active!');

  const disposable = vscode.commands.registerCommand(
    "remove-bg.removeBg",
    async (uri: vscode.Uri) => {
      const apiKey = loadApiKey();
      if (!apiKey) {
        vscode.window.showErrorMessage("No API key was set.");
        return;
      }

      const sourceFile = uri.path;
      const outFile = addSuffix(sourceFile);

      try {
        await removeBackground(apiKey, sourceFile, outFile).then(() => {});
        vscode.window.showInformationMessage("Background remove successfully!");
      } catch (e) {
        vscode.window.showErrorMessage("Failed to remove background.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
