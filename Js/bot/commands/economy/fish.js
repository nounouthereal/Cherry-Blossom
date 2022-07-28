const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require("discord.js");
const i = '<:infomation:779736273639440394>'
const x = '<:bigx:779736072367505449>'
const tick = '<:bigtick:779736050892931082>'
const junkemoji = '<:HYDRA_JUNK:781846282473046016>'
const legfish = '<:HYDRA_FISH_LEG:781936373325365268>'
module.exports.run = async (bot, message, args) => {
  let user = await bot.fetchUser(message.author.id);
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


const item = itemss.find(x => x.itemId.toLowerCase() === 'fishingrod');  
let founditem = user.items.find(x => x.itemId.toLowerCase() === 'fishingrod');
    let array = [];
    array = user.items.filter(x => x.itemId !== 'fishingrod');
    if (!founditem) {
              let use3embed = new MessageEmbed()
              .setColor("RED")
              .setDescription(`❌ **${member.user.username}** : Vous n'avez pas de \`FISHINGROD\`, vous devez en acheter une pour utiliser cette commande.`);
              return message.channel.send(use3embed);
        //////return message.channel.send("you don't have this item");
    }
  
  

const randomMessage = [
  'missed',
  'commun',
  'atypique',
  'rare',
  'epic',
  'legendary',

  'junk',
  'junk',
  'junk',
  'junk',
  'commun',
  'commun',
  'commun',
  'commun',
  'atypique',
  'atypique',
  'atypique',
  'atypique',
  'rare',
  'rare',
  'rare',
  'epic',
  'epic',
  'epic',
  'missed',
  'missed',
  'legendary',
    ];
  
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
  
    const userData = await bot.fetchUser(message.author.id);
    
    if (response == 'commun') {
        
        const fishAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedcommon = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${fishAmount}** x Poisson commun 🐟`)
        .setColor("WHITE")
        message.channel.send(Embedcommon);
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Common Fish 🐟`);
        const findItem = data.items.find(i => i.itemId == 'commonfish');
        let userInv = data.items.filter(i => i.itemId !== 'commonfish ');
        if (findItem) {
            userInv.push({ itemId: 'commonfish', amount: (findItem.amount + fishAmount), description: 'Vend le pour faire de l\'argent. (+sell commonfish || +sell poissoncommun) (Vous possédez déjà une copie de cet objet)' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'commonfish', amount: fishAmount, description: 'Vend le pour faire de l\'argent. (+sell commonfish || +sell poissoncommun)' });
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'atypique') {        
        const fishAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embeduncommon = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${fishAmount}** x Poisson atypique 🐠`)
        .setColor("GREEN")
        message.channel.send(Embeduncommon);
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Uncommon Fish 🐠`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'uncommonfish');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'uncommonfish');
        if (findItem) {
            userInv.push({ itemId: 'uncommonfish', amount: (findItem.amount + fishAmount), description: 'Vend le pour faire de l\'argent. (+sell uncommonfish || +sell poissonatypique) (Vous possédez déjà une copie de cet objet)' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'uncommonfish', amount: fishAmount, description: 'Vend le pour faire de l\'argent. (+sell uncommonfish || +sell poissonatypique)' });
            data.items = userInv;
            await data.save();
        }
    } else if (response == 'rare') {

        const fishAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedrare = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${fishAmount}** x Poisson rare 🦑`)
        .setColor("BLUE")
        message.channel.send(Embedrare);
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Rare Fish 🦑`);
        const findItem = data.items.find(i => i.itemId == 'rarefish');
        let userInv = data.items.filter(i => i.itemId !== 'rarefish');
        if (findItem) {
            userInv.push({ itemId: 'rarefish', amount: (findItem.amount + fishAmount), description: 'Vend le pour faire de l\'argent. (+sell rarefish || +sell poissonrare) (Vous possédez déjà une copie de cet objet)' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'rarefish', amount: fishAmount, description: 'Vend le pour faire de l\'argent. (+sell rarefish || +sell poissonrare)' });
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'epic') {

        const fishAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedveryrare = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${fishAmount}** x Poisson épique 🐡`)
        .setColor("PURPLE")
        message.channel.send(Embedveryrare);
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Very Rare Fish 🐡`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'veryrarefish');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'veryrarefish');
        if (findItem) {
            userInv.push({ itemId: 'veryrarefish', amount: (findItem.amount + fishAmount), description: 'Vend le pour faire de l\'argent. (+sell epicfish || +sell poissonépique) (Vous possédez déjà une copie de cet objet)' });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'veryrarefish', amount: fishAmount, description: 'Vend le pour faire de l\'argent. (+sell epicfish || +sell poissonépique)' });
            data.items = userInv;
            await data.save();
        }
          } else if (response == 'legendary') {

        const fishAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedled = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${fishAmount}** x Poisson légendaire 🐋.`)
        .setColor("ORANGE")
        message.channel.send(Embedled);
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Legendary Fish 🐋`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'legendaryfish');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'legendaryfish');
        if (findItem) {
            userInv.push({ itemId: 'legendaryfish', amount: (findItem.amount + fishAmount), description: `Vend le pour faire de l\'argent. (+sell legendaryfish || +sell poissonlégendaire) (Vous possédez déjà une copie de cet objet)` });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'legendaryfish', amount: fishAmount, description: `Vend le pour faire de l\'argent. (+sell legendaryfish || +sell poissonlégendaire)`});
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'junk') {
        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedjunk = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${fishAmount}** x déchets 👞.`)
        .setColor("GREY")
        message.channel.send(Embedjunk);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
        const findItem = data.items.find(i => i.itemId.toLowerCase() == 'junk');
        let userInv = data.items.filter(i => i.itemId.toLowerCase() !== 'junk');
        if (findItem) {
            userInv.push({ itemId: 'junk', amount: (findItem.amount + Amount), description: `Vend le pour faire de l\'argent. (+sell rarefish || +sell poissonrare) (Vous possédez déjà une copie de cet objet)` });
            data.items = userInv;
            await data.save();
        } else {
            userInv.push({ itemId: 'junk', amount: Amount, description: `Vend le pour faire de l\'argent. (+sell junk || +sell dechets)` });
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(` **${member.user.username}** : Vous avez rien pêché.`)
        .setColor("BLACK")
        message.channel.send(Embedmissed);
        }

    await bot.giveResistance(item.itemId, -1)
}
module.exports.config = {
    name: 'fish', // Command Name
    description: 'Utilisez votre canne à pêche pour pêcher des poissons', // Description
    usage: '+fish', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['peche','pêche'], // Aliases 
    bankSpace: 5, // Amount of bank space to give when command is used.
    cooldown: 120// Command Cooldown
}