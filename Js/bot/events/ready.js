module.exports = async bot => {
    bot.user.setActivity(`Devs : nounou#4483 , Deku Midoriya#6946 +help`, { type: 'WATCHING' });
    console.log(`${bot.user.tag} is online. ${bot.guilds.cache.size.toLocaleString()} Users amount: ${bot.users.cache.size}`);
    /*await bot.dbl.postStats(bot.guilds.cache.size);*/
}