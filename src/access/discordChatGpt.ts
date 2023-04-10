import environment from "../class/Environment";
import { Client, GatewayIntentBits } from "discord.js";
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
    const time = Date.now();
    const user = messageCreate.author.username;
    const message = messageCreate.content.toLocaleLowerCase();
    const channelType: string = messageCreate.channel.type as unknown as string;

    console.log("message: ", user, message);
    if (messageCreate.author.bot) {
      return;
    }
    if (channelType === "dm") {
      return;
    }
    if (message === "!help") {
      await OpenAi.messagesReset(user);
      await messageCreate.channel.send(`.
      
      **COMMANDS:**      
      \`\`\`\
      Chat manager:

      !reset : Delete the Historic chat
      \`\`\`\
      
      \`\`\`\
      Chat configure behavior category:

      !coder    : Transform chat like a coder assistant

      !bug      : Transform chat like a coder bug fixer assistant

      !default  : Normal chat bot
      \`\`\`\
      
      
      \`\`\`\
      Chat types:

      Fast chat without context : Write normal text

      Slow Chat with context    : Write initial with "#"
      \`\`\`\
      `);
      return;
    }
    if (message === "!reset") {
      await OpenAi.messagesReset(user);
      await messageCreate.channel.send("Historic is empty");
      return;
    }
    if (message.toLocaleLowerCase() === "!coder") {
      await OpenAi.setContentDefault(
        user,
        `You are a coder assistant, use discord markdown to format your response, use code form when is a code, create and response fast`
      );
      await messageCreate.channel.send("I'm coder assistant");
      return;
    }
    if (message.toLocaleLowerCase() === "!bug") {
      await OpenAi.setContentDefault(
        user,
        `You are a coder assistant, use discord markdown to format your response, use code form when is a code, fix bug that code`
      );
      await messageCreate.channel.send("I'm coder bugfix");
      return;
    }
    if (message.toLocaleLowerCase() === "!default") {
      await OpenAi.setContentDefault(
        user,
        `You are a helpful assistant inside discord, use discord markdown to format your response`
      );
      await messageCreate.channel.send("I'm normal chat");
      return;
    }

    if (message.startsWith("#")) {
      const replaceMessage = message.replace("#", "");
      console.log("replaceMessage: ", replaceMessage);
      const result = await messageCreate.channel.send(
        `Já respondo, em 30s ...`
      );
      const response: string = await OpenAi.turbo(user, replaceMessage);
      await result.edit(`${response}`);
      return console.log(
        "Tempo para resposta: ",
        (Date.now() - time) / 1000,
        "s"
      );
    } else {
      const result = await messageCreate.channel.send(`Já respondo, em 5s ...`);
      const response: string = await OpenAi.davinci_003(user, message);
      await result.edit(`${response}`);
      return console.log(
        "Tempo para resposta: ",
        (Date.now() - time) / 1000,
        "s"
      );
    }
  });
}

export default discordChatGpt;
