const { MessageEmbed } = require(`discord.js`)
const fetch = require('node-fetch');



module.exports.run = async (bot, message, args) => {


    try {

        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

        if (!member) {
            member = bot.user
        }

        if (member.id == message.author.id) {
            let authorUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : You want to kiss yourself, you're too narcissistic , ehh.`)
                .setColor("RED")
            return message.reply({ embeds: [authorUserError] })
        }



        const res = await fetch("https://nekos.life/api/v2/img/kiss");
        const body = await res.json();
        const embed = new MessageEmbed() // Prettier
            .setAuthor({
                name: `❤️‍🔥 Soo romantic`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setDescription(`>>> 😘 <@${member.id || member.user.id}> just got a kiss from <@${message.member.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| I want someone I can kiss... please let me out||" : ""}`)
            .setImage(body.url)
            .setColor("RANDOM")
            .setFooter({
                text: `😘 Kiss • Asked by ${message.member.nickname}`,
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
    name: 'kiss', // Command Name
    description: '😘 Kiss someone in front of @everyone, romantically', // Description
    usage: '+kiss Optionnal: <user>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['smooch'], // Aliases 
    cooldown: 5 // Command Cooldown
}