const Discord = require('discord.js');
const prettyMilliseconds = require('ms');
const { MessageEmbed } = require('discord.js')
const { Permissions } = require('discord.js');
const Timeout = new Map()

/* module.exports = async (bot, interaction) => {
    const member = interaction.member;

    if (!interaction.type !== interaction.ApplicationCommand) return;

    const command = client.slash.get(interaction.commandName);
    if (!command) return interaction.reply({ content: 'an Erorr' });
  
    if (interaction.user.bot || interaction.channel.type === 'dm') return;
    if (interaction.content.toLowerCase().startsWith(prefix.toLowerCase())) {
        
        if (command) {
            bot.commandsUsed += 1;
            if (!bot.cooldowns.has(command.config.name)) {
                bot.cooldowns.set(command.config.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = bot.cooldowns.get(command.config.name);
            const cooldownAmount = (command.config.cooldown || 3) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const cooldownEmbed = new Discord.MessageEmbed()
                        .setDescription(`:warning: **${member.user.username}** : This command is on cooldown.\n\nThank to retry in : \`${prettyMilliseconds(timeLeft * 1000)}\`.\n\nThe default cooldown of this command is : \`${prettyMilliseconds(command.config.cooldown * 1000)}\`.`)
                        .setColor('#FFA500');
                    return interaction.followUp({embeds: [cooldownEmbed]});
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

                const args = [];

              for (let option of interaction.options.data) {
                  if (option.type === 'SUB_COMMAND') {
                      if (option.name) args.push(option.name);
                      option.options?.forEach(x =>  {
                          if (x.value) args.push(x.value);
                      });
                  } else if (option.value) args.push(option.value);
                }

                try {

                  command.run(bot, interaction, args)
              } catch (e) {
                  interaction.reply({ content: e.message });
              }
                timestamps.set(imteraction.user.id, now);
                setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
            }
        }
    }
} */

module.exports = async (bot, interaction) => {
    if (interaction.isCommand()) {
     if (interaction.guild) {
      if (!interaction.guild.me.permissions.has("EMBED_LINKS")) return;
      if (!interaction.guild.me.permissions.has("SEND_MESSAGES")) return;
     }
     await interaction.deferReply({ ephemeral: false }).catch((err) => {
      console.log(err);
     });
        const member = interaction.member;
        if (interaction.user.bot || interaction.channel.type === 'dm') return;

    
            const command = bot.slashCommands.get(interaction.commandName);
            if (command) {
                bot.commandsUsed += 1;
                if (!bot.cooldowns.has(command.config.name)) {
                    bot.cooldowns.set(command.config.name, new Discord.Collection());
                }
            
            if (!command) {
                return interaction.followUp({ ephemeral: true, content: "❌ It appears me that this command does not exist, thanks to check your internet connection or try later." })
            }
    
                const timeout = command.timeout || bot.config.ratelimit;

                const key = `${interaction.user.id}/${cmd.name}/${interaction.guild.id}`;
                const found = Timeout.get(key);
                if (found) {
                        const timeLeft = timeout - (Date.now() - found);
                        const cooldownEmbed = new Discord.MessageEmbed()

                            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                            .setDescription(`:warning: **${member.user.username}** : This command is on cooldown.\n\nThank to retry in : \`${prettyMilliseconds(timeLeft * 1000)}\`.\n\nThe default cooldown of this command is : \`${prettyMilliseconds(command.config.cooldown * 1000)}\`.`)
                            .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
                            .setColor('#FFA500');
                        return interaction.followUp({embeds: [cooldownEmbed]});
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
                
                    const args = [];

                    for (let option of interaction.options.data) {
                        if (option.type === "SUB_COMMAND") {
                            if (option.name) args.push(option.name);
                            option.options?.forEach((x) => {
                                if (x.value) args.push(x.value);
                            });
                        } else if (option.value) args.push(option.value);
                    }
                
                try { 
                    await command.run(bot, interaction, args);
                }
                catch(e) {
                    console.log(e)
                    interaction.followUp('❌ An undefined error occured')
                }
            }
         
    }
}
