const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');

const client = require("nekos.life");
const neko = new client();

module.exports.run = async (bot, message, args) => {
    try {

        if(!args[0]) {
            args[0] = "image"
        }

        if (args[0].toLowerCase() == "image") {


            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm downloading a cat image. Please wait...`)
                .setColor("5865f2");

            sent = await message.reply({ embeds: [wait_embed] })


            const response = await fetch("https://nekos.life/api/v2/img/meow");
            const body = await response.json();
            const embed = new MessageEmbed()
                .setDescription(`**[🐱 Random Cat](${body.url})**`)
                .setImage(body.url)
                .setColor("RANDOM")
                .setFooter({
                    text: "Asked by " + `${message.member.displayName}` + " • (Aww cute =＾´• ⋏ •`＾=)",
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(body.url);
            sent.edit({ embeds: [embed] });

        } else if (args[0].toLowerCase() == "emoji" || args[0].toLowerCase() == "text") {
            let text = await neko.sfw.catText();


            const embed = new MessageEmbed()
                .setDescription(`>>> \`${text.cat}\``)
                .setColor("RANDOM")
                .setTimestamp()
                .setFooter({
                    text: `Asked by ${message.member.displayName} • ${message.guild.name}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            message.reply({ embeds: [embed] });
        }
    } catch (err) {
        console.log(err);

        if (err.length > 2010) {
            err.substring(0, 2010)
        }

        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({ embeds: [basicError] })
    }

}


module.exports.config = {
    name: 'cat', // Command Name
    description: '🐱 Meow, cats are so cute!', // Description
    usage: '+cat Optionaal: "image" || "text"', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['catimage', 'cats','cattext'], // Aliases 
    cooldown: 5 // Command Cooldown
}