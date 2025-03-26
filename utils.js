const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const beautifyName = (name) =>
	(name[0].toUpperCase() + name.slice(1, name.length)).replaceAll('-', ' ');

const uglifyName = (name) => name.toLowerCase().replaceAll(' ', '-');
export { sleep, beautifyName, uglifyName };
