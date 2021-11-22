import { InputBoxOptions, QuickPickOptions, window } from "vscode";

export class VSCodeService {
  prompt(placeHolder: string) {
    const blocNamePromptOptions: InputBoxOptions = {
      placeHolder,
    };
    return window.showInputBox(blocNamePromptOptions);
  }

  promptQuestion(placeHolder: string) {
    const questionOptions: QuickPickOptions = {
      placeHolder,
    };
    return window.showQuickPick(["Yes", "No"], questionOptions);
  }
}
