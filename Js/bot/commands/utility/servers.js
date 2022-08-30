const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports.run = async (bot, message, args) => {

  try {
   const embed = new MessageEmbed() 
    .setTitle(`<:analytics:994948046314012772> I'm in \`${bot.guilds.cache.size}\` servers!`)
    .addField(`<:user:1013896589061926922> User Count`, `\`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members\``, true)
    .addField(`<:chat:995075584147345439> Channel Count`, `\`${bot.channels.cache.size} channels\``, true)
    .setFooter({
     text: `Asked by ${message.author.username} • ${message.guild.name}`,
     iconURL: message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     }),
    })
    .setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rCjAc6P3tpKw0u_10pXKDMJZppbfw72AGQ&usqp=CAU")
    .setColor("RANDOM")
    .setTimestamp();
   const row = new MessageActionRow() // Prettier
    .addComponents(
     new MessageButton() // Prettier
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=944572861874602054&permissions=1644971949559&scope=bot%20applications.commands`)
      .setEmoji(`<a:verifyred:994197138504417310>`)
      .setLabel("Invite me!")
      .setStyle("LINK")
    );
   message.channel.send({ embeds: [embed], components: [row] });
  } catch (err) {
   console.log(err);
   return bot.createCommandError(message, err);
  }
};


module.exports.config = {
    name: 'servers', // Command Name
    description: 'Affiche le classement du srveur sur le niveau', // Description
    usage: '+servers', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['guilds'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}

