const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
    name: "cuddle",
    description: `🤗 It's cuddle time`,
    cooldown: 5,

    options: [
        {
            name: "user",
            description: "👤 The user to cuddle",
            required: true,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            const user = interaction.options.getUser("user");

            if (!user) {
                let userError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You need to mention a valid user to hug, please.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [userError] })
            }

            if (user.id == interaction.user.id) {
                let authorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : This is sad 😥, but you can't cuddle yourself.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }

            if (user == bot.user) {
                let botUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : This is sad 😥, but you can't cuddle me.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [botUserError] })
            }

            const wait_embed = new MessageEmbed() 
                .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm generating a cuddle gif for \`${user.username}\`. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({embeds: [wait_embed]})

            const res = await fetch("https://nekos.life/api/v2/img/cuddle");

            const body = await res.json();

            const embed = new MessageEmbed()
                .setTitle(`${user.username} has just been cuddled by ${interaction.user.username}`)
                .setDescription(`> <@${user.id}> got cuddled by <@${interaction.user.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want someone I can hug... please let me out||" : ""}`)
                .setImage(body.url)
                .setColor("RANDOM")
                .setFooter({
                    text: `Asked by ${interaction.user.username} • ${interaction.guild.name}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(body.url);
            interaction.editReply({ embeds: [embed] });
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