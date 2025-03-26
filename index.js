#!/usr/bin/env node
import inquirer from 'inquirer';

console.log('Start Game!');

const choice = inquirer.prompt({
	type: 'list',
	name: 'action',
	message: 'Choose your next action:',
	choices: ['Draw a card', 'Explore the current room'],
});

console.log(choice);
