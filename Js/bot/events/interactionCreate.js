const { MessageEmbed } = require('discord.js')
const prettyMilliseconds = require('ms')
const Discord  = require('discord.js')


module.exports = async (bot, interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = bot.slashCommands.get(interaction.commandName);
        if (!cmd) { 
            return interaction.followUp({ ephemeral: true, content: "❌ It appears me that this command does not exist, thanks to check your internet connection or try later." });
        }

        if (!bot.cooldowns.has(cmd.name)) {
            bot.cooldowns.set(cmd.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = bot.cooldowns.get(cmd.name);
        const cooldownAmount = (cmd.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const cooldownEmbed = new Discord.MessageEmbed()
                    .setDescription(`:warning: <@${interaction.user.id}> : This command is on cooldown.\n\nThank to retry in : \`${prettyMilliseconds(timeLeft * 1000)}\`.\n\nThe default cooldown of this command is : \`${prettyMilliseconds(cmd.cooldown * 1000)}\`.`)
                    .setColor('#FFA500');
                return interaction.followUp({embeds: [cooldownEmbed]});
            }
        }

        if (cmd.bankSpace != 0 || cmd.bankSpace != null || cmd.bankSpace != undefined || cmd.bankSpace != NaN || cmd.bankSpace != "" || cmd.bankSpace != "NaN") {
            bot.giveBankSpace(interaction.user.id, cmd.bankSpace);
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
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    try { 
        cmd.run(bot, interaction, args);
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    }
    catch(e) {
        console.log(e)
        interaction.followUp({ephemeral: true, content:'❌ An undefined error occured'})
    }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = bot.slashCommands.get(interaction.commandName);
        if (command) command.run(bot, interaction);
    }
}