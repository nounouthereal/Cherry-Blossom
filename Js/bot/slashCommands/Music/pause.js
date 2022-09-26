const { MessageEmbed } = require('discord.js')




module.exports = {
    name: "pause",
    description: "⏯ Pause the track played right now",
    cooldown: 15,

    run: async (bot, interaction, args) => {

        try {

            const queue = bot.player.getQueue(interaction.guild.id);

            if (!queue) {
                let wrongChannelEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Sorry, but there is no song played right now.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [wrongChannelEmb] })
            }

            if (queue.connection.paused) {
                let wrongChannelEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Sorry, but ${queue.current.title} is already paused`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [wrongChannelEmb] })
            }

            const success = queue.setPaused(true);


            
            const embed = new MessageEmbed()
                .setTitle(
                    `⏯ Song has been paused`,
                    interaction.guild.iconURL({
                        dynamic: true,
                        format: "png",
                    })
                )
                .setDescription(`Currently paused : [${queue.current.title}](${queue.current.url}) in <#${queue.metadata?.id}> ✅`)
                .setImage("https://c.tenor.com/OAKm2CmiB1EAAAAC/play-pause.gif")
                .setFooter({
                    text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.member.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setColor("#57c478")
                .setTimestamp();
            interaction.followUp({embeds: [embed]})




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