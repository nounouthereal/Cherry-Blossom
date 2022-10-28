const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    name: "ip",
    description: "📱 IP command",
    cooldown: 5,
    options: [
        {
            name: "search",
            description: "📲 Search for an IP data",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "ip",
                    description: "💽 The IP you are searching",
                    type: "STRING",
                    required: true,
                }
            ]
        },
        {
            name: "lookup",
            description: "📱 See your IP data (Can be sent by DM)",
            type: "SUB_COMMAND",
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            if (args[0] == "lookup") {

                const row = new MessageActionRow().addComponents(

                    new MessageButton()
                        .setStyle('SUCCESS')
                        .setLabel("Yes")
                        .setCustomId("yes"),

                    new MessageButton()
                        .setStyle('PRIMARY')
                        .setEmoji("📨")
                        .setLabel("DM")
                        .setCustomId("no")
                )

                const body = await fetch("https://extreme-ip-lookup.com/json/?key=85mAMb7HJMXhKbeToK63")
                const geo = await body.json()
                const emb = new MessageEmbed()
                    .setTitle(`📲 IP Data for ${geo.query}`)
                    .setColor("RANDOM")
                    .setFooter(`📱 IP Lookup • Asked/Sent by ${interaction.member.nickname || interaction.user.username}`)
                    .addFields(
                        { name: '📲 IP', value: `${`\`${geo.query}\`` || "❌ Oops unable to track IP"}` },
                        { name: '🔰 IP Type', value: `${geo.ipType || "❌ Oops unable to track IP Type"}` },
                        { name: '🇲🇦 Country', value: `${geo.country || "❌ Oops unable to track IP Country"}` },
                        { name: '🏙 City', value: `${geo.city || "❌ Oops unable to track IP City"}` },
                        { name: '🗺 Continent', value: `${geo.continent || "❌ Oops unable to track IP Continent"}` },
                        { name: '📛 IP Name', value: `${geo.ipName || "❌ Oops unable to track IP Name"}` },
                        { name: '〽️ ISP', value: `${geo.isp || "❌ Oops unable to track IP ISP"}` },
                        { name: '🌍 Latitude', value: `${geo.lat || "❌ Oops unable to track IP Latitude"}` },
                        { name: '🌎 Longitude', value: `${geo.lon || "❌ Oops unable to track IP Longitude"}` },
                        { name: '🏢 ORG (Organisation)', value: `${geo.org || "❌ Oops unable to track IP Organisation"}` },
                        { name: '⛩ Region', value: `${geo.region || "❌ Oops unable to track IP Region"}` },
                        { name: '♻️ Status', value: `${geo.status.toUpperCase() || "❌ Oops seems like the statut is undefined"}` },
                    )
                    .setTimestamp();


                let warnEmbed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setDescription(`:warning: <@${interaction.user.id}> : Are you sure you want to continue. All your private data will be exposed in <#${interaction.channel.id}>\n\n\`You can receive your data by Private Messaging using the DM button\`.`);
                let sent = await interaction.followUp({ embeds: [warnEmbed], components: [row] }).catch();

                const buttonFilter = (verifyInteraction) => {
                    let notInteractionAuthorEmb = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(`:x: <@${verifyInteraction.user.id}> : Only the author of the command can use the buttons`);

                    if (verifyInteraction.user.id === interaction.user.id) return true;
                    return interaction.followUp({ embeds: [notInteractionAuthorEmb], ephemeral: true })
                }

                const buttonColletor = interaction.channel.createMessageComponentCollector({
                    buttonFilter,
                    max: 1,
                })

                buttonColletor.on("end", async (ButtonInteraction) => {
                    const button = ButtonInteraction.first()

                    const id = button.customId;

                    if (id === 'no') {
                        let DMSendEmb = new MessageEmbed()
                            .setDescription(`✅ Your data has been sent in your DM`)
                            .setColor("GREEN")
                            .setFooter(`📱 IP Lookup • Asked by ${interaction.member.nickname || interaction.user.username}`)
                        button.reply({ embeds: [DMSendEmb] })

                        interaction.user.send({ embeds: [emb] })

                        row.components[0].setDisabled(true)
                        row.components[1].setDisabled(true)

                        interaction.editReply({ embeds: [warnEmbed], components: [row] })

                        return
                    }

                    if (id === 'yes') {

                        await sent.delete()

                        button.reply({ embeds: [emb] })

                    }
                })
            }

            if (args[0] == "search") {

                let ip = interaction.options.getString("ip")


                const body = await fetch(`http://ip-api.com/json/${ip}?fields=1110015`)
                const geo = await body.json()


                if (geo.status == "fail" && geo.message == "invalid query") {

                    let errEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Cannot track/find an IP named: \`${ip}\``)
                        .setColor("RED")
                    return interaction.followUp({ embeds: [errEmb] })


                }

                const emb = new MessageEmbed()
                    .setTitle(`📲 IP Data for ${ip}`)
                    .setColor("RANDOM")
                    .setFooter(`📱 IP: ${geo.query} • Asked/Sent by ${interaction.member.nickname || interaction.user.username}`)
                    .addFields(
                        { name: '📱 IP', value: `${`\`${geo.query}\`` || "❌ Oops unable to track IP"}` },
                        { name: `:flag_${geo.countryCode.toLowerCase() || "white"}: Country`, value: `${`${geo.country} (${geo.countryCode})` || "❌ Oops unable to track IP Country"}` },
                        { name: '🏙 City', value: `${geo.city || "❌ Oops unable to track IP City"}` },
                        { name: '🗺 Continent', value: `${geo.continent || "❌ Oops unable to track IP Continent"}` },
                        { name: '📛 IP Name', value: `${geo.ipName || "❌ Oops unable to track IP Name"}` },
                        { name: '〽️ ISP', value: `${geo.isp || "❌ Oops unable to track IP ISP"}` },
                        { name: '🌍 Latitude', value: `${geo.lat || "❌ Oops unable to track IP Latitude"}` },
                        { name: '🌎 Longitude', value: `${geo.lon || "❌ Oops unable to track IP Longitude"}` },
                        { name: '🏢 ORG (Organisation)', value: `${geo.org || "❌ Oops unable to track IP Organisation"}` },
                        { name: '⛩ Region', value: `${geo.regionName || "❌ Oops unable to track IP Region"}` },
                        { name: '♻️ Status', value: `${geo.status.toUpperCase() || "❌ Oops seems like the statut is undefined"}` },
                    )
                    .setThumbnail(`https://ipworld.info/static/flags/${geo.countryCode.toLowerCase()}.png` || `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/340/globe-with-meridians_1f310.png`)
                    .setTimestamp();


                interaction.followUp({ embeds: [emb] })
            }



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