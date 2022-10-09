const { MessageEmbed } = require("discord.js");
const anime = require('anime-actions');


module.exports = {
    name: "bully",
    description: "😡 Bully someone, virtually",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "😨 The user to bully",
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
                    .setDescription(`❌ <@${interaction.user.id}> : You want to bully yourself, you're too weird , ehh.`)
                    .setColor("RED")
                return interaction.followUp({ embeds: [authorUserError] })
            }

            const bullyGif = [`https://media.tenor.com/OTIghAN4rzkAAAAC/shouko-nishimya-shoko-nishimya.gif`, `https://media.tenor.com/o2Q0xMRv-4IAAAAd/mahou-shoujo-site-anime.gif`, `https://media.tenor.com/yWEfaRb2Ly8AAAAM/jojo-meme.gif`,`https://thumbs.gfycat.com/EveryAggravatingKarakul-mobile.mp4`]

            const choosedBullyGifs = bullyGif[Math.floor(Math.random() * bullyGif.length)];

            const embed = new MessageEmbed() 
                .setAuthor({
                    name: `😨 Isn't it bad to bully ?`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> 😡 <@${member.id || member.user.id}> just got bullyed by <@${interaction.member.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| They bully me to... please let me out||" : ""}`)
                .setImage(choosedBullyGifs)
                .setColor("RANDOM")
                .setFooter({
                    text: `😨 Bully • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
                .setURL(choosedBullyGifs);
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