fs = require('fs');
fs.readFile('Day2.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let register = data.split(',').map(Number);
	
	function getOutput(noun, verb) {
		let myReg = [...register];

		let position = 0,
			opCode = myReg[0];
			myReg[1] = noun;
			myReg[2] = verb;

		while(opCode != 99) {
			let storeLoc;
	
			switch(opCode) {
				case 1:
					let sum = myReg[myReg[position + 1]] + myReg[myReg[position + 2]];
					storeLoc = myReg[position + 3];
					myReg[storeLoc] = sum;
					break;
				case 2:
					let multiple = myReg[myReg[position + 1]] * myReg[myReg[position + 2]];
					storeLoc = myReg[position + 3];
					myReg[storeLoc] = multiple;
					break;
				default:
					console.error("Something went wrong, myReg opcode is", opCode, "position is", position);
					process.exit();
					break;
			}
			position += 4;
			opCode = myReg[position];
		}

		return myReg[0];
	}

	console.log("P1:", getOutput(12,2));

	for (let noun = 1; noun <= 99; noun++) {
		for (let verb = 1; verb <= 99; verb++) {
			let result = getOutput(noun, verb);
			if(result == 19690720) {
				console.log("P2:", 100*noun+verb);
			}
		}
	}
});
