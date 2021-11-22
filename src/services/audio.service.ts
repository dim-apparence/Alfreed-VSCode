const player = require("play-sound")();
import * as path from "path";
import * as vscode from "vscode";

export class AudioService {
  private audioPath = path.join(__dirname, "..", "..", "medias", "audios");

  playSuccess() {
    if (!this.isSoundEnabled()) {
      return;
    }

    try {
      player.play(path.join(this.audioPath, "success.mp3"));
    } catch (e) {
      console.log(`impossible to play sound: ${e}`);
    }
  }

  playError() {
    if (!this.isSoundEnabled()) {
      return;
    }
    
    try {
      player.play(path.join(this.audioPath, "error.mp3"));
    } catch (e) {
      console.log(`impossible to play sound: ${e}`);
    }
  }

  private isSoundEnabled(): boolean {
    return vscode.workspace.getConfiguration("koby").get('enableSound', true);
  }
}
