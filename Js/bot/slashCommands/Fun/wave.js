const { MessageEmbed } = require("discord.js");
const anime = require("anime-actions");

module.exports = {
    name: "wave",
    description: "👋 Wave at someone, happily",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "👋 The user to wink at",
            required: false,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let member = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            let text

            if (!member) {
                text = `>>> 👋 <@${interaction.user.id}> waved. ${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||Hii.. arghhhh...//// ahhhh||" : ""}`
            }

            else {
                text = `>>> 👋 <@${interaction.member.id}> waved at <@${member.id || member.user.id}>. ${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||Hii.. arghhhh...//// ahhhh||" : ""}`
            }

            
            if (member?.id == interaction.user.id) {
                let authorUserError = new MessageEmbed()
                    .setDescription(`❌ <@${interaction.user.id}> : You want to wave at yourself, 👋.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }
    

            let image = await anime.wave()
            
            const embed = new MessageEmbed() 
                .setAuthor({
                    name: `👋 Hello...`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`${text}`)
                .setImage(image)
                .setColor("RANDOM")
                .setFooter({
                    text: `👋 Wave • Asked by ${interaction.member.nickname}`,
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