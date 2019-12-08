fs = require('fs');
fs.readFile('Day5.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let register = data.split(',').map(Number);

	function getOutput() {
		let myReg = [...register];

		let position = 0,
			opCode = myReg[0];

		while (opCode != 99) {
			let storeLoc;

			switch (opCode) {
				// sum values from positions noted in the inputs
				case 1:
					let sum = myReg[myReg[position + 1]] + myReg[myReg[position + 2]];
					storeLoc = myReg[position + 3];
					myReg[storeLoc] = sum;
					position += 4;
					break;
				// multiply values from positions noted in the inputs
				case 2:
					let multiple = myReg[myReg[position + 1]] * myReg[myReg[position + 2]];
					storeLoc = myReg[position + 3];
					myReg[storeLoc] = multiple;
					position += 4;
					break;
				// set value of position noted in input. Value = position
				case 3:
					let setVal = myReg[position +1];
					myReg[setVal] = setVal;
					position += 2;
					break;
				//log value at position deteremed by input
				case 4:
					process.stdout.write(myReg[myReg[position + 1]]);
					position += 2;
					break;
				default:
					console.error("Something went wrong, myReg opcode is", opCode, "position is", position);
					process.exit();
					break;
			}
			opCode = myReg[position];
		}

		return myReg[0];
	}
});
