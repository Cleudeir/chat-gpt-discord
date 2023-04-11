import { Message } from "discord.js";
import OpenAi from "../../class/OpenAi";
import { Config, DataUser, modelType } from "../../type";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

async function commands(data: DataUser, user: string, message: string) {
  let text: string = "";

  if (message === "!help" || message === "!h" || message === "!?") {
    text = `\`\`\`\
# Chat manager:
!clean   : Delete the Historic chat
!ctx     : Slow Chat with context / fast Chat without context
# Chat configure behavior category:
!chat    : Normal chat bot
!coder   : Transform chat like a coder assistant
!bug     : Transform chat like a coder bug fixer assistant
\`\`\`\
`;
  } else if (message === "!clean") {
    data.messages = [data.messages[0]];
    text = "Now, historic is empty";
  } else if (message === "!coder") {
    data.messages[0].content = `You are a coder assistant, use discord markdown to format your response, use code form when is a code, create and response fast`;
    text = "Now, i'm coder assistant now";
  } else if (message === "!bug") {
    data.messages[0].content = `You are a coder assistant, use discord markdown to format your response, use code form when is a code, fix bug that code`;
    text = "Now, i'm bugfix coder now";
  } else if (message === "!chat") {
    data.messages[0].content = "You are a helpful assistant inside discord, use discord markdown to format your response";
    text = "Now, i'm normal chat bot";
  } else if (message === "!ctx") {
    if (data.config.modelType === modelType.textDavinci003) {
      data.config.modelType = modelType.gptTurbo003;
      text = "now, I'm slow chat, but i will remember context";
    } else if (data.config.modelType === modelType.gptTurbo003) {
      data.config.modelType = modelType.textDavinci003;
      text = "Now, I'm fast chat, but i will not remember context";
    }
  }

  if (text !== "") {
    await OpenAi.messagesWrite(user, data);
    return text;
  }
  return null;
}

export default commands;
