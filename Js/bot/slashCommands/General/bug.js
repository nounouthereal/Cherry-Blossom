const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')


module.exports = {
    name: "bug",
    description: "❌ Report an error or a bug to the devloppers",
    cooldown: 75,
    options: [
        {
            name: "command",
            description: "🏠 The command where the error occured",
            type: "STRING",
            required: true,
        },
        {
            name: "error",
            description: "❌ The error code or sentence (You can copy paste it)",
            type: "STRING",
            required: true,
        },
        {
            name: "description",
            description: "📝 More details",
            type: "STRING",
            required: false,
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let command = interaction.options.getString("command")
            let error = interaction.options.getString("error")
            let desc = interaction.options.getString("description")

            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | We're reporting the bug for \`${command}\` command. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            const channel = bot.channels.cache.find(channel => channel.id == "1015598150754508871")


            let invite = await interaction.channel.createInvite(
                {
                    maxAge: 604800, // maximum time for the invite, in milliseconds
                    maxUses: 100 // maximum times it can be used
                },
            )


            let bugEmbed = new MessageEmbed()
                .setTitle(`🐛 Bug reported`)
                .addField(`Server:`, `${invite || "No server"} (\`${interaction.guild.id || "No server"}\`) *${interaction.guild.name || "No server"}*`)
                .addField(`User:`, `**Name:** ${interaction.user.tag}\n**Nickname:** ${interaction.member.nickname || "No nickname"}\n**ID:** ${interaction.user.id}`)
                .addField(`Command:`, `\`${command}\``)
                .addField(`Error:`, `\`${error}\``)
                .addField(`More details:`, `\`${desc}\``)
                .setTimestamp()
                .setColor("RED")
            channel.send({ embeds: [bugEmbed] })
            bot.users.fetch('901071562386583596', false).then((user) => {
                user.send({embeds: [bugEmbed]});
            });

            let receivedEmbed = new MessageEmbed()
                .setTitle(`🐛 Bug reported`)
                .setDescription(`✅ Your bug has been reported and sent to the devloper, thanks this will help us to ameliorate the bot.`)
                .setColor("GREEN")

            const row = new MessageActionRow() // Prettier
                .addComponents(
                    new MessageButton() // Prettier
                        .setURL("https://discord.gg/Y2jQKaPqKX")
                        .setLabel("Support")
                        .setStyle("LINK")
                )
            interaction.editReply({ embeds: [receivedEmbed], components: [row] })




        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
}