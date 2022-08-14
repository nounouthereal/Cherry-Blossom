const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch');


module.exports.run = async (bot, message, args) => {
    let arrayCreate = ['createuno','create','creategame','unocreate','gamecreate'];
    let arrayJoin = ['joinuno','join','joingame','unojoin','gamejoin'];
    let arrayLeave = ['leaveuno','leave','leavegame','unoleave','gameleave','quiteuno','quit','quitgame','unoquit','gamequit'];
    let arrayStart = ['startuno','start','startgame','unostart','gamestart'];
    let arrayEnd = ['enduno','end','endgame','unoend','gameend','gameover'];
    let arrayClose = ['closeuno','close','closegame','unoclose','gameclose'];
    let arrayPlay = ['playuno','play','playgame','unoplay','gameplay'];
    let arrayUNO = ['unouno','uno','unogame','gameuno'];
    let arrayDraw = ['drawuno','draw','drawgame','unodraw','gamedraw'];
    let arrayCards = ['cardsuno','carduno','cards','card','cardsgame','cardgame','unocards','unocard','gamecards','gamecard'];
    let arrayTable = ['tableuno','table','tablegame','unotable','gametable'];
    let arrayWinners = ['winnersuno','winneruno','winners','winner','winnersgame','winnergame','unowinners','unowinner','gamewinners','gamewinner'];
    let arraySettings = ['settingsuno','settinguno','settings','setting','settingsgame','settinggame','unosettings','unosetting','gamesettings','gamesetting'];
    let arrayViewSettings = ['viewsettingsuno','viewsettinguno','viewsettings','viewsetting','viewsettingsgame','viewsettinggame','unoviewsettings','unoviewsetting','gameviewsettings','gameviewsetting','viewunosetting','viewgamesetting','viewunosettings','viewgamesettings'];

    if(!args[0] || args[0].toLowerCase() == 'help') {
        message.reply("Help for uno game :")
        let helpembed = new MessageEmbed()
            .setTitle("🃏 Uno game help embed")
            .setDescription(`**Usage:** \`+uno <parameters>\`\n\nThe game parameters: \n\n**create**\nThis parameter will create a game and return a message letting users know that they can now join the game.\n\n**join**\nThis parameter permits users to enter into the game in the current channel. It will automatically start the game if the user count reaches ten (See start parameter to manually start the game)\n\n**leave**\nThis parameter permits users to quit the game in the current channel.\n\n**start**\nTo manually start the game, use the \`start\` parameter. This parameter will only work if the game has at least two users entered. Otherwise it will return. On success this parameter will send each user their cards and a starting message to the game channel.\n\n**end**\nTo end the game in its current state, call the \`end\` parameter. This parameter will end the game in whatever the current state is. It will determine the winners based off of how many cards users have left in there hand, then it will return a message with the winners.\n\n**close**\nTo close the current game without scoring results, call the \`close\` parameter. This parameter will close the game without scoring any of the users and will immediately end the game. No score will be output and a new game can be created.\n\n**play**\nTo play a card in your hand, call the \`play\` parameter. This parameter will handle playing the card called. On success, it will remove the card from their hand and replace the top card. On fail it will return.\n\n**uno**\nTo both protect yourself from UNO! Callouts or call someone else out for having one card left, call the \`uno\` parameter. This parameter will handle both protecting yourself from future UNO! callouts, and calling other users out that haven't been protected.\n\n**draw**\nTo add a card to your hand, call the \`draw\` parameter. This parameter will handle adding cards to the users hand. Players can't draw if it isn't their turn and if they have a card they can play, they can't draw.\n\n**cards**\nTo view your current hand in the game, call the \`cards\` parameter. This parameter will handle showing users the current cards that they have in their hand. It will return a direct message to the user with their hand.`)
            .setTimestamp()
            .setFooter(`${message.guild} • Asked by : ${message.member.displayName}`,message.guild.iconURL())
            .setColor('BLUE')
        let helpembed2 = new MessageEmbed()
            .setDescription(`**table**\nTo view the current state of the game, call the \`table\` parameter. This parameter will handle creating and sending an image to the channel with all the current information of the game. Including rotation, whos turn it is, how many cards each user has, whos in the game, and the top card of the pile.\n\n**winners**\nTo view the current winners of the game (if there are any), call the \`winners\` parameter. This method will handle creating and sending an image identical to the one sent in the \`end\` method. The only difference is this method can be called at any time to view the current standings of the game.\n\n**settings**\nTo update the servers UNO! settings, call the \`settings\` parameter. This method handles updating the servers UNO! settings. (The settings are stored by Channel ID). It will send a message and react to the message, allowing you to change settings based on reactions.\n\n**viewsettings**\nTo view the current servers UNO! settings, call the \`viewsettings\` parameter. This method will return a message showing which customizable settings have been turned on or off.`)
            .setTimestamp()
            .setFooter(`${message.guild} • Asked by : ${message.member.displayName}`,message.guild.iconURL())
            .setColor('BLUE')
        console.log(bot.discordUNO)

        return message.channel.send({embeds:[helpembed, helpembed2]})
        
    }


    if(arrayCreate.includes(args[0].toLowerCase())) {
        await bot.discordUNO.createGame(message)
    }

    else if(arrayJoin.includes(args[0].toLowerCase())) {
        await bot.discordUNO.addUser(message)
    }

    else if(arrayLeave.includes(args[0].toLowerCase())) {
        await bot.discordUNO.removeUser(message)
    }

    else if(arrayStart.includes(args[0].toLowerCase())) {
        await bot.discordUNO.startGame(message)
    }

    else if(arrayCreate.includes(args[0].toLowerCase())) {
        await bot.discordUNO.endGame(message)
    }

    else if(arrayClose.includes(args[0].toLowerCase())) {
        await bot.discordUNO.closeGame(message)
    }
    
    else if(arrayPlay.includes(args[0].toLowerCase())) {
        await bot.discordUNO.playCard(message)
    }

    else if(arrayUNO.includes(args[0].toLowerCase())) {
        await bot.discordUNO.UNO(message)
    }

    else if(arrayDraw.includes(args[0].toLowerCase())) {
        await bot.discordUNO.draw(message)
    }

    else if(arrayCards.includes(args[0].toLowerCase())) {
        await bot.discordUNO.viewCards(message)
    }

    else if(arrayTable.includes(args[0].toLowerCase())) {
        await bot.discordUNO.viewTable(message)
    }

    if(arrayWinners.includes(args[0].toLowerCase())) {
        await bot.discordUNO.viewWinners(message)
    }

    else if(arraySettings.includes(args[0].toLowerCase())) {
        await bot.discordUNO.updateSettings(message)
    }

    else if(arrayViewSettings.includes(args[0].toLowerCase())) {
        await bot.discordUNO.viewSettings(message)
    }


}


module.exports.config = {
    name: 'uno', // Command Name
    description: 'Create, play, handle, modify, fisnish an uno game', // Description
    usage: '+uno <[help, create, join, leave, start, end, close, play, uno, draw, cards, table, winners, settings, viewsettings]>', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['unogame','gameuno'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}