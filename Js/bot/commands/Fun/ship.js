const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const axios = require("axios");
const progressbar = require("percentagebar");


module.exports.run = async (bot, message, args) => {

    try {

        let user1 = message.guild.members.cache.get(args[0].replace(/[\\<>@#&!]/g, ""))
        let user2 = message.guild.members.cache.get(args[1]?.replace(/[\\<>@#&!]/g, ""))


        if (!user2) {
            user2 = message.author
        }
        
        if (!user1) {
            let authorUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : You need to mention a user to ship with.`)
                .setColor("RED")
            return message.reply({ embeds: [authorUserError] })
        }


        if (user1.id == message.author.id && user2.id == message.author.id) {
            let authorUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : You want to calculate love between yourself, you're too narcissistic , wanna a mirror 🪞.`)
                .setColor("RED")
            return message.reply({ embeds: [authorUserError] })
        }

       
        const options = {
            method: 'GET',
            url: `https://simple-love-calculator.p.rapidapi.com/calculate_with_random_seed/${user1?.user.username}/${user2.username}`,
            headers: {
              'X-RapidAPI-Key': 'fe357df54amsh2f40b55a738fff8p13c896jsn3139801de2e0',
              'X-RapidAPI-Host': 'simple-love-calculator.p.rapidapi.com'
            }
        };
          

        axios.request(options).then(function (response) {

            let result = response.data.value





            const bar = progressbar(100, result, 10, `<:green_middle_bar_argenx:1016390424904081520>`, `<:grey_middle_bar_argenx:1016390426980274266>`, `💔`, ` 💖`, false);

            const hardloveemb = new MessageEmbed()
                .setTitle(`💖 You were born for each others`)
                .setDescription(`> 💖 You need to mary yourselves | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                .setColor("#FFC0CB")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();

            const verybadloveembed = new MessageEmbed()
                .setTitle(`💔 What a deceitful couple`)
                .setDescription(`> 💔 Forget any love possibilty | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                .setColor("BLACK")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const notgoodenoughemb = new MessageEmbed()
                .setTitle(`❤️‍🩹 There can be a possibility`)
                .setDescription(`> ❤️‍🩹 It's low, but don't give up | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                .setColor("PURPLE")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();

            const shrugembed = new MessageEmbed()
                .setTitle(`❤️ Just a little more effort...`)
                .setDescription(`> ❤️ A bit of love love | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                .setColor("PURPLE")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const okembed = new MessageEmbed()
                .setTitle(`💗 There is some love in the area`)
                .setDescription(`> 💗 A good couple | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n**${bar}`)
                .setColor("#FF00FF")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const thumbupembed = new MessageEmbed()
                .setTitle(`💘 Love is beautiful`)
                .setDescription(`> 💘 So many love between you | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                .setColor("#FF00FF")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const eyesembed = new MessageEmbed()
                .setTitle(`💞 You are made for each others`)
                .setDescription(`> 💞 What an incredible couple | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                .setColor("#FFC0CB")
                .setFooter({
                    text: `❣️ Love Calculator • Asked by ${message.member.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();


            if (result > 90) return message.reply({ embeds: [hardloveemb] });
            if (result < 30) return message.reply({ embeds: [verybadloveembed] });
            if (result < 40) return message.reply({ embeds: [notgoodenoughemb] });
            if (result < 50) return message.reply({ embeds: [shrugembed] });
            if (result < 60) return message.reply({ embeds: [okembed] });
            if (result < 70) return message.reply({ embeds: [thumbupembed] });
            if (result > 80) return message.reply({ embeds: [eyesembed] });

        })

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
    name: 'ship', // Command Name
    description: '💘 Ship users together', // Description
    usage: '+love @user1 Optionnal: @user2', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['lovecalc', 'calclove'], // Aliases 
    cooldown: 5 // Command Cooldown
}
