const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {

    try { 

        const countries = args.join(" ");

        let array_all = ['all','max','world','tout','worldwide']

        if (args[1] != undefined)
            return message.channel.send('Usage: +covid all || country')

        const wait_embed = new MessageEmbed() 
            .setDescription(`<a:loading:1032282688821940245> | I'm downloading covid data for \`${countries || "worldwide"}\`. Please wait...`)
            .setColor("5865f2");

        sent = await message.reply({embeds: [wait_embed]})

        if (!args[0] || array_all.includes(args[0].toLowerCase())) {
            
            const url = `https://disease.sh/v3/covid-19/all`
            let response
            response = await fetch(url).then(res => res.json())

            const embed = new MessageEmbed()
                .setTitle(`🦠 Worldwide COVID-19 Stats 🌎`)
                .setThumbnail(`https://w7.pngwing.com/pngs/927/817/png-transparent-globe-emoji-earth-world-europe-europe-miscellaneous-sphere-sign.png`)
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
            sent.edit({embeds: [embed]})

        } else {

            const url = `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(countries)}`
            let response
            response = await fetch(url).then(res => res.json())
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
                sent.edit({embeds:[embed]})
            }
    } catch (err) {
        console.log(err);

        if (err.length > 2010) {
            err.substring(0, 2010)
        }

        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({ embeds: [basicError] })

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