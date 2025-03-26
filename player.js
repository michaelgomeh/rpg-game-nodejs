class Player {
	constructor(name) {
		this.name = name;
		this.hp = 10;
		this.inventory = ['Letter from mom'];
		console.log(`welcome to Hell, ${name}`);
	}

	logStats() {
		console.log(`Mighty ${this.name} has ${hp} HP`);
	}

	logInventory() {
		console.log(`${this.name}'s inventory includes: ${inventory.join(', ')}`);
	}
}

export default Player;
