const Prizes = require("../models/PrizesModel");
const Levels = require("../models/LevelsModel");

module.exports = async (bot, message) => {

    if(message.author.bot || !message.guild) return;
    let levelData = await Levels.findOne({ guildId: message.guild.id, userId: message.author.id });
    let rankData = await Prizes.findOne({ guildId: message.guild.id});
  
    if (levelData.activated) {
        return
    }

    if (!rankData) {
        let newRank = new Prizes({
            guildId: message.guild.id
        }).save();
    }
  
    if (!levelData) {
        let newLevel = new Levels({
            guildId: message.guild.id,
            userId: message.author.id
        }).save();
    } else {
        let addedXp = Math.floor(Math.random() * (5 - 1) + 1);
        levelData.xp += addedXp
        levelData.totalXp += addedXp
        levelData.save().then(data => {
            if(data.xp >= data.xpToLevel) {
                levelData.xp = 0;
                levelData.level++;
                levelData.xpToLevel += data.level * 123;
                levelData.save().then(async _data => {
                    message.reply(`Félicitations vous avez atteint **${_data.level}** ! :tada:`).then(msg => {
                        setTimeout(() => msg.delete(), 10000)
                      });
                    if(rankData && rankData.levelPrizes.find(x => x.level == _data.level)) {
                        rankData.levelPrizes.filter(x => x.level == _data.level).forEach(x => {
                            message.member.roles.add(x.role).catch(e => { });
                        });
                    };
                });
            };
        });
    };
};

module.exports.conf = {
   event: "messageCreate"
};