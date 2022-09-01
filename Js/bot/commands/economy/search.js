const { MessageEmbed } = require("discord.js");
const i = '<:info:688057843558908013>'
const tick = '<:bigtick:779736050892931082>'
module.exports.run = async (bot, message, args) => {
  
    const usertag = message.member;
    const random = Math.round(Math.random() * 100);
    const randomMessage = [
        `You searched into the bin, and you found ${random.toLocaleString()} :coin:`,
        `You searched in a lake, and you found ${random.toLocaleString()} :coin:`,
        `You searched in your fridge, and you found ${random.toLocaleString()} :coin:`,
        `You searched in your garage, and you found ${random.toLocaleString()} :coin:`,
        `You searched in your room, and you found ${random.toLocaleString()} :coin:`,
        `You searched in the cracks of the sofa, and you found a sum of ${random.toLocaleString()} :coin:`,
        `You searched in your mother's drawers, and you found ${random.toLocaleString()} :coin:`,
    ];
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
    let searchembed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`🔍 <@${usertag.user.id}> : **${response}**`);

    await message.channel.send({embeds: [searchembed]}).catch();
    await bot.giveCoins(message.author.id, random);
}

module.exports.config = {
    name: 'search', // Command Name
    description: '🔍 Search for money.', // Description
    usage: '+search', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 8, // Amount of bank space to give when command is used.
    cooldown: 180 // Command Cooldown
}