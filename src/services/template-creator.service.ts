import { pascalCase, snakeCase } from "change-case";
import { window } from "vscode";
import { TemplateAlfreed } from "../templates/alfreed.template";
import { TemplateLoader } from "../templates/loader.template";
import { TemplateService } from "../templates/service.template";
import { TemplateStateful } from "../templates/stateful.template";
import { FileManagerService } from "./file-manager.service";
import { VSCodeService } from "./vscode.service";

export class TemplateCreatorService {
  private vscodeService: VSCodeService = new VSCodeService();

  private async promptPathIfNeeded(currentPath: string) {
    if (!currentPath) {
      const path = await this.vscodeService.prompt("Type path ...");
      if (!path) {
        window.showErrorMessage(`Please provide a non empty path`);
        return;
      }
      return path;
    } else {
      return currentPath;
    }
  }

  async generateLoader(currentPath: string) {
    const loaderName = await this.vscodeService.prompt(
      "Type the loader name..."
    );

    const promptedUri = this.promptPathIfNeeded(currentPath);
    if (!promptedUri) {
      return;
    }

    if (!loaderName || loaderName.length <= 0) {
      window.showErrorMessage(`Please provide a non empty name`);
      return;
    }
    let loaderNameFiltered = loaderName.replace(/loader/i, "");

    const template = TemplateLoader.generateLoaderTemplate(loaderNameFiltered);
    FileManagerService.createFile(
      currentPath,
      `/${snakeCase(loaderNameFiltered)}_loader.dart`,
      template
    );

    window.showInformationMessage(
      `${pascalCase(loaderName)} created successfully 👌`
    );
  }

  async generateService(currentPath: string) {
    const serviceName = await this.vscodeService.prompt(
      "Type the service name..."
    );

    const promptedUri = this.promptPathIfNeeded(currentPath);
    if (!promptedUri) {
      return;
    }

    if (!serviceName || serviceName.length <= 0) {
      window.showErrorMessage(`Please provide a non empty name`);
      return;
    }
    let serviceNameFiltered = serviceName.replace(/service/i, "");

    const template =
      TemplateService.generateServiceTemplate(serviceNameFiltered);
    FileManagerService.createFile(
      currentPath,
      `/${snakeCase(serviceNameFiltered)}_service.dart`,
      template
    );

    window.showInformationMessage(
      `${pascalCase(serviceName)} created successfully 👌`
    );
  }

  async generateAlfreedPage(currentPath: string) {
    const pageName = await this.vscodeService.prompt("Type the page name...");

    const promptedUri = this.promptPathIfNeeded(currentPath);
    if (!promptedUri) {
      return;
    }
    if (!pageName || pageName.length <= 0) {
      window.showErrorMessage(`Please provide a non empty name`);
      return;
    }

    const pageNameFiltered = pageName.replace(/page/i, "");
    const modelTemplate =
      TemplateAlfreed.generateModel(pageNameFiltered);
    const presenterTemplate =
      TemplateAlfreed.generatePresenter(pageNameFiltered);
    const pageTemplate =
      TemplateAlfreed.generatePage(pageNameFiltered);

    await Promise.all([
      FileManagerService.createFile(
        currentPath,
        `/${snakeCase(pageNameFiltered)}_viewmodel.dart`,
        modelTemplate
      ),
      FileManagerService.createFile(
        currentPath,
        `/${snakeCase(pageNameFiltered)}_presenter.dart`,
        presenterTemplate
      ),
      FileManagerService.createFile(
        currentPath,
        `/${snakeCase(pageNameFiltered)}.dart`,
        pageTemplate
      ),
    ]);

    window.showInformationMessage(
      `${pascalCase(pageName)} created successfully 👌`
    );
  }

  async generateStatefulPage(currentPath: string) {
    const pageName = await this.vscodeService.prompt("Type the page name...");

    const promptedUri = this.promptPathIfNeeded(currentPath);
    if (!promptedUri) {
      return;
    }
    if (!pageName || pageName.length <= 0) {
      window.showErrorMessage(`Please provide a non empty name`);
      return;
    }

    const pageNameFiltered = pageName.replace(/page/i, "");
    const modelTemplate = TemplateStateful.generateModel(pageNameFiltered);
    const presenterTemplate =
      TemplateStateful.generatePresenter(pageNameFiltered);
    const pageTemplate = TemplateStateful.generatePage(pageNameFiltered);

    await Promise.all([
      FileManagerService.createFile(
        currentPath,
        `/${snakeCase(pageNameFiltered)}_viewmodel.dart`,
        modelTemplate
      ),
      FileManagerService.createFile(
        currentPath,
        `/${snakeCase(pageNameFiltered)}_presenter.dart`,
        presenterTemplate
      ),
      FileManagerService.createFile(
        currentPath,
        `/${snakeCase(pageNameFiltered)}.dart`,
        pageTemplate
      ),
    ]);

    window.showInformationMessage(
      `${pascalCase(pageName)} created successfully 👌`
    );
  }
}
