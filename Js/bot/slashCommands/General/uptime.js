const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const moment = require("moment");
require("moment-duration-format");


module.exports = {
    name: "uptime",
    description: "🕰 Get the bot uptime",
    cooldown: 300,

    run: async (bot, interaction, args) => {

        try {


            const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const timestamp = new Date().getTime() - Math.floor(bot.uptime);
            const embed = new MessageEmbed()
                .setTitle(
                    `🕐 Uptime`,
                    interaction.guild.iconURL({
                        dynamic: true,
                        format: "png",
                    })
                )
                .addField(`🕰 Uptime`, `\`\`\`${duration}\`\`\``)
                .addField(`🚀 Date Launched`, `<t:${moment(timestamp).unix()}> (<t:${moment(timestamp).unix()}:R>)`)
                .setTimestamp()
                .setFooter({
                    text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.member.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setColor("#57c478");

          
            interaction.followUp({embeds: [embed]});

        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
}