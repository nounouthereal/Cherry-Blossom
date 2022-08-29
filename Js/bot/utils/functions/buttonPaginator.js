const Discord = require('discord.js')
const ms = require('ms')
const { MessageActionRow, MessageButton } = require('discord-buttons')

// Not finished...

const buttonPaginator = async (msg, pages) => {
    if (!msg) throw new Error(`PARAMETER_ERROR:`,`The \`message\` parameter undefined or missing.`)
    if (!pages) throw new Error(`PARAMETER_ERROR:`,`The \`pages\` parameter undefined or missing.`)

    let page = 0
    const btn1 = new MessageButton().setEmoji(`⬅️`).setID(`previous`).setStyle(`blue`)
    const btn2 = new MessageButton().setEmoji(`➡️`).setId(`next`).setStyle(`blue`)
    const row = new MessageActionRow().addComponents([btn1, btn2])

    const btn1After = new MessageButton().setEmoji(`⬅️`).setID(`previous`).setStyle(`blue`).setDisabled()
    const btn2After = new MessageButton().setEmoji(`➡️`).setId(`next`).setStyle(`blue`).setDisabled()
    const deadRow = new MessageActionRow().addComponents([btn1After, btn2After])

    const curPage = await msg.channel.send({embeds: pages[0], components: [row]})


}

module.exports = buttonPaginator
