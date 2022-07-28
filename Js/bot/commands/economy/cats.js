const { MessageEmbed } = require('discord.js');
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const i = '📲'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const request = require('request')

module.exports.run = async (bot, message, args) => { 
 try {
   const random = Math.round(Math.random(0.5) * 200);
   // ${random.toLocaleString()} coins.
   const member = message.member;
       let likes = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`✅ **${member.user.username}** : Votre photo de chat a reçu ${random.toLocaleString()} likes (Donc ${random} :dollar:).`);
   
    request('http://aws.random.cat/meow', function (error, body) {
      var result = JSON.parse(body.body)
      const embed = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`${i} **${member.user.username}** : A posté cette photo sur Twitter.`)
        .setImage(result.file)

      message.channel.send({embeds: [embed]}).then(message.channel.send({embeds: [likes]}));
      
      bot.giveCoins(message.author.id, random);
    })
  } catch (err) {
    message.channel.send(bot.errors.genericError + err.stack).catch();
  }
}
module.exports.config = {
    name: 'cat', // Command Name
    description: 'Postez des photos de chats pour gagner de l\'argent.', // Description
    usage: '+cat', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 100 // Command Cooldown
}