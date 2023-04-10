import environment from "./Environment";
import { Configuration, OpenAIApi } from "openai";
import fsPromises from "fs/promises";
import fs from "fs";
class OpenAi {
  private openai: OpenAIApi;
  private content: string;

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: environment.get("GPT_KEY"),
      })
    );
    this.content = `You are a helpful assistant inside discord, response fast and in Portuguese`

    this.tempDir();
  }

  public async setContentDefault(user: string, roleDefine: string){
    this.content = roleDefine
    try {
      const stringify: string = JSON.stringify([
        {
         role: "system",
         content: roleDefine
        }
      ]);
      await fsPromises.writeFile(`temp/${user}.json`, stringify);
    } catch (error) {
      console.log(error);
    }
  }

  private tempDir(): void {
    if (!fs.existsSync("temp/")) {
      fsPromises.mkdir("temp/");
    }
  }

  public async messagesRead(user: string): Promise<any[]> {
    try {
      const buffed = (await fsPromises.readFile(
        `temp/${user}.json`
      )) as unknown as string;
      const read: any[] = JSON.parse(buffed);
      return read;
    } catch (error) {
      console.log("chat not exists");
      return [{
        role: "system",
        content: this.content
       }];
    }
  }

  public async messagesWrite(user: string, messages: any[]): Promise<void> {
    try {
      const stringify: string = JSON.stringify(messages);
      const write = await fsPromises.writeFile(`temp/${user}.json`, stringify);
      return write;
    } catch (error) {
      console.log(error);
    }
  }

  public async messagesReset(user: string): Promise<void> {
    try {
      const stringify: string = JSON.stringify([{
       role: "system",
       content: this.content
      }]);
      await fsPromises.writeFile(`temp/${user}.json`, stringify);
    } catch (error) {
      console.log(error);
    }
  }

  public async turbo(user: string, message: string): Promise<string> {
    console.log("turbo");
    const messages = await this.messagesRead(user);
    messages.push({ role: "user", content: `${message}` });
    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    const result: string | undefined =
      response?.data?.choices[0]?.message?.content;
    messages.push({ role: "assistant", content: `${result}` });
    if (result) {
      await this.messagesWrite(user, messages);
      return result;
    } else {
      const result: string = "Não consegui entender, repita por favor!";
      return result;
    }
  }

  public async davinci_003(
    message: string,
    temperature?: number,
    max_tokens?: number
  ): Promise<string> {
    console.log("davinci_003", this.content);
    const response = await this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${this.content}: ${message}`,
      temperature: temperature || 0.4,
      max_tokens: max_tokens || 2048,
    });
    const result: string | undefined = response?.data?.choices[0]?.text;
    if (result) {
      console.log(result);
      return result;
    } else {
      const result: string = "Não consegui entender, repita por favor!";
      return result;
    }
  }
}
export default new OpenAi();
