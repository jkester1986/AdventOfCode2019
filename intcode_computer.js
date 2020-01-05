module.exports = {
	compute: function intcode(noun, verb, register) {
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
}

