import Character from './character.js';
import { enemyStat, dialogs } from './data.js';

class Enemy extends Character {
	constructor(name) {
		const { hp, att } = enemyStat[name];
		super(name, hp, att);
	}
}

export default Enemy;
