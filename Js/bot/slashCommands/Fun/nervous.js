const { MessageEmbed } = require("discord.js");
const anime = require('anime-actions');


module.exports = {
    name: "nervous",
    description: "😰 Make someone fell nervous, nervously",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "😞 The user to make feel him nervous",
            required: false,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let member = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            let text

            if (!member) {
                member = bot.user
                text = `>>> 😰 <@${interaction.user.id}> feels nervous. ${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||They ..they make me feel very nervous to... please let me out||" : ""}`
            }

            else {
                text = `>>> 😰 <@${interaction.member.id}> made <@${member.id || member.user.id}> feel nervous. ${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||They ..they make me feel very nervous to... please let me out||" : ""}`
            }

            let url = await anime.nervous()

            const embed = new MessageEmbed() 
                .setAuthor({
                    name: `😰 Don't be nervous...`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`${text}`)
                .setImage(url)
                .setColor("RANDOM")
                .setFooter({
                    text: `😰 Nervous • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(url);
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