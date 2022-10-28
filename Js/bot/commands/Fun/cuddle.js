const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");



module.exports.run = async (bot, message, args) => {

    try {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])


        if (!user) {
            let userError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : You need to mention a valid user to hug, please.`)
                .setColor("RED")
            return message.reply({ embeds: [userError] })
        }
        if (user.id == message.author.id) {
            let authorUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : This is sad 😥, but you can't cuddle yourself.`)
                .setColor("RED")
            return message.reply({ embeds: [authorUserError] })
        }
        if (user.id == bot.user.id) {
            let botUserError = new MessageEmbed()
                .setDescription(`❌ <@${message.author.id}> : This is sad 😥, but you can't cuddle me.`)
                .setColor("RED")
            return message.reply({ embeds: [botUserError] })
        }

        const wait_embed = new MessageEmbed() 
            .setDescription(`<a:loading:1032282688821940245> | I'm generating a cuddle gif for \`${user.username}\`. Please wait...`)
            .setColor("5865f2");

        sent = await message.reply({embeds: [wait_embed]})

        const res = await fetch("https://nekos.life/api/v2/img/cuddle");

        const body = await res.json();

        const embed = new MessageEmbed() 
            .setTitle(`${user.username} has just been cuddled by ${message.author.username}`)
            .setDescription(`> ${user} got a hug from <@${message.author.id}>${Math.floor(Math.random() * 100 + 1) == 1 ? "\n||I want someone I can hug...||" : ""}`)
            .setImage(body.url)
            .setColor("RANDOM")
            .setFooter({
                text: `Asked by ${message.member.displayName} • ${message.guild.name}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    format: "png",
                    size: 2048,
                }),
            })
            .setTimestamp()
            .setURL(body.url);
        message.reply({ embeds: [embed] });
    } catch (err) {
        console.log(err);

        if (err.length > 2010) {
            err.substring(0, 2010)
        }

        let basicError = new MessageEmbed()
            .setDescription(`❌ <@${message.author.id}> : An error occured. Please try later or contact support (\`/support || /bug\`)\n\n**Error:**\n\n\`${err}\`\n\n**Support**\n[Support](https://discord.gg/Y2jQKaPqKX)`)
            .setColor("RED")
            .setTimestamp()
        message.reply({ embeds: [basicError] })
    }
},

module.exports.config = {
    name: 'cuddle', // Command Name
    description: '', // Description
    usage: '+cuddle @member', // Usage
        botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
        userPerms: [], // User permissions needed to run command. Leave empty if nothing.
        aliases: ['hug', 'cud'], // Aliases 
        cooldown: 5 // Command Cooldown
    }