const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "waifu",
    description: "👘 Get a random waifu image or gif",
    cooldown: 3,
    options: [
        {
            name: "tag",
            description: "📧 The requested waifu tag type",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "👩 Basic",
                    value: "waifu"
                },
                {
                    name: "👘 Uniform",
                    value: "uniform"
                },
                {
                    name: "🤳 Selfies",
                    value: "selfies"
                },
                {
                    name: "🧹 Maid",
                    value: "maid"
                },
                {
                    name: "🍑 Oppai",
                    value: "oppai"
                },
            ],
        },
        {
            name: "gif_only",
            description: "📺 Choose if your waifu image needs to be only a gif",
            type: "BOOLEAN",
            required: false,
        }
    ],

    run: async (bot, interaction, args) => {

        try {

            let tag = interaction.options.getString(`tag`)
            let gif_only = interaction.options.getBoolean(`gif_only`)

            let tagName = ""

            if (!tag) tag = "waifu" 

            if (tag == "uniform") { tagName = "👘 Uniform" }
            if (tag == "selfies") { tagName = "🤳 Selfie" }
            if (tag == "maid") { tagName = "🧹 Maid" }
            if (tag == "oppai") { tagName = "🍑 Oppai" }


            
            if (!gif_only) gif_only = "false"

            /*if (tag == "oppai" || tag == "maid") {
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Yes")
                            .setCustomId(`yes`)

                    )
                    .addComponents(
                        new MessageButton()
                            .setStyle("SUCCESS")
                            .setCustomId(`no`)
                            .setLabel("No")
                    );
                let warnEmbed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`:warning: DISCLAIMER <@${interaction.user.id}> : The \`${tagName}\` tag is intended for **ages 16 and up**.\n\nThe \`${tagName}\` tag can potentially contain Ecchi and Lewd images/gifs\nAre you sure you want to continue ?`);
                interaction.followUp({ embeds: [warnEmbed], components: [row] }).catch();

                const buttonFilter = (verifyInteraction) => {
                    let notInteractionAuthorEmb = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`:x: <@${verifyInteraction.user.id}> : Only the author of the command can use the buttons`);
                    interaction.followUp({emnbeds: [notInteractionAuthorEmb], ephemeral: true})
                }

                const buttonColletor = interaction.channel.createMessageComponentCollector({
                    buttonFilter,
                    max: 1,
                })

                buttonColletor.on("end", async (ButtonInteraction) => {
                    const button = ButtonInteraction.first()

                    const id = button.customId;

                    if (id === 'no') {
                        let stop_embed = new MessageEmbed()
                            .setDescription(`:bulb: You stoped the command.`)
                            .setColor("YELLOW")
                        button.reply({ embeds: [stop_embed] })

                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)

                        interaction.editReply({ embeds: [warnEmbed], components: [row] })

                        sleep(7)

                        interaction.deleteReply({ embeds: [warnEmbed], components: [row] })

                        return
                    }

                    if (id === 'yes') {

                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)

                        button.reply({content: `<a:loading_please_wait:1014982234492633088> | Please wait...`})

                        sleep(2)

                        button.deleteReply({content: `<a:loading_please_wait:1014982234492633088> | Please wait...`})

                        interaction.editReply({ embeds: [warnEmbed], components: [row] })
                    }
                })
            }
            */



            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm downloading a \`${tagName} Waifu\` image. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            let res = await fetch(`https://api.waifu.im/random/?selected_tags=${tag}&gif=${gif_only}`);

            const body = await res.json();


            if (body.detail == "No image found matching the criteria given") {


                const NotFoundembed = new MessageEmbed()
                    .setColor("RED")
                    .setImage(`https://c.tenor.com/OyUVgQi-l-QAAAAC/404.gif`)
                    .setDescription(`❌ <@${interaction.user.id}> : No waifu image/gif found matching the criteria given : \`Tag : ${tagName}, Gif_Only: ${gif_only}\``)
                    .setTimestamp()
                    .setFooter({
                        text: `Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    });
                return interaction.editReply({ embeds: [NotFoundembed] });
            }

            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${tagName} Waifu images`)
                .setURL(`${body.images[0].url}`)
                .setImage(`${body.images[0].url}`)
                .setTimestamp()
                .setFooter({
                    text: `👘 Waifu • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            interaction.editReply({ embeds: [embed] });

        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};