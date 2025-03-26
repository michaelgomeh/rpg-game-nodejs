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
		console.log(`Mighty ${this.name} has ${this.hp} HP`);
	}

	logInventory() {
		console.log(this.inventory.join(', '));
	}
	useItem(itemName) {
		switch (itemName) {
			case 'health-potion':
				const additionalHp = itemStat[itemName].hp;
				this.hp += itemStat[itemName].hp;
				console.log(`You got ${additionalHp} HP! Now you have ${this.hp} HP`);
				break;

			default:
				break;
		}
		console.log(`Used item ${itemName}`);
		const index = this.inventory.indexOf(itemName);
		this.inventory = this.inventory.splice(index, 1);
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
