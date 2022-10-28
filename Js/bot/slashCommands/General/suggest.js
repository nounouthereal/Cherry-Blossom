const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')


module.exports = {
    name: "suggest",
    description: "💖 Suggest something to the devloppers",
    cooldown: 450,
    options: [
        {
            name: "type",
            description: "🔰 Your suggestion type",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "🖥 Command",
                    value: "🖥 Command",
                },
                {
                    name: "🔰 Embeds revision",
                    value: "🔰 Embeds",
                },
                {
                    name: "💰 Economy",
                    value: "💰 Economy",
                },
                {
                    name: "⚙️ System",
                    value: "⚙️ System",
                },
                {
                    name: "💾 Bot Optimisation",
                    value: "💾 Optimisation",
                },
                {
                    name: "❓ Other [Precise it in the suggestion]",
                    value: "❓ Other",
                },
            ],
        },
        {
            name: "suggest",
            description: "💝 Whatever you want to suggest",
            type: "STRING",
            required: true,
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let type = interaction.options.getString("type")
            let suggestion = interaction.options.getString("suggest")

            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | We're reporting your \`${type}\` type suggestion . Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            const channel = bot.channels.cache.find(channel => channel.id == "979717558905208852")


            let invite = await interaction.channel.createInvite(
                {
                    maxAge: 604800, // maximum time for the invite, in milliseconds
                    maxUses: 100 // maximum times it can be used
                },
            )


            let bugEmbed = new MessageEmbed()
                .setTitle(`💝 New suggestion`)
                .addField(`Server:`, `${invite || "No server"} (\`${interaction.guild.id || "No server"}\`) *${interaction.guild.name || "No server"}*`)
                .addField(`User:`, `**Name:** ${interaction.user.tag}\n**Nickname:** ${interaction.member.nickname || "No nickname"}\n**ID:** ${interaction.user.id}`)
                .addField(`🔰 Type of suggestion:`, `\`${type}\``)
                .addField(`💝 Suggestion:`, `\`${suggestion}\``)
                .setTimestamp()
                .setColor("#FFC0CB")
                .setFooter({ text: `Requested by ${interaction.member.nickname}`, iconURL: interaction.guild.iconURL({ dynamic: true, format: "png", size: 2048 }) })

            channel.send({ embeds: [bugEmbed] })
            bot.users.fetch('901071562386583596', false).then((user) => {
                user.send({embeds: [bugEmbed]});
            });

            bot.users.fetch("673517094217973760", false).then((user) => {
                user.send({embeds: [bugEmbed]});
            });

            let receivedEmbed = new MessageEmbed()
                .setTitle(`💝 Suggestion reported`)
                .setDescription(`✅ Your suggestion has been sent to the devloper, thanks this will help us to ameliorate the bot. 💝`)
                .setColor("GREEN")

            const row = new MessageActionRow() 
                .addComponents(
                    new MessageButton() 
                        .setURL("https://discord.gg/Y2jQKaPqKX")
                        .setLabel("Suggestion Support")
                        .setStyle("LINK")
                )
            interaction.editReply({ embeds: [receivedEmbed], components: [row] })




        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
}