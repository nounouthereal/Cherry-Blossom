
const { MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require("discord.js");
const fs = require("fs");
const QRCode = require('qrcode');
const SPqr = require('qr-image')
var gm = require('gm')
const PDFDocument = require('pdfkit');



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
        {
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
                    name: "PDF",
                    value: "pdf"
                },
                {
                    name: "SVG",
                    value: "svg"
                },
                {
                    name: "EPS",
                    value: "eps"
                },
                {
                    name: "TXT",
                    value: "txt"
                },

            ],
        },
        {
            name: "scale",
            description: "📈 The QR scale (1-10)",
            type: "NUMBER",
            required: false,
        },
        /*{
            name: "foreground_color",
            description: "🗺 The QR code foreground color (you should always use a dark color for this)",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "🕳 Transparent",
                    value: "#0000",
                },
                {
                    name: "⚫️ Black",
                    value: "#030303",
                },
                {
                    name: "⚪️ White",
                    value: "#FFF",
                },
                {
                    name: "🔴 Red (Light)",
                    value: "##FFCCCB",
                },
                {
                    name: "🌶 Red (Hard)",
                    value: "#990F02",
                },
                {
                    name: "🔵 Blue (Light)",
                    value: "#ADD8E6",
                },
                {
                    name: "🟠 Orange (Light)",
                    value: "#FFD580",
                },
                {
                    name: "🟡 Yellow (Light",
                    value: "#ffffe0",
                },
                {
                    name: "🟢 Green (Light)",
                    value: "#90EE90",
                },
            ],
        },
        {
            name: "background_color",
            description: "🏙 The QR code background color (you should always use a light color for this)",
            type: "STRING",
            required: false,
            choices: [
                {
                    name: "🕳 Transparent",
                    value: "#0000",
                },
                {
                    name: "⚫️ Black",
                    value: "#030303",
                },
                {
                    name: "⚪️ White",
                    value: "#FFF",
                },
                {
                    name: "🔴 Red (Light)",
                    value: "##FFCCCB",
                },
                {
                    name: "🌶 Red (Hard)",
                    value: "#990F02",
                },
                {
                    name: "🔵 Blue (Light)",
                    value: "#ADD8E6",
                },
                {
                    name: "🟠 Orange (Light)",
                    value: "#FFD580",
                },
                {
                    name: "🟡 Yellow (Light",
                    value: "#ffffe0",
                },
                {
                    name: "🟢 Green (Light)",
                    value: "#90EE90",
                },
            ],
        },*/
    ],

    run: async (bot, interaction, args) => {

        try {

            let dataQr = interaction.options.getString("data")
            let format = interaction.options.getString("format")
            let foreground_color = interaction.options.getString("foreground_color")
            let background_color = interaction.options.getString("background_color")
            let scale = interaction.options.getString("background_color")


            if (!foreground_color) foreground_color = "#030303"
            if (!background_color) background_color = "#FFF"

            if (!scale) scale = 10


            let image = await QRCode.toBuffer(dataQr, {
                color: {
                  dark: foreground_color,
                  light: background_color
                },
                scale: scale
            })

            let sub_format = format

            if (format == "pdf") {
                sub_format = "png"
            }





            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm generating the Qrcode. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            if (format == "txt") {
                const atc = new MessageAttachment(Buffer.from(image), 'qrcodeBasic.txt');
                return interaction.editReply({embeds: [], files: [atc] });
            }



            gm(image, `qrcode.${sub_format}`)
                .toBuffer(format.toUpperCase(), function (err, buffer) {
                })


            if (format == "pdf") {

                const doc = new PDFDocument()

                doc.image(image, {
                    fit: [500, 500],
                    align: 'center',
                    valign: 'center'
                });


                doc.end();

                const atc = new MessageAttachment(doc, 'qrcodeBasic.pdf');



                interaction.editReply({ embeds: [], files: [atc] });

                return
            }

            const attachment = new MessageAttachment(image, `qrcode.${format}`)

            let embedGenerated = new MessageEmbed()
                .setColor(foreground_color)
                .setImage(`attachment://qrcode.${format}`)

            if (format == "eps") {

                var qrSpData = SPqr.image(dataQr, { type: format });

                const atc = new MessageAttachment(qrSpData, `qrcodeBasic.${format}`);



                return await interaction.editReply({ embeds: [], files: [atc] })

            }

            if (format == "svg") {

                var qrSpData = SPqr.image(dataQr, { type: format });

                gm(image, `qrcode.svg`)
                    .toBuffer(format.toUpperCase(), function (err, buffer) {
                    })

                const atc = new MessageAttachment(qrSpData, `qrcode.${format}`);



                return await interaction.editReply({ embeds: [], files: [atc] })
            }

            interaction.editReply({ embeds: [embedGenerated], files: [attachment] })




        } catch (err) {

            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] }) || interaction.followUp({ embeds: [basicError] })
        }
    },
};
