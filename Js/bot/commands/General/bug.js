const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')



module.exports.run = async (bot, message, args) => {

    try {

        let command = args[0]
        let error = args[1]
        let desc = args[3]

        let embError = new MessageEmbed()
            .setColor("RED")
            .setDescription(`**Usage:**\n\`+bug <command name> <error> Optionnal: <description>\`\n\nWe recommend you to use \`/bug\``)
        
        if(!command) {
            embError.setTitle(`❌ : Please precise the command.`)
            return message.reply({ embeds: [embError] })
        }

        if(!error) {
            embError.setTitle(`❌ : Please precise the error.`)
            return message.reply({ embeds: [embError] })
        }
        
        if(typeof error != String) {
            embError.setTitle(`❌ : The error needs to be a string.`)
            return message.reply({ embeds: [embError] })
        }

        if(typeof command != String) {
            embError.setTitle(`❌ : The command needs to be a string.`)
            return message.reply({ embeds: [embError] })
        }

        if(typeof desc != String) {
            embError.setTitle(`❌ : The description needs to be a string.`)
            return message.reply({ embeds: [embError] })
        }

        if(desc > 2000) {
            embError.setTitle(`❌ : The description needs to be inferior than \`2000\` characters.`)
            return message.reply({ embeds: [embError] })
        }

        const wait_embed = new MessageEmbed()
            .setDescription(`<a:loading:1032282688821940245> | We're reporting the bug for \`${command}\` command. Please wait...`)
            .setColor("5865f2");

        let sent = await message.reply({ embeds: [wait_embed] })

        const channel = bot.channels.cache.find(channel => channel.id == "1015598150754508871")


        let invite = await message.channel.createInvite(
            {
                maxAge: 604800, // maximum time for the invite, in milliseconds
                maxUses: 100 // maximum times it can be used
            },
        )


        let bugEmbed = new MessageEmbed()
            .setTitle(`🐛 Bug reported`)
            .addField(`Server:`, `${invite || "No server"} (\`${message.guild.id || "No server"}\`) *${message.guild.name || "No server"}*`)
            .addField(`User:`, `**Name:** ${message.author.tag}\n**Nickname:** ${message.member.displayName || "No nickname"}\n**ID:** ${message.author.id}`)
            .addField(`Command:`, `\`${command}\``)
            .addField(`Command:`, `\`${error}\``)
            .addField(`More details:`, `\`${desc}\``)
            .setTimestamp()
            .setColor("RED")
        channel.send({ embeds: [bugEmbed] })
        bot.users.fetch('901071562386583596', false).then((user) => {
            user.send({embeds: [bugEmbed]});
        });

        let receivedEmbed = new MessageEmbed()
            .setTitle(`🐛 Bug reported`)
            .setDescription(`✅ Your bug has been reported and sent to the devloper, thanks this will help us to ameliorate the bot.`)
            .setColor("GREEN")

        const row = new MessageActionRow() // Prettier
            .addComponents(
                new MessageButton() // Prettier
                    .setURL("https://discord.gg/Y2jQKaPqKX")
                    .setLabel("Support")
                    .setStyle("LINK")
            )
        sent.edit({ embeds: [receivedEmbed], components: [row] })




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
    name: 'bug', // Command Name
    description: '❌ Report an error or a bug to the devlopers', // Description
    usage: '+bug <command name> <error> Optionnal: <description>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['bugs','glitch'], // Aliases 
    cooldown: 75 // Command Cooldown
}