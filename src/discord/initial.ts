import coder from "../autoBot/coder";
import environment from "../util/Environment";
import { Client, GatewayIntentBits } from "discord.js";
import  fs  from 'fs';

async function discord() {
  let count = 1;
  let last = 1;
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

  function setCount(number: number) {
    count = number;
  }

  bot.on("messageCreate", async (messageCreate) => {
    const authorType = messageCreate.author.bot;
    const user = messageCreate.author.username.replace(/[^0-9a-z]/gi, "");
    const message = messageCreate.content.toLocaleLowerCase();
    const channelType: string = messageCreate.channel.type as unknown as string;
    const time = Date.now();
    if (
      (authorType && !message.startsWith("$") && !message.startsWith("#")) ||
      channelType === "dm"
    ) {
      console.log("return", message);
      return;
    }
    if(message === "!rm"){
      fs.rmSync("temp/", { recursive: true, force: true });
    }
    const botMessage = "using structure project list to create a code without tag 'a' to item ";
    if (message.startsWith("!go")) {
      const [params1, params2, params3] = message.split(" ");
      count = Number(params2) || 1
      last = Number(params3)  || Number(params2) || 1
      console.log("start: ", count);
      console.log('last: ', last);
      messageCreate.channel.send(`$Starting a create a code`);
    }
    if (message.startsWith("$")) {
      await coder(botMessage, count, messageCreate, setCount, last);
    }
    console.log("Tempo para resposta: ", (Date.now() - time) / 1000, "s");
  });
}

export default discord;
