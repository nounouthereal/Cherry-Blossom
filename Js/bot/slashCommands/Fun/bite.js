const { MessageEmbed } = require("discord.js");
const anime = require('anime-actions');


module.exports = {
    name: "bite",
    description: "😬 Bite someone, smoothly",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "🦷 The user to bite",
            required: false,
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
                    .setDescription(`❌ <@${interaction.user.id}> : You want to bite yourself, you're a masochist , ehh.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }

            let image = anime.bite()


            const embed = new MessageEmbed() 
                .setAuthor({
                    name: `🦷 Tshhliik...`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> 🦷 <@${member.id || member.user.id}> just got bited by <@${interaction.member.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| They bully me to... please let me out||" : ""}`)
                .setImage(image)
                .setColor("RANDOM")
                .setFooter({
                    text: `🦷 Bite • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(image);
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