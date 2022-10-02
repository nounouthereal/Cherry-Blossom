const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "encode",
    description: "📠 Decode some text in more than 9 type of encoding",
    cooldown: 5,
    options: [
        {
            name: "text",
            description: "🧾 The text you want to encode",
            type: "STRING",
            required: true,
        },
        {
            name: "type",
            description: "🗄 The text type that your text will be encoded in",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "base64",
                    value: "base64",
                },
                {
                    name: "utf-8",
                    value: "utf-8",
                },
                {
                    name: "ascii",
                    value: "ascii",
                },
                {
                    name: "latin1",
                    value: "latin1",
                },
                {
                    name: "base64url",
                    value: "base64url",
                },
                {
                    name: "hex",
                    value: "hex",
                },
                {
                    name: "ucs-2",
                    value: "ucs-2",
                },
                {
                    name: "utf-16",
                    value: "utf-16le",
                },
                {
                    name: "hex",
                    value: "hex",
                },

            ],
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            let text = interaction.options.getString("text")
            let encode = interaction.options.getString("type")

            const preEncode = Buffer.from(text, "utf-8")

            const encoded = preEncode.toString(encode)

            const embed = new MessageEmbed()
                .setColor("#57c478")
                .setFooter({
                    text: `${encode.toUpperCase()} Encoding • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setTitle(`💫 ${encode.toUpperCase()} Encode`)
                .addField(`📥 Text to encode`, `\`\`\`${text}\`\`\``)
                .addField(`📤 Encoded text`, `\`\`\`${encoded || "❌ Encoding error !!"}\`\`\``);
            interaction.followUp({ embeds: [embed] });


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