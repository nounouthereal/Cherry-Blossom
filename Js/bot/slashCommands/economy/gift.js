
const { MessageEmbed } = require("discord.js")
const itemss = require('/Users/nouhame/Bot_des_cerisiers/Js/bot/utils/items.js');



module.exports = {
    name: "gift",
    description: "🎁 Offer an item gift to an user",
    timeout: 5000,
    options: [
        {
            name: "user",
            description: '👤 The user which will receive the gift',
            type: "USER",
            required: true,
        },
        {
            name: "itemid",
            description: '🆔 The itemId of the item which will be offred to the user',
            type: "STRING",
            required: true,
        },
        {
            name: "amount",
            description: '🧮 The amount of the item which will be offred to the user',
            type: "NUMBER",
            required: false,
        },
    ],

    run: async (bot, interaction, args) => {  

        const usertag = interaction.member;
    
        const member = interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find(member => member.user.username === args.slice(0).join(' ') || member.user.username === args[0]);
        console.log(member)
        if (!member) {
            let gifttooembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.id}> : Please precise the user which will receive the gift.`);
            return interaction.followUp({embeds: [gifttooembed]}).catch();
        }
        
        if (member.id == interaction.user.id){
            let giftselfembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.id}> : You can't send gift to yourself.`);
            return interaction.followUp({embeds: [giftselfembed]}).catch();
        } 

        if (member.user.bot == true){
            let giftbotembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.id}> : You can't send gift to a bot.`);
            return interaction.followUp({embeds: [giftbotembed]}).catch();
        } 
        //if (member.user.id == message.author.id) return message.channel.send(`Lol you can't gift your self.`);

        
        if (!args[1]){
            let nogiftembed = new MessageEmbed() 
            .setColor("RED")
            .setDescription(`❌ <@${usertag.id}> : You didn't precise the itemId.`);
            return interaction.followUp({embeds: [nogiftembed]}).catch();
        } 
        //if (!args[1]) return message.channel.send(`So you are giving nothing to them???`);

        const userData = await bot.fetchUser(member.id);
        const authoData = await bot.fetchUser(interaction.user.id);
        if (!args[1]) args[1] = '';
        if (!args[2]) args[2] = '';
        
        let itemToGive = itemss.find(x => x.itemId.toLowerCase() === args.join(' ').toString().toLowerCase() || x.itemId.toLowerCase() === args[1].toString().toLowerCase() || x.itemId.toLowerCase() === `${args[1].toString().toLowerCase()} ${args[2].toString().toLowerCase()}`);
        if (!itemToGive) { 
            let giftnothingembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.user.id}> : The item you are trying to offer does not exist, or you typed the wrong itemId (\`+shop to show items with their id\`).`);
            return interaction.followUp({embeds: [giftnothingembed]}).catch();
        }

        let authorItem = authoData.items.find(i => i.itemId == itemToGive.itemId);
        if (!authorItem) { 
            let noitemgidtembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.user.id}> : You do not own this item.`);
            return interaction.followUp({embeds: [noitemgidtembed]}).catch();
        }
        
        let userItem = userData.items.find(i => i.itemId == itemToGive.itemId);

        let giveAmount = args.slice(1).join(' ').toString().match(/([1-9][0-9]*)/);
        if (!giveAmount) 
            giveAmount = 1;
        else 
            giveAmount = giveAmount[0];
        
        itemToGive.amount = parseInt(giveAmount)
    
        if (parseInt(giveAmount) > parseInt(authorItem.amount)){
            let itemamountembed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ <@${usertag.user.id}> : You only have **x${parseInt(authorItem.amount).toLocaleString()}** of this item.`);
            return interaction.followUp({embeds: [itemamountembed]}).catch();
        } 
        //if (parseInt(giveAmount) > parseInt(authoItem.amount)) return message.channel.send(`You only have **${parseInt(authoItem.amount).toLocaleString()}** of that item`);

        // Get a new array of author inventory without the item to give
        let authorArray = authoData.items.filter(i => i.itemId !== itemToGive.itemId);

        // Get a new array of user inventory without the item to give
        let userArray = userData.items.filter(i => i.itemId !== itemToGive.itemId);

        await userData.save();

        if (!userItem) {
            //itemToGive does not exist in the user inventory
    //        console.log('itemToGive does not exist in the user inventory:')
    //        console.log(itemToGive);
            userArray.push(itemToGive);
        } else {
            //itemToGive already exists in the user inventory
            itemToGive.amount += parseInt(userItem.amount);
    ///        console.log('itemToGive already exists in the user inventory (so only the amount will be changed):')
    //        console.log(itemToGive);
            userArray.push(itemToGive); 
        }

        userData.items = userArray;
    ///    console.log(userData.items.length + ' item(s) in the new user inventory:');
    ///    console.log(userData.items);
        await userData.save();

        if ((authorItem.amount - parseInt(giveAmount)) > 0) {
            authorItem.amount -= parseInt(giveAmount);
            authorArray.push(authorItem);
        }
        authoData.items = authorArray;
        await authoData.save();

        if (itemToGive.rarety === "🔴 Mythiqual") {
            itemToGive.rarety = "```diff\n-🔴 Mythiqual\n```"
        }
        if (itemToGive.rarety === "🟠 Legendary") {
            itemToGive.rarety = "```fix\n🟠 Legendary\n```"
        }
        if (itemToGive.rarety === "🟣 Epic") {
            itemToGive.rarety = "```yaml\n🟣 Epic\n```"
        }
        if (itemToGive.rarety === "🔵 Rare") {
            itemToGive.rarety = "```md\n# 🔵 Rare\n```"
        }
        if (itemToGive.rarety === "🟢 Uncommon") {
            itemToGive.rarety = "```diff\n+🟢 Uncommon\n```"
        }
        if (itemToGive.rarety === "⚪️ Common") {
            itemToGive.rarety = "```\n⚪️ Common\n```"
        }

        let messagemembergifted = new MessageEmbed()
        
        .setColor("BLUE")
        .setTitle(`🎁 You received a gift`)
        .addField(`👑 Offerer:`,usertag.user.tag)
        .addField(`Item:`,`${itemToGive.name}`)
        .addField(`🎨 Item rarety:`, itemToGive.rarety)
        .addField(`🧮 Quantity:`,parseInt(giveAmount).toLocaleString())
        .setFooter(`Sent by ${interaction.member.nickname || interaction.user.username} • ${interaction.guild.name}`,interaction.guild.iconURL())
        .setTimestamp()
        member.send({embeds: [messagemembergifted]}).catch();


        let messageembeditem = new MessageEmbed()
        .setColor("BLUE")
        .setTitle(`🎁 You sent a gift`)
        .addField(`🎁 Beneficiary:`,`<@${member.user.id}>`)
        .addField(`Item:`,`${itemToGive.name}`)
        .addField(`🎨 Item Rarety:`, itemToGive.rarety)
        .addField(`🧮 Quantity:`,parseInt(giveAmount).toLocaleString())
        .setTimestamp()
        .setFooter(`Asked by ${interaction.member.nickname} • ${interaction.guild.name}`,interaction.guild.iconURL())
        .setDescription(`🎁 <@${usertag.user.id}> : You offered **x${parseInt(giveAmount).toLocaleString()}** ${itemToGive.name} to <@${member.user.id}>`);
        interaction.followUp({embeds: [messageembeditem]}).catch();
        
    }
}