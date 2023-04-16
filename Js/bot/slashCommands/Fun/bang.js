const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const anime = require('anime-actions');




module.exports = {
    name: "bang",
    description: "🔫 Bang someone",
    cooldown: 5,
    options: [
        {
            name: "user",
            description: "👤 The user to bang!",
            required: false,
            type: "USER",
        },
    ],

    run: async (bot, interaction, args) => {

        try {

            let user = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(` `).toLocaleLowerCase());

            if (!user) user = bot;

            Array.prototype.randomArray = function () {
                return this[Math.floor((Math.random() * this.length))];
            }

            const gifs = [`https://cdn.weeb.sh/images/BkJgooi3Z.gif`, `https://media.tenor.com/oQCqLwTOlCIAAAAC/canaan-428the-animation.gif`, `https://media.tenor.com/6VM7lzsBSuUAAAAC/id-invaded-gun.gif`, `https://media.tenor.com/ggBL-mf1-swAAAAC/guns-anime.gif`, `https://c.tenor.com/3BTuBDozaMgAAAAd/battle-in5seconds-after-meeting-mion.gif`, `https://media.tenor.com/AGTqt-wXyiEAAAAC/nichijou-minigun.gif`, `https://media.tenor.com/r1uS1WCfyhIAAAAd/akane-mishima-mishima.gif`, `https://cdn.weeb.sh/images/Sy_dXNts-.gif`, `https://media.tenor.com/YUUTtLWdWS8AAAAC/canaan-428the-animation.gif`, `https://cdn.weeb.sh/images/HyZiWLmvb.gif`, `https://cdn.weeb.sh/images/BkzSQVFoZ.gif`].randomArray()


            const embed = new MessageEmbed() // Prettier
                .setAuthor({
                    name: `▄︻デ══━一 Bang !`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setDescription(`>>> 🔫 <@${interaction.user.id}> banged <@${user.id}> ${Math.floor(Math.random() * 100 + 1) == 1 ? "\n|| She shot me, she shot me, BANG BANG, she shot me||" : ""}`)
                .setImage(gifs)
                .setColor("RANDOM")
                .setFooter({
                    text: `🔫 Bang • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp()
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