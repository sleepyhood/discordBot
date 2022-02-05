const { SlashCommandBuilder } = require("@discordjs/builders");

const wait = require("util").promisify(setTimeout);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
    // 일반 답변

    // 추가로 답변을 달아주는것도 가능
    // await interaction.followUp("Pong again!");

    // 4. 명령어에 효과를 추가할 수 있다. (2초뒤에 pong again 함)
    // await wait(2000);
    // await interaction.editReply("Pong again!");

    // 4.1 아래 예시는 4초동안 생각후에 답장
    // await interaction.deferReply();
    // await wait(4000);
    // await interaction.editReply("Pong!");

    //4.2 본인만 확인가능한 명령어도 작성가능(ephemeral 옵션)
    // await interaction.reply({ content: 'Pong!', ephemeral: true });
  },
};
