const { TRANSLATE } = require('../../utils/json/lang.json');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ISO6391 = require("iso-639-1");
const fetch = require("node-fetch");
const gTranslate = require("@vitalets/google-translate-api");
const { output } = require('pdfkit');


module.exports = {
    name: "translate",
    description: "📠 Decode some text in more than 9 type of encoding",
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
            description: "🌍 The translating language",
            type: "STRING",
            required: true,
            choices: choices.map((choice) => ({ name: TRANSLATE[choice], value: choice })),
        },
        {
            name: "from",
            description: "🌍 The translating language",
            type: "STRING",
            required: false,
            choices: choices.map((choice) => ({ name: TRANSLATE[choice], value: choice })),
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            function translate(content, outputCode, fromInputCode) {
                const response = await gTranslate(content, {from: fromInputCode, to: outputCode });
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
            let encode = interaction.options.getString("type")


            const embed = new MessageEmbed()
                .setColor("#57c478")
                .setFooter({
                    text: `${encode.toUpperCase()} Translating • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setTitle(`🌍 ${encode.toUpperCase()} Translation`)
                .addField(`:${data.inputCode}_flag: From ${data.inputLang}`, `\`\`\`${data.input}\`\`\``)
                .addField(`:${data.outputCode}_flag: To ${data.outputLang}`, `\`\`\`${data.output || "❌ Translating error !!"}\`\`\``);
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