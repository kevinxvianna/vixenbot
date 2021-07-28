require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  const musicChannel = process.env.musicChannel;
  const staffMusicChannel = process.env.staffMusicChannel;

  const isMusicChannel = msg.channel.id === musicChannel || msg.channel.id === staffMusicChannel;

  const isMe = msg.author.bot;
  const isURL = msg.content.includes('http://') || msg.content.includes('https://') || msg.content.includes('www.');

  console.log(`isMe: ${isMe}`)

  const shouldReply = ((msg.content.includes("!p") || 
  msg.content.includes("-p") || msg.content.includes("=p") || 
  msg.content.includes("!P") || msg.content.includes("-P")) ||
  msg.content.includes("=P") || msg.content.includes("-P")) &&
  !isMusicChannel && !isMe && !isURL;

  if(shouldReply){
    msg.delete({timeout: 3000});
    let reply = await msg.reply('solicite pelo canal de música!').then((msg) => msg);
    reply.delete({timeout: 3500});
  }

  const isSubmittingCommands = (msg.content.includes("-sk") || msg.content.includes("!fs") ||
   msg.content.includes("-st") || msg.content.includes("-ST") || msg.content.includes('!FS') ||
   msg.content.includes("-SK") && !isMusicChannel && !isMe);

   if(isSubmittingCommands){
    msg.delete({timeout: 3000});
    let reply = await msg.reply('esse comando só funciona no canal de música!').then((msg) => msg);
    reply.delete({timeout: 3500});
  }
})

client.login(process.env.token);