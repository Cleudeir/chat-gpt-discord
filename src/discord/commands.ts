import OpenAi from "../openAi";
import { DataUser, model } from "../types";
import { corParams } from "../autoBot/Proposes";

async function commands(data: DataUser, user: string, message: string) {
  let text: string = "";

  if (message === "!help" || message === "!h" || message === "!?") {
    text = `\`\`\`\
# Chat manager:
!clean   : clean historic
!speed   : Slow Chat / fast Chat
# Chat configure behavior category:
!chat    : Normal chat bot
!coder   : Transform chat like a coder assistant
!bug     : Transform chat like a coder bug fixer assistant
!en : English Teacher inside discord
\`\`\`\
`;
  } else if (message === "!coder") {
    data.messages[0].content = `You are a coder assistant, use discord markdown to format your response, use code form when is a code, create and response fast`;
    text = "Now, i'm coder assistant now";
  } else if (message === "!project") {
    data.messages[0].content = corParams;
    data.config.model = model.gptTurbo003;
    text = "Now, i'm Project coder assistant now";
  } else if (message === "!bug") {
    data.messages[0].content = `You are a coder assistant, use Discord markdown to formate response.
    response two steps:
    step one: rewritten that code fixing bug, javascript code form;
    step two: rewritten that code suggest improvement, javascript code form .`;
    text = "Now, i'm bugfix coder now";
  } else if (message === "!chat") {
    data.messages[0].content =
      "You are a helpful assistant inside discord, use discord markdown to format your response";
    text = "Now, i'm normal chat bot";
  } else if (message === "!en") {
    data.messages[0].content = `
    You are a English Teacher inside discord, use discord markdown to format your response.
    All response you need make this steps:   
    step one: response the question;
    step two: if the grammar or written form is not the most appropriate or is wrong, teach the form;
    step three: if ask about any specific meaning word, explains what the word means;
    step for:  if ask about any specific meaning word, using phonetics Portuguese to explains how pronounced that world . 
    `;
    text = "Now, i'm English Teacher";
  } else if (message === "!clean") {
    data.messages = [data.messages[0]];
    text = "clean historic";
  } else if (message === "!speed") {
    if (data.config.model === model.textDavinci003) {
      data.config.model = model.gptTurbo003;
      text = "now, I'm slow chat";
    } else if (data.config.model === model.gptTurbo003) {
      data.config.model = model.textDavinci003;
      text = "now, I'm fast chat";
    }
  }

  if (text !== "") {
    await OpenAi.messagesWrite(user, data);
    return text;
  }
  return null;
}

export default commands;
