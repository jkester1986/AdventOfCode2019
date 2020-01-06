module.exports = {
	compute: function intcode(noun, verb, register, input) {
		let myReg = [...register];

		let position = 0,
			instruction = myReg[0];
			myReg[1] = noun;
			myReg[2] = verb;

		let { opCode, modeA, modeB, modeC } = getModes(instruction);

		while(opCode != 99) {
			let storeLoc;
			let param1 = getValueFromMode(modeC, position + 1, myReg),
				param2 = getValueFromMode(modeB, position + 2, myReg),
				param3 = getValueFromMode(modeA, position + 3, register);

				/*
				console.log({modeC, modeB, modeA});
				console.log({opCode, param1, param2, param3});
				*/

			switch(opCode) {
				// sum
				case 1:
					let sum = myReg[param1] + myReg[param2];
					myReg[param3] = sum;
					position += 4;
					break;
				// multiply
				case 2:
					let multiple = myReg[param1] * myReg[param2];
					myReg[param3] = multiple;
					position += 4;
					break;
				// save input
				case 3:
					myReg[param1] = input; //first time through, position 225 is 5
					position += 2;
					break;
				// output
				case 4:
					console.log(myReg[param1]);
					position += 2;
					break;
				// jump if true
				case 5:
					if (param1 !== 0) position = param2;
					break;
				// jump if false
				case 6:
					if (param1 === 0) position = param2;
					break;
				// less than
				case 7:
					myReg[param3] = param1 < param2 ? 1 : 0;
					break;
				// equals
				case 8:
					myReg[param3] = param1 === param2 ? 1 : 0;
					break;
				default:
					console.error("Something went wrong, myReg opcode is", opCode, "position is", position);
					process.exit();
					break;
			}
			let newModes = getModes(myReg[position]);
			opCode = newModes.opCode;
			modeA = newModes.modeA;
			modeB = newModes.modeB;
			modeC = newModes.modeC;
		}

		return myReg;
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
		opCode = parseInt(stringIns[stringIns.length - 2] + stringIns[stringIns.length - 1]);
		modeC = stringIns.length >= 3 ? parseInt(stringIns.charAt(stringIns.length - 3)) : 0;
		modeB = stringIns.length >= 4 ? parseInt(stringIns.charAt(stringIns.length - 4)) : 0;
		modeA = stringIns.length === 5 ? parseInt(stringIns[0]) : 0;
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

