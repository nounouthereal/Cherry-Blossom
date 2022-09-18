const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
let baka_emote = "<:baka:1019292436482232332>"




module.exports.run = async (bot, message, args) => {
    try {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());


        let sentence

        if (!member || member.id == message.author.id) {
            member = message.author
            sentence = `${baka_emote} || <@${message.member.id}> is a baka.`
        }
        else {
            sentence = `${baka_emote} || <@${message.member.id}> said that <@${member.id}> is a baka.`
        }


        const res = await fetch("https://api.catboys.com/baka");
        const body = await res.json();
        const embed = new MessageEmbed() // Prettier
            .setAuthor({
                name: `😒 Baka !`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setDescription(`>>> ${sentence}`)
            .setImage(body.url)
            .setColor("RANDOM")
            .setFooter({
                text: `😒 Baka • Asked by ${message.member.displayName}`,
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
    name: 'baka', // Command Name
    description: '😒 Says to someone he is a baka', // Description
    usage: '+baka Optionnal: @user', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    cooldown: 5 // Command Cooldown
}