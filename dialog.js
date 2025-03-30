import inquirer from 'inquirer';
import { dialogs } from './data.js';
import readline from 'readline';
import { log } from 'console';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

class Dialog {
	constructor() {
		if (Dialog.instance) return Dialog.instance;
		Dialog.instance = this;
		this.dialogQueue = [];
	}

	async startDialog(dialogKey) {
		const dialog = dialogs[dialogKey];
		if (!dialog) {
			console.log('dialog not found!!!!');
			return;
		}

		this.dialogQueue = dialog;

		await inquirer.prompt(
			this.dialogQueue.map((e) => {
				const speaker = Object.keys(e)[0];
				const message = `${speaker}: ${e[speaker]}`;

				return Object({
					message: message,
					default: 'Press Enter to continue...',
					transformer: () => '',
					type: 'input',
				});
			})
		);
	}
}

const dialog = new Dialog();
export default dialog;
