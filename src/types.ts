import { ChatCompletionRequestMessageRoleEnum } from "openai";
export type MessageContent = string;
export enum model {
  textDavinci003 = "text-davinci-003",
  gptTurbo003 = "gpt-3.5-turbo",
  gptTurbo0301 = "gpt-3.5-turbo-0301",
}

export type RoleUser = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: MessageContent;
};
export type Config = {
  model: model;
  temperature?: number;
  max_tokens?: number;
};
export type Messages = RoleUser[];
export type DataUser = {
  messages: Messages;
  config: Config;
};
