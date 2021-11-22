import * as fs from "fs";
import * as mkdirp from "mkdirp";

export class FileManagerService {
  static createFile(path: string, filename: string, content: string) {
    // create path if not exist
    mkdirp.sync(path);

    // then create file with template content
    try {
      fs.writeFileSync(path + filename, content, "utf8");
    } catch (err) {
      console.log("error writing template:" + err);
    }
  }

  static removeFileFromPath(path: string): string {
    // check if path contain a filename
    const result = /((\/\w+)|(^\w+))\.\w{2,}$/.exec(path);
    if (result) {
      return path.substring(0, path.lastIndexOf("/"));
    }

    return path;
  }
}
