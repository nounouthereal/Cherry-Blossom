const { MessageEmbed } = require("discord.js");

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
                    required: true,
                },
                {
                    name: "reason",
                    description: "📑 The reason of why you want to delete message",
                    type: "STRING",
                    required: true,
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
                    required: true,
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
        const reason = interaction.options.getString("reason")
        const user = interaction.options.getUser("user")
        const channel = interaction.options.getChannel("channel")

        try {

            if (command == "messages") {

                await interaction.channel.bulkDelete(messageCount, true)

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