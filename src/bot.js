require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client();
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in`);
});

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(1)
      .split(/\s+/);

    if (CMD_NAME === 'kick') {
      if (args.length === 0) return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member.kick();
      } else {
        message.channel.send('That member was not found');
      }
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
