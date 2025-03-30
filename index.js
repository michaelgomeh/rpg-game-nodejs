#!/usr/bin/env node

import inquirer from 'inquirer';
import Player from './Player.js';
import { Card, Deck } from './card.js';
import { sleep, beautifyName, uglifyName, logTitle } from './utils.js';
import { enemyStat, itemStat, dialogs, initialInventory } from './data.js';
import Enemy from './enemy.js';
import dialog from './dialog.js';
import { BACK, INVENTORY_ACTIONS, MENU_CHOICES } from './constants.js';
import chalk from 'chalk';

process.on('SIGINT', () => {
	console.log('\nGoodbye!');
	process.exit();
});

logTitle('Game is starting!');

const { name } = await inquirer.prompt({
	type: 'input',
	default: 'Mike',
	name: 'name',
	message: "What's your name, adventurer?",
});

const player = new Player(name, initialInventory);
const deck = new Deck();

const cardEventTitleGenerator = (card) => {
	const { name, type } = card;
	switch (type) {
		case 'item':
			const { att: itemAtt, hp: itemHp } = itemStat[name];

			return `You found a ${beautifyName(name)} with ${
				itemAtt ? `💪 ${itemAtt}` : ''
			} ${itemHp ? `💗 ${itemHp}` : ''}`;
		case 'enemy':
			const { att: enemyAtt, hp: enemyHp } = enemyStat[name];
			return `You faced a 💗 ${enemyHp}  💪 ${enemyAtt}  ${beautifyName(
				name
			)}!`;
		default:
			break;
	}
};

const battle = async (enemyName) => {
	console.log(`A battle begins! ${player.name} vs ${enemyName} `);
	const enemy = new Enemy(enemyName);

	while (player.hp > 0 && enemy.hp > 0) {
		await sleep(300);

		enemy.getDamage(player.att);
		player.getDamage(enemy.att);
		console.log(
			`${enemyName}: 💗 ${enemy.hp} vs ${player.name}: 💗 ${player.hp}.`
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

		showNextTurnMenu();
	}
};

const lootItem = async (itemName) => {
	player.loot(itemName);
	await sleep(200);
	showNextTurnMenu();
};

const handleDrawCard = async () => {
	const card = deck.drawNextCard();

	const { name, type } = card;

	console.log(cardEventTitleGenerator(card));

	await sleep(1000);

	if (dialogs[name]) await dialog.startDialog(name);

	switch (type) {
		case 'enemy':
			battle(name);
			break;

		case 'item':
			lootItem(name);
			break;

		default:
			break;
	}
};

const showItemMenu = async (selectedItem) => {
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
			player.useItem(uglifyName(selectedItem));
			break;
		case INVENTORY_ACTIONS.DROP:
			player.removeItem(selectedItem);
			break;

		case BACK:
			break;

		default:
	}
	await sleep(500);
	handleViewInventory();
};

const handleViewInventory = async () => {
	logTitle('Inventory:');
	const { selectedItem } = await inquirer.prompt({
		type: 'list',
		name: 'selectedItem',
		message: 'Choose item from inventory',
		choices: [BACK, ...player.inventory.map((e) => beautifyName(e))],
	});

	if (selectedItem === BACK) showNextTurnMenu();
	else showItemMenu(selectedItem);
};

const handleViewStats = async () => {
	player.logStats();
	await sleep(2000);
	showNextTurnMenu();
};

const handleChoice = (choice) => {
	switch (choice) {
		case MENU_CHOICES.EXIT_GAME:
			console.log('Goodbye!');
			process.exit();

		case MENU_CHOICES.DRAW_CARD:
			handleDrawCard();
			break;

		case MENU_CHOICES.VIEW_INVENTORY:
			handleViewInventory();
			break;

		case MENU_CHOICES.SHOW_STATS:
			handleViewStats();
			break;

		default:
			break;
	}
};

const showNextTurnMenu = async () => {
	if (deck.cards.length === 0) {
		console.log('Game Ended!');
		process.exit();
	}

	const { choice } = await inquirer.prompt({
		type: 'list',
		name: 'choice',
		message: 'Choose your next action:',
		choices: Object.values(MENU_CHOICES),
	});

	handleChoice(choice);
};

showNextTurnMenu();
