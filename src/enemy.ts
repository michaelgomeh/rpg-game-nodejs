import { EnemyCard } from './card';
import Character from './character';
import { dialogs, getCard } from './data';

class Enemy extends Character {
	constructor({ name, hp, att }: EnemyCard) {
		super(name, hp, att);
	}
}

export default Enemy;
