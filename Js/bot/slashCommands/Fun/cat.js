const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    name: "cat",
    description: "🐱 Meow, cats are so cute!",
    cooldown: 5,
    options: [
        {
            name: "image",
            description: "🐱 Display a random picture of a cute cat",
            type: 1,
            required: false,
        },
        {
            name: "emoji",
            description: "🐱 Get a random cat emoji because cats are cute",
            type: "SUB_COMMAND",
            required: false,

        },
    ],
    run: async (bot, interaction, args) => {
        try {

            if (args[0] === "image") {


                const wait_embed = new MessageEmbed()
                    .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm downloading a cat image. Please wait...`)
                    .setColor("5865f2");

                interaction.followUp({ embeds: [wait_embed] })


                const response = await fetch("https://nekos.life/api/v2/img/meow");
                const body = await response.json();
                const embed = new MessageEmbed()
                    .setDescription(
                        `**[🐱 Random Cat](${body.url})**`,
                        interaction.guild.iconURL({
                            dynamic: true,
                            format: "png",
                        })
                    )
                    .setImage(body.url)
                    .setColor("RANDOM")
                    .setFooter({
                        text: "Asked by " + `${interaction.member.nickname}` + " • (Aww cute =＾´• ⋏ •`＾=)",
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    })
                    .setTimestamp()
                    .setURL(body.url);
                interaction.editReply({ embeds: [embed] });

            } else if (args[0] === "emoji") {
                let text = await neko.sfw.catText();


                const embed = new MessageEmbed()
                    .setDescription(`>>> \`${text.cat}\``)
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setFooter({
                        text: `Asked by ${interaction.member.nickname} • ${interaction.guild.name}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                            format: "png",
                            size: 2048,
                        }),
                    });
                interaction.followUp({ embeds: [embed] });
            }
        } catch (err) {
            console.log(err);

            if (err.length > 2010) {
                err.substring(0, 2010)
            }

            let basicError = new MessageEmbed()
                .setDescription(`❌ <@${interaction.user.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor("RED")
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};