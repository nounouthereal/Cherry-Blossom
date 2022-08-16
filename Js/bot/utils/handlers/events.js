const fs = require('fs');

module.exports = bot => {
    fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/events', (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            if (!file.endsWith('js')) return;
            if (file == 'interactionCreate') return;
            const event = require(`../../events/${file}`);
            const eventName = file.split('.')[0];
            bot.on(eventName, event.bind(null, bot));
            delete require.cache[require.resolve(`../../events/${file}`)];
        });
    });
}