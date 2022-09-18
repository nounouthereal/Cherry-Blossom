const { MessageEmbed } = require("discord.js");
const progressbar = require("percentagebar");
const axios = require("axios");


module.exports = {
    name: "ship",
    description: "💘 Ship users together",
    options: [
        {
            name: "user1",
            description: "💗 First user to ship with",
            required: true,
            type: "USER",
        },
        {
            name: "user2",
            description: "💗 Secound user to ship with",
            required: false,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let user1 = interaction.options.getUser("user1");
            let user2 = interaction.options.getUser("user2");

            if (!user2) {
                user2 = interaction.user
            }


            if (user1.id == interaction.user.id && user2.id == interaction.user.id) {
                let authorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You want to calculate love between yourself, you're too narcissistic , wanna a mirror 🪞.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }

            if (user1.id == user2?.id) {
                let againAuthorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : What a weird love eqution between user, you're too weird , ehh.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [againAuthorUserError] })
            }


            const options = {
                method: 'GET',
                url: encodeURI(`https://simple-love-calculator.p.rapidapi.com/calculate_with_random_seed/${user1.username}/${user2.username}`),
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
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
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
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
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
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp();

                const shrugembed = new MessageEmbed()
                    .setTitle(`❤️ Love...`)
                    .setDescription(`> ❤️ Truely love | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                    .setColor("PURPLE")
                    .setFooter({
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp();
                const okembed = new MessageEmbed()
                    .setTitle(`💗 There is some love in the area`)
                    .setDescription(`> 💗 A good couple | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                    .setColor("#FF00FF")
                    .setFooter({
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp();
                const thumbupembed = new MessageEmbed()
                    .setTitle(`💘 Love is beautiful`)
                    .setDescription(`> 💘 So many love between you | <@${user1.id}> + <@${user2.id}> = \`${result}%\` love\n\n${bar}`)
                    .setColor("FF00FF")
                    .setFooter({
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
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
                        text: `❣️ Love Calculator • Asked by ${interaction.member.displayName || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp();

                console.log(result)

                if (result > 90) return interaction.followUp({ embeds: [hardloveemb] });
                if (result < 30) return interaction.followUp({ embeds: [verybadloveembed] });
                if (result < 40) return interaction.followUp({ embeds: [notgoodenoughemb] });
                if (result < 50) return interaction.followUp({ embeds: [shrugembed] });
                if (result < 60) return interaction.followUp({ embeds: [okembed] });
                if (result < 70) return interaction.followUp({ embeds: [thumbupembed] });
                if (result > 80) return interaction.followUp({ embeds: [eyesembed] });

            }).catch(function (error) {
                console.error(error);
                let basicError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : An error occured (\`API ERROR TYPE\`). Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                    .setColor(`RED`)
                    .setTimestamp()
                interaction.followUp({ embeds: [basicError] })
            });



        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};