const { MessageEmbed } = require(`discord.js`)
const fetch = require('node-fetch');



module.exports.run = async (bot, message, args) => {


    try {


        const embed = new MessageEmbed() // Prettier
            .setAuthor({
                name: `1/20 Bot easter eggs`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setDescription(`>>> 😴 Mais laisse moi dormir ya zeubi${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||WAW If you see this screen and send it to nounou#4483 you have a lot of chance 1 on 1000||" : ""}`)
            .setImage("https://c.tenor.com/7ezoWCBNdWgAAAAC/zeubi-meme.gif")
            .setColor("RANDOM")
            .setFooter({
                text: `1/20 Bot easter eggs • Asked by ${message.member.displayName}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setTimestamp()
            .setURL("https://c.tenor.com/7ezoWCBNdWgAAAAC/zeubi-meme.gif");
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
    name: 'laissemoidormir', // Command Name
    description: '1/20 Bot easter eggs', // Description
    usage: '1/20 Bot easter eggs', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['easter'], // Aliases 
    cooldown: 5 // Command Cooldown
}