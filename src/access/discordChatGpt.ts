import environment from "../class/Environment";
import { Configuration, OpenAIApi } from "openai";
import {Client,  GatewayIntentBits } from "discord.js";
import OpenAi from "../class/OpenAi";

async function discordChatGpt() {
  const bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  });
  bot.login(environment.get("DISCORD_KEY"));
  bot.on("ready", async () => {
    console.log("✔️  Bot is initiate");
    bot.user?.setActivity("Listening");
  });

  bot.on("messageCreate", async (messageCreate) => {
    console.log("message: ", messageCreate.author.username, messageCreate.content);
    if (messageCreate.author.bot) {
			return;
		}

    const channelType : string = messageCreate.channel.type as unknown as string
		if ( channelType === "dm") {
			return;
		}

    const personType = ["comedian", "sad", "intellectual"] 
    const random = Math.floor(Math.random()*3)
    console.log('random: ', random);
    
    const message = `pls act like a ${personType[random]} person and response-me in português: ${messageCreate.content}`
    const response: string = await OpenAi.turbo(message)
    await messageCreate.channel.send(`${personType[random]} : ${response}`)    
  });
}

export default discordChatGpt;
