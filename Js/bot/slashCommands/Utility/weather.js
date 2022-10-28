const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    name: "weather",
    description: "🌤 Get weather for a city",
    cooldown: 5,
    options: [
        {
            name: "city",
            description: "🏙 The city name to get weather in",
            type: "STRING",
            required: true,
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            let weatherKey = "3b787fa23d1abe796882e297e645c948"

            let city = interaction.options.getString("city")


            const wait_emb = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | I'm searching weather for \`${city}\`. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_emb] })




            const body = await fetch("http://api.openweathermap.org/data/2.5/weather?" + "appid=" + weatherKey + "&q=" + city + '&lang=' + "en")
            const meteo = await body.json()

            if (meteo.cod != "404") {

                let y = meteo.main
                let w = meteo.coord
                let current_temperature = y.temp
                let current_temperature_celsiuis = String(Math.round(current_temperature - 273.15))
                let current_pressure = y.pressure
                let current_humidity = y.humidity
                let current_feels_like = y.feels_like
                let current_feels_like_celsius = String(Math.round(current_feels_like - 273.15))
                let timezone = meteo.timezone
                let temp_max = y.temp_max
                let temp_min = y.temp_min
                let temp_max_celsius = String(Math.round(temp_max - 273.15))
                let temp_min_celsius = String(Math.round(temp_min - 273.15))
                let current_timezone = String(Math.round(timezone / 3600))
                let z = meteo.weather
                let weather_description = z[0].description
                let weather_main = z[0].main
                let lat = w.lat
                let lon = w.lon

                const emb = new MessageEmbed()

                let emoji = "Weather emoji cannot be loaded"

                emb.setThumbnail(`http://openweathermap.org/img/wn/${z[0].icon}@2x.png`)

                console.log(z[0].id)

                if (z[0].id == 800) {
                    emoji = "☀️"
                }

                if (z[0].id == 801) {
                    emoji = "🌤"
                }

                if (z[0].id == 802) {
                    emoji = "⛅️"
                }

                if (z[0].id == 803) {
                    emoji = "🌥"
                }

                if (z[0].id == 804) {
                    emoji = "🌥"
                }

                if(z[0].id == 805) {
                    emoji = "☁️"
                }

                if(z[0].id.toString().startsWith("7")) {
                    emoji = "🌫"
                }

                if(z[0].id.toString().startsWith("6")) {
                    emoji = "❄️"
                }

                if(z[0].id == 500) {
                    emoji = "💧"
                }

                if(z[0].id == 501) {
                    emoji = "💦"
                }

                if(z[0].id == 502) {
                    emoji = "🌧"
                }

                if(z[0].id == 503) {
                    emoji = "☔️"
                }

                if(z[0].id.toString().startsWith("2")) {
                    emoji = "⛈"
                }


                emb.setTitle(`${emoji} Weather for ${meteo.name}`)
                emb.setColor("RANDOM")
                emb.setFooter(`${emoji} Weather • Asked by ${interaction.member.nickname || interaction.user.username}`)
                emb.addFields(
                    { name: `Weather Description`, value: `${emoji} **${weather_main} - ${weather_description}**`},
                    { name: '🌡 Temperature (°C)', value: `**${current_temperature_celsiuis}°C**`},
                    { name: '🔥 - 🧊 Temperature Max et Min(°C)', value: `**Temp.max: ${temp_max_celsius}°C\nTemp.min: ${temp_min_celsius}°C**`},
                    { name: '🤒 Température ressentie(C)', value: `**${current_feels_like_celsius}°C**`},
                    { name: '💧 Humidity(%)', value: `**${current_humidity}%**`},
                    { name: '🌍 Atmospheric pressure(hPa)', value: `**${current_pressure}hPa**`},
                    { name: '🍃 Wind Speed(m/s) - 🌬 Wind Direction', value: `**${meteo.wind.speed}m/s** \`||\` **${meteo.wind.deg}°**`, inline: true},
                    { name: '☁️ Cloud Cover (%)', value: `**${meteo.clouds.all}%**`, inline: true},
                    { name: '🗺 Coordinates(lat-lon)', value: `**Latitude: ${lat}\nLongitude: ${lon}**`, inline: false},
                    { name: '🕰 Jet lag UTC(h)', value: `**${current_timezone}h**`},
                    //{ name: '⛩ Region', value: `${meteo.region}` },
                    //{ name: '♻️ Status', value: `${meteo.status.toUpperCase()}` },
                )
                emb.setTimestamp();


                interaction.editReply({ embeds: [emb] })
            }

            else {
                interaction.editReply({ embeds: [], content: `❌ Cannot found a city named: \`${city || "Eyyoo if you see this message you are really beautiful"}\`.`}) || interaction.followUp({content: `❌ Cannot found a city named: \`${city || "Eyyoo if you see this message you are really beautiful"}\`.`})
            }


        } catch (err) {
            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embs: [basicError] })
        }
    },
};
