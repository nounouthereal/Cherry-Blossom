
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const axios = require("axios");


module.exports = {
    name: "qrcode",
    description: "📟 Create a qrcode",
    cooldown: 5,
    options: [
        {
            name: "data",
            description: "💾 The qrcode data to be encode",
            type: "STRING",
            required: true,
        },
        /*{
            name: "format",
            description: "🌀 The qrcode format to be encode",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "PNG",
                    value: "png"
                },
                {
                    name: "JPG",
                    value: "jpg"
                },
                {
                    name: "JPEG",
                    value: "jpeg"
                },
                {
                    name: "SVG",
                    value: "svg"
                },
                {
                    name: "EPS",
                    value: "eps"
                },

            ],
        },*/
        {
            name: "size",
            description: "↔️ The width of the QR code (in pixels)",
            type: "NUMBER",
            required: false,
        },
        {
            name: "foreground_color",
            description: "🗺 The QR code foreground color (you should always use a dark color for this)",
            type: "STRING",
            required: false,
        },
        {
            name: "background_color",
            description: "🏙 The QR code background color (you should always use a light color for this)",
            type: "STRING",
            required: false,
        }
    ],

    run: async (bot, interaction, args) => {

        try {

            let dataQr = interaction.options.getString("data")
            let size = interaction.options.getNumber("size")
            //let format = interaction.options.getString("format")
            let foreground_color = interaction.options.getString("foreground_color")
            let background_color = interaction.options.getString("background_color")

            if (!foreground_color) foreground_color = interaction.member.displayHexColor
            if (!background_color) background_color = "ffffff"


            if (!size) size = "300"



            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm generating the Qrcode. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            const encodedParams = new URLSearchParams();
            encodedParams.append("content", dataQr);
            encodedParams.append("width", size);
            encodedParams.append("height", size);
            encodedParams.append("fg-color", foreground_color);
            encodedParams.append("bg-color", background_color);

            const options = {
                method: 'POST',
                url: 'https://neutrinoapi-qr-code.p.rapidapi.com/qr-code',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': 'fe357df54amsh2f40b55a738fff8p13c896jsn3139801de2e0',
                    'X-RapidAPI-Host': 'neutrinoapi-qr-code.p.rapidapi.com'
                },
                data: encodedParams
            };



            axios.request(options).then(function (response) {

                const buffer = Buffer.from(response.data)


                const attachment = new MessageAttachment(buffer, `qrcode.png`)

                let embedGenerated = new MessageEmbed()
                    .setTitle('A slick little embed')
                    .setColor(0xFF0000)
                    .setImage(`attachment://qrcode.png`)

                interaction.editReply({ embeds: [embedGenerated], files: [attachment] })

            })


        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};
