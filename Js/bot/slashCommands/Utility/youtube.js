const { MessageEmbed, MessageAttachment } = require("discord.js");
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');

const HttpsProxyAgent = require('https-proxy-agent');
const fs = require("fs");
const URL = require("url").URL;
const https = require('https');
const http = require('http');






module.exports = {
    name: "youtube",
    description: "📮 Make youtube actions",
    cooldown: 7.5,
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


            if (!stringIsAValidUrl(url) && command == "download") {
                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : \`${url}\` Is not a valid url`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }




            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | Working on youtube \`${bigCommand} ${command}\`. Please wait...`)
                .setColor("5865f2");

            await interaction.followUp({ embeds: [wait_embed] })

            if (command == "search") {

                const filters1 = await ytsr.getFilters(search);
                const filter1 = filters1.get('Type').get('Video');

                const options = {
                    pages: 1,
                }

                const searchResults = await ytsr(filter1.url, options);

                const video = searchResults.items[0]

                const emb = new MessageEmbed()
                emb.setTitle(`📮 Video informations for ${search}`)
                emb.setColor("RANDOM")
                emb.setFooter(`Youtube Search • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    })
                )

                emb.addFields(
                    { name: `📹 Title:`, value: `${video.title}` },
                    { name: '🤳 Channel:', value: `**${video.author.name}**` },
                    { name: '👁‍🗨 Views:', value: `\`${video.views.toLocaleString()} views\``, inline: true },
                    { name: '⌛️ Duration:', value: `${video.duration}`, inline: true },
                    { name: '🔗 URL:', value: `__${video.url}__`, inline: false },
                    { name: '🆔 ID:', value: `\`${video.id}\``, inline: true },
                    { name: '🕰 Uploaded:', value: `**${video.uploadedAt}**`, inline: true },
                    //{ name: '☁️ Cloud Cover (%)', value: `**${meteo.clouds.all}%**`, inline: true },
                    //{ name: '🗺 Coordinates(lat-lon)', value: `**Latitude: ${lat}\nLongitude: ${lon}**`, inline: false },
                    //{ name: '🕰 Jet lag UTC(h)', value: `**${current_timezone}h**` },
                    //{ name: '⛩ Region', value: `${meteo.region}` },
                    //{ name: '♻️ Status', value: `${meteo.status.toUpperCase()}` },
                )
                emb.setThumbnail(video.author.bestAvatar.url)
                emb.setImage(video.bestThumbnail.url)
                emb.setTimestamp();

                await interaction.editReply({ embeds: [emb] })



            }

            if (command == "download") {


                const proxy = 'http://user:pass@111.111.111.111:8080';
                const agent = HttpsProxyAgent(proxy);


                const check = await checkYtbUrl(url)

                if (!check) {
                    let badEmb = new MessageEmbed()
                        .setDescription(`❌ <@${interaction.user.id}> : Could not connect to a youtube video named: \`${url}\`. Please verify if this video is working or even existing: [Get_To_The_Video](${url}).`)
                        .setColor("RED")
                    return interaction.editReply({ embeds: [badEmb] }) || interaction.followUp({ embeds: [badEmb] })
                }



                ytdl(url, {
                    requestOptions: { agent },
                })
                    .pipe(fs.createWriteStream(`/Users/nouhame/Bot_des_cerisiers/Js/bot/cherry-youtube-video-${interaction.user.id}.mp4`));

                await new Promise(resolve => setTimeout(resolve, 10000));

                let video = new MessageAttachment(`/Users/nouhame/Bot_des_cerisiers/Js/bot/cherry-youtube-video-${interaction.user.id}.mp4`, `cherry-youtube-video.mp4`);



                const embed = new MessageEmbed()
                    .setTitle(`📮 Youtube Video Download`)
                    .setDescription(`:warning: Don't forget, Youtube videos reuploading is forbidden.`)
                    .setColor("RED")
                    .setImage(url)
                    .setTimestamp()
                    .setFooter({ text: `Youtube Video Download • Asked by ${interaction.member.nickname || interaction.user.username}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        })
                    }) 

                await interaction.editReply({ embeds: [embed], files: [video] })

                await new Promise(resolve => setTimeout(resolve, 1000));


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
            return interaction.editReply({ embeds: [basicError] }) || interaction.followUp({ embeds: [basicError] })
        }
    }
};