import { enemyStat, itemStat } from './data';
import chalk from 'chalk';
import Character from './character';
import { beautifyName, uglifyName } from './utils';

type ItemStat = {
	hp?: number;
	att?: number;
	oneTime?: boolean;
};

type Inventory = string[];

class Player extends Character {
	inventory: Inventory;

	constructor(name: string, inventory: Inventory) {
		super(name, 10, 2);
		this.inventory = inventory;
		console.log(`welcome to Hell, ${name}`);
	}

	logInventory(): void {
		return console.log(this.inventory.join(', '));
	}

	removeItem(itemName: string): void {
		this.inventory = this.inventory.filter(
			(item) => item != uglifyName(itemName)
		);
		console.log(chalk.bgRed(`You dropped ${itemName}`));
	}

	useItem(itemName: string): void {
		switch (itemName) {
			case 'health-potion':
				const additionalHp = itemStat[itemName].hp!;
				this.hp += additionalHp;
				console.log(`You got 💗 ${additionalHp}! Now you have 💗 ${this.hp}`);
				break;
			case 'letter-from-mom':
				console.log('bla bla bla bla blab lab lab la');
				break;

			default:
				break;
		}

		if (itemStat[itemName].oneTime) this.removeItem(itemName);
	}

	loot(itemName: string): void {
		this.inventory.push(itemName);
		const { att } = itemStat[itemName];
		if (att) {
			this.att += att;
			console.log(`💪 increased by +${att}!`);
		}
		console.log(`${beautifyName(itemName)} added to Inventory`);
	}
}

export default Player;
