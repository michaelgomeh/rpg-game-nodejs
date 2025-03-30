class Character {
	constructor(name, hp, att) {
		this.name = name;
		this.hp = hp;
		this.att = att;
	}

	getDamage(amount) {
		const newHP = Math.max(this.hp - amount, 0);
		this.hp = newHP;
	}

	logStats() {
		console.log(`${this.name} - 💗 ${this.hp}, 💪 ${this.att}`);
	}
}

export default Character;
