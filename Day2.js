fs = require('fs');
intcode = require('./intcode_computer.js');

fs.readFile('Day2.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let register = data.split(',').map(Number);

	console.log("P1:", intcode.compute(12, 2, register));

	for (let noun = 1; noun <= 99; noun++) {
		for (let verb = 1; verb <= 99; verb++) {
			let result = intcode.compute(noun, verb, register);
			if(result == 19690720) {
				console.log("P2:", 100*noun+verb);
			}
		}
	}
});
