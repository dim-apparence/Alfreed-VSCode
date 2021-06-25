import { InputBoxOptions, window } from "vscode";

export class VSCodeService {
  prompt(placeHolder: string) {
    const blocNamePromptOptions: InputBoxOptions = {
      placeHolder,
    };
    return window.showInputBox(blocNamePromptOptions);
  }
}