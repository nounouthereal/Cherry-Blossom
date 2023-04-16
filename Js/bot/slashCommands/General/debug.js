const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");


module.exports = {
    name: "debug",
    description: "❌ Something went wrong ?",
    cooldown: 25,
    options: [
        {
            name: "value",
            required: true,
            description: "📟 The thing to debug",
            type: "STRING",
            choices: [
                {
                    name: "🛃 Permissions",
                    value: "perms",
                },
                {
                    name: "📶 Bandwidth",
                    value: "bandwidth",
                },
                {
                    name: "🌸 Bot",
                    value: "bot",
                },
                {
                    name: "📦 Packages",
                    value: "dependencies",
                },
            ],
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let value = interaction.options.getString("value")


            if (value == "perms") {
                require("../../utils/modules/debug/slash/debugPerms")(bot, interaction, args);
            } else if (value == "dependencies") {
                require("../../utils/modules/debug/slash/debugDependancies")(bot, interaction, args);
            } else if (value == "bot") {
                require("../../utils/modules/debug/slash/debugBot")(bot, interaction, args);
            } else if (value == "bandwidth") {
                require("../../utils/modules/debug/slash/debugBandwidth")(bot, interaction, args);
            }


        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] }) || interaction.followUp({ embeds: [basicError] })
        }
    },
};
