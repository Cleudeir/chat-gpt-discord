import environment from "../class/Environment";
import { Configuration, OpenAIApi } from "openai";
import {Client,  GatewayIntentBits } from "discord.js";

async function chatbot() {
  const bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  });
  bot.login(environment.get("DISCORD_KEY"));
  bot.on("ready", async (messageCreate) => {
    console.log("✔️  Bot is initiate");
    bot.user?.setActivity("Listening");
  });

  bot.on("messageCreate", async (messageCreate) => {
    console.log("message: ", messageCreate.content);
    if (messageCreate.author.bot) {
			return;
		}

    const channelType : string = messageCreate.channel.type as unknown as string
		if ( channelType === "dm") {
			return;
		}
    const configuration = new Configuration({
      apiKey: environment.get("GPT_KEY"),
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${messageCreate.content}`,
      temperature: 0.5,
      max_tokens: 2048,
    });
    console.log("response: ", response.data.choices[0].text);
    await messageCreate.channel.send(`${response.data.choices[0].text}`)
    
  });
}

export default chatbot;
