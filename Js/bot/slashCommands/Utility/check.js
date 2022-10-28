
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
    name: "check",
    description: "Check something",
    cooldown: 5,
    options: [
        {
            name: "nswf",
            description: "🍑 Check if a file contain nswf or 18+/16+ content",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "file",
                    description: "🔞 The file to check",
                    required: false,
                    type: "ATTACHMENT",
                },
                {
                    name: "url",
                    description: "🔞 The url to check",
                    required: false,
                    type: "STRING",
                }
            ],

        },
    ],



    run: async (bot, interaction, args) => {

        try {

            if (args[0] == "nswf") {


                let file = interaction.options.getAttachment("file")
                let url = interaction.options.getString("url")

                if (!args[1]) {
                    let errEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Please choose at least a file or a link.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb] })
                }

                if (args[1] == "url" && args[2] == "file" || args[2] == "url" && args[1] == "file") {
                    let errEmb1 = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : You need to choose a link or an url but not both.`)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb1] })
                }

                const wait_embed = new MessageEmbed()
                    .setDescription(`<a:loading:1032282688821940245> | I'm checking the image. Please wait...`)
                    .setColor("#5865f2");

                interaction.followUp({ embeds: [wait_embed] })



                if (!url) {

                    const res = await fetch(`https://api.moderatecontent.com/moderate/?key=a7c72dd2e9b2ba2a8cf17727a65bca9f&url=${file.url}`);
                    const body = await res.json();
    
                    let age_rating

                    let blur

                    let color

                    let title

                    if (body.rating_label == "everyone") {
                        age_rating = "All ages (🟢 Safe content)"
                        blur = 10
                        color = "GREEN"
                        title = "✅ The file is safe"
                    }

                    if (body.rating_label == "teen") {
                        age_rating = "Restricted age content (16+) (🟠 Sexy, hot, lewd etc...)"
                        blur = 20
                        color = "YELLOW"
                        title = "🟠 The file is explicit"



                    }

                    if (body.rating_label == "adult") {
                        age_rating = "Adult content (18+) (🔞 NSWF, Porn content)"
                        blur = 50
                        color = "RED"
                        title = "🔞 The file is NSWF"

                    }



                    const embed = new MessageEmbed()
                        .setTitle(title + "")
                        .setDescription(`**🎂 Age Rating:**\n\`${age_rating}\`\n\n**％ Propabilities:**\n\`All ages: ${Math.round(body.predictions.everyone)}%\nAdvertised public (16+): ${Math.round(body.predictions.teen)}%\nNSWF: ${Math.round(body.predictions.adult)}%\``)
                        .setFooter({
                            text: `Asked by ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                                format: "png",
                                size: 2048,
                            })
                        })
                        .setColor(color)
                    console.log(embed.image)


                    interaction.editReply({ embeds: [embed] })

                }

                if (!file) {

                    const res = await fetch(`https://api.moderatecontent.com/moderate/?key=a7c72dd2e9b2ba2a8cf17727a65bca9f&url=${url}`);
                    const body = await res.json();

                    let errorCode = [1001, 1009, 1402]
                    
                    
                    if (errorCode.includes(body.error_code)) {
                        let errEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : You need to precise a correct image link (url).\nError: \`${body.error}\``)
                        .setColor("RED")
                        return interaction.editReply({ embeds: [errEmb] })
                    }

                    let age_rating

                    let blur

                    let color

                    let title

                    if (body.rating_label == "everyone") {
                        age_rating = "All ages (🟢 Safe content)"
                        blur = 10
                        color = "GREEN"
                        title = "✅ The url is safe"
                    }

                    if (body.rating_label == "teen") {

                        age_rating = "Restricted age content (16+) (🟠 Sexy, hot, lewd etc...)"
                        blur = 20
                        color = "YELLOW"
                        title = "🟠 The url is explicit"



                    }

                    if (body.rating_label == "adult") {
                        age_rating = "Adult content (18+) (🔞 NSWF, Porn content)"
                        blur = 50
                        color = "RED"
                        title = "🔞 The url contain NSWF"

                    }

                    const embed = new MessageEmbed()
                        .setTitle(title + "")
                        .setDescription(`**🎂 Age Rating:**\n\`${age_rating}\`\n\n**％ Propabilities:**\n\`All ages: ${Math.round(body.predictions.everyone)}%\nAdvertised public (16+): ${Math.round(body.predictions.teen)}%\nNSWF: ${Math.round(body.predictions.adult)}%\``)
                        .setFooter({
                            text: `Requested by ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                                format: "png",
                                size: 2048,
                            })
                        })

                        .setColor(color)


                    interaction.editReply({ embeds: [embed] })

                }


            }


        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] }) || interaction.followUp({ embeds: [basicError] })        }
    },
};