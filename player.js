import { cardName } from './utils.js';
import { enemyStat, itemStat } from './data.js';

class Player {
	constructor(name) {
		this.name = name;
		this.hp = 10;
		this.att = 2;
		this.inventory = ['Letter from mom'];
		console.log(`welcome to Hell, ${name}`);
	}

	logStats() {
		console.log(`Mighty ${this.name} has ${hp} HP`);
	}

	logInventory() {
		console.log(
			`${this.name}'s inventory includes: ${this.inventory.join(', ')}`
		);
	}
	loot(itemName) {
		this.inventory.push(itemName);
		const { att } = itemStat[itemName];
		if (att) {
			this.att += att;
			console.log(`You got +${att} to your attack!`);
		}
		console.log(`${cardName(itemName)} added to Inventory`);
	}
}

export default Player;
