import { beautifyName } from './utils.js';
import { enemyStat, itemStat } from './data.js';

class Player {
	constructor(name) {
		this.name = name;
		this.hp = 10;
		this.att = 2;
		this.inventory = ['letter-from-mom', 'y', 'z'];
		console.log(`welcome to Hell, ${name}`);
	}

	getDamage(amount) {
		const newHP = Math.max(this.hp - amount);
		this.hp = newHP;
	}

	logStats() {
		console.log(`Mighty ${this.name} has ${this.hp} HP, ${this.att} Attack`);
	}

	logInventory() {
		return;
		console.log(this.inventory.join(', '));
	}
	removeItem(itemName) {
		this.inventory = this.inventory.filter((e) => e != itemName);
	}
	useItem(itemName) {
		switch (itemName) {
			case 'health-potion':
				const additionalHp = itemStat[itemName].hp;
				this.hp += itemStat[itemName].hp;
				console.log(`You got ${additionalHp} HP! Now you have ${this.hp} HP`);
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
			console.log(`You got +${att} to your attack!`);
		}
		console.log(`${beautifyName(itemName)} added to Inventory`);
	}
}

export default Player;
