
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "meme",
    description: "📱 Get random memes from reddit",
    cooldown: 5,

    run: async (bot, interaction, args) => {

        try {

            const wait_embed = new MessageEmbed()
                .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm downloading the \`meme\`. Please wait...`)
                .setColor("5865f2");

            interaction.followUp({ embeds: [wait_embed] })

            const res = await fetch("https://reddit.com/r/dankmemes/random/.json");

            const body = await res.json();

            let meme = body[0].data.children[0].data;

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle("LINK")
                        .setURL(`https://reddit.com${meme.permalink}`)
                        .setLabel("Meme Link")
                );


            const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setTimestamp()
                .setFooter({
                    text: `👍 ${meme.ups} upvotes • 💬 ${meme.num_comments} comments • Asked by ${interaction.member.nickname || interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                });
            interaction.editReply({ embeds: [embed], components: [row] });


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