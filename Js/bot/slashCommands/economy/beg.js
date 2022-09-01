const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")


module.exports = {
    name: "beg",
    description: "💰 Beg for money, poor human.",
    cooldown: 180,
    bankSpace: 8,
    

    run: async (bot, interaction, args) => {
        const usertag = interaction.member;
        const random = Math.round(Math.random() * 100);
        const randomMessage = [
            `**Elon Musk** gived you ${random.toLocaleString()} :coin:.`,
            `**Bill Gates** gived you ${random.toLocaleString()} :coin:.`,
            `A **rich** gived you ${random.toLocaleString()} :coin:.`,
            `Joe robinet🚰 biden gived you ${random.toLocaleString()} :coin:.`,
        ];
    
        const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
    
        let begembed = new MessageEmbed()
        .setColor("#57c478")
        .addField(`✅ You received money:`,` <@${usertag.user.id}> : ${response}`)
        await interaction.followUp({embeds: [begembed]}).catch();

        await bot.giveCoins(interaction.user.id, random);
    }


}