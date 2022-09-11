const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "rate",
    description: "🌟 Let me rate whatever you want",
    cooldown: 5,
    options: [
        {
            name: "thing",
            description: "💬 What you want to rate",
            required: true,
            type: "STRING",
        }
    ],

    run: async (bot, interaction, args) => {

        try {

            const rate = interaction.options.getString("thing")

            if(rate > 250) {

                let charsError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Rate needs to be under 250 (You need to reduce \`${parseInt(search.length - 250)}\` characters)`)
                    .setColor("RED")
                    .setTimestamp()
                return interaction.followUp({embeds: [charsError]})

            }
            
            let result = Math.floor(Math.random() * 100 + 0);

            const happyrate = new MessageEmbed()
                .setDescription(`> 🌟 | I would rate **${rate}** \`${result}/100\` ?`)
                .setColor("GREEN")
                .setFooter({
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
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
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
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
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
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
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
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
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
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
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
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
                    text: `🌟 Rating • Asked by ${interaction.member.displayName || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            
                if (result > 90) return interaction.followUp({ embeds: [happyrate] });
                if (result < 30) return interaction.followUp({ embeds: [sadembed] });
                if (result < 40) return interaction.followUp({ embeds: [idkembed] });
                if (result < 50) return interaction.followUp({ embeds: [shrugembed] });
                if (result < 60) return interaction.followUp({ embeds: [okembed] });
                if (result < 70) return interaction.followUp({ embeds: [thumbupembed] });
                if (result > 80) return interaction.followUp({ embeds: [eyesembed] });


        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};