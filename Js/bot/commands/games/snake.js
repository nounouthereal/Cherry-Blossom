const { Snake } = require("weky");
const Discord = require("discord.js");
require('@weky/inlinereply');


module.exports.run = async (bot, message, args) => {

    let emoji

    color_array = ['yellow','red','blue','green','black','white','brown','purple','orange']

    if (color_array.includes(args[0].toLowerCase() && args[0] != null)) {
        emoji = ':' + args[0] +'_square' + ':'
    }

    else if (args[0] != null) {
        emoji = ':grey_question:'
        message.channel.send(`Available colors: ${color_array}\nYour party will start with an undefined color stop your party and begin a new with an available color (Leave empty for default color)`)
    }

   else if (args[0] == "colors" || args[0] == "color") {
    message.channel.send(`Available colors: ${color_array} (Leave empty for default color)`)
    }

   if (!args[0]) {
       emoji = '⬜️'
   }

    await Snake({
        message: message,
        embed: {
            title: '🐍 Snake Game',
            description: `End of the game, you scored **{{score}}** 🐰!`,
            color: '#7289da',
            timestamp: true,
            footer: `${message.guild} • Asked by : ${message.member.displayName} || Original project: Weky Devlopment`,
        },
        emojis: {
            empty: '⬛',
            snakeBody: emoji,
            food: '🐰',
            up: '⬆️',
            right: '⬅️',
            down: '⬇️',
            left: '➡️',
        },
        othersMessage: `❌ Only <@${message.author.id}> can use the buttons!`,
        buttonText: 'Cancel',
    });
}


module.exports.config = {
    name: 'snake', // Command Name
    description: '🐍 Create, play, fisnish an snake game', // Description
    usage: '+snake (Optionnal: [snake_color (Ex: red // blue // yellow)])', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['snakegame','gamesnake'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}