import { ChatCompletionRequestMessageRoleEnum } from "openai";
import OpenAi from "../../openAi";
import { Config, DataUser, Messages, model } from "../../types";

async function nextJsCoder(body: any) {
  const message = `create a 2 files codes and suggest changed a ideal path name when exists Ideal Component Name.
 first file : ./ComponentName/index.js and his content: a  Nextjs 13 page include in this pages that features : "${body.feature}".
 second file : ./ComponentName/index.module.css  and his content: pretty and modern CSS.
 pls, response in code form`;

  const content = `You are a helpful assistant`;
  const config: Config = {
    model: model.gptTurbo003,
    temperature: 0.5,
    max_tokens: 3096,
  };

  const messages: Messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content,
    },
  ];
  const user: string = "htmlPage";
  const data: DataUser = { messages, config };
  return await OpenAi.slow(user, message, data);
}

export default nextJsCoder;
