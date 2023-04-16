const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js')
const https = require('https')



module.exports = {
    name: "test",
    description: "Bêta v1.1",
    cooldown: 0,
    options: [
        {
            name: "query",
            description: "1",
            required: false,
            type: "STRING"
        },
        {
            name: "query2",
            description: "2",
            required: false,
            type: "STRING"
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let query1 = interaction.options.getString("query")
            let query2 = interaction.options.getString("query2")

            /*setInterval(async () => {
                let value = await anime.yeet()
                console.log(value);
                interaction.followUp({content: `${value}`})
                
                setInterval(async () => {
                    return
                }, args[0]*args[2]*1000)
            }, args[0]*1000)*/

            /*const puppeteer = require('puppeteer');


            // add stealth plugin and use defaults (all evasion techniques)
            //const StealthPlugin = require('puppeteer-extra-plugin-stealth')
            //await puppeteer.use(StealthPlugin())


            // puppeteer usage as normal
         
           
            (async () => {
                const browser = await puppeteer.launch({ headless: false });

                const page = await browser.newPage();
                await page.goto("https://www.lex-persona.com");
                await page.screenshot({path: "testPuppeteer.png"});

                await browser.close();
            }) ();

            interaction.followUp({files: ["testPuppeteer.png"]})*/

            /* const ytdl = require('ytdl-core');
            const fs = require('fs')

            ytdl('https://www.youtube.com/watch?v=pyZ9dTb0W2M')
                .pipe(fs.createWriteStream('video.mp4')); */

            bot.guilds.cache.forEach(async guild => {
                console.log(`${guild.name} | ${guild.id}`);
                if (guild.name.toString() == query2) { 
                let invite = await guild.systemChannel.createInvite(
                    {
                      maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
                      maxUses: 1 // maximum times it can be used
                    }
                )
                interaction.followUp({content: `${invite}`})

                }
            })


            



        } catch (err) {
            console.log(err);

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    }
}

