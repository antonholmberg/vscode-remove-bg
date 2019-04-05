// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { addSuffix } from "./fileUtils";
import ImageProcessor from "./ImageProcessor";

function loadApiKey(): string | undefined {
  const config = vscode.workspace.getConfiguration("remove-bg");
  return config.get("apiKey");
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const processor = new ImageProcessor();
  const disposable = vscode.commands.registerCommand(
    "remove-bg.removeBg",
    async (uri: vscode.Uri) => {
      const apiKey = loadApiKey();
      if (!apiKey) {
        vscode.window.showErrorMessage("No API key was set.");
        return;
      }

      const sourceFile = uri.path;
      const outFile = addSuffix({
        path: sourceFile,
        suffix: "-no-bg",
        extension: "png"
      });

      try {
        await processor.processImage({
          apiKey: apiKey,
          source: sourceFile,
          output: outFile
        });
        vscode.window.showInformationMessage("Background remove successfully!");
      } catch (e) {
        vscode.window.showErrorMessage(e);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
