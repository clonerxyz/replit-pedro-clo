const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function storeChatLog(msg, io) {
  const data = {
    author: (await msg.getContact()),
    msg: msg.body,
    chat: (await msg.getChat()).name
  };
  await prisma.chatLog.create({
    data: {
      name: data.author?.pushname,
      msg: data.msg,
      number: data.author?.number,
      group: data.chat,
    }
  });
  io.sockets.emit('new_msg', data);
}

module.exports = { storeChatLog };