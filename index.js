#!/usr/bin/env node

import inquirer from 'inquirer';
import Player from './Player.js';
import { Card, Deck } from './card.js';
import { sleep, beautifyName, uglifyName } from './utils.js';
import { enemyStat, itemStat } from './data.js';
import chalk from 'chalk';

const logTitle = (txt) => console.log(chalk.bgBlue(txt));

logTitle('Game is starting!');

const { name } = await inquirer.prompt({
	type: 'input',
	default: 'Mike',
	name: 'name',
	message: "What's your name, adventurer?",
});

const player = new Player(name);
const deck = new Deck();

const cardEventTitleGenerator = (card) => {
	const { name, type } = card;
	switch (type) {
		case 'item':
			return `You found a ${beautifyName(name)} with ${JSON.stringify(
				itemStat[name]
			)}!`;
		case 'enemy':
			const { att, hp } = enemyStat[name];
			return `You faced a 💗 ${hp}  💪 ${att}  ${beautifyName(name)}!`;
		default:
			break;
	}
};

const battle = async (enemyName) => {
	console.log(`A battle begins! ${player.name} vs ${enemyName} `);
	const enemy = enemyStat[enemyName];

	while (player.hp > 0 && enemy.hp > 0) {
		await sleep(300);

		enemy.hp -= player.att;
		player.getDamage(enemy.att);
		console.log(
			`${enemyName}: 💗 ${Math.max(enemy.hp, 0)} vs ${player.name}: 💗 ${
				player.hp
			}.`
		);
	}

	await sleep(1000);

	if (player.hp <= 0) {
		console.log('Youre dead');
		await sleep(1000);

		process.exit();
	} else {
		console.log('You won!');
		await sleep(1000);

		showNextTurnMenu();
	}
};

const lootItem = async (itemName) => {
	player.loot(itemName);
	await sleep(200);
	showNextTurnMenu();
};

const handleUseItem = async () => {
	const { item } = await inquirer.prompt({
		type: 'list',
		name: 'item',
		message: 'Choose item to consume:',
		choices: player.inventory,
	});
	console.log(`Using ${item}...`);
	await sleep(500);
	player.useItem(item);
	showNextTurnMenu();
};

const handleDrawCard = async () => {
	const card = deck.drawNextCard();

	const { name, type } = card;

	console.log(cardEventTitleGenerator(card));

	await sleep(1000);

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

const handleViewInventory = async () => {
	logTitle('Inventory:');
	const { selectedItem } = await inquirer.prompt({
		type: 'list',
		name: 'selectedItem',
		message: 'Choose item from inventory',
		choices: ['< Back', ...player.inventory.map((e) => beautifyName(e))],
	});

	if (selectedItem === '< Back') showNextTurnMenu();
	else {
		await sleep(400);
		const { action } = await inquirer.prompt({
			type: 'list',
			name: 'action',
			message: `What would you like to do with ${selectedItem.toUpperCase()}?`,
			choices: ['< Back', 'Use', 'Drop'],
		});
		await sleep(500);
		switch (action) {
			case 'Use':
				player.useItem(uglifyName(selectedItem));
				break;
			case 'Drop':
				break;

			case '< Back':
				break;

			default:
		}
		await sleep(500);
		handleViewInventory();
	}
};

const handleViewStats = async () => {
	player.logStats();
	await sleep(2000);
	showNextTurnMenu();
};

const handleChoice = (choice) => {
	switch (choice) {
		case 'Exit Game':
			console.log('Goodbye!');
			process.exit();

		case 'Draw a card':
			handleDrawCard();
			break;

		case 'View Inventory':
			handleViewInventory();
			break;

		case 'Show stats':
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
		choices: [
			'Draw a card',
			'Show stats',
			'View Inventory',
			'Use Item',
			'Exit Game',
		],
	});

	handleChoice(choice);
};

showNextTurnMenu();
