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
                .setDescription(`:warning: <@${member.user.id}> : You don't have a \`FISHINGROD\`, you need to buy one in the shop to use this command. (\`+buy fishingrod\`)`);
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
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Common fish 🐟`)
            .setColor("WHITE")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds: [Embedcommon]});
            //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Common Fish 🐟`);
            const findItem = data.items.find(i => i.itemId == 'commonfish');
            const findInItems = itemss.find(i => i.itemId == 'commonfish');
            let userInv = data.items.filter(i => i.itemId !== 'commonfish ');


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
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Uncommon fish 🐠`)
            .setColor("GREEN")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds: [Embeduncommon]});
            //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Uncommon Fish 🐠`);
            const findItem = data.items.find(i => i.itemId == 'uncommonfish');
            const findInItems = itemss.find(i => i.itemId == 'uncommonfish');
            let userInv = data.items.filter(i => i.itemId !== 'uncommonfish');


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
            .setTitle('🎣 fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and came back with **x${fishAmount}** Rare fish 🦑`)
            .setColor("BLUE")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds: [Embedrare]});
            //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Rare Fish 🦑`);
            const findItem = data.items.find(i => i.itemId == 'rarefish');
            const findInItems = itemss.find(i => i.itemId == 'rarefish');
            let userInv = data.items.filter(i => i.itemId !== 'rarefish');



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
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Epic fish 🐡`)
            .setColor("PURPLE")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
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
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Legendary fish 🐋`)
            .setColor("ORANGE")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds: [Embedled]});
            //message.channel.send(`You went fishing and came back with **${fishAmount}** x  Legendary Fish 🐋`);
            const findItem = data.items.find(i => i.itemId == 'legendaryfish');
            let userInv = data.items.filter(i => i.itemId !== 'legendaryfish');
            const findInItems = itemss.find(i => i.itemId == 'legendaryfish');


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
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${Amount}** junk 👞.`)
            .setColor("GREY")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds: [Embedjunk]});
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
            .setTitle('🎣 Fishing result')
            .setDescription(`<@${member.user.id}> : You haven't fished anything.`)
            .setColor("BLACK")
            .setFooter(`Asked by ${message.member.displayName} • ${message.guild.name}`,message.guild.iconURL())
            .setTimestamp()
            message.channel.send({embeds: [Embedmissed]});
            }

    

}
module.exports.config = {
    name: 'fish', // Command Name
    description: 'Utilisez votre canne à pêche pour pêcher des poissons', // Description
    usage: '+fish', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['fi'], // Aliases 
    bankSpace: 10, // Amount of bank space to give when command is used.
    cooldown: 120// Command Cooldown
}