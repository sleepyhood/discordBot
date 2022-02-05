const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js"); // 5. 버튼 모듈
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder().setName("btn").setDescription("show btn"),
  async execute(interaction) {
    // 5. 버튼만들기 (PRIMARY 스타일로 Primary 이름을 가지고 primary id를 가진다.)
    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("primary")
        .setLabel("Primary")
        .setStyle("PRIMARY")
        .setEmoji("👩") // 5.3 이모티콘 설정 가능
      // .setDisabled(true) // 5.2 버튼이 안눌리게도 설정 가능
    );

    // 5.1 타이틀과 설명이 포함된 버튼
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Some title")
      .setURL("https://discord.js.org")
      .setDescription("Some description here");

    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
      embeds: [embed],
      components: [row],
    });

    if (!interaction.isButton()) return; // 5.4 버튼이 안 눌리면

    await interaction.reply({ content: "btn On!", components: [row] });
  },
};

// https://discordjs.guide/interactions/buttons.html#deferring-and-updating-the-button-message
