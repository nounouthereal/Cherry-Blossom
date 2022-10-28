const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const currencies_list = require("../../utils/data/currencies");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = {
    name: "currency",
    description: "💵 Currency converter",
    cooldown: 5,
    options: [
        {
            name: "convert",
            description: "💵 Convert currency",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "amount",
                    description: "💹 The amount to convert",
                    required: true,
                    type: "NUMBER",
                },
                {
                    name: "from",
                    description: "💹 The currency to convert from",
                    required: true,
                    type: "STRING",
                },
                {
                    name: "to",
                    description: "💹 The currency to convert to",
                    required: true,
                    type: "STRING",
                },
            ],
        },
        {
            name: "list",
            description: "💷 List all available currencies",
            type: "SUB_COMMAND",
        },
    ],
    run: async (bot, interaction, args) => {
        try {


            if (args[0] === "convert") {
                if (isNaN(args[1])) {
                    let errEmb1 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : The money amount must be a number.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb1] })
                }
                if (!args[2]) {
                    let errEmb2 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Please enter the base currency`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb2] })
                }
                if (args[1].toString().length > 3) {
                    let errEmb3 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : First currency code can be longer than \`3 characters\`. (\`/currency list\`)`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb3] })
                }
                if (!currencies_list.includes(args[2].toUpperCase())) {
                    let errEmb4 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Please enter vaild first currency code!\nTo display all currencies codes please use \`/currency list\``)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb4] })
                }
                if (!args[3]) {
                    let errEmb5 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Please enter the second currency code!\nTo display all currencies codes please use \`/currency list\``)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb5] })
                }
                if (args[3].toString().length > 3) {
                    let errEmb6 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Second currency code can be longer than \`3 characters\`. (\`/currency list\`)`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb6] })
                }
                if (!currencies_list.includes(args[3].toUpperCase())) {
                    let errEmb7 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Second currency code can be longer than \`3 characters\`. (\`/currency list\`)`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb7] })
                }

                const wait = new MessageEmbed()
                    .setColor("#5865f2")
                    .setDescription(`<a:loading:1032282688821940245> | Please wait... I'm converting \`${args[1]} ${args[2].toUpperCase()}\` to \`${args[3].toUpperCase()}\``);

                interaction.followUp({ embeds: [wait] }).then((msg) => {

                    (async () => {
                        fetch(`https://www.google.co.in/search?q=${args[1]}+${args[2].toUpperCase()}+to+${args[3].toUpperCase()}`)
                            .then((res) => res.text())
                            .then((html) => {
                                return cheerio.load(html);

                            })
                            .then(($) => {
                                return $(".iBp4i").text();
                            })
                            .then((rates) => {
                                const row = new MessageActionRow() 
                                    .addComponents(
                                        
                                        new MessageButton() 
                                            .setLabel(`${args[2]} → ${args[3]}`)
                                            .setStyle("LINK")
                                            .setURL(`https://www.google.com/search?q=${args[1]}+${args[2].toUpperCase()}+to+${args[3].toUpperCase()}`)
                                    );
                                const embed = new MessageEmbed() 
                                    .setColor("GREEN")
                                    .setTitle(`💹 Currency converter`)
                                    .setDescription(`\`${args[1]} ${args[2].toUpperCase()}\` → \`${parseFloat(rates)} ${args[3].toUpperCase()}\``)
                                    .setFooter({
                                        text: `${args[2].toUpperCase()} → ${args[3].toUpperCase()} • Asked by ${interaction.member.nickname || interaction.user.username}`,
                                        iconURL: interaction.user.displayAvatarURL({
                                            dynamic: true,
                                            format: "png",
                                            size: 2048,
                                        }),
                                    });
                                interaction.editReply({ embeds: [embed], components: [row] });
                            });
                    })();
                });
            }

            if (args[0].toLowerCase() == "list") {
                let embed = new MessageEmbed()
                    .setDescription(`\`${currencies_list.join("`, `")}\``)
                    .setColor("GREEN")
                    .setTitle(`💷 All supported currencies`)
                    .setFooter({
                        text: `💶 Currencies List • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    });
                return interaction.followUp({ embeds: [embed] });
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