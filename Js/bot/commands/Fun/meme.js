const { MessageEmbed, MessageActionRow, MessageButton } = require(`discord.js`)
const fetch = require('node-fetch');



module.exports.run = async (bot, message, args) => {


    try {

        const wait_embed = new MessageEmbed()
            .setDescription(`<a:loading:1032282688821940245> | I'm downloading the \`meme\`. Please wait...`)
            .setColor("5865f2");

        let sent = await message.reply({ embeds: [wait_embed] })

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
                text: `👍 ${meme.ups} upvotes • 💬 ${meme.num_comments} comments • Asked by ${message.member.displayName || message.author.username}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            });
        sent.edit({ embeds: [embed], components: [row] });

    } catch (err) {

        console.log(err);
        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor(`RED`)
            .setTimestamp()
        message.reply({ embeds: [basicError] })
    }

}

module.exports.config = {
    name: 'meme', // Command Name
    description: '📱 Get random memes from reddit', // Description
    usage: '+meme', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['dankmeme'], // Aliases 
    cooldown: 5 // Command Cooldown
}