const { Color, isColor} = require("coloras");
const { MessageEmbed } = require("discord.js");
const { colord, extend, random: randomColor  } = require('colord')
const namesPlugin =  require("colord/plugins/names");





module.exports = {
    name: "color",
    description: "🎨 Shows color info",
    cooldown: 5,
    options: [
        {
            name: "color",
            description: "🎨 The color to show info about",
            required: false,
            type: "STRING",
        },
    ],
    run: async (bot, interaction, args) => {
        try {

            extend([namesPlugin])

            let searchingColor = interaction.options.getString("color")

            !searchingColor ? (random = true) : (random = false);

            if(random == false) {
                searchingColor = colord(searchingColor).toHex()
            }

            if(random == true) {
                searchingColor = randomColor().toHex()
            }

            let colorName = colord(searchingColor).toName({ closest: true})

            
            if (!random && !isColor(searchingColor).color || searchingColor == 0) {
                let errEmb1 = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : Please take a valid \`hex / rgb / hsl / hsv / cmyk EX: (#7C924F, rgb(124, 146, 79), hsl(80, 30%, 44%), hsv(80, 46%, 57%))\` code color. `)
                    .setColor("RED")
                return interaction.followUp({ embeds: [errEmb1] })
            }
            const value = random ? null : searchingColor;
            const color = new Color(value);

            const embed = new MessageEmbed() // Prettier
                .setTitle(random ? `🎨 Random Color: ${(!colorName) ? color.toHex() : colorName.toLocaleUpperCase()}` : `🎨 Color: ${(!colorName) ? color.toHex() : colorName.toUpperCase()}`)
                .addField("Name", `> \`${colorName.toUpperCase()}\``, true)
                .addField("HEX", `> \`${color.toHex()}\``, true)
                .addField("RGB", `> \`${color.toRgb()}\``, true)
                .addField("HSL", `> \`${color.toHsl()}\``, true)
                .addField("HSV", `> \`${color.toHsv()}\``, true)
                .addField("CMYK", `> \`${color.toCmyk()}\``, false)
                .setImage(color.imageUrl)
                .setColor(color.toHex())
                .setFooter({
                    text: `🎨 ${(!colorName) ? color.toHex() : colorName.toUpperCase()} Color • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            interaction.followUp({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support Server](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.editReply({ embeds: [basicError] })
        }
    },
};