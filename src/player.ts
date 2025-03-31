import chalk from 'chalk';
import Character from './character';
import { beautifyName, uglifyName } from './utils';
import { getCard } from './data';
import { ItemCard } from './card';

type Inventory = ItemCard[];

class Player extends Character {
	inventory: Inventory;

	constructor(name: string, inventory: Inventory) {
		super(name, 10, 2);
		this.inventory = inventory;
	}

	logInventory(): void {
		return console.log(this.inventory.join(', '));
	}

	removeItem(itemName: string): void {
		this.inventory = this.inventory.filter(
			(item) => item.name != uglifyName(itemName)
		);
		console.log(chalk.bgRed(`You lost ${itemName}`));
	}

	useItem(itemName: string): void {
		const item = getCard(itemName) as ItemCard;
		switch (itemName) {
			case 'health-potion':
				const additionalHp = item.hp!;
				this.hp += additionalHp;
				console.log(`You got 💗 ${additionalHp}! Now you have 💗 ${this.hp}`);
				break;
			case 'letter-from-mom':
				console.log('bla bla bla bla blab lab lab la');
				break;

			default:
				break;
		}

		if (item.oneTime) this.removeItem(itemName);
	}

	loot(itemName: string): void {
		const item = getCard(itemName) as ItemCard;

		this.inventory.push(item);
		const { att } = item;
		if (att) {
			this.att += att;
			console.log(`💪 increased by +${att}!`);
		}
		console.log(`${beautifyName(itemName)} added to Inventory`);
	}
}

export default Player;
