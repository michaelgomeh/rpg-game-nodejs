#!/usr/bin/env node

import inquirer from 'inquirer';
import { Card, Deck, EnemyCard, ItemCard } from './card';
import { sleep, beautifyName, uglifyName, logTitle } from './utils';
import { dialogs, getCard, initialInventory } from './data';
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
import { CardName } from './types/types';

let player: Player;

class Game {
	deck: Deck;

	constructor() {
		this.deck = new Deck();
	}

	async init() {
		logTitle('Game is starting!');
		console.log(`
			
   
 88888888b          dP       dP          
 88                 88       88          
a88aaaa    .d8888b. 88d888b. 88 .d8888b. 
 88        88'  '88 88'  '88 88 88ooood8 
 88        88.  .88 88.  .88 88 88.  ... 
 dP        '88888P8 88Y8888' dP '88888P' 
                                         
                                         
             
			 `);
		const { playerName } = await inquirer.prompt({
			type: 'input',
			default: 'Mike',
			name: 'playerName',
			message: "What's your name, adventurer?",
		});
		const { className } = await inquirer.prompt({
			type: 'list',
			name: 'className',
			message: 'Choose your class:',
			choices: ['Warrior', 'Mage', 'Rogue'],
		});
		player = new Player(playerName, className);
		dialog.playerName = playerName;
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

	cardEventTitleGenerator(card: Card) {
		const { name, type } = card;

		switch (type) {
			case CARD_TYPE.ITEM:
				const { att: itemAtt, hp: itemHp } = card as ItemCard;

				return `You found a ${beautifyName(name)}${
					itemAtt || itemHp ? ' with' : ''
				} ${itemAtt ? `💪 ${itemAtt}` : ''} ${itemHp ? `💗 ${itemHp}` : ''}`;

			case CARD_TYPE.ENEMY:
				const { att: enemyAtt, hp: enemyHp } = card as EnemyCard;
				return `You faced a 💗 ${enemyHp}  💪 ${enemyAtt}  ${beautifyName(
					name
				)}!`;

			default:
				break;
		}
	}

	async battle(enemyCard: EnemyCard) {
		const enemy = new Enemy(enemyCard);
		console.log(`A battle begins! ${player.name} vs ${enemy.name} `);

		while (player.hp > 0 && enemy.hp > 0) {
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
					enemy.getDamage(player.att);
					break;

				case BATTLE_ACTIONS.USE_ITEM:
					const { selectedItem } = await inquirer.prompt([
						{
							message: 'Choose Item',
							name: 'selectedItem',
							type: 'list',
							choices: player.inventory.map((e) => e.name),
						},
					]);
					player.useItem(selectedItem);
					break;

				case BATTLE_ACTIONS.SPECIAL_ATTACK:
					switch (player.class) {
						case 'Warrior':
							console.log('DoubleAttack');
							enemy.getDamage(player.att);
							await sleep(300);
							enemy.getDamage(player.att);
							break;

						case 'Mage':
							console.log('Fireball! 🔥');
							enemy.getDamage(Math.floor(Math.random() * 4 * player.att));
							break;

						case 'Rogue':
							console.log('Stealing');
							if (Math.random() > 0.5) player.loot('health-potion');
						default:
							break;
					}
					break;

				case BATTLE_ACTIONS.RUN_AWAY:
					if (Math.random() > 1 - player.runAwayChance) {
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

			player.getDamage(enemy.att);
			console.log(
				`${enemy.name}: 💗 ${enemy.hp} vs ${player.name}: 💗 ${player.hp}.`
			);
		}

		await sleep(1000);

		if (player.hp <= 0) {
			console.log(chalk.bgRed('You are dead 💀. Game Over. '));
			await sleep(1000);

			process.exit();
		} else {
			console.log(chalk.bgGreen('You won the battle!'));
			await sleep(1000);

			this.showNextTurnMenu();
		}
	}

	lootItem = async (itemName: CardName) => {
		player.loot(itemName);
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
				this.battle(card as EnemyCard);
				break;

			case CARD_TYPE.ITEM:
				this.lootItem(name);
				break;

			case CARD_TYPE.LOCATION:
				player.location = card.name;
				console.log(chalk.blue(`New Location: ${card.name}`));
				this.showNextTurnMenu();
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
				player.useItem(uglifyName(selectedItem) as CardName);
				break;
			case INVENTORY_ACTIONS.DROP:
				player.removeItem(selectedItem);
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
			choices: [BACK, ...player.inventory.map((e) => beautifyName(e.name))],
		});

		if (selectedItem === BACK) this.showNextTurnMenu();
		else this.showItemMenu(selectedItem);
	};

	handleViewStats = async () => {
		player.logStats();
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
