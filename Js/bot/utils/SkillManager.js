const skills = require('./skills');

class ItemManager {
    contructor() {
        this.skills = skills;
    }
    
    find(item = '') {
        const found = skills.find(x => x.name === item);
        if (!found) return false;
        return found;
    }

    usable(item = '') {
        const found = skills.find(x => x.name === item);
        if (!found) return false;
        if (!found.canUse) return false;
        return true; 
    }

    listitems() {
        return skills;
    }
}

module.exports = ItemManager;