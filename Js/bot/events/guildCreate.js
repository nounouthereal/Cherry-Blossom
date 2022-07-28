const { MessageEmbed } = require('discord.js');
module.exports = async (bot, guild) => {

  var embed = new MessageEmbed()
        .setColor("#8C00FF")
        .setDescription(`
\n
Hello, I am Fleur de cerisier thank you for inviting me to your server.
`)
		   guild.systemChannel.send(embed)

	
let defaultChannel = "";
guild.channels.cache.forEach((channel) => {
  if(channel.type == "text" && defaultChannel == "") {
    if(channel.permissionsFor(guild.me).has("EMBED_MESSAGES")) {
      defaultChannel = channel;
    }
  }
})
  var embed = new MessageEmbed()
        .setColor("#8C00FF")
        .setDescription(`
\n
Hello, am Fleur de cerisier thank you for inviting me to your server.
`)
  defaultChannel.send(embed)
	
	
	
	
 await bot.dbl.postStats(bot.guilds.cache.size);
}