const { TRANSLATE } = require('../../utils/data/lang.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ISO6391 = require("iso-639-1");
const fetch = require("node-fetch");
const gTranslate = require("@vitalets/google-translate-api");

const choices = ["ar", "cs", "de", "en", "fa", "fr", "hi", "hr", "it", "ja", "ko", "la", "nl", "pl", "ta", "te"];


module.exports = {
    name: "translate",
    dis: true,
    description: "🌐 Translaste text in multiple language",
    cooldown: 5,
    options: [
        {
            name: "text",
            description: "🧾 The text you want to translate",
            type: "STRING",
            required: true,
        },
        {
            name: "to",
            description: "🌍 The output translating language",
            type: "STRING",
            required: true,
            choices: choices.map((choice) => ({ name: TRANSLATE[choice], value: choice })),
        },
        {
            name: "from",
            description: "🌍 The input translating language (Default to AUTO)",
            type: "STRING",
            required: false,
            choices: choices.map((choice) => ({ name: TRANSLATE[choice], value: choice })),
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            async function translate(content, outputCode, fromInputCode) {
                const response = await gTranslate(content, {from: fromInputCode || "auto", to: outputCode });
                console.log(response)
                return {
                    input: response.from.text.value,
                    output: response.text,
                    inputCode: response.from.language.iso,
                    outputCode,
                    inputLang: ISO6391.getName(response.from.language.iso),
                    outputLang: ISO6391.getName(outputCode),
                };

            }

            let text = interaction.options.getString("text")
            let from = interaction.options.getString("from")
            let to = interaction.options.getString("to")



            const embed = new MessageEmbed()
                .setColor("#57c478")
                .setFooter({
                    text: `${data.outputLang.toUpperCase()} Translating • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setTitle(`${data.outputLang.toUpperCase()} Translation`)
                .addField(`:flag_${data.outputCode}: : To ${data.outputLang}`, `\`\`\`${data.output || "❌ Translating error !!"}\`\`\``)
                .addField(`:flag_${data.inputCode}: : From ${data.inputLang}`, `\`\`\`${text}\`\`\``);
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