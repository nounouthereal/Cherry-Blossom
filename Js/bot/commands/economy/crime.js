const { MessageEmbed } = require("discord.js");
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'

module.exports.run = async (bot, message, args) => {
    const userData = await bot.fetchUser(message.author.id);
  
    if (userData.coinsInWallet < 2)
        return await message.channel.send(`❌ Vu que vous etes fauché vous ne pouvez pas faire de crime parceque euh, um , wee , ehh parceque c'est comme ça (juste parceque le devloppeur a la flemme de coder une nouvllle option - Biz Biz Deku Midoriya#6946)`);
    const usertag = message.member;
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
    await bot.giveCoins(message.author.id, random);
    let begembed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`🥷 You have committed a crime`)
    .setDescription(`**${usertag.user.username}** : 🥷 ${response}`);

  await message.channel.send({embeds: [begembed]}).catch();
  }

  if (choicescrime === 'non'){
    let begembed = new MessageEmbed()
    .setColor("GREY")
    .setTitle(`🚔 You had been arrested`)
    .setDescription(`**${usertag.user.username}** : ${responsebad}`);
    await bot.giveCoins(message.author.id, -random);
    if (userData.coinsInWallet < 20){
        await bot.setCoins(message.author.id, 0)
    }

    await message.channel.send({embeds: [begembed]}).catch();
  }
}

module.exports.config = {
    name: 'crime', // Command Name
    description: 'You do criminal deeds for money', // Description
    usage: '+crime', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['criminal'], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 20 // Command Cooldown
}