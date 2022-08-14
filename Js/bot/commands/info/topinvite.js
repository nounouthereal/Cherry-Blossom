

const { MessageEmbed } = require("discord.js");

const x = '<:no:994948190606475334>'
const tick = '<:verify:995696353252495441>'

module.exports.run =  async (bot, msg, args) => {

    const invites = await msg.guild.invites.fetch();
    const topTen = invites.filter((inv) => inv.uses > 0).sort((a, b) => b.uses - a.uses).first(10);

    if(topTen.length === 0) return msg.cahnnel.send(`:warning: No invitations in ${message.guild.name}!`);

    let embed = new MessageEmbed()
        .setTitle(`Top Invites in ${msg.guild.name}`)
        .setAuthor(msg.guild.name, msg.guild.iconURL())
        .setDescription(topTen.map((inv) => `• **${inv.inviter.username}**'s invite **${inv.code}** has **${inv.uses.toLocaleString()}** uses.`).join("\n"))
        .setColor(message.guild.me.displayHexColor);
    msg.channel.send({embeds: [embed]})
};
    
module.exports.config = {
    name: 'topinvite', // Command Name
    description: 'Donnes des informations sur le serveur.', // Description
    usage: '+topinvite', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['topinv','inviteclassement','invitetop'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}