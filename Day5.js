fs = require('fs');
intcode = require('./intcode_computer.js');

fs.readFile('Day5.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let register = data.split(',').map(Number);

	console.log("P1:", intcode.compute(register[1], register[2], register));

});
