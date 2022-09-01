const { MessageEmbed } = require('discord.js')

module.exports.run = async (bot, message, args) => {
    try {
        const ping = new MessageEmbed() 
         .setTitle(`🏓 Pong!`)
         .addField(`⏱️ My ping:`, `\`\`\`${Math.floor((Date.now() - message.createdTimestamp).toString().replace(/-/g, ""))}ms\`\`\``)
         .addField(`⏱️ API ping (Websocket):`, `\`\`\`${Math.round(bot.ws.ping)}ms\`\`\``)
         .setFooter({ text: `Asked by ${message.author.username}`, iconURL: message.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
         .setColor("#5865F2")
         .setTimestamp();
        message.reply({ embeds: [ping] });
       } catch (err) {
        console.log(err);
        throw new Error('An error occured in ping command') ;
       }
}
module.exports.config = {
    name: 'ping', // Command Name
    description: 'Ping command.', // Description
    usage: '+ping', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [`pinginfo`], // Aliases 
    cooldown: 5 // Command Cooldown
}