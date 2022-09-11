const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const messageCreate = require("../../events/messageCreate");


module.exports.run = async (bot, message, args) => {

    try {
        const res = await fetch("https://api.adviceslip.com/advice"),
            { slip } = await res.json();
        const embed = new MessageEmbed()
            .setTitle(`🤔 Advice`)
            .setDescription(`>>> ${slip.advice}`)
            .setColor("RANDOM")
            .setFooter({
                text: `Requested by ${message.member.displayName}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setThumbnail(
                message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                })
            );
        return message.reply({ embeds: [embed] });
    } catch (err) {
        console.log(err);

        if (err.length > 2010) {
            err.substring(0, 2010)
        }

        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({ embeds: [basicError] })
    }
}

module.exports.config = {
    name: 'advice', // Command Name
    description: '🪢 Get an advice', // Description
    usage: '+advice', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    cooldown: 5 // Command Cooldown
}