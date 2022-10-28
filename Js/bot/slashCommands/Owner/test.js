const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js')
const https = require('https')



module.exports = {
    name: "test",
    description: "Bêta v1.1",
    cooldown: 0,
    options: [
        {
            name: "query",
            description: "seconds",
            required: false,
            type: "STRING"
        },
        {
            name: "query",
            description: "repeat",
            required: false,
            type: "STRING"
        },
    ],

    run: async (bot, interaction, args) => {

        try {

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

            const req = https.request(options, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);

                res.on('data', (d) => {
                    process.stdout.write(d);
                });
            });

            req.on('error', (e) => {
                console.error(e);
            });
            req.end();

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

