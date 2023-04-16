const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const Typo = require("typo-js")
const dictionary = new Typo("en_US");


module.exports = {
    name: "covid",
    description: "🦠 Get covid stats",
    cooldown: 5,
    options: [
        {
            name: "country",
            description: "🦠 Get covid data/stats in a specific country",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "_country",
                    description: "🏙 The country to get covid info in",
                    type: "STRING",
                    required: true,
                }
            ],
        },
        {
            name: "worldwide",
            description: "🦠 Get world covid data/stats",
            type: "SUB_COMMAND",
        },
    ],

    run: async (bot, interaction, args) => {


        try {

            const country = interaction.options.getString("_country")

            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | I'm downloading covid data for \`${country || "worldwide"}\`. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            if (args[0] == "worldwide") {

                const url = `https://disease.sh/v3/covid-19/all`
                let response = await fetch(url)
                response = await response.json()

                const embed = new MessageEmbed()
                    .setTitle(`🌎 Worldwide COVID-19 Stats`)
                    .setThumbnail(`https://em-content.zobj.net/thumbs/120/google/350/globe-showing-americas_1f30e.png`)
                    .addField('😷 Total Cases', response.cases.toLocaleString(), true)
                    .addField('☠️ Total Deaths', response.deaths.toLocaleString(), true)
                    .addField('🏥 Total Recovered', response.recovered.toLocaleString(), false)
                    .addField('🤒 Active Cases', response.active.toLocaleString(), false)
                    .addField('🤢 Critical Cases', response.critical.toLocaleString(), false)
                    .addField('⚰️ Todays Deaths', response.todayDeaths.toLocaleString(), false)
                    .addField(':helmet_with_cross: Today Recoveries', response.todayRecovered.toLocaleString())
                    .setFooter(`Asked by ${interaction.member.nickname || interaction.user.username} • Worldwide area`, interaction.guild.iconURL())
                    .setTimestamp()
                    .setColor(`RANDOM`)
                interaction.editReply({ embeds: [embed] })

            } else {

                const url = `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country.toLowerCase())}`
                let response = await fetch(url)
                response = await response.json()

                if (response.message == "Country not found or doesn't have any cases" || !response) {

                    var array_of_suggestions = dictionary.suggest(country);

                    let errEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Cannot track/find a country named: \`${country}\` : wanting to say \`${array_of_suggestions[0] || `Cherry Typo 1.0 Error : Cannot understand meaning of ${country}`}\``)
                        .setColor("RED")
                    return interaction.editReply({ embeds: [errEmb] }) || interaction.followUp({ embeds: [errEmb] })

                }


                const embed = new MessageEmbed()
                    .setTitle(`🦠 COVID-19 Stats for **${country}**`)
                    .setThumbnail(`${response.countryInfo.flag}`)
                    .addField('😷 Total Cases', response.cases.toLocaleString(), true)
                    .addField('☠️ Total Deaths', response.deaths.toLocaleString(), true)
                    .addField('🏥 Total Recovered', response.recovered.toLocaleString())
                    .addField('🤒 Active Cases', response.active.toLocaleString())
                    .addField('🤢 Critical Cases', response.critical.toLocaleString())
                    .addField('⚰️ Todays Deaths', response.todayDeaths.toLocaleString())
                    .addField(':helmet_with_cross: Today Recoveries', response.todayRecovered.toLocaleString())
                    .setFooter(`Asked by ${interaction.member.nickname || interaction.user.username} • Country asked: ${country.toUpperCase()}`, interaction.guild.iconURL())
                    .setTimestamp()
                    .setColor(`RANDOM`)
                interaction.editReply({ embeds: [embed] })
            }

        } catch (err) {
            console.log(err);
            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
};