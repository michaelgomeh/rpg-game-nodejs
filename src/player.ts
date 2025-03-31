import chalk from 'chalk';
import Character from './character';
import { beautifyName, uglifyName } from './utils';
import { getCard } from './data';
import { ItemCard } from './card';
import { CardName } from './types/types';

type Inventory = ItemCard[];

class Player extends Character {
	inventory: Inventory = [];

	constructor(name: string) {
		super(name, 10, 2);
	}

	setName(name: string) {
		this.name = name;
		console.log(`welcome to Hell, ${name}`);
	}

	initInventory(items: ItemCard[]) {
		this.inventory = items;
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

	useItem(itemName: CardName): void {
		const item = getCard(itemName) as ItemCard;
		switch (itemName) {
			case 'health-potion':
				const additionalHp = item.hp!;
				this.hp += additionalHp;
				console.log(`You got 💗 ${additionalHp}! Now you have 💗 ${this.hp}`);
				break;
			case 'letter-from-mom':
				console.log(
					'A heartfelt letter sent by your mother, filled with love and encouragement. It serves as a reminder of home, and her words offer comfort and strength in your journey.'
				);
				break;

			default:
				break;
		}

		if (item.oneTime) this.removeItem(itemName);
	}

	loot(itemName: CardName): void {
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

const player = new Player('temp');

export default player;
