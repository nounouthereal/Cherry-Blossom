const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');
const wyr = require('wyr').default



module.exports = {
    name: "dillema",
    description: `🤨 The would you rather/dillema game`,
    cooldown: 5,

    run: async (bot, interaction, args) => {

        try {


            wyr().then(async (response) => {

                const embed = new MessageEmbed()

                    .setTitle(`🤔 What would you rather ?`)
                    .setDescription(`> 🅰️ : \`${response.red.question}\` \n> \`\`\`or\`\`\` \n> 🅱️ : \`${response.blue.question}\``)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `Asked by ${interaction.user.username} • ${interaction.guild.name}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()

                let sent = await interaction.followUp({ embeds: [embed] })

                sent.react('🅰️')
                sent.react('🅱️')

                const filter = (reaction, user) => {
                    return user.id === interaction.user.id;
                };

                const collector = sent.createReactionCollector({ filter, time: 75000, max: 1, });

                collector.on('collect', async (reaction, reactionCollector, user) => {


                    let option = null
                    let option2 = null

                    reaction.emoji.name == "🅰️" ? option = response.red : option = response.blue
                    reaction.emoji.name == "🅱️" ? option2 = response.red : option2 = response.blue

                    const choiceEmbed = new MessageEmbed()

                        .setTitle(`You choosed : ${reaction.emoji.name}`)
                        .setDescription(`> You prefered : \`${option.question}\`\n\n\`${option.count}\` persons choosed like you and \`${option2.count}\` choosed to \`${option2.question}\``)
                        .setColor("RANDOM")
                        .setFooter({
                            text: `Asked by ${interaction.user.username} • ${interaction.guild.name}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                                format: "png",
                                size: 2048,
                            }),
                        })
                        .setTimestamp()
                    

                    return interaction.editReply({ embeds: [choiceEmbed] })

                });

            });




        } catch (err) {
            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }

    }

}