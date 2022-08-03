const fs = require('fs');

/*module.exports = bot => {
    fs.readdirSync("/Users/nouhame/Bot_des_cerisiers/Js/bot/specialsEvent").filter(file => file.endsWith(".js")).forEach(file => {
        let event = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/specialsEvent/${file}`);
        let eventName = event.conf.event
        bot.on(eventName, event.run);
        console.log(`[Special Event] ${eventName} event loaded.`);

    })};*/

    //Waitinf for ranking v1.0
    /* module.exports = bot => {
        fs.readdir('/Users/nouhame/Bot_des_cerisiers/Js/bot/specialsEvent', (err, files) => {
            if (err) console.log(err);
            files.forEach(file => {
                if (!file.endsWith('js')) return;
                const event = require(`/Users/nouhame/Bot_des_cerisiers/Js/bot/specialsEvent/${file}`);
                const eventName = event.conf.event;
                bot.on(eventName, event.bind(null, bot));
                delete require.cache[require.resolve(`/Users/nouhame/Bot_des_cerisiers/Js/bot/specialsEvent/${file}`)];
            });
        });
    } */