const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "iq",
    description: "🧠 Display your's or a user's IQ",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "👤 User to get IQ",
            required: false,
            type: 6,
        },
    ],

    run: async (bot, interaction, args) => {
        
        try {

            let iq = Math.floor(Math.random() * 226);
            const embed = new MessageEmbed() // Prettier
                .setTitle(`🧠 IQ Test:`)
                .setColor("#4f545c")
                .setTimestamp()
                .setFooter({
                    text: `Asked by ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            if (args[0]) {

                const member = interaction.options.getUser("user");
                embed.setDescription(`> 🧠 <@${member.id}> IQ: \`${iq}\``);

            } else {

                embed.setDescription(`> 🧠 <@${interaction.user.id}> IQ: \`${iq}\``);
            }

            interaction.followUp({ embeds: [embed] });
        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};