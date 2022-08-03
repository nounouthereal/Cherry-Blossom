const { MessageEmbed } = require("discord.js");
const i = '<:info:688057843558908013>'
const tick = '<:bigtick:779736050892931082>'
module.exports.run = async (bot, message, args) => {
  
    const usertag = message.member;
    const random = Math.round(Math.random() * 100);
    const randomMessage = [
        `Vous avez cherché dans la corbeille, et vous avez trouvé ${random.toLocaleString()} :coin:.`,
        `Vous avez cherché dans le lac, et vous avez trouvé ${random.toLocaleString()} :coin:.`,
        `Vous avez cherché dans le frigo, et vous avez trouvé ${random.toLocaleString()} :coin:.`,
        `Vous avez cherché dans le garage, et vous avez trouvé ${random.toLocaleString()} :coin:.`,
        `Vous avez cherché dans votre chambre, et vous avez trouvé ${random.toLocaleString()} :coin:.`,
        `Vous avez cherché dans les fissures du canapé, et vous avez trouvé une somme de ${random.toLocaleString()} :coin:.`,
        `Vous avez cherché les tiroirs de votre mère, et vous avez trouvé ${random.toLocaleString()} :coin:.`,
    ];
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
    let searchembed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🔍 **${usertag.user.username}** : ${response}`);

    await message.channel.send({embeds: [searchembed]}).catch();
    await bot.giveCoins(message.author.id, random);
}

module.exports.config = {
    name: 'search', // Command Name
    description: 'search for coins.', // Description
    usage: '+search', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 15 // Command Cooldown
}