import inquirer from 'inquirer';
import { dialogs } from './data';
import player from './player';
import { DialogSentence } from './types/types';

class Dialog {
	static instance: Dialog | null = null;
	dialogQueue: DialogSentence[] = [];

	constructor() {
		if (Dialog.instance) return Dialog.instance;
		Dialog.instance = this;
		this.dialogQueue = [];
	}

	async startDialog(dialogKey: string): Promise<void> {
		const dialog = dialogs[dialogKey];
		if (!dialog) {
			console.log('dialog not found!!!!');
			return;
		}

		this.dialogQueue = dialog;

		const sentences = this.dialogQueue.map((e) => {
			const speaker = e[0] === '$player' ? player.name : e[0];

			const message = `${speaker}: ${e[1]}`;

			return Object({
				message: message,
				default: 'Press Enter to continue...',
				transformer: () => '',
				type: 'input',
			});
		});

		await inquirer.prompt(sentences);
	}
}

const dialog = new Dialog();
export default dialog;
