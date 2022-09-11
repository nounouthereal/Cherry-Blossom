const { MessageEmbed } = require(`discord.js`)



module.exports.run = async (bot, message, args) => {

    try {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

        if (!member) {
            member = bot.user
        }
        
        if (member.id == message.author.id) {
            let authorUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : Really, you want to suicide , ehh.`)
                .setColor("RED")
            return message.reply({ embeds: [authorUserError] })
        }


        const deathsGif = [`https://c.tenor.com/NbBCakbfZnkAAAAC/die-kill.gif`, `https://c.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif`, `https://c.tenor.com/-UbmVOLixPcAAAAC/killing-anime-girl.gif`, `https://c.tenor.com/pwPMerSJ-6gAAAAC/happy-sugar-life-%E3%83%8F%E3%83%83%E3%83%94%E3%83%BC%E3%82%B7%E3%83%A5%E3%82%AC%E3%83%BC%E3%83%A9%E3%82%A4%E3%83%95.gif`,`https://c.tenor.com/3BTuBDozaMgAAAAd/battle-in5seconds-after-meeting-mion.gif`,`https://c.tenor.com/G9tCUL5OBcYAAAAC/stab-knife.gif`]

        const deathsText = [`🔪 <@${message.author.id}> murdered <@${member.id}>`, `🥷 <@${message.author.id}> assassinated <@${member.id}>`, `🩸 <@${message.author.id}> let the blood out of <@${member.id}>`, `🪦 <@${message.author.id}> killed <@${member.id}>`, `💀 <@${message.author.id}> put an end to the days of <@${member.id}>`, `☠️ <@${member.id}> was killed by <@${message.author.id}>`, `🪦 <@${member.id}> was assasinated by <@${message.author.id}>`]


        const choosedDeathsGifs = deathsGif[Math.floor(Math.random() * deathsGif.length)];

        const choosedDeathText = deathsText[Math.floor(Math.random() * deathsGif.length)];
        console.log(choosedDeathsGifs)

        const embed = new MessageEmbed()

            .setColor(`RANDOM`)

            .setAuthor({
                name: `⚰️ Coffin of ${member.displayName || member.username}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 2048,
                }),
            })
            .setFooter({
                text: `☠️ Kill • Asked by ${message.member.displayName}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: `png`,
                    size: 2048,
                }),
            })
            .setImage(choosedDeathsGifs)
            .setDescription(`>>> ${choosedDeathText}${Math.floor(Math.random() * 100 + 1) == 1 ? `\n||I want to kill myself||` : ``}`);
        message.reply({ embeds: [embed] });


    } catch (err) {

        console.log(err);
        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor(`RED`)
            .setTimestamp()
        message.reply({ embeds: [basicError] })

    }


}

module.exports.config = {
    name: 'kill', // Command Name
    description: '🔪 Make a murder', // Description
    usage: '+kill Optionnal: <user>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['assasinate','eliminate','murder'], // Aliases 
    cooldown: 5 // Command Cooldown
}