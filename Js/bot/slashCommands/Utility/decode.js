const { MessageEmbed } = require("discord.js");
const { StringDecoder } = require('node:string_decoder');


module.exports = {
    name: "decode",
    description: "📠 Decode some text in more than 9 type of encoding",
    cooldown: 5,
    options: [
        {
            name: "text",
            description: "🧾 The text you want to decode",
            type: "STRING",
            required: true,
        },
        {
            name: "type",
            description: "🗄 The text type that your text will be decoded in",
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
            let decode = interaction.options.getString("type")

            const preDecoded = Buffer.from(text, decode)

            const decoded = preDecoded.toString("utf-8")

            const embed = new MessageEmbed()
                .setColor("#57c478")
                .setFooter({
                    text: `${decode.toUpperCase()} Decoding • Requested by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setTitle(`💫 ${decode.toUpperCase()} Decoding`)
                .addField(`📥 Text to decode`, `\`\`\`${text}\`\`\``)
                .addField(`📤 Decoded text`, `\`\`\`${decoded || "❌ Decoding error !!"}\`\`\``);
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