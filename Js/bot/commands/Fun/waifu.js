const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');



module.exports.run = async (bot, message, args) => {
    try {

        let tag = args[0]
        let gif_only = args[1]

        let tagName = ""

        if (!tag) tag = "waifu"

        if (tag == "uniform") { tagName = "👘 Uniform" }
        if (tag == "selfies") { tagName = "🤳 Selfie" }
        if (tag == "maid") { tagName = "🧹 Maid" }
        if (tag == "oppai") { tagName = "🍑 Oppai" }



        if (!gif_only) gif_only = "false"

        const tags = ["waifu","uniform","selfie","maid","oppai"];
        if (tag.toLowerCase() == "oppai") {
            const nsfwembed = new MessageEmbed() // Prettier
                .setColor("RED")
                .setDescription(`❌ <@${message.author.id}> : You can use the \`${tagName}\` only in an NSFW Channel`)
                .setFooter({ text: `Asked by ${message.author.tag} • ${message.guild.name}`, iconURL: message.author.displayAvatarURL() })
                .setImage("https://media.discordapp.net/attachments/721019707607482409/855827123616481300/nsfw.gif");
            return message.reply({ embeds: [nsfwembed] });
        }
        const all_tags = new MessageEmbed() // Prettier
            .setDescription(`📧 All waifu tags (${tags.length}): \`${tags.join("`, `")}\``)
            .setFooter({ text: `Asked by ${message.author.username} • ${message.guild.name}`, iconURL: message.author.displayAvatarURL() });
        if (!tag) {
            all_tags.setTitle(`📧 : Please enter a tag!`).setColor("RED");
            return message.reply({ embeds: [all_tags] });
        }
        if (tag.toLowerCase() == "show_all" || tag.toLowerCase() == "help" || tag.toLowerCase() == "all") {
            all_tags.setTitle(`📧 All tags`).setColor("GREEN");
            return message.reply({ embeds: [all_tags] });
        }
        if (!tags.includes(tag.toLowerCase())) {
            all_tags.setTitle(`📧 Please enter a vaild tag!`).setColor("RED");
            return message.reply({ embeds: [all_tags] });
        }

        /*if (tag == "oppai" || tag == "maid") {
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle("DANGER")
                        .setLabel("Yes")
                        .setCustomId(`yes`)

                )
                .addComponents(
                    new MessageButton()
                        .setStyle("SUCCESS")
                        .setCustomId(`no`)
                        .setLabel("No")
                );
            let warnEmbed = new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`:warning: DISCLAIMER <@${message.author.id}> : The \`${tagName}\` tag is intended for **ages 16 and up**.\n\nThe \`${tagName}\` tag can potentially contain Ecchi and Lewd images/gifs\nAre you sure you want to continue ?`);
            message.reply({ embeds: [warnEmbed], components: [row] }).catch();

            const buttonFilter = (verifyInteraction) => {
                let notInteractionAuthorEmb = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`:x: <@${verifyInteraction.user.id}> : Only the author of the command can use the buttons`);
                message.reply({emnbeds: [notInteractionAuthorEmb], ephemeral: true})
            }

            const buttonColletor = message.channel.createMessageComponentCollector({
                buttonFilter,
                max: 1,
            })

            buttonColletor.on("end", async (ButtonInteraction) => {
                const button = ButtonInteraction.first()

                const id = button.customId;

                if (id === 'no') {
                    let stop_embed = new MessageEmbed()
                        .setDescription(`:bulb: You stoped the command.`)
                        .setColor("YELLOW")
                    button.reply({ embeds: [stop_embed] })

                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)

                    interaction.editReply({ embeds: [warnEmbed], components: [row] })

                    sleep(7)

                    interaction.deleteReply({ embeds: [warnEmbed], components: [row] })

                    return
                }

                if (id === 'yes') {

                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)

                    button.reply({content: `<a:loading_please_wait:1014982234492633088> | Please wait...`})

                    sleep(2)

                    button.deleteReply({content: `<a:loading_please_wait:1014982234492633088> | Please wait...`})

                    interaction.editReply({ embeds: [warnEmbed], components: [row] })
                }
            })
        }
        */



        const wait_embed = new MessageEmbed()
            .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm downloading a \`${tagName} Waifu\` image. Please wait...`)
            .setColor("5865f2");

        let sent = await message.reply({ embeds: [wait_embed] })

        let res = await fetch(`https://api.waifu.im/random/?selected_tags=${tag.toLowerCase()}&gif=${gif_only}`);

        const body = await res.json();


        if (body.detail == "No image found matching the criteria given") {


            const NotFoundembed = new MessageEmbed()
                .setColor("RED")
                .setImage(`https://c.tenor.com/OyUVgQi-l-QAAAAC/404.gif`)
                .setDescription(`❌ <@${message.author.id}> : No waifu image/gif found matching the criteria given : \`Tag : ${tagName}, Gif_Only: ${gif_only}\``)
                .setTimestamp()
                .setFooter({
                    text: `Asked by ${message.author.displayName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            return sent.edit({ embeds: [NotFoundembed] });
        }

        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`${tagName} Waifu images`)
            .setURL(`${body.images[0].url}`)
            .setImage(`${body.images[0].url}`)
            .setTimestamp()
            .setFooter({
                text: `👘 Waifu • Asked by ${message.author.displayName || message.author.username}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            });
        sent.edit({ embeds: [embed] });
    } catch (err) {

        console.log(err);
        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor(`RED`)
            .setTimestamp()
        message.reply({ embeds: [basicError] })
    }
}


module.exports.config = {
    name: 'waifu', // Command Name
    description: '👘 Get a random waifu image or gif', // Description
    usage: '+waifu Optionnal: <tag> <gif_only>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: [], // Aliases 
    cooldown: 5 // Command Cooldown
}