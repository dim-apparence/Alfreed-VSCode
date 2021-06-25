const player = require("play-sound")();
import * as path from "path";

export class AudioService {
  private audioPath = path.join(__dirname, "..", "..", "medias");

  playSuccess() {
    try {
      player.play(path.join(this.audioPath, "success.mp3"));
    } catch (e) {
      console.log(`impossible to play sound: ${e}`);
    }
  }

  playError() {
    try {
      player.play(path.join(this.audioPath, "error.mp3"));
    } catch (e) {
      console.log(`impossible to play sound: ${e}`);
    }
  }
}
