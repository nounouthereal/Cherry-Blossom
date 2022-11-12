const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");

module.exports = {
    name: "invite",
    description: "🌸 Invite me to your server",
    cooldown: 3,

    run: async (bot, interaction, args) => {

        try {


            const embed = new MessageEmbed()
                .setColor("#57c478")
                .setTitle(`🎉 Yee!`)
                .setDescription(`🎉 **[Hey click here to invite me!](https://discord.com/api/oauth2/authorize?client_id=944572861874602054&permissions=1644971949559&scope=bot)** **__[Recomended!]__**\nOr [~~:warning: Invite as an admin~~](https://discord.com/api/oauth2/authorize?client_id=944572861874602054&permissions=8&scope=bot) _[Not recomended!]_`)
                .setTimestamp()
                .setFooter({
                    text: `${bot.user.username} created by nounou#4483`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "jpg",
                        size: 2048,
                    }),
                });
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=944572861874602054&permissions=1644971949559&scope=bot`)
                        .setEmoji("🎉")
                        .setLabel("Invite me!")
                        .setStyle("LINK")
                );

            return interaction.followUp({ embeds: [embed], components: [row] });

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
