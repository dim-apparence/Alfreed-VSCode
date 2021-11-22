import { pascalCase } from "change-case";

export class TemplateService {
  static generateServiceTemplate(serviceName: string) {
    const pascalCaseName = pascalCase(serviceName);
    
    return `\
class ${pascalCaseName}Service {
  // final YourRepo _yourRepo;

  ${pascalCaseName}Service();
}
`;
  }
}
