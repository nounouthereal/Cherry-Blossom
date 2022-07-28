const { MessageEmbed } = require('discord.js');
const pistol_ancient_revolver = '<:Revolver_icon:962344137607245824>'

module.exports.run = async (bot, message, args) => {
    let embed1 = new MessageEmbed().setTitle('Test').setDescription(pistol_ancient_revolver)

    message.channel.send(embed1)

}
module.exports.config = {
    name: 'test', // Command Name
    description: 'Test command.', // Description
    usage: '+test', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: ["ADMINISTRATOR"], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}