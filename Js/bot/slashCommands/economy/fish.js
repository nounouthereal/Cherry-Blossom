const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');
const { MessageEmbed } = require("discord.js");



module.exports = {
    name: "fish",
    description: "🎣 Try to fish the best one",
    timeout: 5000,

    run: async (bot, interaction, args) => {    

    let user = await bot.fetchUser(interaction.user.id);
    const member = interaction.member || interaction.user;


    const item = itemss.find(x => x.itemId.toLowerCase() === 'fishingrod');  
    let founditem = user.items.find(x => x.itemId.toLowerCase() === 'fishingrod');
        let array = [];
        array = user.items.filter(x => x.itemId !== 'fishingrod');
        if (!founditem) {
                let use3embed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`:warning: <@${member.user.id}> : You don't have a \`FISHINGROD\`, you need to buy one in the shop to use this command.`);
                return interaction.followUp({embeds: [use3embed]});
        }

        const data = await bot.fetchUser(interaction.user.id);

    
    

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
    
        
        if (response == 'commun') {
            
            const fishAmount = Math.round(Math.random() * 1) + 1;
            const Embedcommon = new MessageEmbed()
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Common fish 🐟`)
            .setColor("WHITE")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setTimestamp()

            interaction.followUp({embeds: [Embedcommon]});
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
            const Embeduncommon = new MessageEmbed()
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Uncommon fish 🐠`)
            .setColor("GREEN")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setTimestamp()

            interaction.followUp({embeds: [Embeduncommon]});
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
            const Embedrare = new MessageEmbed()
            .setTitle('🎣 fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and came back with **x${fishAmount}** Rare fish 🦑`)
            .setColor("BLUE")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setTimestamp()

            interaction.followUp({embeds: [Embedrare]});
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
            const Embedveryrare = new MessageEmbed()
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Epic fish 🐡`)
            .setColor("PURPLE")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setTimestamp()

            interaction.followUp({embeds: [Embedveryrare]});
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
            const Embedled = new MessageEmbed()
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${fishAmount}** Legendary fish 🐋.`)
            .setColor("ORANGE")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setTimestamp()

            interaction.followUp({embeds: [Embedled]});
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
            const Embedjunk = new MessageEmbed()
            .setTitle('🎣 Fishing result')
            .setDescription(`🎣  <@${member.user.id}> : You went fishing and get back with **x${Amount}** junk 👞.`)
            .setColor("GREY")
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setTimestamp()

            interaction.followUp({embeds: [Embedjunk]});
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
            .setDescription(`<@${member.id}> : You haven't fished anything.`)
            .setFooter(`Asked by ${member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
            .setColor("BLACK")
            interaction.followUp({embeds: [Embedmissed]});
            }

        

    }
}