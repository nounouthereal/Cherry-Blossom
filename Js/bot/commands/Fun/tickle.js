const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');



module.exports.run = async (bot, message, args) => {
    try {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

        if (!member) {
            member = bot.user
        }

        if (member.id == message.author.id) {
            let authorUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : Bruh, how old are you to tickle yourself.`)
                .setColor("RED")
            return message.reply({ embeds: [authorUserError] })
        }



        const res = await fetch("https://nekos.life/api/v2/img/tickle");
        const body = await res.json();
        const embed = new MessageEmbed()
            .setAuthor({
                name: `🤣🤏 Stop keep laughing`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setDescription(`>>> 🤣🤏 You must be bored... <@${member.id || member.user.id}> is getting tickled by <@${message.author.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| They slap me too... please let me out||" : ""}`)
            .setImage(body.url)
            .setColor("RANDOM")
            .setFooter({
                text: `🤣🤏 Tickle • Asked by ${message.member.displayName}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setTimestamp()
            .setURL(body.url);
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
    name: 'tickle', // Command Name
    description: '🤣🤏 Tickle someone, hardly', // Description
    usage: '+tickle Optionnal: @user', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    cooldown: 5 // Command Cooldown
}