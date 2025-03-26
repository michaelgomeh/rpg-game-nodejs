#!/usr/bin/env node
import inquirer from 'inquirer';

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

console.log('Start Game!');

showNextTurnMenu();
