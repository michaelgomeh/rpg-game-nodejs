class Card {
	constructor(type, name) {
		this.type = type;
		this.name = name;
	}
}

class Deck {
	constructor() {
		this.cards = [
			new Card('item', 'Health potion'),
			new Card('enemy', 'Wild wolf'),
			new Card('item', 'Sword'),
			new Card('enemy', 'Bandit'),
		];
	}

	drawNextCard() {
		return this.cards.pop();
	}
}

export { Card, Deck };
