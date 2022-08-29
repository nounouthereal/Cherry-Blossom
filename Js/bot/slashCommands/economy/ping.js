const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "🏓 Send an embed with ping informations",
    timeout: 5000,

    run: async (bot, interaction, args) => {  

        try {
            const ping = new MessageEmbed() 
             .setTitle(`🏓 Pong!`)
             .addField(`⏱️ My ping:`, `\`\`\`${Math.floor((Date.now() - interaction.createdTimestamp).toString().replace(/-/g, ""))}ms\`\`\``)
             .addField(`⏱️ API ping (Websocket):`, `\`\`\`${Math.round(bot.ws.ping)}ms\`\`\``)
             .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })
             .setColor("#5865F2")
             .setTimestamp();
            interaction.followUp({ embeds: [ping] });
           } catch (err) {
            console.log(err);
            throw new Error('An error occured in ping command') ;
           }
    }
}