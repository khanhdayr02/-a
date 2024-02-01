import axios from "axios";

const config = {
  name: "sms",
  version: "0.0",
  description: "",
  permissions: [2],
  cooldown: 5
}

async function onCall({ message, args, data }) {
  const user = data.user
  const input = args.join(" ").split(" ")
  const sdt = input[0],
    luot = input[1],
    delay = input[2]

  if (!sdt || !luot || !delay) return message.reply("𝐍𝐡𝐚̣̂𝐩 𝐓𝐡𝐢𝐞̂́𝐮 𝐃𝐮̛̃ 𝐋𝐢𝐞̣̂𝐮 , 𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐓𝐡𝐮̛̣𝐜 𝐇𝐢𝐞̣̂𝐧 𝐋𝐞̣̂𝐧𝐡 𝐒𝐦𝐬\n\n𝐕𝐮𝐢 𝐋𝐨̀𝐧𝐠 𝐃𝐮̀𝐧𝐠 𝐓𝐡𝐞𝐨 𝐇𝐮̛𝐨̛́𝐧𝐠 𝐃𝐚̂̃𝐧\n\n𝐕𝐢́ 𝐃𝐮̣: 𝐬𝐦𝐬 | 𝐬𝐝𝐭 | 𝐬𝐨̂́ 𝐥𝐚̂̀𝐧 | 𝐝𝐞𝐥𝐚𝐲");

  axios.get(encodeURI(`https://spam.sumiproject.io.vn/spam?sdt=${sdt}&luot=${luot}&delay=${delay}`));

  return message.send(`𝐓𝐢𝐞̂́𝐧 𝐇𝐚̀𝐧𝐡 𝐒𝐩𝐚𝐦 🐼\n\n𝐒𝐝𝐭 𝐁𝐢̣ 𝐒𝐩𝐚𝐦: ${sdt} ✨\n\n𝐒𝐨̂́ 𝐋𝐚̂̀𝐧 𝐁𝐢̣ 𝐒𝐩𝐚𝐦: ${luot} 🍀\n\n𝐝𝐞𝐥𝐚𝐲: ${delay} 🕐\n\n𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 𝐋𝐞̣̂𝐧𝐡 𝐒𝐦𝐬: ${user.info.name} 🏝️`)
}

export {
  config,
  onCall
}