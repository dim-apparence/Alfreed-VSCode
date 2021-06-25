import { commands, ExtensionContext } from "vscode";
import { FileManagerService } from "./services/file-manager.service";
import { TemplateCreatorService } from "./services/template-creator.service";

export function activate(context: ExtensionContext) {
  let templateCreatorService = new TemplateCreatorService();

  context.subscriptions.push(
    commands.registerCommand("alfreed.createPage", (uri) =>
      templateCreatorService.generateAlfreedPage(
        FileManagerService.removeFileFromPath(uri.fsPath)
      )
    ),
    commands.registerCommand("alfreed.createStatefulPage", (uri) =>
      templateCreatorService.generateStatefulPage(
        FileManagerService.removeFileFromPath(uri.fsPath)
      )
    ),
    commands.registerCommand("alfreed.createService", (uri) =>
      templateCreatorService.generateService(
        FileManagerService.removeFileFromPath(uri.fsPath)
      )
    ),
    commands.registerCommand("alfreed.createLoader", (uri) =>
      templateCreatorService.generateLoader(
        FileManagerService.removeFileFromPath(uri.fsPath)
      )
    )
  );
}

export function deactivate() {}
