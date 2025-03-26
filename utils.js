const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const cardName = (name) =>
	name[0].toUpperCase() + name.slice(1, name.length).replace('-', ' ');

export { sleep, cardName };
