 
const Discord = require('discord.js');
const prettyMilliseconds = require('ms');
const { MessageEmbed } = require('discord.js')
const prefix = '+' || '@🌸| Fleur de cerisier |🌸'||"<@944572861874602054>"||"-";
const cd = '<:hazzered:779736248813879296>'
const { Permissions } = require('discord.js');

module.exports = async (bot, message) => {
    const member = message.member;

    //Anti Scam
    const arrayscam = require(`../utils/scam.json`)
    if (arrayscam.some(word => message.content.toLowerCase().includes(word))) {
        console.log(`scam`)
        message.delete()
        let adminusers = await message.guild.members.fetch().then(fetchedMembers => {
            console.log(fetchedMembers)
            fetchedMembers.filter(member => member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) == true)
        })
        console.log(adminusers)
        const embed = new MessageEmbed()
            .setTitle(":warning: Possible scam detected.")
            .setColor("#ff0000")
            .setDescription("Your message has been detected as a possible scam. Please stop sending it.")
            .setFooter("Antiscam Bêta (Scam list credits: https://github.com/HELLSNAKES)",message.guild.iconURL())
        message.channel.send({ embeds: [embed] }).then(m => { setTimeout(() => { m.delete() }, 60000) })
    }
    if (message.author.bot || message.channel.type === 'dm') return;
    if (message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
        const messageArray = message.content.split(' ');
        const cmd = messageArray[0].substring(1);
        const args = messageArray.slice(1);

        const command = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if (command) {
            bot.commandsUsed += 1;
            if (!bot.cooldowns.has(command.config.name)) {
                bot.cooldowns.set(command.config.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = bot.cooldowns.get(command.config.name);
            const cooldownAmount = (command.config.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const cooldownEmbed = new Discord.MessageEmbed()
                        .setDescription(`:warning: **${member.user.username}** : This command is on cooldown.\n\nThank to retry in : \`${prettyMilliseconds(timeLeft * 1000)}\`.\n\nThe default cooldown of this command is : \`${prettyMilliseconds(command.config.cooldown * 1000)}\`.`)
                        .setColor('#FFA500');
                    return message.channel.send({embeds: [cooldownEmbed]});
                }
            }
            else {
                if (!command.config.botPerms) return console.log("You didn't provide botPerms");
                if (!Array.isArray(command.config.botPerms)) return console.log('botPerms must be an array.');
                if (!command.config.userPerms) return console.log("You didn't provide userPerms.");
                if (!Array.isArray(command.config.userPerms)) return console.log('userPerms must be an array.')
                if (!message.guild.me.permissions.has(command.config.botPerms)) {
                    const beauty = command.config.botPerms.join('\`, \`'); 
                    const noBotPerms = new Discord.MessageEmbed()
                        .setTitle('❌ Invalid bot permission !')
                        .setDescription(`The bot need the good permission: \`${beauty}\`.`)
                        .setColor('RED');
                    return message.channel.send({embeds: [noBotPerms]})
                }
                if (!message.member.permissions.has(command.config.userPerms)) {
                    const beauty = command.config.userPerms.join('\`, \`');
                    const noUserPerms = new Discord.MessageEmbed()
                    .setTitle('❌ Invalid permission !')
                    .setDescription(`You need the good permission: \`${beauty}\`.`)
                    .setColor('RED');
                    return message.channel.send({embeds: [noUserPerms]})
                }
                if (command.config.bankSpace !== 0 || command.config.bankSpace !== null || command.config.bankSpace !== undefined) {
                    bot.giveBankSpace(message.author.id, command.config.bankSpace);
                }


                await command.run(bot, message, args);
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        }
    }
}