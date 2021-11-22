import { pascalCase, sentenceCase, snakeCase } from "change-case";

export class TemplateStateful {
  static generateModel(modelName: string) {
    const pascalCaseName = pascalCase(modelName);

    return `\
class ${pascalCaseName}ViewModel {
  ${pascalCaseName}ViewModel();
}
`;
  }

  static generatePage(presenterName: string) {
    const pascalCaseName = pascalCase(presenterName);
    const snakeCaseName = snakeCase(presenterName);

    return `\
import 'package:flutter/material.dart';

import '${snakeCaseName}_presenter.dart';
import '${snakeCaseName}_viewmodel.dart';

abstract class ${pascalCaseName}View {
  void refresh();
}

class ${pascalCaseName}Arguments {
  ${pascalCaseName}Arguments();
}

class ${pascalCaseName}Page extends StatefulWidget {
  final ${pascalCaseName}Arguments? args;
  const ${pascalCaseName}Page({
    Key? key,
    this.args,
  }) : super(key: key);

  @override
  _${pascalCaseName}PageState createState() => _${pascalCaseName}PageState();
}

class _${pascalCaseName}PageState extends State<${pascalCaseName}Page> implements ${pascalCaseName}View {
  bool _didInitState = false;
  late ${pascalCaseName}Presenter presenter;
  late ${pascalCaseName}ViewModel? model;

  @override
  @mustCallSuper
  void didChangeDependencies() {
    if (!_didInitState) {
      afterViewInit();
      _didInitState = true;
    }
    super.didChangeDependencies();
  }

  @override
  void dispose() {
    this.presenter.dispose();
    super.dispose();
  }

  void initState() {
    super.initState();
    this.presenter = ${pascalCaseName}Presenter(
      ${pascalCaseName}ViewModel(),
      this,
    ).init();
    this.model = this.presenter.viewModel;
  }

  void afterViewInit() {
    this
        .presenter
        .initServices();
    this.presenter.loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Text('${pascalCaseName}Page');
  }

  @override
  void refresh() => this.setState(() {});
}    
`;
  }

  static generatePresenter(presenterName: string) {
    const pascalCaseName = pascalCase(presenterName);
    const snakeCaseName = snakeCase(presenterName);

    return `\
import '${snakeCaseName}.dart';
import '${snakeCaseName}_viewmodel.dart';

class ${pascalCaseName}Presenter {
  final ${pascalCaseName}ViewModel viewModel;
  final ${pascalCaseName}View viewInterface;

  ${pascalCaseName}Presenter(
    this.viewModel,
    this.viewInterface,
  );

  ${pascalCaseName}Presenter init() {
    
    return this;
  }

  void initServices() { }
  void loadData() { }
  void dispose() { }
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
  // ignore: unused_local_variable
  late ${pascalCaseName}Presenter presenter;
  // ignore: unused_local_variable
  late ${pascalCaseName}ViewModel model;

  // mock repositories here

  // load mocked file here

  group('${sentenceCaseName} - Page', () {
    tearDown(() {
        
    });

    setUp(() {

    });

    Future _beforeEach(WidgetTester tester) async {
      await tester.pumpWidget(
        TestUtils.createWithInjectors(
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

      final dynamic pageState =
          tester.state(find.byType(${pascalCaseName}Page));
      presenter = pageState.presenter;
      model = pageState.model;
    }

    testWidgets('should display page', (WidgetTester tester) async {
      await _beforeEach(tester);

      expect(find.text('${pascalCaseName}Page'), findsOneWidget);
    });
  });
}
`;
  }
}
