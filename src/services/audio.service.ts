const player = require('play-sound')();
import * as path from "path";

export class AudioService {
  private audioPath = path.join(__dirname, "..");

  playSuccess() {
    try {
      player.play(path.join(this.audioPath, "medias", "success.mp3"));
    } catch (e) {
      console.log(e);
    }
  }

  playError() {
    try {
      player.play(path.join(this.audioPath, "medias", "error.mp3"));
    } catch (e) {
      console.log(e);
    }
  }
}
