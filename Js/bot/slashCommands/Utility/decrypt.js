const { MessageEmbed } = require("discord.js");
const Cryptr = require('cryptr');


module.exports = {
    name: "decrypt",
    description: "📟 Generate a fully crypted and secured decrypted text",
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

            const decryptedString = cryptr.decrypt(text);



            const embed = new MessageEmbed()
                .setTitle(`📟 Decryption`)
                .setDescription(`✅ Your decrypted text has been successfully generated and sent in your DM's (Direct Messages)\n\n>>> Note: The decrypted text and your key aren't stocked anywhere.`)
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
                .setTitle(`📟 Decryption`)
                .addField(`📥 Crypted text`, `\`\`\`${text}\`\`\``)
                .addField(`📤 Decrypted text`, `\`\`\`${decryptedString}\`\`\``)
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

            interaction.followUp({content: `.`}).then(msg => {
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