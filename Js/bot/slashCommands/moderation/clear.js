const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Description will be in sub_commands",
    cooldown: 15,
    options: [
        {
            type: "SUB_COMMAND",
            name: "channel",
            description: "🏠 Clear all messages in a channel",
            options: [
                {
                    name: "channel",
                    description: "🏚 The channel which will be cleared",
                    type: "CHANNEL",
                    required: false,
                },
                {
                    name: "reason",
                    description: "📑 The reason of why you want to delete message",
                    type: "STRING",
                    required: false,
                }
            ],
        },
        {
            type: "SUB_COMMAND",
            name: "messages",
            description: "📩 Clear a specific amount of messages",
            options: [
                {
                    name: "amount",
                    description: "💯 The amount of messages to delete",
                    type: "NUMBER",
                    required: true,
                    maxValue: 600,
                    minValue: 2,
                },
                {
                    name: "reason",
                    description: "📑 The reason of why you want to delete message",
                    type: "STRING",
                    required: false,
                }
            ],
        },

        {
            type: "SUB_COMMAND",
            name: "invites",
            description: "📧 Clear messages which contain an invite",
            options: [
                {
                    name: "amount",
                    description: "💯 The amount of invites to delete",
                    type: "NUMBER",
                    required: true,
                    maxValue: 100,
                    minValue: 2,
                }
            ],
        },

        {
            type: "SUB_COMMAND",
            name: "user",
            description: "🗣 Clear a specific amount of messages from a certain user",
            options: [
                {
                    name: "user",
                    description: "👤 The user which messages will be deleted",
                    type: "USER",
                    required: true,
                },

                {
                    name: "amount",
                    description: "💯 The amount of messages to delete",
                    type: "NUMBER",
                    required: false,
                    maxValue: 600,
                    minValue: 2,
                }
            ],
        },
    ],

    run: async (bot, interaction, args) => {

        //const bigCommand = interaction.options.getSubCommandGroup();
        const command = interaction.options.getSubcommand();
        const amount = interaction.options.getNumber("amount")
        let reason = interaction.options.getString("reason")
        const user = interaction.options.getUser("user")
        let channel = interaction.options.getChannel("channel")

        try {

            if (!reason) reason = "Reason not precised"

            if (command == "channel") {

                if (!channel) {
                    channel = interaction.channel
                }

                const row = new MessageActionRow().addComponents(

                    new MessageButton()
                        .setStyle('SUCCESS')
                        .setLabel("Yes")
                        .setCustomId("yes"),

                    new MessageButton()
                        .setStyle('DANGER')
                        .setLabel("No")
                        .setCustomId("no")
                )

                let warnEmbed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`:warning: <@${interaction.user.id}> : Are you sur you want to clear all messages in <#${channel.id}>.`);
                interaction.followUp({ embeds: [warnEmbed], components: [row] }).catch();

                const buttonFilter = (verifyInteraction) => {
                    let notInteractionAuthorEmb = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`: x: <@${ verifyInteraction.user.id }> : Only the author of the command can use the buttons`);
        
                    if (verifyInteraction.user.id === interaction.user.id) return true;
                    return interaction.followUp({ embeds: [notInteractionAuthorEmb], ephemeral: true })
                }

                const buttonColletor = interaction.channel.createMessageComponentCollector({
                    buttonFilter,
                    max: 1,
                })

                buttonColletor.on("end", async (ButtonInteraction) => {
                    const button = ButtonInteraction.first()
        
                    const id = button.customId;
        
                    if (id === 'no') {
                        let stop_embed = new MessageEmbed()
                            .setDescription(`:bulb: You stopped the command.`)
                            .setColor("YELLOW")
                        button.reply({ embeds: [stop_embed] })
        
                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)
        
                        interaction.editReply({ embeds: [warnEmbed], components: [row] })
        
                        return
                    }
        
                    if (id === 'yes') {
        
                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)
        
                        interaction.editReply({ embeds: [warnEmbed], components: [row] })

                        await channel.clone().then(async (clonedChannel) => {
                            const originalPosition = channel.position;
        
                            await channel.delete().catch(() => null);
                            await clonedChannel.setPosition(originalPosition);
        
                            const emb = new MessageEmbed()
                                .setColor("GREEN")
                                .setDescription(`✅ Cleared channel successfully`)
                                .addField(`🏠 Channel:`, `<#${clonedChannel.id}>`)
                                .addField(`👮 Moderator:`, `<@${interaction.user.id}> [**${interaction.user.tag}**]`)
                                .addField(`📑 Reason:`, `*${reason}*`)
                                .setTimestamp()
                                .setFooter({ text: `Asked by: ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        
                            clonedChannel.send({ embeds: [emb] }).then(m => {
                                setTimeout(() => {
                                    m.delete()
                                }, 25000)
                            })
                        })
                    }
                })


            }

            if (command == "messages") {

                await interaction.channel.bulkDelete(amount, true)

                const emb = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`✅ Cleared/Purged messages successfully`)
                    .addField(`💯 Amount:`, `\`${amount}\``)
                    .addField(`👮 Moderator:`, `<@${interaction.user.id}> [**${interaction.user.tag}**]`)
                    .addField(`📑 Reason:`, `*${reason}*`)
                    .setTimestamp()
                    .setFooter({ text: `Asked by: ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })

                interaction.followUp({ embeds: [emb] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 10000)
                })

            }

        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })

        }
    }
};