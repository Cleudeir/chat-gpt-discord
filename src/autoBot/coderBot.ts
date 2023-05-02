import { corParams, proposeCoderBot} from "./Proposes";
import { DataUser, model } from "../types";

import sleep from "../util/sleep";
import { Message } from "discord.js";
import Cache from "../Cache";
import replaceText from "../util/replaceText";
import ChatGpt from "../openAi";

export default async function coderBot(
  botMessage: string,
  count: number,
  messageCreate: Message<boolean>,
  setCount: (number: number) => void,
  end: number
) {
  await messageCreate.channel.send(`Já respondo, em 30s ...`);
  let message = messageCreate.content.toLocaleLowerCase().replace("$", "");
  let data: DataUser = {
    messages: [
      {
        content: corParams + proposeCoderBot,
        role: "system",
      },
    ],
    config: { model: model.gptTurbo003 },
  };

  setCount(count);
  message = `${botMessage}${count}`;
  console.log(message);
  let response = await ChatGpt.slow(message, data);
  console.log("sleep");

  if (message.includes(botMessage)) {
    count = Number(message.replace(botMessage, ""));
  }

  const text = replaceText(response);
  if (text) {
    data = {
      messages: [data.messages[0]],
      config: data?.config,
    };
    setCount(count + 1);
    const { fileName, path, extension, code, resume } = text;
    console.log("path : ", `project/src/${path}/${fileName}.${extension}`);
    const createProject = new Cache(`project/src/${path}`, extension);
    createProject.messagesWrite(fileName, code);
    await messageCreate.channel.send(`.
File: project/src/${path}/${fileName}.${extension}
Resume: ${resume}
    `);
    if (count < end) {
      await sleep(20 * 1000);
      messageCreate.channel.send(`$${botMessage}${count + 1}`);
    }
  } else {
    await messageCreate.channel.send(`Concepcion error`);
    await sleep(20 * 1000);
    messageCreate.channel.send(`$${botMessage}${count}`);
  }
}
