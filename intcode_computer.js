module.exports = {
	compute: function intcode(noun, verb, register) {
		let myReg = [...register];

		let position = 0,
			instruction = myReg[0];
			myReg[1] = noun;
			myReg[2] = verb;

		let { opCode, modeA, modeB, modeC } = getModes(instruction);

		while(opCode != 99) {
			let storeLoc;
			let val1 = myReg[getValueFromMode(modeA, position + 1, register)],
				val2 = myReg[getValueFromMode(modeB, position + 2, register)],
				val3 = getValueFromMode(modeC, position + 3, register);

			switch(opCode) {
				case 1:
					let sum = val1 + val2;
					myReg[val3] = sum;
					break;
				case 2:
					let multiple = val1 * val2;
					myReg[val3] = multiple;
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

function getModes(instruction) {
	let opCode, modeA, modeB, modeC;

	stringIns = instruction.toString();
	if (stringIns.length === 1) {
		opCode = instruction;
		modeA = 0;
		modeB = 0;
		modeC = 0;
	}
	else {
		opCode = parseInt(stringIns[stringIns.length - 1] + stringIns[stringIns.length - 2]);
		modeC = stringIns.length >= 3 ? parseInt(stringIns[stringIns.length - 3]) : 0;
		modeB = stringIns.length >= 4 ? parseInt(stringIns[stringIns.length - 4]) : 0;
		modeA = modeB = stringIns.length === 5 ? parseInt(stringIns[0]) : 0;
	}

	return { opCode, modeA, modeB, modeC }
}

function getValueFromMode(mode, position, register) {
	switch(mode) {
		case 0:
			return register[position];
		case 1:
			return position;
	}
}

