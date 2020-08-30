require('dotenv').config();

const { Client } = require('discord.js');

const client = new Client();
const PREFIX = '$';

client.on('ready', () => {
  console.log(`${client.user.username} has logged in`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(1)
      .split(/\s+/);

    if (CMD_NAME === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0) return message.reply('Please provide an ID');
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked.`))
          .catch((err) => {
            message.channel.send('I do not have permissions :(');
            console.log(err);
          });
      } else {
        message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS'))
        return message.reply('You do not have permissions to use that command');
      if (args.length === 0) return message.reply('Please provide an ID');

      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send('User successfully has been banned');
      } catch (err) {
        console.log(err);
        message.channel.send(
          'An error occured. Either I do not have permissions or the user not found'
        );
      }
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
