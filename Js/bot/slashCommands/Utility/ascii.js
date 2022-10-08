const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const figlet = require("figlet");
const { createPaste } = require("hastebin");

module.exports = {
    name: "ascii",
    description: "⊂(◉‿◉)つ Convert text to asci format",
    cooldown: 3,
    options: [
        {
            name: "text",
            description: "🧾 Text to convert to ascii",
            type: "STRING",
            required: true,
        },
        {
            name: "font",
            description: "🌀 The ascii text font",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "🔡 Standard (Basic)",
                    value: "Standard",
                },
                {
                    name: "🎨 Graffiti",
                    value: "Graffiti",
                },
                {
                    name: "🚇 3D",
                    value: "3D-ASCII",
                },
                {
                    name: "👻 Ghost",
                    value: "Ghost",
                },
                {
                    name: "🕺 Dancing",
                    value: "Dancing",
                },
                {
                    name: "🤪 Crazy",
                    value: "Crazy",
                },
                {
                    name: "❇️ Cursive",
                    value: "Cursive",
                },
                {
                    name: "📟 Alpha",
                    value: "Alpha",
                },
                {
                    name: "🖋 Caligraphy",
                    value: "Caligraphy",
                },
            ],
        },
    ],

    run: async (bot, interaction, args) => {
        try {

            let text = interaction.options.getString('text')
            let font = interaction.options.getString('font')

            if (!font) {
                font = "Standard"
            }



            figlet(text, {
                font: font,              
            }, function (err, data) {

                createPaste(
                    data,
                    {
                        raw: true,
                        contentType: "text/plain",
                        server: "https://haste.zneix.eu/",
                    },
                    {}
                )
                    .then((paste) => {

                        const atc = new MessageAttachment(Buffer.from(data), 'ascii.txt');


                        if (data.length > 1021) {
                            data = "❌ Try the link"
                        }

                        const embed = new MessageEmbed()
                            .setColor("#57c478")
                            .setTitle(`✅ Your ascii code has been successfully generated!`)

                            .setDescription(`> 🔗 Link to ascii code paste: ${paste}`)
                            .addField(`🔖 Embed displaying (Possibly glitched):`, `\`\`\`${data}\`\`\``)

                            .setFooter({
                                text: `ʕっ•ᴥ•ʔっ ${font} ascii • Requested by ${interaction.member.nickname || interaction.user.username}`,
                                iconURL: interaction.member.displayAvatarURL({
                                    dynamic: true,
                                    format: "png",
                                    size: 2048,
                                }),
                            })
                            .setTimestamp();
                        const row = new MessageActionRow()

                            .addComponents(

                                new MessageButton()
                                    .setURL(paste)
                                    .setStyle("LINK")
                                    .setLabel("View ascii")

                            );
                        interaction.followUp({ embeds: [embed], components: [row], files: [atc] });
                    })
                    .catch(() => {
                        console.log(err);

                        let basicError = new MessageEmbed()
                            .setDescription(`❌ <@${interaction.user.id}> : An error occured in ascii genaration. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                            .setColor(`RED`)
                            .setTimestamp()
                        interaction.editReply({ embeds: [basicError] })
                    });
            });

        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] })
        }
    },
}