#!/usr/bin/env node
import inquirer from 'inquirer';
import Player from './Player.js';

const handleChoice = (choice) => {
	switch (choice) {
		case 'Exit Game':
			console.log('\nGoodbye!');
			process.exit();
			break;

		case 'Draw a card':
			break;

		case 'View Inventory':
			break;

		default:
			break;
	}
};

const showNextTurnMenu = async () => {
	const choice = await inquirer.prompt({
		type: 'list',
		name: 'action',
		message: 'Choose your next action:',
		choices: ['Draw a card', 'View Inventory', 'Exit Game'],
	});

	handleChoice(choice);
};

console.log('Game is starting!');

const { name } = await inquirer.prompt({
	type: 'input',
	name: 'name',
	message: "What's your name, adventurer?",
});

const player = new Player(name);

showNextTurnMenu();
