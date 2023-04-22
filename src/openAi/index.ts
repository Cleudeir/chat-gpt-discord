import environment from "../other/Environment";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import fsPromises from "fs/promises";
import fs from "fs";
import { Config, DataUser, MessageContent, Messages, model } from "../types";

class OpenAi {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: environment.get("GPT_KEY"),
      })
    );
    this.tempDir();
  }

  private tempDir(): void {
    if (!fs.existsSync("temp/")) {
      fsPromises.mkdir("temp/");
    }
  }

  public async messagesRead(user: string): Promise<DataUser> {
    try {
      const buffed = (await fsPromises.readFile(
        `temp/${user}.json`
      )) as unknown as string;
      const { messages, config }: DataUser = JSON.parse(buffed);
      return { messages, config };
    } catch (error) {
      console.log("chat not exists");
      const content = `You are a helpful assistant inside discord, use discord markdown to format your response`;
      const config: Config = {
        model: model.textDavinci003,
        temperature: 0.8,
        max_tokens: 2048,
      };
      const messages: Messages = [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content,
        },
      ];
      return { config, messages };
    }
  }

  public async messagesWrite(user: string, data: DataUser): Promise<void> {
    try {
      const stringify: string = JSON.stringify(data);
      const write = await fsPromises.writeFile(`temp/${user}.json`, stringify);
      return write;
    } catch (error) {
      console.log(error);
    }
  }

  public async slow(
    user: string,
    message: MessageContent,
    data: DataUser
  ): Promise<string> {
    console.log("gpt-3.5-turbo");
    data.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `${message}`,
    });
    const response = await this.openai.createChatCompletion({
      model: model.gptTurbo003,
      messages: data.messages,
    });
    const result: string | undefined =
      response?.data?.choices[0]?.message?.content;
    data.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `${result}`,
    });
    if (result) {
      await this.messagesWrite(user, {
        messages: data.messages,
        config: data.config,
      });
      return result;
    } else {
      const result: string = "don't understand, repeat pls!";
      return result;
    }
  }

  public async fast(message: MessageContent, data: DataUser): Promise<string> {
    console.log("text-davinci-003");
    const response = await this.openai.createCompletion({
      model: model.textDavinci003,
      prompt: `${data.messages[0].content}
      ${message}`,
      temperature: data.config.temperature || 0.75,
      max_tokens: data.config.max_tokens || 2048,
    });
    const result: string | undefined = response?.data?.choices[0]?.text;
    if (result) {
      console.log(result);
      return result;
    } else {
      const result: string = "don't understand, repeat pls";
      return result;
    }
  }
}
export default new OpenAi();
