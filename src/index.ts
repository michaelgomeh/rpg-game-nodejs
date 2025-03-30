#!/usr/bin/env node

import inquirer from 'inquirer';
import { Card, Deck } from './card';
import { sleep, beautifyName, uglifyName, logTitle } from './utils';
import { enemyStat, itemStat, dialogs, initialInventory } from './data';
import Enemy from './enemy';
import dialog from './dialog';
import {
	BACK,
	BATTLE_ACTIONS,
	CARD_TYPE,
	INVENTORY_ACTIONS,
	MENU_CHOICES,
} from './constants';
import chalk from 'chalk';
import Player from './player';

class Game {
	player: Player;
	deck: Deck;

	constructor() {
		this.player = new Player('temp', []);
		this.deck = new Deck();
	}

	async getUserName(): Promise<string> {
		const { name } = await inquirer.prompt({
			type: 'input',
			default: 'Mike',
			name: 'name',
			message: "What's your name, adventurer?",
		});
		return name;
	}

	async init() {
		logTitle('Game is starting!');
		console.log(`
			.d8888b.  888      8888888       .d8888b.                                  
			d88P  Y88b 888        888        d88P  Y88b                                 
			888    888 888        888        888    888                                 
			888        888        888        888         8888b.  88888b.d88b.   .d88b.  
			888        888        888        888  88888     "88b 888 "888 "88b d8P  Y8b 
			888    888 888        888        888    888 .d888888 888  888  888 88888888 
			Y88b  d88P 888        888        Y88b  d88P 888  888 888  888  888 Y8b.     
			 "Y8888P"  88888888 8888888       "Y8888P88 "Y888888 888  888  888  "Y8888
			 
			 
			 `);
		const playerName = await this.getUserName();
		this.player = new Player(playerName, initialInventory);
		this.showNextTurnMenu();
	}

	async showNextTurnMenu() {
		if (this.deck.cards.length === 0) {
			console.log('Game Ended!');
			process.exit();
		}

		const { choice } = await inquirer.prompt({
			type: 'list',
			name: 'choice',
			message: 'Choose your next action:',
			choices: Object.values(MENU_CHOICES),
		});

		this.handleChoice(choice);
	}

	cardEventTitleGenerator(card: { name: string; type: CARD_TYPE }) {
		const { name, type } = card;
		switch (type) {
			case CARD_TYPE.ITEM:
				const { att: itemAtt, hp: itemHp } = itemStat[name];

				return `You found a ${beautifyName(name)} with ${
					itemAtt ? `💪 ${itemAtt}` : ''
				} ${itemHp ? `💗 ${itemHp}` : ''}`;
			case CARD_TYPE.ENEMY:
				const { att: enemyAtt, hp: enemyHp } = enemyStat[name];
				return `You faced a 💗 ${enemyHp}  💪 ${enemyAtt}  ${beautifyName(
					name
				)}!`;
			default:
				break;
		}
	}

	async battle(enemyName: string) {
		console.log(`A battle begins! ${this.player.name} vs ${enemyName} `);
		const enemy = new Enemy(enemyName);

		while (this.player.hp > 0 && enemy.hp > 0) {
			await sleep(300);

			const { action } = await inquirer.prompt([
				{
					message: 'Choose action',
					type: 'list',
					name: 'action',
					choices: Object.values(BATTLE_ACTIONS),
				},
			]);

			switch (action) {
				case BATTLE_ACTIONS.ATTACK:
					enemy.getDamage(this.player.att);
					break;

				case BATTLE_ACTIONS.USE_ITEM:
					const { selectedItem } = await inquirer.prompt([
						{
							message: 'Choose Item',
							name: 'selectedItem',
							type: 'list',
							choices: this.player.inventory,
						},
					]);
					this.player.useItem(selectedItem);
					break;

				case BATTLE_ACTIONS.RUN_AWAY:
					if (Math.random() > 0.5) {
						console.log('You ran away successfully!');
						this.showNextTurnMenu();
						return;
					} else {
						console.log('You failed! the battle continues!');
					}
					break;

				default:
					break;
			}

			await sleep(1000);

			this.player.getDamage(enemy.att);
			console.log(
				`${enemyName}: 💗 ${enemy.hp} vs ${this.player.name}: 💗 ${this.player.hp}.`
			);
		}

		await sleep(1000);

		if (this.player.hp <= 0) {
			console.log(chalk.bgRed('You are dead 💀. Game Over. '));
			await sleep(1000);

			process.exit();
		} else {
			console.log(chalk.bgGreen('You won the battle!'));
			await sleep(1000);

			this.showNextTurnMenu();
		}
	}

	lootItem = async (itemName: string) => {
		this.player.loot(itemName);
		await sleep(200);
		this.showNextTurnMenu();
	};

	async handleDrawCard() {
		const card = this.deck.drawNextCard() as Card;

		const { name, type } = card;

		console.log(this.cardEventTitleGenerator(card));

		await sleep(1000);

		if (dialogs[name]) await dialog.startDialog(name);

		switch (type) {
			case CARD_TYPE.ENEMY:
				this.battle(name);
				break;

			case CARD_TYPE.ITEM:
				this.lootItem(name);
				break;

			default:
				break;
		}
	}

	showItemMenu = async (selectedItem: string) => {
		await sleep(400);
		const { action } = await inquirer.prompt({
			type: 'list',
			name: 'action',
			message: `What would you like to do with ${selectedItem.toUpperCase()}?`,
			choices: [BACK, ...Object.values(INVENTORY_ACTIONS)],
		});
		await sleep(500);
		switch (action) {
			case INVENTORY_ACTIONS.USE:
				this.player.useItem(uglifyName(selectedItem));
				break;
			case INVENTORY_ACTIONS.DROP:
				this.player.removeItem(selectedItem);
				break;

			case BACK:
				break;

			default:
		}
		await sleep(500);
		this.handleViewInventory();
	};

	handleViewInventory = async () => {
		logTitle('Inventory:');
		const { selectedItem } = await inquirer.prompt({
			type: 'list',
			name: 'selectedItem',
			message: 'Choose item from inventory',
			choices: [BACK, ...this.player.inventory.map((e) => beautifyName(e))],
		});

		if (selectedItem === BACK) this.showNextTurnMenu();
		else this.showItemMenu(selectedItem);
	};

	handleViewStats = async () => {
		this.player.logStats();
		await sleep(2000);
		this.showNextTurnMenu();
	};

	handleChoice = (choice: string) => {
		switch (choice) {
			case MENU_CHOICES.EXIT_GAME:
				console.log('Goodbye!');
				process.exit();

			case MENU_CHOICES.DRAW_CARD:
				this.handleDrawCard();
				break;

			case MENU_CHOICES.VIEW_INVENTORY:
				this.handleViewInventory();
				break;

			case MENU_CHOICES.SHOW_STATS:
				this.handleViewStats();
				break;

			default:
				break;
		}
	};

	exitGame = () => {
		console.log('\nGoodbye!');
		process.exit();
	};
}

process.on('SIGINT', () => {
	console.log('\nGoodbye!');
	process.exit();
});

const game = new Game();
game.init();
