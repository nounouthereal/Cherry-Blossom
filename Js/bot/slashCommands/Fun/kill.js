const { MessageEmbed } = require(`discord.js`)


module.exports = {
    name: `kill`,
    description: `🔪 Make a murder`,
    cooldown: 5,
    options: [
        {
            name: `user`,
            description: `🩸 The user to kill`,
            type: `USER`,
            required: false,
        }
    ],

    run: async (bot, interaction, args) => {

        try {



            let member = interaction.options.getUser(`user`) || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            if (!member) {
                member = bot.user
            }

            if (member.id == interaction.user.id) {
                let authorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Really, you want to suicide , ehh.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }

            
            const deathsGif = [`https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif`, `https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif`, `https://c.tenor.com/-UbmVOLixPcAAAAC/killing-anime-girl.gif`, `https://c.tenor.com/pwPMerSJ-6gAAAAC/happy-sugar-life-%E3%83%8F%E3%83%83%E3%83%94%E3%83%BC%E3%82%B7%E3%83%A5%E3%82%AC%E3%83%BC%E3%83%A9%E3%82%A4%E3%83%95.gif`,`https://c.tenor.com/3BTuBDozaMgAAAAd/battle-in5seconds-after-meeting-mion.gif`,`https://c.tenor.com/G9tCUL5OBcYAAAAC/stab-knife.gif`]

            const deathsText = [`🔪 <@${interaction.user.id}> murdered <@${member.id}>`, `🥷 <@${interaction.user.id}> assassinated <@${member.id}>`, `🩸 <@${interaction.user.id}> let the blood out of <@${member.id}>`, `🪦 <@${interaction.user.id}> killed <@${member.id}>`, `💀 <@${interaction.user.id}> put an end to the days of <@${member.id}>`, `☠️ <@${member.id}> was killed by <@${interaction.user.id}>`, `🪦 <@${member.id}> was assasinated by <@${interaction.user.id}>`]


            const choosedDeathsGifs = deathsGif[Math.floor(Math.random() * deathsGif.length)];

            const choosedDeathText = deathsText[Math.floor(Math.random() * deathsGif.length)];
            console.log(choosedDeathsGifs)

            const embed = new MessageEmbed() 
            
                .setColor(`RANDOM`)

                .setAuthor({
                    name: `⚰️ Coffin of ${member.nickname || member.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: `png`,
                        size: 2048,
                    }),
                })
                .setFooter({
                    text: `☠️ Kill • Asked by ${interaction.member.nickname}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: `png`,
                        size: 2048,
                    }),
                })
                .setImage(choosedDeathsGifs)
                .setDescription(`>>> ${choosedDeathText}${Math.floor(Math.random() * 100 + 1) == 1 ? `\n||I want to kill myself... please let me out||` : ``}`);
            interaction.followUp({ embeds: [embed] });


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
