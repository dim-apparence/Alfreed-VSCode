export class TemplateService {
  static generateServiceTemplate(serviceName: string) {
    return `\
class ${serviceName}Service {
  // TODO: final YourRepo _yourRepo;

  ${serviceName}Service();
}
`;
  }
}
