const characters = [
    {
        name: 'Archmage',
        mana: 285,
        hp: 450,
        intelligence: 19,
        agility: 17,
        strength: 14,
        armor: 3,
        damage: 27,
        url: './img/Archmage.webp'

    }, {
        name: 'Blademaster',
        mana: 240,
        hp: 550,
        intelligence: 16,
        agility: 24,
        strength: 17,
        armor: 5,
        damage: 48,
        url: './img/Blademaster2.webp'
    }, {
        name: 'Crypt Lord',
        mana: 210,
        hp: 675,
        intelligence: 14,
        agility: 14,
        strength: 26,
        armor: 2,
        damage: 34,
        url: './img/Cryptlord.webp'
    }, {
        name: 'Demon Hunter',
        mana: 240,
        hp: 575,
        intelligence: 16,
        agility: 22,
        strength: 19,
        armor: 5,
        damage: 46,
        url: './img/Illidan_Anim.webp'
    }, {
        name: 'Blood Mage',
        mana: 285,
        hp: 550,
        intelligence: 19,
        agility: 14,
        strength: 18,
        armor: 2,
        damage: 27,
        url: './img/Bloodmage.webp'
    }, {
        name: 'Far Seer',
        mana: 285,
        hp: 475,
        intelligence: 19,
        agility: 18,
        strength: 15,
        armor: 3,
        damage: 27,
        url: './img/Farseer2.webp'
    }, {
        name: 'Death Knight',
        mana: 255,
        hp: 675,
        intelligence: 17,
        agility: 12,
        strength: 23,
        armor: 3,
        damage: 35,
        url: './img/DeathKnightWC3.gif'
    }, {
        name: 'Keeper of the Grove',
        mana: 270,
        hp: 500,
        intelligence: 18,
        agility: 15,
        strength: 16,
        armor: 3,
        damage: 26,
        url: './img/KGWC3.webp'
    }
]

class Unit {
    constructor(character) {
        this.url = character.url;
        this.name = character.name;
        this.mana = character.mana;
        this.hp = character.hp;
        this.intelligence = character.intelligence;
        this.agility = character.agility;
        this.strength = character.strength;
        this.armor = character.armor;
        this.damage = character.damage;
    }

    hit(otherUnit) {
        const effectiveDammage = this.damage * (100 + this.armor * 6) / 100;
        const damageReduction = otherUnit.armor * 0.06 / (1 + otherUnit.armor * 0.06);

        const damage = Math.floor(effectiveDammage * (1 - damageReduction));

        otherUnit.hp = otherUnit.hp - damage;
        console.log(otherUnit.hp);
        display.log(`${this.name} hit ${otherUnit.name} deals ${damage}. HP left ${otherUnit.hp}`);
    }

}

class Game {

    setPlayer(playerUnit) {
        this.playerUnit = playerUnit;
    }

    setComputer(computerUnit) {
        this.computerUnit = computerUnit
    }

    chooseCharacter(playerUnitIndex) {
        const playerUnit = new Unit(characters[playerUnitIndex]);
        const computerUnitIndex = Math.floor(Math.random() * characters.length);
        const computerUnit = new Unit(characters[computerUnitIndex]);
        this.setComputer(computerUnit);
        this.setPlayer(playerUnit);

        display.prepareFight();
    }
    
    fight() {
        document.querySelector('.fight').classList.add('hidden')
        this.firstBang = !!Math.floor(Math.random() * 2);
        
        this.tick();
    }

    tick() {
        if (this.firstBang) {
            this.playerUnit.hit(this.computerUnit);
        } else {
            this.computerUnit.hit(this.playerUnit)
        }
        this.firstBang = !this.firstBang;

        if (this.playerUnit.hp > 0 && this.computerUnit.hp > 0) {
            setTimeout(() => this.tick(), 1000);
        } else {
            if (this.playerUnit.hp > 0) {
                alert(`${this.playerUnit.name} Wins`);
            } else {
                alert(`${this.computerUnit.name} Wins`);
            }
            location.reload();
        }
    }

}


class Display {

    startGame() {
        alert('Choose your fighter');

        characters.forEach((character, index) => {
            let newCharacter = document.createElement('div');
            newCharacter.innerHTML = createCharacterDiv(character) +
                `<button class="${index}" onclick="game.chooseCharacter(${index})">Choose</button>`;

            document.querySelector('.characters-list').appendChild(newCharacter);
        })

        document.querySelector('.start').classList.add('hidden')
    }


    prepareFight() {
        document.querySelector('.characters-list').classList.add('hidden');
        document.querySelector('.fight').classList.remove('hidden');

        let playerCard = document.createElement('div');
        playerCard.classList.add('player');
        playerCard.innerHTML = createCharacterDiv(game.playerUnit);
        document.querySelector('.battle-field').appendChild(playerCard);

        let computerCard = document.createElement('div');
        computerCard.classList.add(`computer`);
        computerCard.innerHTML = createCharacterDiv(game.computerUnit);
        document.querySelector('.battle-field').appendChild(computerCard);

        document.querySelector('.fight').onclick = () => game.fight();
    }

    log(str) { 
        let logRow = document.createElement('p');
        logRow.innerHTML = str;
        document.querySelector('.battle-field').appendChild(logRow); 
        document.querySelector('.computer .hp').innerHTML = `HP: ${game.computerUnit.hp}`;
        document.querySelector('.player .hp').innerHTML = `HP: ${game.playerUnit.hp}`;

    }
}

const display = new Display();
const game = new Game();

document.querySelector('.start').onclick = display.startGame;



function createCharacterDiv(character) {
    return `
            <img src="${character.url}" alt="">
            <p class="name"> Name: ${character.name}</p>
            <p class="mana"> Mana: ${character.mana}</p>
            <p class="hp">HP: ${character.hp}</p>
            <p class="intelligence">Intelligence: ${character.intelligence}</p>
            <p class="strenght">Strenght: ${character.strength}</p>
            <p class="armor">Armor: ${character.armor}</p>
            <p class="damage">Damage: ${character.damage}</p>
            `;
}