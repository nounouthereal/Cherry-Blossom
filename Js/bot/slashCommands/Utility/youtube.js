const { MessageEmbed, MessageAttachment } = require("discord.js");
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');

const fs = require("fs");
const URL = require("url").URL;
const https = require('https');
const http = require('http');






module.exports = {
    name: "youtube",
    description: "📮 Make youtube actions",
    cooldown: 15,
    options: [
        {
            name: "video",
            description: "📮 Interact with youtube videos",
            type: "SUB_COMMAND_GROUP",
            options: [
                {
                    name: "search",
                    description: "📮 Search for a youtube video",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "query",
                            description: "🍄 Your youtube search",
                            type: "STRING",
                            required: true,
                        },
                    ],
                },
                {
                    name: "download",
                    description: "📥 Download a youtube video",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "url",
                            description: "🔗 The url of the video you want to download",
                            type: "STRING",
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],

    run: async (bot, interaction, args) => {


        try {


            const command = interaction.options.getSubcommand()

            const bigCommand = interaction.options.getSubcommandGroup()

            const search = interaction.options.getString("query");



            let bigUrl = interaction.options.getString("url");



            const stringIsAValidUrl = (s) => {
                try {
                    new URL(s);
                    return true;
                } catch (err) {
                    return false;
                }
            };

            function checkYtbUrl(url) {
                if (url.startsWith("https")) {
                    return new Promise((resolve, reject) => {
                        https
                            .get(url, function (res) {
                                resolve(res.statusCode === 200);
                            })
                            .on("error", function (e) {
                                resolve(false);
                            });
                    })
                }
                else if (url.startsWith("http")) {
                    return new Promise((resolve, reject) => {
                        http
                            .get(url, function (res) {
                                resolve(res.statusCode === 200);
                            })
                            .on("error", function (e) {
                                resolve(false);
                            });
                    })
                }
            }


            const url = bigUrl?.toLowerCase()


            if (!stringIsAValidUrl(url)) {
                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : \`${url}\` Is not a valid url`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }

            const check = await checkYtbUrl(url)

            if (!check) {
                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Could not connect to a youtube video named: \`${url}\`. Please verify if this video is working or even existing: [Get_To_The_Video](${url}).`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }





            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | Working on youtube \`${bigCommand} ${command}\`. Please wait...`)
                .setColor("5865f2");

            await interaction.followUp({ embeds: [wait_embed] })

            if (command == "search") {


                
                
                const searchResults = await ytsr(search);

                console.log(searchResults)


                const emb = new MessageEmbed()
                emb.setTitle(`📮 Video info for ${meteo.name}`)
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

                await interaction.editReply({ embeds: [emb]})



            }

            if (command == "download") {


                ytdl(url)
                    .pipe(fs.createWriteStream(`/Users/nouhame/Bot_des_cerisiers/Js/bot/cherry-youtube-video-${interaction.user.id}.mp4`));
                
                await new Promise(resolve => setTimeout(resolve, 10000));
                    
                let video = new MessageAttachment(`/Users/nouhame/Bot_des_cerisiers/Js/bot/cherry-youtube-video-${interaction.user.id}.mp4`, `cherry-youtube-video.mp4`);

                console.log(video)




                const embed = new MessageEmbed()
                    .setTitle(`📮 `)
                    //.setDescription(`${url} Options: \n\nFull Page: \`${full}\`\nOmit Background: \`${omitBack}\`\n\n**Image:**`)
                    .setColor("RED")
                    .setTimestamp()
                    .setFooter({ text: `Youtube Video Download • Asked by ${interaction.member.nickname || interaction.user.username}` })

                await interaction.editReply({ embeds: [embed], files: [video] })

                await new Promise(resolve => setTimeout(resolve, 4000));


                fs.unlinkSync(`/Users/nouhame/Bot_des_cerisiers/Js/bot/cherry-youtube-video-${interaction.user.id}.mp4`);



            }

        } catch (err) {
            console.log(err);
            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp();
            return interaction.followUp({ embeds: [basicError] })
        }
    }
};