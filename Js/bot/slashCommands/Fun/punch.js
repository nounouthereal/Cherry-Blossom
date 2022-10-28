const { MessageEmbed } = require("discord.js");
const anime = require("anime-actions");

module.exports = {
    name: "punch",
    description: "🥊 Punch someone, violently",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "👊🏻 The user to punch",
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
                    .setDescription(`❌ <@${interaction.user.id}> : You want to punch yourself, you're too masochist , ehh.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }
    
            let image = await anime.punch()

            
            const embed = new MessageEmbed() // Prettier
                .setAuthor({
                    name: `🥊 What a jab...`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> 👊🏻 <@${interaction.member.id}> punched <@${member.id || member.user.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| They punch me too... please let me out||" : ""}`)
                .setImage(image)
                .setColor("RANDOM")
                .setFooter({
                    text: `🥊 Punch • Asked by ${interaction.member.nickname || interaction.user.username}`,
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
                .setDescription(`❌ <@${interaction.user.id}> : An error occured in kiss command. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
                .setColor(`RED`)
                .setTimestamp()
            interaction.followUp({ embeds: [basicError] })
        }
    },
};