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
	{ type: 'item', name: 'nothing' },
	{ type: 'item', name: 'health-po,tion' },
	{ type: 'enemy', name: 'wild-wol,f' },
	{ type: 'item', name: 'sword' },
	{ type: 'enemy', name: 'bandit' },
];

export { itemStat, enemyStat, cards };
