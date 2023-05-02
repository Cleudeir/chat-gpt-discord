import commands from "../discord/commands";
import { corParams, proposeCoder } from "./Proposes";
import { DataUser, model } from "../types";
import { Message } from "discord.js";
import ChatGpt from "../openAi";

export default async function coder(
  message: string,
  messageCreate: Message<boolean>,
) {
  await messageCreate.channel.send(`Já respondo, em 30s ...`);
  let data: DataUser = {
    messages: [
      {
        content: corParams + proposeCoder,
        role: "system",
      },
    ],
    config: { model: model.gptTurbo003 },
  };
  console.log(message);
  let response = await ChatGpt.slow(message, data)
  await messageCreate.channel.send(`${response.slice(0,1999)}`);
}
