const { MessageEmbed, MessageActionRow, MessageButton, CommandInteraction } = require("discord.js");
const clean = require('js-string-cleaner')

module.exports = {
    name: "nickname",
    description: "Interact with nickname group",
    cooldown: 10,
    options: [
        {
            name: "normalize",
            description: "🛡 Remove all special characters from an user nickname",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "👤 The user which nickname will be normalized",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "🚓 The reason why you normalized the user nickanme",
                    type: "STRING",
                    required: false,
                },
            ],
        },
        {
            name: "rename",
            description: "💽 Change/Rename an user nickname",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "👤 The user which nickname will be changed",
                    type: "USER",
                    required: true,
                },
                {
                    name: "nickname",
                    description: "📀 The new nickname you want to apply to the user",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "reason",
                    description: "🚓 The reason why you changed the user nickanme",
                    type: "STRING",
                    required: false,
                },
            ],
        },
        {
            name: "delete",
            description: "❌ Delete an user nickname (It will be automatically replaced by his username)",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "👤 The user which nickname will be deleted",
                    type: "USER",
                    required: true,
                },
                {
                    name: "reason",
                    description: "🚓 The reason why you delete the user nickanme",
                    type: "STRING",
                    required: false,
                },
            ],
        },
    ],

    run: async (bot, interaction, args) => {


        try {

            const command = interaction.options.getSubcommand()
            const nick = interaction.options.getString("nickname")
            const user = interaction.options.getUser("user")
            let reason = interaction.options.getString("reason")


            if (command == "normalize") {

                if (!reason) {
                    reason = "❓ No reason specified (Type : Normalized Nickname Default)"
                }

                const member = interaction.guild.members.cache.get(user.id)

                let ancient = member.nickname

                let nickname = clean(member.nickname)

                if (nickname == ancient) {
                    let wrongEmb = new MessageEmbed()
                        .setDescription(`:warning: OPERATION FAILURE : <@${interaction.user.id}> : <@${user.id}> nickname is already normalized`)
                        .setColor("YELLOW")
                    return interaction.followUp({ embeds: [wrongEmb] })
                } 

                member.setNickname(`${nickname}`, `${reason}`)

                if (nickname.length == 0) {
                    nickname = user.username + " -- (❓ : Nickname was only composed with anormal characters so his nickname has been changed to his username)"
                }

                let embed = new MessageEmbed()
                    .setTitle(`✅ Nickname Normalized`)
                    .addField(`👤 User:`, `<@${member.user.id}>`)
                    .addField(`🧱 Ancient nickname`, `\`${ancient}\``)
                    .addField(`🛡 Normalized nickname:`, `\`${nickname}\``)
                    .addField(`👮 Moderator:`, `<@${interaction.user.id}>`)
                    .addField(`🚓 Reason:`, `\`${reason}\``)
                    .setFooter({ text: `Asked by: ${interaction.member.nickname} • ${interaction.guild.name}`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor("RANDOM")

                interaction.followUp({ embeds: [embed] })

            }

            if(command == "rename") {

                if (!reason) {
                    reason = "❓ No reason specified (Type : Renamed Nickname Default)"
                }

                const member = interaction.guild.members.cache.get(user.id)

                console.log(member)

                let ancient = member.nickname || user.username 

                let nickname = nick

                if (nickname == ancient) {
                    let wrongEmb = new MessageEmbed()
                        .setDescription(`:warning: OPERATION FAILURE : <@${interaction.user.id}> : <@${user.id}> is already nicked \`${nickname}\`.`)
                        .setColor("YELLOW")
                    return interaction.followUp({ embeds: [wrongEmb] })
                } 

                member.setNickname(`${nickname}`, `${reason}`)

                let embed = new MessageEmbed()
                    .setTitle(`✅ New Nickname`)
                    .addField(`👤 User:`, `<@${member.user.id}>`)
                    .addField(`🧱 Ancient nickname`, `\`${ancient}\``)
                    .addField(`📀 New nickname:`, `\`${nickname}\``)
                    .addField(`👮 Moderator:`, `<@${interaction.user.id}>`)
                    .addField(`🚓 Reason:`, `\`${reason}\``)
                    .setFooter({ text: `Asked by: ${interaction.member.nickname} • ${interaction.guild.name}`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor("RANDOM")

                interaction.followUp({ embeds: [embed] })

            }

            if (command == "delete") {

                if (!reason) {
                    reason = "❓ No reason specified (Type : Deleted Nickname Default)"
                }


                let ancient = member.nickname


                if (user.username == ancient) {
                    let wrongEmb = new MessageEmbed()
                        .setDescription(`:warning: OPERATION FAILURE : <@${interaction.user.id}> : <@${user.id}> has already no nickname`)
                        .setColor("YELLOW")
                    return interaction.followUp({ embeds: [wrongEmb] })
                } 

                member.setNickname(``, `${reason}`)

                let embed = new MessageEmbed()
                    .setTitle(`✅ Nickname Deleted`)
                    .addField(`👤 User:`, `<@${member.user.id}>`)
                    .addField(`🧱 Ancient nickname`, `\`${ancient}\``)
                    .addField(`👮 Moderator:`, `<@${interaction.user.id}>`)
                    .addField(`🚓 Reason:`, `\`${reason}\``)
                    .setFooter({ text: `Asked by: ${interaction.member.nickname} • ${interaction.guild.name}`, iconURL: interaction.user.displayAvatarURL() })
                    .setColor("RANDOM")

                interaction.followUp({ embeds: [embed] })

            }


        } catch (err) {
            console.log(err);
            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
};