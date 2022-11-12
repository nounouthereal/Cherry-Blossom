const { MessageEmbed, Message } = require('discord.js')


module.exports = {
    name: "message",
    description: "Description appear in sub_command",
    timeout: 5000,
    options: [
        {
            type: "SUB_COMMAND",
            name: "info",
            description: "🔗 Get message information",
            options: [
                {
                    name: "link",
                    description: "🔗 The message link",
                    type: "STRING"
                }
            ],
        }

    ],


    run: async (bot, interaction, args) => {

        try {
            if (!args[1].startsWith(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)) {
                let emb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.member.id}> : The link needs to be a discord message link`)
                    .setColor("RED")

                return interaction.followUp({ embeds: [emb] })
            }

            else if (args[1].startsWith(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)) {
                args[1] = args[1].split('/')
                args[1] = args[1][6]
            }

            const message = await interaction.channel.messages.fetch(args[1])

            console.log(message)

            let is_an_embed
            let has_component
            console.log(message.embeds)
            console.log(message.components + 's')

            if (message.embeds[0] == '[]') {
                is_an_embed = 'No'
            }

            else {
                is_an_embed = "Yes"
            }

            if (message.components == '[]' || message.components == '') {
                has_component = 'No'
            }

            else {
                has_component = "Yes"
            }

            let date = new Date(message.createdTimestamp)
            date = "Date: " + date.getDate() +
                "/" + (date.getMonth() + 1) +
                "/" + date.getFullYear() +
                " " + date.getHours() +
                ":" + date.getMinutes() +
                ":" + date.getSeconds();

            let embed_info = new MessageEmbed()
                .setTitle(`Message Information`)
                .addField(`🔗 Messsage Link`, `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`)
                .addField(`👑 Author`, `**${message.author.tag}**`)
                .addField(`❔ Is an Embed:`, is_an_embed)
                .addField(`❓ Has components:`, is_an_embed)
                .addField(`🆎 Type`, message.type)
                .addField(`📅 Sended at:`, date)
                .addField(`🆔 Message ID:`, `\`${message.id}\``)
                .addField(`🆔 Channel ID:`, `\`${message.channelId}\``)
                .addField(`🆔 Guild ID:`, `\`${message.guildId}\``)
                .setFooter({ text: `Asked by: ${interaction.member.nickname} • ${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .setColor("RANDOM")

            if (message.type == "APPLICATION_COMMAND" || message.type == "CONTEXT_MENU_COMMAND") {
                embed_info.addField(`🖲 Message command name:`, `\`${message.interaction.commandName}\`` || `:warning: Error message origin command is undefined`)
            }


            interaction.followUp({ embeds: [embed_info] })

        }
        catch (e) {
            console.log(e)
            let emb = new MessageEmbed()
                .setDescription(`❌ <@${interaction.member.id}> : The message link is incorrect`)
                .setColor("RED")
            interaction.followUp({ embeds: [emb] })
        }

    }
}