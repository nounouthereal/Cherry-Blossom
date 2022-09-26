const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "crime",
    description: "🥷 Criminal deeds for money",
    cooldown: 25,


    run: async (bot, interaction, args) => {

        const userData = await bot.fetchUser(interaction.user.id)
        if (userData.coinsInWallet < 2)
            return interaction.followUp(`😂 You are poor haha.`);
        const usertag = interaction.member;
        const another = Math.round(Math.random() * 15);

        yesnoArray = ['oui','non']

        const choicescrime = yesnoArray[Math.floor(Math.random()*yesnoArray.length)];


        const random = Math.round(Math.random() * 100);
        const randomMessage = [
            `You assasinated **Bill Gates**, and get payed ${random.toLocaleString()} :coin:.`,
            `You stole a poor old grandma but she only had coins of ${random.toLocaleString()} :coin:.`,
            `You raided a drug dealer and found pieces of ${random.toLocaleString()} :coin:.`,
            `You assasinated **Donald Trump**, and get payed ${random.toLocaleString()} :coin:.`,
            `You almost got shot, but you had **nounou#4483** by your side and killed him, you got paid ${random.toLocaleString()} :coin:.`,
        ];
        const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

        const randomMessage1 = [
            `👮 You were arrested and paid a caution of ${random.toLocaleString()} :coin:.`,
            `👮 The cops caught you in the act and you posted bail of ${random.toLocaleString()} :coin:.`
        ];
        const responsebad = randomMessage1[Math.floor((Math.random() * randomMessage1.length))];

    /*
        await message.reply(`${response}`)
        .catch();*/
    

    if (choicescrime === 'oui'){
        await bot.giveCoins(interaction.member.id, random);
        let begembed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`🥷 You have committed a crime`)
        .setDescription(`<@${usertag.id}> : 🥷 ${response}`)
        interaction.followUp({embeds: [begembed]})
    }

    if (choicescrime === 'non'){
        let begembed = new MessageEmbed()
        .setColor("GREY")
        .setTitle(`🚔 You had been arrested`)
        .setDescription(`<@${usertag.id}> : ${responsebad}`);
        await bot.addCoins(interaction.member.id, -random);
        if (userData.coinsInWallet < 100){
            await bot.setCoins(interaction.member.id, 0)
        }

        interaction.followUp({embeds: [begembed]})
    }

    }
}