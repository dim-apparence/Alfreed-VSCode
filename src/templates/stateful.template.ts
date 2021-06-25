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
  void refreshAnimations() {}
  void refresh() {}
}

class ${pascalCaseName}Page extends StatefulWidget {
  ${pascalCaseName}Page({
    Key? key,
  });

  @override
  _${pascalCaseName}PageState createState() => _${pascalCaseName}PageState();
}

class _${pascalCaseName}PageState extends State<${pascalCaseName}Page> implements ${pascalCaseName}View {
  bool _didInitState = false;
  late List<AnimationController> animationControllers;
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
    for (var controller in this.animationControllers) {
      controller.dispose();
    }
    super.dispose();
  }

  void initState() {
    super.initState();
    this.presenter = ${pascalCaseName}Presenter(
      ${pascalCaseName}ViewModel(),
      this,
    ).init();
    this.model = this.presenter.viewModel;
    this.animationControllers = [];
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
  void refreshAnimations() => this.refresh();

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
  // mock repositories here

  // load mocked file here

  group('${sentenceCaseName}', () {
    void _resetMocks() { }

    Future _beforeEach(WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: AppUtils.createWithInjectors(
            MaterialApp(
              routes: {
                '': (ctx) => ${pascalCaseName}Page(),
              },
              initialRoute: '',
            ),
            mockedRepositories: {},
          ),
          routes: {},
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
