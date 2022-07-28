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

    const choicescrime = Math.random(['oui' , 'non'])

    const random = Math.round(Math.random() * 100);
    const randomMessage = [
        `Vous avez assassiné **Bill Gates**, vous avez été payé ${random.toLocaleString()} :coin:.`,
        `Vous avez volé une pauvre vieille grand-mère et elle n'avait que des pièces de ${random.toLocaleString()} :coin:.`,
        `Vous avez fait une descente chez un trafiquant de drogue et trouvé des pièces de ${random.toLocaleString()} :coin:.`,
        `Vous avez assassiné **Donald Trump**, vous avez été payé ${random.toLocaleString()} :coin:.`,
        `Vous avez failli vous faire tirer dessus, mais vous aviez **nounou#4483** à vos côté et l'avez tué, vous avez été payé ${random.toLocaleString()} :coin:.`,
    ];
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];

    const randomMessage1 = [
        `👮 Vous avez été arreté et avez payé une amende de ${random.toLocaleString()} :coin:.`,
        `👮 Les flics vous ont eu en flagrant délis et vous avez payé une caution de ${random.toLocaleString()} :coin:.`
    ];
    const responsebad = randomMessage1[Math.floor((Math.random() * randomMessage1.length))];

  /*
    await message.reply(`${response}`)
    .catch();*/
  

  if (choicescrime === 'oui'){
    await bot.giveCoins(message.author.id, random);
    let begembed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle(`🥷 Vous avez commis un crime`)
    .setDescription(`**${usertag.user.username}** : 🥷 ${response}`);

  await message.channel.send({embeds: [begembed]}).catch();
  }

  if (choicescrime === 'non'){
    let begembed = new MessageEmbed()
    .setColor("GREY")
    .setTitle(`🚔 Vous avez été arrêté`)
    .setDescription(`**${usertag.user.username}** : ${responsebad}`);
    await bot.removeCoins(message.author.id, random);
    if (userData.coinsInWallet < 2){
        await bot.setCoins(message.author.id, 0)
    }

    await message.channel.send({embeds: [begembed]}).catch();
  }
}

module.exports.config = {
    name: 'crime', // Command Name
    description: 'Vous faites des chose pas gentilles pour des :coin:', // Description
    usage: '+crime', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['criminel'], // Aliases 
    bankSpace: 15, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}