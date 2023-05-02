import environment from "../util/Environment";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import { DataUser, MessageContent, model } from "../types";

class ChatGpt {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi(
      new Configuration({
        apiKey: environment.get("GPT_KEY"),
      })
    );
  }
  public async slow(message: MessageContent, data: DataUser): Promise<string> {
    console.log("gpt-3.5-turbo");
    data.messages.push({
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `${message}`,
    });
    const response = await this.openai.createChatCompletion({
      model: model.gptTurbo003,
      messages: data.messages,
    });
    let result: string | undefined =
      response?.data?.choices[0]?.message?.content;
    if (!result) {
      result = "don't understand, repeat pls!";
    }
    return result;
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
export default new ChatGpt();
