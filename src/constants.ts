const MENU_CHOICES: { [key: string]: string } = {
	DRAW_CARD: 'Draw a card',
	SHOW_STATS: 'Show stats',
	VIEW_INVENTORY: 'View Inventory',
	EXIT_GAME: 'Exit Game',
};

const BACK = '< Back';

const INVENTORY_ACTIONS: { [key: string]: string } = {
	USE: 'Use',
	DROP: 'Drop',
};

enum CARD_TYPE {
	ENEMY,
	ITEM,
}

export { MENU_CHOICES, BACK, INVENTORY_ACTIONS, CARD_TYPE };
