const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {

    try {

        const wait_embed = new MessageEmbed() 
            .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm generating a \`joke\`. Please wait...`)
            .setColor("5865f2");

        sent = await message.reply({embeds: [wait_embed]})


        const res = await fetch("http://icanhazdadjoke.com/", {
            method: "get",
            headers: {
                Accept: "application/json",
            },
        });

        const body = await res.json();
        const embed = new MessageEmbed() // Prettier
            .setTitle(`🤣 Random Joke`)
            .setDescription(`>>> ${body.joke}`)
            .setColor("#1fb56d")
            .setFooter({
                text: `Asked by ${message.member.displayName}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setTimestamp();

        sent.edit({ embeds: [embed] })
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
    name: 'joke', // Command Name
    description: '🤣 Get a random joke', // Description
    usage: '+joke', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['quip'], // Aliases 
    cooldown: 5 // Command Cooldown
}