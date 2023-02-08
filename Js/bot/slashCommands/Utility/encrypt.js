const { MessageEmbed } = require("discord.js");
const Cryptr = require('cryptr');


module.exports = {
    name: "encrypt",
    description: "📟 Generate a fully crypted and secured encrypted text",
    cooldown: 5,
    options: [
        {
            name: "text",
            description: "🧾 The text you want to be crypted",
            type: "STRING",
            required: true,
        },
        {
            name: "key",
            description: "🔑 Your crypting key",
            type: "STRING",
            required: true,
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            let text = interaction.options.getString("text")
            let key = interaction.options.getString("key")

            const cryptr = new Cryptr(key);

            const encryptedString = cryptr.encrypt(text);


            const embed = new MessageEmbed()
                .setTitle(`📟 Encryption`)
                .setDescription(`✅ Your encrypted text has been successfully generated and sent in your DM's (Direct Messages)\n\n>>> Note: The encrypted text and your key aren't stocked anywhere.`)
                .setFooter({
                    text: `Asked by ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setColor("RANDOM")
                .setTimestamp();

            const embed2 = new MessageEmbed()
                .setTitle(`📟 Encryption`)
                .addField(`📥 Basic text`, `\`\`\`${text}\`\`\``)
                .addField(`📤 Encrypted text`, `\`\`\`${encryptedString}\`\`\``)
                .addField(`🔑 Your key`, `||Normally you should have remembred of your key sorry but there is no way we put it here||`)
                .setFooter({
                    text: `Sent by ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setColor("RANDOM")
                .setTimestamp();

            interaction.followUp({ content: `.` }).then(msg => {
                msg.delete({ timeout: 10 })
            })

            interaction.followUp({ embeds: [embed] });

            interaction.user.send({ embeds: [embed2] })


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