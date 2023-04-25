import commands from "../discord/commands";
import { PramsPropose, verifyPropose } from "./Proposes";
import { DataUser, model } from "../types";
import sleep from "../util/sleep";
import { Message } from "discord.js";
import Cache from "../Cache";
import ChatGpt from "../OpenAi";
import replaceText from "../util/replaceText";

export default async function verify(
  botMessage: string,
  count: number,
  messageCreate: Message<boolean>,
  setCount: (number: number) => void
) {
  await messageCreate.channel.send(`Já respondo, em 30s ...`);
  const botName = "verify";
  let message = messageCreate.content.toLocaleLowerCase().replace("#", "");
  const cache = new Cache("profile", "json");
  let data: DataUser = await cache.messagesRead(botName);
  if (!data) {
    console.log("new coder");
    data = {
      messages: [
        {
          content: PramsPropose + verifyPropose,
          role: "system",
        },
      ],
      config: { model: model.gptTurbo003 },
    };
    await cache.messagesWrite(botName, data);
  }
  let response = await ChatGpt.slow(message, data);
  console.log("sleep");
  await sleep(2 * 1000);
  await cache.messagesWrite(botName, data);
  const text = replaceText(response);
  if (text) {
    setCount(count + 1);
    const { fileName, path, extension, code } = text;
    console.log("path : ", `project/${path}/${fileName}.${extension}`);
    const createProject = new Cache(`project/${path}`, extension);
    await createProject.messagesWrite(fileName, code);
    await messageCreate.channel.send(`${response.slice(0, 1999)}`);
    setTimeout(async () => {
      messageCreate.channel.send(`$${botMessage}${count + 1}`);
    }, 10000);
  } else {
    setTimeout(async () => {
      messageCreate.channel.send(`$${botMessage}${count}`);
    }, 10000);
  }
}
