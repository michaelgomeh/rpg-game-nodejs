class Card {
	constructor(type, name) {
		this.type = type;
		this.name = name;
	}
}

class Deck {
	constructor() {
		this.cards = [
			new Card('item', 'health-potion'),
			new Card('enemy', 'wild-wolf'),
			new Card('item', 'sword'),
			new Card('enemy', 'bandit'),
		];
	}

	drawNextCard() {
		return this.cards.pop();
	}
}

export { Card, Deck };
