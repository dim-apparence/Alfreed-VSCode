import { commands, ExtensionContext } from "vscode";
import { FileManagerService } from "./services/file-manager.service";
import { TemplateCreatorService } from "./services/template-creator.service";

export function activate(context: ExtensionContext) {
  let templateCreatorService = new TemplateCreatorService();

  context.subscriptions.push(
    commands.registerCommand("koby.createPage", (uri) =>
      templateCreatorService.generateAlfreedPage(
        FileManagerService.removeFileFromPath(uri?.fsPath)
      )
    ),
    commands.registerCommand("koby.createStatefulPage", (uri) =>
      templateCreatorService.generateStatefulPage(
        FileManagerService.removeFileFromPath(uri?.fsPath)
      )
    ),
    commands.registerCommand("koby.createService", (uri) =>
      templateCreatorService.generateService(
        FileManagerService.removeFileFromPath(uri?.fsPath)
      )
    ),
    commands.registerCommand("koby.createLoader", (uri) =>
      templateCreatorService.generateLoader(
        FileManagerService.removeFileFromPath(uri?.fsPath)
      )
    )
  );
}

export function deactivate() {}
