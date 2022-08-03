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
              .setDescription(`:warning: **${member.user.username}** : Vous n'avez pas de \`FISHINGROD\`, vous devez en acheter une pour utiliser cette commande.`);
              return message.channel.send({embeds: [use3embed]});
        //////return message.channel.send("you don't have this item");
    }
  
  

const randomMessage = [
  
  'junk',
  'junk',
  'junk',
  'junk',
  'commun',
  'commun',
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
  'missed',
  'missed',
  'legendary'

    ];
  
    const response = randomMessage[Math.floor((Math.random() * randomMessage.length))];
  
    const userData = await bot.fetchUser(message.author.id);
    
    if (response == 'commun') {
        
        const fishAmount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedcommon = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **x${fishAmount}** Poisson commun 🐟`)
        .setColor("WHITE")
        message.channel.send({embeds: [Embedcommon]});
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Common Fish 🐟`);
        const findItem = data.items.find(i => i.itemId == 'commonfish');
        const findInItems = itemss.find(i => i.itemId == 'commonfish');
        let userInv = data.items.filter(i => i.itemId !== 'commonfish ');
        console.log(findInItems)


        if (findItem) {
            findInItems.amount = findInItems.amount + fishAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = fishAmount
            userInv.push(findInItems);
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
        message.channel.send({embeds: [Embeduncommon]});
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Uncommon Fish 🐠`);
        const findItem = data.items.find(i => i.itemId == 'uncommonfish');
        const findInItems = itemss.find(i => i.itemId == 'uncommonfish');
        let userInv = data.items.filter(i => i.itemId !== 'uncommonfish');
        console.log(findInItems)


        if (findItem) {
            findInItems.amount = findInItems.amount + fishAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = fishAmount
            userInv.push(findInItems);
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
        const findInItems = itemss.find(i => i.itemId == 'rarefish');
        let userInv = data.items.filter(i => i.itemId !== 'rarefish');
        console.log(findInItems)



        if (findItem) {
            findInItems.amount = findInItems.amount + fishAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = fishAmount
            userInv.push(findInItems);
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
        message.channel.send({embeds: [Embedveryrare]});
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Very Rare Fish 🐡`);
        const findItem = data.items.find(i => i.itemId == 'veryrarefish');
        const findInItems = itemss.find(i => i.itemId == 'veryrarefish');
        let userInv = data.items.filter(i => i.itemId !== 'veryrarefish');
        
        if (findItem) {
            findInItems.amount = findInItems.amount + fishAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = fishAmount
            userInv.push(findInItems);
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
        message.channel.send({embeds: [Embedled]});
        //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Legendary Fish 🐋`);
        const findItem = data.items.find(i => i.itemId == 'legendaryfish');
        let userInv = data.items.filter(i => i.itemId !== 'legendaryfish');
        const findInItems = itemss.find(i => i.itemId == 'legendaryfish');

        console.log(findInItems)

        if (findItem) {
            findInItems.amount = findInItems.amount + fishAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        } else {
            findInItems.amount = fishAmount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
        }
        } else if (response == 'junk') {
        const Amount = Math.round(Math.random() * 1) + 1;
        const data = await bot.fetchUser(message.author.id);
        const Embedjunk = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`🎣  **${member.user.username}** : Tu es allé pêcher et tu es revenu avec **${Amount}** x déchets 👞.`)
        .setColor("GREY")
        message.channel.send(Embedjunk);
        //message.channel.send(`You went hunting and came back with **${deerAmount}** x Fox 🦊`);
        const findItem = data.items.find(i => i.itemId == 'junk');
        let userInv = data.items.filter(i => i.itemId !== 'junk');
        const findInItems = itemss.find(i => i.itemId == 'junk');


        if (findItem) {
            findInItems.amount = findInItems.amount + Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
            
        } else {
            findInItems.amount = Amount
            userInv.push(findInItems);
            data.items = userInv;
            await data.save();
            
        }
        } else if (response == 'missed') {
        const Embedmissed = new MessageEmbed()
        .setTitle('🎣 Résultat de pêche')
        .setDescription(`**${member.user.username}** : Vous avez rien pêché.`)
        .setColor("BLACK")
        message.channel.send({embeds: [Embedmissed]});
        }

    

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