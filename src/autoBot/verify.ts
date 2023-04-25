import commands from "../discord/commands";
import { PramsPropose, verifyPropose } from "./Proposes";
import { DataUser, model } from "../types";

import sleep from "../util/sleep";
import { Message } from "discord.js";
import Cache from "../Cache";
import replaceText from "../util/replaceText";
import ChatGpt from "../OpenAi";

export default async function verify(
  botMessage: string,
  count: number,
  messageCreate: Message<boolean>,
  setCount: (number: number) => void
) {
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

  let result = await messageCreate.channel.send(`Já respondo, em 30s ...`);
  let response = await ChatGpt.slow(message, data);
  console.log("sleep");
  await sleep(2 * 1000);
  await result.edit(`${response.slice(0, 1999)}`);
  setCount(count + 1);
  await cache.messagesWrite(botName, data);
  setTimeout(async () => {
    // messageCreate.channel.send(`$${botMessage}${count + 1}`);
  }, 10000);
}
