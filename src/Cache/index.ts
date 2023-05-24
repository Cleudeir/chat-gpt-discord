import fsPromises from "fs/promises";
import fs from "fs";
import os from "os";
const userHomeDir = os.homedir();

class Cache {
  private path: string;
  private extension: string;
  constructor(path: string, extension: string) {
    this.path = path;
    this.extension = extension;
    this.tempDir();
  }

  private tempDir(): void {
    if (!fs.existsSync(`${userHomeDir}/temp/${this.path}`)) {
      fsPromises.mkdir(`${userHomeDir}/temp/${this.path}`, { recursive: true });
    }
  }

  public async messagesRead(name: string): Promise<any> {
    try {
      const buffed = (await fsPromises.readFile(
        `${userHomeDir}/temp/${this.path}/${name}.${this.extension}`
      )) as unknown as string;
      let read: any;
      if (this.extension === "json") {
        read = JSON.parse(buffed);
      } else {
        read = buffed;
      }
      return read;
    } catch (error) {
      return null;
    }
  }

  public async messagesWrite(name: string, data: any): Promise<void> {
    try {
      let stringify: string = "";
      if (this.extension === "json") {
        stringify = JSON.stringify(data);
      } else {
        stringify = data;
      }
      const write = await fsPromises.writeFile(
        `${userHomeDir}/temp/${this.path}/${name}.${this.extension}`,
        stringify
      );
      return write;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
export default Cache;
