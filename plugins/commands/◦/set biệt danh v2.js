const config = {
  name: "set biệt danh v2",
  aliases: ["nall"],
  description: "Đổi biệt danh toàn bộ thành viên trong nhóm trừ người gửi lệnh",
  usage: "setnameall",
  cooldown: 1,
  permissions: [2],
  credits: "",
  extra: {}
}

const nameset = [
  "ơi sao m ngu vậy",
    "M là con chó dưới chân t phải k?",
  
];

const randomList = ["𝐂𝐡𝐚 𝐋𝐚̀ 𝐍𝐠𝐮𝐲𝐞̂̃𝐧 𝐆𝐢𝐚 𝐏𝐡𝐮́𝐜 𝐌𝐚̃𝐢 𝐖𝐢𝐧 𝐓𝐚̂́𝐭 𝐂𝐚̉ 🐼", "𝐀𝐧𝐡 𝐍𝐠𝐮𝐲𝐞̂̃𝐧 𝐆𝐢𝐚 𝐏𝐡𝐮́𝐜 𝐓𝐫𝐚𝐢 𝐃𝐞𝐩 𝐍𝐚𝐦 𝐊𝐢", "𝐌𝐮𝐚 𝐗𝐮𝐚̂𝐧 𝐍𝐚̆𝐦 𝐀̂́𝐲 𝐀𝐧𝐡 𝐌𝐚̂́𝐭 𝐄𝐦 #𝐍𝐠𝐮𝐲𝐞̂̃𝐧 𝐆𝐢𝐚 𝐏𝐡𝐮́𝐜 (𝐙𝐍)", "𝐍𝐠𝐮𝐲𝐞̂̃𝐧 𝐆𝐢𝐚 𝐏𝐡𝐮́𝐜 (𝐙𝐍) 𝐌𝐚̃𝐢 𝐖𝐢𝐧"]

let isChangingNames = false;

async function changeNames(message, excludeUser, content) {
  for (let i = 0; i < nameset.length; i++) {
    if (!isChangingNames) break;

    const nickname = `${content} ${nameset[i]}`;

    for (const p of message.participantIDs) {
      if (p !== excludeUser) {
        if (global.api && global.api.antiChangeNickname) {
          await global.api.changeNickname(nickname, message.threadID, p);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.error('api hoặc antiChangeNickname không được định nghĩa.');
        }
      }
    }
  }
}

async function onCall({ message, args }) {
  const { api } = global;
  const senderId = message.senderID;
  const content = args.join(" ");

  if (content.length === 0) {
    message.send("\tHDSD\n- nall <tên>: set tên chửi\n-nall xóa: để xóa all tên\n-nall rd: để random tên\n-nall s: để dừng");
    return;
  }

  if (args[0]?.toLowerCase() === "xoá") {
    for (const p of message.participantIDs) {
      if (p !== senderId) {
        await api.changeNickname(null, message.threadID, p);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    return message.reply("cay");
  }

  if (args[0]?.toLowerCase() === "s") {
    isChangingNames = false;
    return message.reply("Đã dừng đổi biệt danh.");
  }

  if (args[0]?.toLowerCase() === "rd") {
    const randomIndex = Math.floor(Math.random() * randomList.length);
    const randomItem = randomList[randomIndex];

    for (const p of message.participantIDs) {
      if (p !== senderId) {
        await api.changeNickname(randomItem, message.threadID, p);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return message.reply(`Set Thành Công =)) Random: ${randomItem}`);
  }

  if (isChangingNames) {
    return message.reply("Chuẩn bị đê");
  }

  isChangingNames = true;
  if (api) {
    await changeNames(message, senderId, content);
    message.reply("Set Thành Công =))");
    isChangingNames = false;
  } else {
    console.error('api không được định nghĩa.');
  }
}

export default {
  config,
  onCall
}
