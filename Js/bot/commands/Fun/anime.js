const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const mal = require("mal-scraper");

module.exports.run = async (bot, message, args) => {

    try {
        const search = args.join(" ");
        
        if (search.toString().length > 250) {
            let charsError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : Anime name needs to be under 250 (You need to reduce \`${parseInt(search.length - 250)}\` characters)`)
                .setColor("RED")
                .setTimestamp()
            return message.reply({embeds: [charsError]})
        }

        const wait_embed = new MessageEmbed() // Prettier
            .setColor("5865f2")
            .setDescription(`<a:loading_please_wait:1014982234492633088> | I'm searching data for \`${search}\` anime. Please wait...`);

        mal
            .getInfoFromName(search)
            .then(sent = await message.reply({embeds: [wait_embed]}))
            .then((data) => {
            const embed = new MessageEmbed() // Prettier
            .setAuthor({
            name: `🔍 My Anime List search result for ${args}`.split(",").join(" "),
            iconURL: message.guild.iconURL({
                dynamic: true,
                format: "png",
            }),
            })
            .setImage(data.picture)
            .setColor("RANDOM")
            .addField(`🇬🇧 English Title`, "```" + data.englishTitle + "```")
            .addField(`🇯🇵 Japanese Title`, "```" + data.japaneseTitle + "```")
            .addField(`🧾 Type`, "```" + data.type + "```")
            .addField(`🔄 Episodes`, "```" + data.episodes + " episodes```")
            .addField(`🔞 Rating`, "```" + data.rating + "```")
            .addField(`📆 Aired`, "```" + data.aired + "```")
            .addField(`⭐️ Score`, "```" + data.score + "/10" + "```")
            .addField(`📊 Score Stats`, "```" + data.scoreStats + "```")
            .setFooter({
            text: `Asked by ${message.member.displayName}`,
            iconURL: message.author.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 2048,
            }),
            })
            .setTimestamp();
            const row = new MessageActionRow() // Prettier
            .addComponents(
            // Prettier
            new MessageButton() // Prettier
                .setStyle("LINK")
                .setURL(data.url)
                .setLabel("My Anime List")
            );
            sent.edit({ embeds: [embed], components: [row] });
            })
            .catch((err) => {
                let basicError = new MessageEmbed()
                    .setDescription(`❌ <@${message.author.id}> : I can't find your anime (\`${search}\`)`)
                    .setColor("RED")
                    .setTimestamp()
                return message.reply({embeds: [basicError]})
            });
    } catch (err) {
    console.log(err);

        if (err.length > 2010){
            err.substring(0, 2010)
        }

        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An undefined error occured\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({embeds: [basicError]})
        }
}



module.exports.config = {
    name: 'anime', // Command Name
    description: '💮 Search for an anime', // Description
    usage: '+anime <anime name>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['anim'], // Aliases 
    cooldown: 5 // Command Cooldown
}