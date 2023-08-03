import { pascalCase, sentenceCase, snakeCase } from "change-case";

export class TemplateHermep {
  static generateModel(modelName: string) {
    const pascalCaseName = pascalCase(modelName);

    return `\
import 'package:hermep/hermep.dart';

class ${pascalCaseName}ViewModel with HermepModel {
  
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

mixin ${pascalCaseName}ViewInterface { }

class ${pascalCaseName}Page extends StatefulWidget {
  final ${pascalCaseName}Arguments? args;
  const ${pascalCaseName}Page({Key? key, this.args}) : super(key: key);

  @override
  State<${pascalCaseName}Page> createState() => _${pascalCaseName}PageState();
}

class _${pascalCaseName}PageState extends HermepPage<${pascalCaseName}ViewModel, ${pascalCaseName}Presenter, ${pascalCaseName}Page> with ${pascalCaseName}ViewInterface {
  @override
  HermepPresenter createPresenter() => ${pascalCaseName}Presenter(this);
  
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
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
    viewModel = ${pascalCaseName}ViewModel();
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

void main() async {
  // ignore: unused_local_variable
  late ${pascalCaseName}Presenter presenter;
  // ignore: unused_local_variable
  late ${pascalCaseName}ViewModel model;

  // mock repositories here

  // load mocked file here

  group('${sentenceCaseName} - Page', () {
    void getHermepState(WidgetTester tester) {
      final dynamic widgetState = tester.state(find.byType(${pascalCaseName}Page));
      presenter = widgetState.presenter;
      model = widgetState.viewModel;
    }

    tearDown(() {
        
    });

    setUp(() {

    });

    Future beforeEach(WidgetTester tester) async {
      await initAppWithOnGeneratedRoutes(
        tester,
        home: ${pascalCaseName}Page(),
        routes: (settings) {},
      );
      await tester.pumpAndSettle();
      getHermepState(tester);
    }

    testWidgets('should display page', (WidgetTester tester) async {
      await beforeEach(tester);

      expect(find.byKey(const ValueKey('${pascalCaseName}Page')), findsOneWidget);
    });
  });
}
`;
  }
}
