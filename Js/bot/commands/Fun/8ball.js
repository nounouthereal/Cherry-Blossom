const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {

    try {
        if (!args) {
            let noQuestionEmb = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : You need to precise your question`)
                .setColor("RED")
            message.reply({embeds: [noQuestionEmb]})
        }
        if (args.toString().length > 200) {
            let tooLongQuestion = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : Your question needs to be smaller than 200 characters.`)
                .setColor("RED")
            message.reply({embeds: [tooLongQuestion]})
            return ;
        }
        const images = [
            ["Yes.", "https://c.tenor.com/TFhmPga4xEwAAAAC/magic8ball-yes.gif"],
            ["It is certain", "https://c.tenor.com/eyI116E3kWYAAAAC/yoda-8ball.gif"],
            ["Without a doubt", "https://c.tenor.com/-0tatbxLQVQAAAAC/yoda-8ball.gif"],
            ["Yes definelty", "https://c.tenor.com/fc7fywg2oQQAAAAC/yoda-8ball.gif"],
            ["You may rely on it", "https://c.tenor.com/8J1uZFp8xMUAAAAC/yoda-8ball.gif"],
            ["As I see it, yes", "https://c.tenor.com/EIAYng3CUf0AAAAC/yoda-8ball.gif"],
            ["Most likely", "https://c.tenor.com/EIAYng3CUf0AAAAC/yoda-8ball.gif"],
            ["Outlook not so good", "https://c.tenor.com/Ji3GcuKvu1cAAAAC/magic8ball-simpsons.gif"],
            ["Signs point to yes", "https://c.tenor.com/mrN4WoxyRE8AAAAC/shaking8ball-stranger-things4.gif"],
            ["Reply hazy, try again", "https://c.tenor.com/BokmYoZhr1AAAAAC/yoda-8ball.gif"],
            ["Ask again later", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
            ["Better not tell you now...", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
            ["Cannot predict now", "https://c.tenor.com/fs_hXVg58LkAAAAC/yoda-8ball.gif"],
            ["Concentrate and ask again", "https://c.tenor.com/Voqiq18wUFIAAAAC/yoda-8ball.gif"],
            ["Don't count on it", "https://c.tenor.com/cw2aa9cnQ6QAAAAC/magic-eight.gif"],
            ["My reply is no", "https://c.tenor.com/rJ1ioW_FkhUAAAAC/yoda-8ball.gif"],
        ];
        const json = JSON.stringify(images);
        const parsed = JSON.parse(json);
        const random = Math.floor(Math.random() * parsed.length);
        const embed = new MessageEmbed() // Prettier
            .setDescription(`>>> **Q:** ${args} \n**A:** ${parsed[random][0]}`)
            .setImage(parsed[random][1])
            .setTimestamp()
            .setAuthor({ name: `🎱 8Ball`, iconURL: bot.user.displayAvatarURL() })
            .setColor("#00b0f4")
            .setFooter({
            text: `Asked by ${message.member.displayName} • ${message.guild.name}`,
            iconURL: message.author.displayAvatarURL({
            dynamic: true,
            format: "png",
            size: 2048,
            }),
            });
        return message.reply({ embeds: [embed] });
        
    } catch (err) {
        console.log(err);
        if (err.length > 2010)
            err.substring(0, 2010)

        let basicError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : An error occured\n**Error:**\n\`${err}\``)
                .setColor("RED")
                .setTimestamp()
        message.reply({embeds: [basicError]})
    }

}

module.exports.config = {
    name: '8ball', // Command Name
    description: '🎱 Tells you a *magic* fortune', // Description
    usage: '+8ball <question>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['8b','magicball'], // Aliases 
    cooldown: 5 // Command Cooldown
}