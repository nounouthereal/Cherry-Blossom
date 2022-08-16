const Timeout = new Map();
const { MessageEmbed } = require('discord.js')
const prettyMilliseconds = require('ms')

module.exports = async (bot, interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = bot.slashCommands.get(interaction.commandName);
        if (!cmd) { 
            return interaction.followUp({ ephemeral: true, content: "❌ It appears me that this command does not exist, thanks to check your internet connection or try later." });
        }

        const timeout = cmd.timeout || bot.config.ratelimit;
        const key = `${interaction.user.id}/${cmd.name}/${interaction.guild.id}`;
        const found = Timeout.get(key);
        if (found) {
        const timeLeft = timeout - (Date.now() - found);
        const embed = new MessageEmbed() // Prettier
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
            .setDescription(`:warning: **${interaction.member}** : Slow down this command is on cooldown.\n\nThanks to retry in : \`${prettyMilliseconds(timeLeft)}\`.`)
            .setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL()})
            .setTimestamp()
            .setColor('RED');
        return interaction.followUp({ embeds: [embed] });
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
    }
    catch(e) {
        console.log(e)
        interaction.followUp({ephemeral: true, content:'❌ An undefined error occured'})
    }
        Timeout.set(key, Date.now());
        setTimeout(() => {
            Timeout.delete(key);
        }, timeout);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = bot.slashCommands.get(interaction.commandName);
        if (command) command.run(bot, interaction);
    }
}