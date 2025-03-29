import { beautifyName } from './utils.js';
import { enemyStat, itemStat } from './data.js';
import Character from './character.js';

class Player extends Character {
	constructor(name) {
		super(name, 10, 2);
		this.inventory = ['letter-from-mom', 'y', 'z'];
		console.log(`welcome to Hell, ${name}`);
	}

	logInventory() {
		return console.log(this.inventory.join(', '));
	}

	removeItem(itemName) {
		this.inventory = this.inventory.filter((item) => item != itemName);
	}

	useItem(itemName) {
		switch (itemName) {
			case 'health-potion':
				const additionalHp = itemStat[itemName].hp;
				this.hp += itemStat[itemName].hp;
				console.log(`You got 💗 ${additionalHp}! Now you have 💗 ${this.hp}`);
				break;
			case 'letter-from-mom':
				console.log('bla bla bla bla blab lab lab la');
				break;

			default:
				break;
		}

		if (itemStat[itemName].oneTime) removeItem(itemName);
	}
	loot(itemName) {
		this.inventory.push(itemName);
		const { att } = itemStat[itemName];
		if (att) {
			this.att += att;
			console.log(`Attack increased by +${att}!`);
		}
		console.log(`${beautifyName(itemName)} added to Inventory`);
	}
}

export default Player;
