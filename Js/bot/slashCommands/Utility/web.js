const { MessageEmbed, MessageAttachment } = require("discord.js");
const puppeteer = require('puppeteer');
const fs = require("fs");
const CURSED = require('../../utils/data/p*rnWebsite.json');
const URL = require("url").URL;
const https = require('https');
const http = require('http');
const Ping = require('ping-wrapper');





module.exports = {
    name: "web",
    description: "🕸 Make web actions",
    cooldown: 15,
    options: [
        {
            name: "page",
            description: "📑 Make actions on a web page",
            type: "SUB_COMMAND_GROUP",
            options: [
                {
                    name: "screenshot",
                    description: "📸 Screenshot a web page",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "url",
                            description: "🔗 The url of the page you want to screenshot",
                            type: "STRING",
                            required: true,
                        },
                        {
                            name: "full_page",
                            description: "🎞 When true, takes a screenshot of the full scrollable page. Defaults to False. (Possibly Glitched)",
                            type: "BOOLEAN",
                            required: false,
                        },
                        {
                            name: "omit_backgroud",
                            description: "🔖 Hides default white background. Defaults to False",
                            type: "BOOLEAN",
                            required: false,
                        },
                    ],
                },
                {
                    name: "ping",
                    description: "🏓 Get the ping of a web page",
                    type: "SUB_COMMAND",
                    options: [
                        {
                            name: "url",
                            description: "🔗 The url of the page you want to get ping",
                            type: "STRING",
                            required: true,
                        },
                    ],
                }
            ],
        },
    ],

    run: async (bot, interaction, args) => {


        try {


            const command = interaction.options.getSubcommand()

            let bigUrl = interaction.options.getString("url")
            let omitBack = interaction.options.getBoolean("omit_background")
            let full = interaction.options.getBoolean("full_page")

            if (!full) {
                full = false
            }

            if (!omitBack) {
                omitBack = false
            }

            const stringIsAValidUrl = (s) => {
                try {
                    new URL(s);
                    return true;
                } catch (err) {
                    return false;
                }
            };

            function checkWebsite(url) {
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


            const url = bigUrl.toLowerCase()

            if (CURSED.some(word => url.includes(word.host)) && !interaction.channel.nswf) {

                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : To screenshot a 18+ website you need to be in a NSWF Channel.`)
                    .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif")
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }


            if (!stringIsAValidUrl(url)) {
                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : \`${url}\` Is not a valid url`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }

            const check = await checkWebsite(url)

            if (!check) {
                let badEmb = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Could not connect to a website named: \`${url}\`. Please verify if this website is running or even existing: [Get_To_The_Website](${url}).`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [badEmb] })
            }





            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | Working on web \`${command}\`. Please wait...`)
                .setColor("5865f2");

            await interaction.followUp({ embeds: [wait_embed] })

            if (command == "screenshot") {


                (async () => {
                    const browser = await puppeteer.launch({ headless: true });

                    const page = await browser.newPage();
                    await page.goto(url);
                    await page.screenshot({ path: `/Users/nouhame/Bot_des_cerisiers/Js/bot/web-${interaction.user.id}.png`, fullPage: full, omitBackground: omitBack });

                    await browser.close();
                })();


                let image = new MessageAttachment(`/Users/nouhame/Bot_des_cerisiers/Js/bot/web-${interaction.user.id}.png`, `web.png`);

                await new Promise(resolve => setTimeout(resolve, 10000));


                const embed = new MessageEmbed()
                    .setTitle(`📸 ${url.substring(url.startsWith("https") ? 8 : 7)} Screenshot`)
                    .setDescription(`${url} Options: \n\nFull Page: \`${full}\`\nOmit Background: \`${omitBack}\`\n\n**Image:**`)
                    .setColor("RANDOM")
                    .setImage(`attachment://web.png`)
                    .setURL(url)
                    .setFooter(`Web Screenshot • Asked by ${interaction.member.nickname || interaction.user.username}`)

                await interaction.editReply({ embeds: [embed], files: [image] })

                fs.unlinkSync(`/Users/nouhame/Bot_des_cerisiers/Js/bot/web-${interaction.user.id}.png`);


            }

            if (command == "ping") {

                if (url.startsWith("https://"))
                
                let data = https.get(url)

                console.log(data)


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