const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

// setDescription은 명령어를 치기 전 어떤 기능인지 설명만!
// const commands = [
//   new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Replies with pong!"),
//   new SlashCommandBuilder()
//     .setName("server")
//     .setDescription("Replies with server info!"),
//   new SlashCommandBuilder()
//     .setName("user")
//     .setDescription("Replies with user info!"),
// ].map((command) => command.toJSON());

const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Replies with your input!")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
      .addChoice("Funny", "gif_funny")
      .addChoice("Meme", "gif_meme")
      .addChoice("Movie", "gif_movie")
  );

const commands = [];

// commands 파일 내부에 .js 확장자는 명령어로 인식
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
