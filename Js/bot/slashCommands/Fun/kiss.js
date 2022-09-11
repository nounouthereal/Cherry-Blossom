const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "kiss",
    description: "😘 Kiss someone in front of @everyone, romantically",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "💓 The user to kiss",
            required: true,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let member = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            if (!member) {
                member = bot.user
            }
            
            if (member.id == interaction.user.id) {
                let authorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You want to kiss yourself, you're too narcissistic , ehh.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }
    


            const res = await fetch("https://nekos.life/api/v2/img/kiss");
            const body = await res.json();
            const embed = new MessageEmbed() // Prettier
                .setAuthor({
                    name: `❤️‍🔥 Soo romantic`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> 😘 <@${member.id || member.user.id}> just got a kiss from <@${interaction.member.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| I want someone I can kiss... please let me out||" : ""}`)
                .setImage(body.url)
                .setColor("RANDOM")
                .setFooter({
                    text: `😘 Kiss • Asked by ${interaction.member.nickname}`,
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
                .setDescription(`❌ <@${interaction.user.id}> : An error occured in kiss command. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};