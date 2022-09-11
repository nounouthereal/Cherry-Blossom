const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "search",
    description: "🔍 Search for money",
    cooldown: 180,
    

    run: async (bot, interaction, args) => {

        const usertag = interaction.member || interaction.user;
        const random = Math.round(Math.random() * 100);
        const randomMessage = [
            `You searched into the bin, and you found ${random.toLocaleString()} :coin:`,
            `You searched in a lake, and you found ${random.toLocaleString()} :coin:`,
            `You searched in your fridge, and you found ${random.toLocaleString()} :coin:`,
            `You searched in your garage, and you found ${random.toLocaleString()} :coin:`,
            `You searched in your room, and you found ${random.toLocaleString()} :coin:`,
            `You searched in the cracks of the sofa, and you found a sum of ${random.toLocaleString()} :coin:`,
            `You searched in your mother's drawers, and you found ${random.toLocaleString()} :coin:`,
        ];
        const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
        let searchembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`🔍 <@${usertag.user.id}> : **${response}**`);

        await interaction.followUp({embeds: [searchembed]}).catch();
        await bot.giveCoins(interaction.user.id, random);

    }
}