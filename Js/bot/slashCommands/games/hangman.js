
const { MessageEmbed } = require('discord.js')
const hangman = require('discord-hangman');
const randomWordFR = require('random-word-fr');
const randomWord = require('random-word');
const randomWordEs = require('random-spanish-words');
const randomWordDe = require('random-noun-generator-german');
const translate = require('translate-google');
const Discord = require("discord.js");




module.exports = {
    name: "hangman",
    description: "🧩 Play a hangman game.",
    timeout: 5000,
    options: [
        {
            name: "language",
            description: 'The language of the hangman party',
            required: false,
            type: "STRING",
            choices: [
                {
                    name: 'English [english]',
                    value: 'en',
                },
                {
                    name: 'Français [french]',
                    value: 'fr',
                },
                {
                    name: 'عربى [arabic]',
                    value: 'ar',
                },
                {
                    name: 'Español [spanish]',
                    value: 'es',
                },
                {
                    name: 'Deutsch [german]',
                    value: 'de',
                },
            ]
        },
        {
            name: 'mode',
            description: 'The game mode custom or random',
            required: false,
            type: "STRING",
            choices: [
                {
                    name: 'custom',
                    value: 'custom',
                },
                {
                    name: 'random',
                    value: 'random',
                },
            ]
        }
    ],

    run: async (bot, interaction, args) => {

        let result
        let language = "en"

        if (!args[1]) {
            args[1] = "random"
        }

        if (!args[0]|| args[0].toLowerCase() == "en" || args[0].toLowerCase() == "english"){
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
            console.log(result)
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




        if (args[1] == "random")
            await hangman.create(interaction, 'random', { word: hangmanWord, messages: {
                createNoPlayers: 'Maybe in another moment... no one joined the game',
                
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
            await hangman.create(interaction, 'custom', { messages: {
                createNoPlayers: ':cry: Maybe in another moment... no one joined the game',
                
                customNotEnoughPlayers: ':warning: For a custom word game, there has to be at least 2 players...',
                customInitMessage: `{players} players have joined. Selecting a player to choose the word. Waiting for one of you to respond. Check your DMs!!`,
                customNoMoreWords: '👤 We ran out of players... try again, I\'m sure you can do it better.',
            
                gatherPlayersMsg: '<a:dancinhead:994268812805423144> Write "join" to participate in this game! You have 10 seconds.',
            
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
}