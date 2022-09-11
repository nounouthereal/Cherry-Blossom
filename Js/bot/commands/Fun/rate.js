const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {

        try {

            const rate = args.join(" ")

            if(!rate) {

                let charsError = new MessageEmbed()
                    .setDescription(`❌ <@${message.author.id}> : Please precise what you want me to rate`)
                    .setColor("RED")
                    .setTimestamp()
                return message.reply({embeds: [charsError]})

            }

            if(rate > 250) {

                let charsError = new MessageEmbed()
                    .setDescription(`❌ <@${message.author.id}> : Rate needs to be under 250 (You need to reduce \`${parseInt(search.length - 250)}\` characters)`)
                    .setColor("RED")
                    .setTimestamp()
                return message.reply({embeds: [charsError]})

            }
            
            let result = Math.floor(Math.random() * 100 + 0);

            const happyrate = new MessageEmbed()
                .setDescription(`> 🌟 | I would rate **${rate}** \`${result}/100\` ?`)
                .setColor("GREEN")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();

            const sadembed = new MessageEmbed()
                .setDescription(`> 👎 | I would rate **${rate}** \`${result}/100\` ??`)
                .setColor("RED")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const idkembed = new MessageEmbed()
                .setDescription(`> 😕 | I would rate **${rate}** \`${result}/100\` ??`)
                .setColor("ORANGE")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();

            const shrugembed = new MessageEmbed() 
                .setDescription(`> 🙂 | I would rate **${rate}** \`${result}/100\` ??`)
                .setColor("YELLOW")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const okembed = new MessageEmbed()
                .setDescription(`> 😁 | I would rate **${rate}** \`${result}/100\` ??`)
                .setColor("GREEN")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const thumbupembed = new MessageEmbed()
                .setDescription(`> ⭐️ | I would rate **${rate}** \`${result}/100\` ??`)
                .setColor("GREEN")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const eyesembed = new MessageEmbed()
                .setDescription(`> 😍 | I would rate **${rate}** \`${result}/100\` ??`)
                .setColor("GREEN")
                .setFooter({
                    text: `🌟 Rating • Asked by ${message.member.displyName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            
            if (result > 90) return message.reply({ embeds: [happyrate] });
            if (result < 30) return message.reply({ embeds: [sadembed] });
            if (result < 40) return message.reply({ embeds: [idkembed] });
            if (result < 50) return message.reply({ embeds: [shrugembed] });
            if (result < 60) return message.reply({ embeds: [okembed] });
            if (result < 70) return message.reply({ embeds: [thumbupembed] });
            if (result > 80) return message.reply({ embeds: [eyesembed] });


        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : An error occured in meme command. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            message.reply({ embeds: [basicError] })
        }
}



module.exports.config = {
    name: 'rate', // Command Name
    description: '🌟 Let me rate whatever you want', // Description
    usage: '+rate <thing>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['judge','evaluate'], // Aliases 
    cooldown: 5 // Command Cooldown
}