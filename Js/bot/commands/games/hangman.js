const { MessageEmbed } = require('discord.js')
const hangman = require('discord-hangman');
const randomWordFR = require('random-word-fr');
const randomWord = require('random-word');
const randomWordEs = require('random-spanish-words');
const randomWordDe = require('random-noun-generator-german');
const translate = require('translate-google');
const Discord = require("discord.js");
const { CommandInteraction } = require('discord.js');







module.exports.run = async (bot, message, args) => {

    let result
    let language = "en"

    if (!args[1]) {
        args[1] = "random"
    }
    
    if(!args[0] || args[0].toLowerCase() == 'help') {
        message.reply("🧩 Help for hangman game :")
        let helpembed = new MessageEmbed()
            .setTitle("Hangman game help embed")
            .setDescription(`**Usage:** \`+hangman (Optionnal: [langauage]) \`\n\nThe game parameters: \n\n**language**\nThis parameter will change the game language [\`Default language is english\`] (**Game languages: english [en] ┇ français [fr] ┇ عربى [ar] ┇ español [es] ┇ deustch [de]**)\n\n:warning:**mode**\nThere are two game modes available, \`custom\` and \`random\` .When the game mode is set to \`random\`, the word to guess is drawn at random. In \`custom\` mode, a player is randomly chosen to pick the word. This player will not be able to participate in the game afterwards. (By default the mode is \`random\`)`)
            .setTimestamp()
            .setFooter(`${message.guild} • Asked by : ${message.member.displayName}`,message.guild.iconURL())
            .setColor('BLUE')

        message.channel.send({embeds:[helpembed]})
    }

    if (args[0] == null || args[0].toLowerCase() == "en" || args[0].toLowerCase() == "english"){
        result = randomWord()
        language = "en"
    }
    
    else if (args[0].toLowerCase() == "fr" || args[0].toLowerCase() == "français" || args[0].toLowerCase() == 'francais' || args[0].toLowerCase() == "french") { 
        result = randomWordFR()
        language = "fr"

    }

    else if (args[0].toLowerCase() == "es" || args[0].toLowerCase() == "espagnol" || args[0].toLowerCase() == 'español' || args[0].toLowerCase() == 'espanol') { 
        result = randomWordEs()
        language = "es"
    }

    else if (args[0].toLowerCase() == "de" || args[0].toLowerCase() == "deutsch" || args[0].toLowerCase() == 'german') { 
        result = randomWordDe()
        language = "de"
    }

    else if (args[0].toLowerCase() == "ar" || args[0].toLowerCase() == "arabic" || args[0].toLowerCase() == 'arab' || args[0].toLowerCase() == 'elharbia' || args[0].toLowerCase() == 'el harbia' || args[0].toLowerCase() == 'عربى') { 
        result = randomWordDe()
        translate(result, {to: 'ar'}).then(res => {
            console.log(res)
            result = res
        }).catch(err => {
            console.error(err)
        })
        language = "ar"
    }

/*
    createNoPlayersStr = ':warning: Maybe in another moment... no one joined the game'

    customNotEnoughPlayersStr = ':warning: For a custom word game, there has to be at least 2 players...'
    customInitMessageStr = `${players} players have joined. Selecting a player to choose the word. Waiting for one of you to respond. Check your DMs!!`
    customNoMoreWordsStr = '👤 We ran out of players... try again, I\'m sure you can do it better.'
        
    gatherPlayersMsgStr = 'Write "join" or react with 📒 to participate in this game! You have 10 seconds.'
        
    getWordFromPlayersDmStr = 'Hangman Game SYSTEM : You are the chosen one!! Just write the word of your choice. You have 30 seconds. And remember, you can\'t participate in the game'
    timesUpDmStr = '⏰ Time\'s up sorry, you are disqualified.'
    timesUpMsgStr = '👤 The chosen one didn\'t answser... selecting ANOTHER ONE'
    wordSuccessStr = '✅ Nice word! Going back to the server.'
    invalidWordStr = ':warning: Thats not a valid word. No spaces, at least 3 characters.'
    tooManyInvalidsWordsStr = '❌ Sorry, too many invalid words, try again next game. You are disqualified.'
        
    missesStr = '❌ Misses',
    wonStr = '🏆 You won !',
    noplayersleftStr = '👤 No Players Left',
    gameOverStr = '🕹 Game over !',
    gameOverMsgStr = `The word was ${word}`

    let strArray = [createNoPlayersStr, customNotEnoughPlayersStr, customInitMessage, customNoMoreWordsStr,
                    gatherPlayersMsgStr, getWordFromPlayersDmStr, timesUpDmStr, timesUpMsgStr, timesUpMsgStr, wordSuccessStr,
                    invalidWordStr, tooManyInvalidsWordsStr, missesStr, noplayersleftStr, gameOverStr, gameOverMsgStr
    ]


    strArray.forEach((str) => {
        translate(str, {to: language}).then(res => {
            console.log(str)
            sentence = res
        }).catch(err => {
            console.error(err)
        })
    })
    */
    

    


    const hangmanWord = result


    console.log(message.channel)


    if (args[1] == "random")
        await hangman.create(interaction, 'random', { word: hangmanWord, players: [message.author], messages: {
            createNoPlayers: ':cry: Maybe in another moment... no one joined the game',
            
            customNotEnoughPlayers: ':warning: For a custom word game, there has to be at least 2 players...',
            customInitMessage: `{players} players have joined. Selecting a player to choose the word. Waiting for one of you to respond. Check your DMs!!`,
            customNoMoreWords: '👤 We ran out of players... try again, I\'m sure you can do it better.',
        
            gatherPlayersMsg: 'Write "join" or react with 📒 to participate in this game! You have 10 seconds.',
        
            getWordFromPlayersDm: 'Hangman Game SYSTEM : You are the chosen one!! Just write the word of your choice. You have 30 seconds. And remember, you can\'t participate in the game',
            timesUpDm: '⏰ Time\'s up sorry, you are disqualified.',
            timesUpMsg: '👤 The chosen one didn\'t answser... selecting ANOTHER ONE',
            wordSuccess: '✅ Nice word! Going back to the server.',
            invalidWord: ':warning: Thats not a valid word. No spaces, at least 3 characters.',
            tooManyInvalidsWords: '❌ Sorry, too many invalid words, try again next game. You are disqualified.',
        
            misses: '❌ Misses',
            won: '🏆 You won !',
            noplayersleft: '👤 No Players Left',
            gameOver: '🕹 Game over !',
            gameOverMsg: `The word was {word}`
        },
    })

    if (args[1] == "custom")
        await hangman.create(interaction, 'custom', { players: [message.author], messages: {
            createNoPlayers: ':cry: Maybe in another moment... no one joined the game',
            
            customNotEnoughPlayers: ':warning: For a custom word game, there has to be at least 2 players...',
            customInitMessage: `{players} players have joined. Selecting a player to choose the word. Waiting for one of you to respond. Check your DMs!!`,
            customNoMoreWords: '👤 We ran out of players... try again, I\'m sure you can do it better.',
        
            gatherPlayersMsg: 'Write "join" or react with 📒 to participate in this game! You have 10 seconds.',
        
            getWordFromPlayersDm: 'Hangman Game SYSTEM : You are the chosen one!! Just write the word of your choice. You have 30 seconds. And remember, you can\'t participate in the game',
            timesUpDm: '⏰ Time\'s up sorry, you are disqualified.',
            timesUpMsg: '👤 The chosen one didn\'t answser... selecting ANOTHER ONE',
            wordSuccess: '✅ Nice word! Going back to the server.',
            invalidWord: ':warning: Thats not a valid word. No spaces, at least 3 characters.',
            tooManyInvalidsWords: '❌ Sorry, too many invalid words, try again next game. You are disqualified.',
        
            misses: '❌ Misses',
            won: '🏆 You won !',
            noplayersleft: '👤 No Players Left',
            gameOver: '🕹 Game over !',
            gameOverMsg: `The word was {word}`
        },
    })

    
}


module.exports.config = {
    name: 'hangman', // Command Name
    description: 'Create, play, fisnish an hangman game', // Description
    usage: '+hangman (Optionnal: [language] [mode])', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['hang','gamehangman'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}