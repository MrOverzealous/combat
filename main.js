
 class Hero {
    constructor(name, yieldMulti, stats, skills) {
        this.name = name;
        this.yieldMult = yieldMulti;
        this.stats = stats;
        this.skills = skills;
        this.level = 0;
        this.type = 'hero';
    }

    assign() {

    };
    unassign() {

    };
    fight() {

    };
    loot() {
        
    };
}

const player = new Hero(
    'Player',
    1,
    {
        hp: 10,
        atk: 1,
        mag: 1,
        spd: 1,
        def: 1,
        res: 1,
    },
    [
        {
            name: 'warrior',
            level: 0,
            exp: 0,
            points: 0,
            dmgMulti: 1,
            abilities: [
                {
                    name: 'Slash',
                    desc: 'A basic physical attack',
                    count: 0,
                    dmg: 5,
                    cost: 0
                },
                {
                    name: 'Fierce Slash',
                    desc: 'A medium physical attack',
                    count: 0,
                    baseDmg: 10,
                    cost: 3
                },
            ]
        },
        {
            name: 'mage',
            level: 0,
            exp: 0,
            points: 0,
            dmgMulti: 1,
            abilities: [
                {
                    name: 'Bolt',
                    desc: 'A basic magical attack',
                    count: 0,
                    dmg: 6,
                    cost: 0
                },
                {
                    name: 'Fireball',
                    desc: 'A medium physical attack',
                    count: 0,
                    baseDmg: 14,
                    cost: 5
                },
            ]
        },
    ]
)
const herotwo = new Hero(
    'Herotwo', 
    1, 
    {
        hp: 10,
        atk: 1,
        mag: 1,
        spd: 1,
        def: 1,
        res: 1,
    },
    [
        {
            name: 'warrior',
            level: 0,
            exp: 0,
            points: 0,
            dmgMulti: 1,
            abilities: [
                {
                    name: 'Slash',
                    desc: 'A basic physical attack',
                    count: 0,
                    dmg: 5,
                    cost: 0
                },
                {
                    name: 'Fierce Slash',
                    desc: 'A medium physical attack',
                    count: 0,
                    baseDmg: 10,
                    cost: 3
                },
            ]
        }
    ]
);
const heroes = [player, herotwo];
const textNums = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const teams = [];

function newTeam() {
    const container = document.querySelector('#team-buttons');
    if (container.children.length >= 11) {
        alert('Maximum number of teams reached!');
        return;
    }

    const index = container.children.length - 1; // Get team index
    const button = document.createElement('button');
    const number = textNums[index] || 'Invalid Number';
    button.setAttribute('id', `team-${number.toLowerCase()}`);
    button.dataset.index = index;
    button.innerText = `Team ${number}`;
    container.append(button);

    // Add a new team to the array
    teams.push({
        one: player,
        two: undefined,
        three: undefined,
        four: undefined,
    });

    button.addEventListener('click', () => {
        const team = teams[index];
        const prevSelected = document.querySelector('#team-buttons .selected');
        if (prevSelected !== null) {
            prevSelected.classList.remove('selected');
        }
        button.classList.add('selected');
        displayTeam(team);
    });
}

function displayTeam(team) {
    Object.keys(team).forEach((key, index) => {
        const sectionId = `member-${textNums[index].toLowerCase()}`;
        const container = document.querySelector(`#member-${key} .hero-assignment-buttons`);
        document.querySelectorAll(`#${sectionId} .hero-datapoint`).forEach(ele => {
            ele.innerText = '';
        });
        if (heroes.length !== container.childNodes.length) {
            handleHeroButtons(container);
        }
        if (team[key]) {
            displayHeroData(team[key], sectionId);
            container.classList.add('hidden');
        } 
        else {

            container.classList.remove('hidden'); // reveals button div
        }
    });
}
function displayHeroData(hero, sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    const name = section.querySelector(`#${sectionId}-name`);
    const level = section.querySelector(`#${sectionId}-level`);
    const stats = section.querySelector(`#${sectionId}-stats`);

    name.innerText = hero.name;
    name.setAttribute('data-name', hero.name);
    level.innerText = `Lvl: ${hero.level}`;
    stats.innerText = '';

    for (const [key, value] of Object.entries(hero.stats)) {
        const item = document.createElement('li');
        item.innerText = `${key.toUpperCase()}: ${value}`;
        stats.appendChild(item);
    }
}

function handleHeroButtons(container) {

    container.innerText = '';
    for (let i = 0; i < heroes.length; i++) {
        const button = document.createElement('button');
        button.innerText = heroes[i].name;
        button.classList.add('hero');
        button.setAttribute('data-name', heroes[i].name)
        button.addEventListener('click', (event) => {
            let hero;
            const name = event.target.dataset.name;
            const section = event.target.parentElement.parentElement;
            const check = document.querySelector(`p[data-name=${name}]`); // check if the data already exists on-screen

            for (let i = 0; i < heroes.length; i++) {
                if (heroes[i].name === name) {
                    hero = heroes[i];
                    break;
                }
            }
            if (check !== null) {
                check.removeAttribute('data-name');
                const prevSection = check.parentElement;
                prevSection.querySelectorAll('.hero-datapoint').forEach(ele => {
                    ele.innerText = '';
                })
                prevSection.querySelector('.hero-assignment-buttons').classList.remove('hidden');
            }
            const index = parseInt(document.querySelector('.selected[data-index]').dataset.index)
            const team = teams[index];
            const position = section.id.split('-')[1];
            team[position] = hero;
            displayHeroData(hero, section.id)
            container.classList.add('hidden');
        });
        container.appendChild(button);
    }
}


function updateScreen() {

}

document.querySelector('#explore').addEventListener('click', () => {
    document.querySelector('#explore-modal').showModal();
    if (teams.length > 0) {

    }
});

function closeModal(id) {
    const modal = document.querySelector(id);
    modal.close();
}

window.setInterval(function() {
    updateScreen();
}, 1000)

