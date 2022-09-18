const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
let baka_emote = "<:baka:1019292436482232332>"



module.exports = {
    name: "baka",
    description: "😒 Says to someone he is a baka",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "👤 The user",
            required: false,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let member = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            let sentence

            if (!member || member.id == interaction.user.id) {
                member = interaction.user
                sentence = `${baka_emote} || <@${interaction.member.id}> is a baka.`
            }
            else {
                sentence = `${baka_emote} || <@${interaction.member.id}> said that <@${member.id}> is a baka.`
            }


            const res = await fetch("https://api.catboys.com/baka");
            const body = await res.json();
            const embed = new MessageEmbed() // Prettier
                .setAuthor({
                    name: `😒 Baka !`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> ${sentence}`)
                .setImage(body.url)
                .setColor("RANDOM")
                .setFooter({
                    text: `😒 Baka • Asked by ${interaction.member.nickname}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(body.url);
            interaction.followUp({ embeds: [embed] });
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