fs = require('fs');
fs.readFile('Day1.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let lines = data;
	lines = lines.split('\n');
	total = 0;

	lines.forEach(line => {
		mass = parseInt(line);
		fuel = requiredFuel(mass);
		while (fuel != 0) {
			total += fuel;
			fuel = requiredFuel(fuel);
		}
	}); x

	console.log(total);
});

function requiredFuel(mass) {
	fuel = Math.floor(mass / 3) - 2;
	if (fuel <= 0) return 0;
	return fuel;
}