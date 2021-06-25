import { pascalCase, snakeCase } from "change-case";

export class TemplateLoader {
  static generateLoaderTemplate(loaderName: string): string {
    const pascalCaseName = pascalCase(loaderName);
    const snakeCaseName = snakeCase(loaderName);

    return `\
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Loader {
  ${pascalCaseName}Loader();
  
  Future<${pascalCaseName}ViewModel> load() async {
    final model = ${pascalCaseName}ViewModel();
    
    return model;
  }
}`;
  }
}
