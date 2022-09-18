const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {

    try {

        const iq = Math.floor(Math.random() * 226);
        const embed = new MessageEmbed() // Prettier
            .setTitle(`🧠 IQ Test:`)
            .setColor("#4f545c")
            .setTimestamp()
            .setFooter({
                text: `Asked by ${message.member.nickname} • ${message.guild.name}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            });
        if (args[0]) {

            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;

            embed.setDescription(`> 🧠 <@${member.id}> IQ: \`${iq}\``);

        } else {

            embed.setDescription(`> 🧠 <@${message.author.id}> IQ: \`${iq}\``);
        }

        message.reply({ embeds: [embed] });
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
    name: 'iq', // Command Name
    description: '🧠 Display your\'s or a user\'s IQ', // Description
    usage: '+iq Optionnal: @user', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['qi'], // Aliases 
    cooldown: 5 // Command Cooldown
}