import { pascalCase, sentenceCase, snakeCase } from "change-case";

export class TemplateHermep {
  static generateModel(modelName: string) {
    const pascalCaseName = pascalCase(modelName);

    return `\
import 'package:hermep/hermep.dart';

class ${pascalCaseName}ViewModel with HermepModel {
  ${pascalCaseName}ViewModel();
}
`;
  }

  static generatePage(pageName: string) {
    const pascalCaseName = pascalCase(pageName);
    const snakeCaseName = snakeCase(pageName);

    return `\
import 'package:hermep/hermep.dart';
import 'package:flutter/material.dart';

import '${snakeCaseName}_presenter.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Arguments {
  ${pascalCaseName}Arguments();
}

abstract class ${pascalCaseName}ViewInterface { }

class ${pascalCaseName}Page extends StatefulWidget {
  final ${pascalCaseName}Arguments args;
  ${pascalCaseName}Page(this.args, {Key? key}) : super(key: key);

  @override
  _${pascalCaseName}PageState createState() => _${pascalCaseName}PageState();
}

class _${pascalCaseName}PageState extends HermepPage<${pascalCaseName}ViewModel, ${pascalCaseName}Presenter, ${pascalCaseName}Page> with ${pascalCaseName}ViewInterface {
  @override
  void createAnimations() { }

  @override
  HermepPresenter createPresenter() => ${pascalCaseName}Presenter(this);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: ValueKey('${pascalCaseName}Page'),
      body: Text('${pascalCaseName}Page'),
    );
  }
}
`;
  }

  static generatePresenter(presenterName: string) {
    const pascalCaseName = pascalCase(presenterName);
    const snakeCaseName = snakeCase(presenterName);

    return `\
import 'package:hermep/hermep.dart';

import '${snakeCaseName}.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Presenter with HermepPresenter<${pascalCaseName}ViewModel, ${pascalCaseName}ViewInterface> {
  ${pascalCaseName}Presenter(
    ${pascalCaseName}ViewInterface viewInterface,
  ) {
    this.viewModel = ${pascalCaseName}ViewModel();
    this.viewInterface = viewInterface;
  }

  @override
  void dispose() { }
  
  @override
  void init() { }
}
`;
  }

  static generateTest(pageName: string) {
    const pascalCaseName = pascalCase(pageName);
    const sentenceCaseName = sentenceCase(pageName);

    return `\
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

void main() async {
  // mock repositories here

  // load mocked file here

  group('${sentenceCaseName} - Page', () {
    void _resetMocks() { }

    Future _beforeEach(WidgetTester tester) async {
      await tester.pumpWidget(
        AppUtils.createWithInjectors(
          MaterialApp(
            routes: {
              '': (ctx) => ${pascalCaseName}Page(),
            },
            initialRoute: '',
          ),
          mockedRepositories: {},
        ),
      );
      await tester.pumpAndSettle();
    }

    testWidgets('should display page', (WidgetTester tester) async {
      _resetMocks();
      await _beforeEach(tester);

      expect(find.byKey(ValueKey('${pascalCaseName}Page')), findsOneWidget);
    });
  });
}
`;
  }
}
