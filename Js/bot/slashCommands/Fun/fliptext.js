const { MessageEmbed } = require('discord.js')
const flip = require('flip-text');


module.exports = {
    name: "flip",
    description: `🔁 Reverse your text`,
    cooldown: 5,

    options: [
        {
            name: "text",
            description: "🔁 Flip your text",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "text",
                    description: "📝 The text to flip",
                    type: "STRING"
                }
            ]
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            if (!args[1]) {
                let textError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You must provide a text to flip.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [textError] })
            }

            if (args.toString().length > 600) {
                let tooLongTextError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : The next needs to be under \`600\` characters. You need to reduce (\`${parseInt()}\`)`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [tooLongTextError] })
            }
    
            let flipped = flip(args[1])
    
            const embed = new MessageEmbed() // Prettier
                .setColor("RANDOM")
                .setDescription(`🔁 | Flipped text\n` + "> ```" + flipped + "```")
                .setFooter({
                    text: `Asked by ${interaction.user.username} • ${interaction.guild.name}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            await interaction.followUp({ embeds: [embed] });
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