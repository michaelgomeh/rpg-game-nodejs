const itemStat = {
	sword: { att: 2, oneTime: false },
	'health-potion': { hp: 6, oneTime: true },
	'letter-from-mom': { oneTime: false },
};

const enemyStat = {
	'wild-wolf': { att: 3, hp: 6 },
	bandit: { att: 1, hp: 4 },
};

const cards = [
	{ type: 'item', name: 'health-potion' },
	{ type: 'enemy', name: 'wild-wolf' },
	{ type: 'item', name: 'sword' },
	{ type: 'enemy', name: 'bandit' },
];

const dialogs = {
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

const initialInventory = ['letter-from-mom'];

export { itemStat, enemyStat, cards, dialogs, initialInventory };
