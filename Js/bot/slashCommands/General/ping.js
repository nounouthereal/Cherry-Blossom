const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ping",
    description: "🏓 Send an embed with ping informations",
    cooldown: 5,

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

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })

        }
    }
}