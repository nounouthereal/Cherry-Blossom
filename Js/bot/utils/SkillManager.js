const skills = require('./skills');

class SkillManager {
    contructor() {
        this.skills = skills;
    }
    
    find(skill = '') {
        const found = skills.find(x => x.name === skill);
        if (!found) return false;
        return found;
    }


    listskills() {
        return skills;
    }
}

module.exports = SkillManager;