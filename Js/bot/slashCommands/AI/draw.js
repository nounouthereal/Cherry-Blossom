const { MessageEmbed, MessageAttachment } = require("discord.js")
const {generate} = require('text-to-image');


module.exports = {
    name: "draw",
    description: "💳 Show your or a user balance",
    cooldown: 5,
    options: [

        {
            name: "prompt",
            description: '💳 The user balance',
            type: "STRING",
            required: false,
        }

    ],


    run: async (bot, interaction, args) => {

        const dataUri = await generate('Sweet', {
            debug: true,
            maxWidth: 720,
            fontSize: 18,
            fontFamily: 'Arial',
            lineHeight: 30,
            margin: 5,
            bgColor: 'blue',
            textColor: 'red',
          });
        const buffer = new Buffer(dataUri)

        let attachment = new MessageAttachment(buffer, `${args[0]}.png`)

        interaction.followUp({files: [attachment]})

    }
}