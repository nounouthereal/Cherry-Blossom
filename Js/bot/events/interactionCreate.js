const Discord = require('discord.js');
const prettyMilliseconds = require('ms');
const { MessageEmbed } = require('discord.js')
const prefix = '+' || '@🌸| Fleur de cerisier |🌸'||"<@944572861874602054>";
const { Permissions } = require('discord.js');

module.exports = async (bot, interaction) => {
    const member = interaction.member;
    if (interaction.isCommand()) {
        if (interaction.guild) {
         if (!interaction.guild.me.permissions.has("EMBED_LINKS")) return;
         if (!interaction.guild.me.permissions.has("SEND_MESSAGES")) return;
        }
        await interaction.deferReply({ ephemeral: false }).catch((err) => {
         console.log(err);
        });
    if (interaction.user.bot || interaction.channel.type === 'dm') return;
        const command = bot.slash_commands.get(interaction.commandName);
        if (command) {
            bot.commandsUsed += 1;
            if (!bot.cooldowns.has(command.config.name)) {
                bot.cooldowns.set(command.config.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = bot.cooldowns.get(command.config.name);
            const cooldownAmount = (command.config.cooldown || 3) * 1000;

            if (timestamps.has(interaction.author.id)) {
                const expirationTime = timestamps.get(interaction.author.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const cooldownEmbed = new Discord.MessageEmbed()

                        .setAuthor({ name: `Ratelimit`, iconURL: bot.user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }) })
                        .setDescription(`:warning: **${member.user.username}** : Slow down this command is on cooldown.\n\nThank to retry in : \`${prettyMilliseconds(timeLeft * 1000)}\`.\n\nThe default cooldown of this command is : \`${prettyMilliseconds(command.config.cooldown * 1000)}\`.`)
                        .setColor('#FFA500');
                    return message.channel.send({embeds: [cooldownEmbed]});
                }
            }
            else {
                if (!command.config.botPerms) return console.log("You didn't provide botPerms");
                if (!Array.isArray(command.config.botPerms)) return console.log('botPerms must be an array.');
                if (!command.config.userPerms) return console.log("You didn't provide userPerms.");
                if (!Array.isArray(command.config.userPerms)) return console.log('userPerms must be an array.')
                if (!interaction.guild.me.permissions.has(command.config.botPerms)) {
                    const beauty = command.config.botPerms.join('\`, \`'); 
                    const noBotPerms = new Discord.MessageEmbed()
                        .setTitle('❌ Invalid bot permission !')
                        .setDescription(`The bot need the good permission: \`${beauty}\`.`)
                        .setColor('RED');
                    return interaction.followUp({embeds: [noBotPerms]})
                }
                if (!interaction.member.permissions.has(command.config.userPerms)) {
                    const beauty = command.config.userPerms.join('\`, \`');
                    const noUserPerms = new Discord.MessageEmbed()
                    .setTitle('❌ Invalid permission !')
                    .setDescription(`You need the good permission: \`${beauty}\`.`)
                    .setColor('RED');
                    return interaction.followUp({embeds: [noUserPerms]})
                }
                if (command.config.bankSpace !== 0 || command.config.bankSpace !== null) {
                    bot.giveBankSpace(interaction.user.id, command.config.bankSpace);
                }


                await command.run(bot, interaction, args);
                timestamps.set(interaction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            }
        }
    }
}