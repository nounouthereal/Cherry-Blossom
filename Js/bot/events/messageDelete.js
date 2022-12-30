module.exports = async (bot, message) => {
    if (message.author.bot) return;
    if (message.system) return;

    bot.snipes.set(message.channel.id, {
        content: message.content,
        timestamp: message.createdTimestamp,
        author: message.author,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
}
