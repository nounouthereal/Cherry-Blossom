const { MessageEmbed } = require('discord.js')
const flip = require('flip-text');


module.exports.run = async (bot, message, args) => {

    try {

        if (!args[0]) {
            let textError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : You must provide a text to flip.`)
                .setColor("RED")
            return message.reply({ embeds: [textError] })
        }

        if (args.toString().length > 600) {
            let tooLongTextError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : The next needs to be under \`600\` characters. You need to reduce (\`${parseInt()}\`)`)
                .setColor("RED")
            return message.reply({ embeds: [tooLongTextError] })
        }

        let flipped = [];
        args.forEach((arg) => {
            flipped.push(flip(arg));
        });

        const embed = new MessageEmbed() // Prettier
            .setColor("RANDOM")
            .setDescription(`🔁 | Flipped text\n` + "> ```" + flipped.join(" ") + "```")
            .setFooter({
                text: `Asked by ${message.author.username} • ${message.guild.name}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setTimestamp();
        await message.reply({ embeds: [embed] });
    } catch (err) {
        console.log(err);
        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({ embeds: [basicError] })
    }

}


module.exports.config = {
    name: 'fliptext', // Command Name
    description: '🙃 Flip your text', // Description
    usage: '+fliptext <text>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['textflip'], // Aliases 
    cooldown: 5 // Command Cooldown
}