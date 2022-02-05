const { covidApi } = require("../config.json");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js"); // 5. 버튼 모듈

const { SlashCommandBuilder } = require("@discordjs/builders");

const request = require("request");

const options = {
  uri: `https://api.corona-19.kr/korea/country/new/?serviceKey=${covidApi}`,
  qs: {
    // data: {},
  },
};

let todayCovid = 0;
request(options, function (error, response, body) {
  const obj = JSON.parse(body);
  if (!error && response.statusCode == 200) {
    // console.log(obj.korea.newCase);
    todayCovid = obj.korea.newCase;
  }
});

const wait = require("util").promisify(setTimeout);

const { time } = require("@discordjs/builders");
// const date = new Date();

// const timeString = time(date); // 절대적인 시간
// const relative = time(date, "R"); // 현재 기준으로 작성된 시간(몇초전)

// const everyDay =
//   date.getDay() === 0
//     ? "일요일"
//     : date.getDay() === 1
//     ? "월요일"
//     : date.getDay() === 2
//     ? "화요일"
//     : date.getDay() === 3
//     ? "수요일"
//     : date.getDay() === 4
//     ? "목요일"
//     : date.getDay() === 5
//     ? "금요일"
//     : "토요일";

const IMG =
  "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/28/84a5d147-b802-472c-95df-3d588aab83f9.jpg";

module.exports = {
  data: new SlashCommandBuilder().setName("covid").setDescription("covid info"),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#FF3333")
      .setTitle("코로나 19")
      .setURL("http://ncov.mohw.go.kr/bdBoardList_Real.do")
      .setDescription("코로나 19 정보를 확인할 수 있습니다.")
      .setThumbnail(
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202109/28/84a5d147-b802-472c-95df-3d588aab83f9.jpg"
      );
    const timeString = time(new Date()); // 절대적인 시간
    await interaction.reply({
      content: `${timeString} 기준\n확진자 ${todayCovid}명 입니다 😷`,
      embeds: [embed],
      //   components: [row],
    });

    // await interaction.reply(`훠훠훠 오늘 조선인은`);
    // await wait(1000);
    // await interaction.followUp(`${todayCovid}명`);
    // await wait(1000);
    // await interaction.followUp(`감소했숩니다 훠훠`);
  },
};
