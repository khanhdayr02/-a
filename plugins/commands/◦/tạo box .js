const config = {
  name: "tb",
  aliases: ["tb"],
  description: "Tạo box",
  usage: "[SL] [+tag]",
  cooldown: 3,
  permissions: [2],
  credits: "XIE"
}

if (!global.taobox) global.taobox = new Set();

const DELAY = 1000;

async function onCall({ message, args }) {
  const { mentions } = message;
  let isStop = args[0]?.toLowerCase() == "s";

  const hasMentions = Object.keys(mentions).length > 0;

  if (!hasMentions || isStop) {
    const newThreadID = await global.api.createNewGroup([message.senderID, global.botID]);
    global.api.sendMessage('Ngu Nha', newThreadID);
    global.api.removeUserFromGroup(global.api.getCurrentUserID(), newThreadID);

    if (isStop) {
      global.taobox.delete(message.threadID);
    }

    return;
  }

  let mentionId;
  let mentionName;

  if (args[0].startsWith('+')) {
    mentionId = args[0].slice(1);
    mentionName = mentions[mentionId];
  } else {
    mentionId = Object.keys(mentions)[0];
    mentionName = mentions[mentionId];
  }

  message.send({
    body: mentionName + ' Ổn Không' + '' + '',
    mentions: [{
      id: mentionId,
      tag: mentionName
    }]
  });

  const groupMembers = [mentionId, global.botID];
  global.taobox.add(message.threadID);

  let amount = parseInt(args[0]) || 1;

  for (let i = 0; i < amount; i++) {
    const newThreadID = await global.api.createNewGroup(groupMembers);
    global.api.sendMessage('', newThreadID);
    global.api.removeUserFromGroup(global.api.getCurrentUserID(), newThreadID);

    await new Promise(resolve => setTimeout(resolve, DELAY));
  }
}

export default {
  config,
  onCall
}
