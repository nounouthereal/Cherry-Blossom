const { MessageEmbed } = require('discord.js')

const { MS } = require('easy-minesweeper');





module.exports.run = async (bot, message, args) => {
/* 
  let difficulty = args[0]

  console.log(args[0])

  if(args[0] == null || args[0] == undefined) { 
    difficulty = "normal" 
  }

  console.log(difficulty)

  if(!args[0] || args[0].toLowerCase() == 'help') {
    message.reply("🧩 Help for minesweeper game :")
    let helpembed = new MessageEmbed()
        .setTitle("Minesweeper game help embed")
        .setDescription(`**Usage:** \`+minesweeeper (Optionnal: [difficulty]) \`\n\nThe game parameters: \n\n**difficulty**\nThis parameter will change the game difficulty [\`Default difficulty is normal\`] (**Game difficulty: easy [🥱] ┇ simple [😃] ┇ normal [😓] ┇ hard [🤢] ┇ impossible [😈]**)`)
        .setTimestamp()
        .setFooter(`${message.guild} • Asked by : ${message.member.displayName}`,message.guild.iconURL())
        .setColor('BLUE')

    message.channel.send({embeds:[helpembed]})
}

  if (difficulty?.toLowerCase() == "easy" || difficulty?.toLowerCase() == "🥱" || difficulty?.toLowerCase() == "easily")
  var minesweeper = new Minesweeper({
    rows: 5,
    columns: 6,
    mines: 5,
    emote: 'boom',
    returnType: 'code',
  });

  else if (difficulty?.toLowerCase() == "simple" || difficulty?.toLowerCase() == "simplicity" || difficulty?.toLowerCase() == "😃")
      var minesweeper = new Minesweeper({
        rows: 9,
        columns: 9,
        mines: 10,
        emote: 'boom',
        returnType: 'code',
  });

  else if (difficulty?.toLowerCase() == "normal" || difficulty?.toLowerCase() == "normality" || difficulty?.toLowerCase() == "😓")
      var minesweeper = new Minesweeper({
        rows: 12,
        columns: 16,
        mines: 20,
        emote: 'boom',
        returnType: 'code',
  });

  else if (difficulty?.toLowerCase() == "hard" || difficulty?.toLowerCase() == "hardly" || difficulty?.toLowerCase() == "🤢")
      var minesweeper = new Minesweeper({
        rows: 16,
        columns: 19,
        mines: 25,
        emote: 'boom',
        returnType: 'code',
  });

  else if (difficulty.toLowerCase() == "impossible" || difficulty.toLowerCase() == "impossiblity" || difficulty.toLowerCase() == "😈")
      var minesweeper = new Minesweeper({
        rows: 20,
        columns: 30,
        mines: 32,
        emote: 'boom',
        returnType: 'code',
  });

  console.log(difficulty)

  const matrix = minesweeper.start();

    return matrix
      ? message.channel.send(matrix)
      : message.channel.send(':warning: You have provided invalid data.'); */

  const board = MS(9 , 25)
  message.channel.send(`${board}`)
}

module.exports.config = {
    name: 'minesweeper', // Command Name
    description: 'Create, play, fisnish an minesweeper game', // Description
    usage: '+minesweeper (Optionnal: [difficulty: easy | simple | normal | hard | impossible])', // Usage
    botPerms: [], // Bot permissions needed to run command. Leave empty if nothing.
    userPerms: [], // User permissions needed to run command. Leave empty if nothing.
    aliases: ['mweeper','misw'], // Aliases 
    bankSpace: 0, // Amount of bank space to give when command is used.
    cooldown: 5 // Command Cooldown
}