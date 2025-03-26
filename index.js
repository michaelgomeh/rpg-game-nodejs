#!/usr/bin/env node

import inquirer from 'inquirer';
import Player from './Player.js';
import { Card, Deck } from './card.js';
import { sleep, cardName } from './utils.js';
import { enemyStat, itemStat } from './data.js';

console.log('Game is starting!');

const { name } = await inquirer.prompt({
	type: 'input',
	default: 'Mike',
	name: 'name',
	message: "What's your name, adventurer?",
});

const player = new Player(name);
const deck = new Deck();

const cardEventTitleGenerator = (type, name) => {
	switch (type) {
		case 'item':
			return `You found a ${cardName(name)}!`;
		case 'enemy':
			return `You faced a ${cardName(name)}!`;
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
		player.hp -= enemy.att;
		console.log(
			`${enemyName}: ${Math.max(enemy.hp, 0)} HP vs ${player.name}: ${Math.max(
				player.hp
			)} HP.`
		);
	}

	await sleep(1000);

	if (player.hp <= 0) {
		console.log('Youre dead');
		await sleep(1000);

		process.exit();
	} else {
		console.log('you won!');
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
	console.log(cardEventTitleGenerator(type, name));

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

const handleChoice = (choice) => {
	switch (choice) {
		case 'Exit Game':
			console.log('\nGoodbye!');
			process.exit();

		case 'Draw a card':
			handleDrawCard();
			break;

		case 'View Inventory':
			console.log(player.logInventory());
			showNextTurnMenu();
			break;

		case 'Log stats':
			console.log(player.logStats);
			showNextTurnMenu();
			break;

		default:
			break;
	}
};

const showNextTurnMenu = async () => {
	const { choice } = await inquirer.prompt({
		type: 'list',
		name: 'choice',
		message: 'Choose your next action:',
		choices: ['Draw a card', 'View Inventory', 'Exit Game'],
	});

	handleChoice(choice);
};

showNextTurnMenu();
