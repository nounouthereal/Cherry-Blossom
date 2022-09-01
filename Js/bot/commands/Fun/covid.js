const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {
    const countries = args.join(" ");
        let array_all = ['all','max','world','tout','worldwide']
        if (args[1] != undefined)
            return message.channel.send('Usage: +covid all || country');
        if (!args[0] || array_all.includes(args[0].toLowerCase())) {
            const url = `https://disease.sh/v3/covid-19/all`
            let response
            response = await fetch(url).then(res => res.json())
            const embed = new MessageEmbed()
                .setTitle(`🦠 Worldwide COVID-19 Stats 🌎`)
                .setThumbnail(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6wNtBHyIeFpAaN4hPPgg4PlJYXFZUIZx4VBp3qzQ6cyBdUTFEFBMIfpyQGvxyEla0ig&usqp=CAU`)
                .addField('😷 Total Cases', response.cases.toLocaleString())
                .addField('☠️ Total Deaths', response.deaths.toLocaleString())
                .addField('🏥 Total Recovered', response.recovered.toLocaleString())
                .addField('🤒 Active Cases', response.active.toLocaleString())
                .addField('🤢 Critical Cases', response.critical.toLocaleString())
                .addField('⚰️ Todays Deaths', response.todayDeaths.toLocaleString())
                .addField(':helmet_with_cross: Today Recoveries', response.todayRecovered.toLocaleString())
                .setFooter(`Asked by: ${message.member.displayName} • Worldwide area`,message.guild.iconURL())
                .setTimestamp()
                .setColor(`RANDOM`)
            message.channel.send({embeds: [embed]})
        } else {
            const url = `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(countries)}`
            let response
            response = await fetch(url).then(res => res.json())
            try {
                const embed = new MessageEmbed()
                    .setTitle(`🦠 COVID-19 Stats for **${countries}**`)
                    .setThumbnail(response.countryInfo.flag)
                    .addField('😷 Total Cases', response.cases.toLocaleString())
                    .addField('☠️ Total Deaths', response.deaths.toLocaleString())
                    .addField('🏥 Total Recovered', response.recovered.toLocaleString())
                    .addField('🤒 Active Cases', response.active.toLocaleString())
                    .addField('🤢 Critical Cases', response.critical.toLocaleString())
                    .addField('⚰️ Todays Deaths', response.todayDeaths.toLocaleString())
                    .addField(':helmet_with_cross: Today Recoveries', response.todayRecovered.toLocaleString())
                    .setFooter(`Asked by: ${message.member.displayName} • Country asked: ${countries.toUpperCase()}`,message.guild.iconURL())
                    .setTimestamp()
                    .setColor(`RANDOM`)
                message.channel.send({embeds:[embed]})
            } catch {
                message.channel.send('**:warning: Country not found (Make sure to enter a country and not a city)**')
            }
        }
    
}

module.exports.config = {
    name: 'covid', // Command Name
    description: 'Send covid inforamtions embed', // Description
    usage: '+covid Optionnal: <country>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['covid19','cov'], // Aliases 
    cooldown: 5 // Command Cooldown
}