import { CARD_TYPE } from './constants';

interface ItemStat {
	att?: number;
	hp?: number;
	oneTime: boolean;
}

interface EnemyStat {
	att: number;
	hp: number;
}

interface Card {
	type: CARD_TYPE;
	name: string;
}

interface Dialog {
	[key: string]: Sentence[];
}

interface Sentence {
	[key: string]: string;
}

const itemStat: { [key: string]: ItemStat } = {
	sword: { att: 2, oneTime: false },
	'health-potion': { hp: 6, oneTime: true },
	'letter-from-mom': { oneTime: false },
};

const enemyStat: { [key: string]: EnemyStat } = {
	'wild-wolf': { att: 3, hp: 6 },
	bandit: { att: 1, hp: 4 },
};

const cards: Card[] = [
	{ type: CARD_TYPE.ITEM, name: 'health-potion' },
	{ type: CARD_TYPE.ENEMY, name: 'wild-wolf' },
	{ type: CARD_TYPE.ITEM, name: 'sword' },
	{ type: CARD_TYPE.ENEMY, name: 'bandit' },
];

const dialogs: Dialog = {
	mariaEncounter: [
		{ alucard: 'I’ve been waiting for you, Maria.' },
		{ maria: 'Alucard! You came for me... but why now?' },
		{ alucard: 'There is no time for explanations... we must act quickly.' },
		{ maria: 'I understand... let’s go!' },
	],
	bandit: [
		{ enemy: 'You dare challenge me?' },
		{ player: 'I have no choice, prepare to fight!' },
		{ enemy: 'Foolish mortal! You will regret this!' },
	],
};

const initialInventory: string[] = ['letter-from-mom', 'health-potion'];

export { itemStat, enemyStat, cards, dialogs, initialInventory };
