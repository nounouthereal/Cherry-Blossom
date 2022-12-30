const { MessageEmbed, MessageAttachment } = require("discord.js")
const puppeteer = require('puppeteer');


module.exports = {
    name: "draw",
    description: "💳 Show your or a user balance",
    cooldown: 5,
    options: [

        {
            name: "prompt",
            description: '💳 The user balance',
            type: "STRING",
            required: false,
        }

    ],


    run: async (bot, interaction, args) => {

        try {

            const prompt = interaction.options.getString("prompt");

            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading:1032282688821940245> | I'm drawing \`${prompt.substring(0, 20)}\` with deepAI. Please wait this can take up to 3 minutes...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })


            const browser = await puppeteer.launch({ headless: false });

            const navigationPromise = page.waitForNavigation()

            const page = await browser.newPage();
            await page.goto("https://deepai.org/machine-learning-model/text2img", {
                waitUntil: "networkidle2",
            });

            await navigationPromise

            
            const cookiesButton = await page.waitForXPath('//button[@class=" css-47sehv"]')
            await cookiesButton.click();

            await navigationPromise


            const searchText = await page.waitForXPath('//*[@class="model-input-text-input"]');
            await searchText.type(`${prompt}`);

            await navigationPromise


            const button = await page.waitForXPath('//button[@id="modelSubmitButton"]')
            await button.click();

            await navigationPromise


            const googleButton = await page.waitForXPath('//button[@class="button social-auth"]')
            await new Promise((r) => setTimeout(r, 2000));

            await navigationPromise

            await page.evaluate((element) => { element.click(); }, googleButton);

            await navigationPromise

            await page.type('input[name=identifierId]', 'botfleurdecerisier@gmail.com')
            await page.type('input[name=password]', 'SweetHeart')

            await navigationPromise



            //await browser.close();


            //let image = new MessageAttachment(`/Users/nouhame/Bot_des_cerisiers/Js/bot/web-${interaction.user.id}.png`, `draw.png`);

            return

            await new Promise(resolve => setTimeout(resolve, 10000));


            const embed = new MessageEmbed()
                .setTitle(`📸 `)
                .setDescription(`${url} Options: \n\nFull Page: \`${full}\`\nOmit Background: \`${omitBack}\`\n\n**Image:**`)
                .setColor("RANDOM")
                .setImage(`attachment://web.png`)
                .setURL(url)
                .setTimestamp()
                .setFooter({ text: `Web Screenshot • Asked by ${interaction.member.nickname || interaction.user.username}` })

            await interaction.editReply({ embeds: [embed], files: [image] })

            fs.unlinkSync(`/Users/nouhame/Bot_des_cerisiers/Js/bot/web-${interaction.user.id}.png`);

        }

        catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] }) || interaction.followUp({ embeds: [basicError] })
        }

    }
}