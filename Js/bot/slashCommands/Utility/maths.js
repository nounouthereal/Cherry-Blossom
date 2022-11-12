const { evaluate } = require('mathjs')
const { MessageEmbed } = require("discord.js");





module.exports = {
    name: "maths",
    description: "🏫 Execute mathematicals expressions",
    cooldown: 5,
    options: [
        {
            name: "expression",
            description: "♾ The mathmatical expression.",
            required: true,
            type: "STRING",
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            let calc = interaction.options.getString("expression")

            try {

                let res = evaluate(calc)

                if (res.length > 1005) {
                    res = res.toString().substring(0, 1005) + "..."
                }
    
                if (calc.length > 1005) {
                    calc = calc.toString().substring(0, 1005) + "..."
                }
    
    
    
                const embed = new MessageEmbed() // Prettier
                    .setTitle("👩‍🏫 Maths calculation")
                    .addField("♾ Operation:", `> \`${calc}\``, true)
                    .addField("📲 Result:", `> \`${res}\``, true)
                    .setColor("RANDOM")
                    .setFooter({
                        text: `Maths • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    });
                interaction.followUp({ embeds: [embed] });

            } catch (err) {
                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : \`${calc}\` Is not a valid calculation\n\`(Available expressions: sin, cos, tan, ln, log, sqrt, '+', '-', '*', '/', '%', '^', max, min, ( ))\``)
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }
        } catch (err) {
            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] })
        }
    },
};