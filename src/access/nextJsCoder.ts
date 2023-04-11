import { ChatCompletionRequestMessageRoleEnum } from "openai";
import OpenAi from "../class/OpenAi";
import { Config, DataUser, Messages, modelType } from "../type";
async function nextJsCoder(body: any) {
  const message = `create a 2 files codes and suggest changed a ideal path name when exists Ideal Component Name.
 first file : ./ComponentName/index.js and his content: a  Nextjs 13 page include in this pages that features : "${body.feature}".
 second file : ./ComponentName/index.module.css  and his content: pretty and modern CSS.
 pls, response in code form`;

  const content = `You are a helpful assistant`;
  const config: Config = {
    modelType: modelType.textDavinci003,
    temperature: 0.5,
    max_tokens: 3096,
  };

  const messages : Messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content,
    },
  ];

  const data: DataUser = { messages, config };
  return await OpenAi.withOutContext(message, data, modelType.textDavinci003);
}

export default nextJsCoder;
