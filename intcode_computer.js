module.exports = {
	compute: function intcode(noun, verb, register, input1, input2) {
		let myReg = [...register];

		let position = 0,
			instruction = myReg[0],
			usedInput1 = false;
		myReg[1] = noun;
		myReg[2] = verb;
		

		let { opCode, modeA, modeB, modeC } = getModes(instruction);

		// console.log({opCode, modeA, modeB, modeC})

		let output;
		while(opCode != 99) {
			let param1 = getValueFromMode(modeC, position + 1, myReg),
				param2 = getValueFromMode(modeB, position + 2, myReg),
				param3 = getValueFromMode(modeA, position + 3, myReg);

			// console.log("\n\n")
			// console.log(myReg.join(","));
			// console.log({opCode, position})
			// console.log({param1, param2, param3})
			// console.log({modeA, modeB, modeC})

			// advance by however many params were used + 1 for the opcode
			switch(opCode) {
				// sum
				case 1:
					myReg[param3] = myReg[param1] + myReg[param2];
					position += 4;
					break;
				// multiply
				case 2:
					myReg[param3] = myReg[param1] * myReg[param2];
					position += 4;
					break;
				// save input
				case 3:
					myReg[param1] = usedInput1 ? input2 : input1;
					usedInput1 = true;
					position += 2;
					break;
				// output
				case 4:
					output = myReg[param1];
					// console.log("output:", myReg[param1]);
					position += 2;
					break;
				// jump if not 0
				case 5:
					if (myReg[param1] !== 0)
						position = myReg[param2];
					else
						position += 3;
					break;
				// jump if === 0
				case 6:
					if (myReg[param1] === 0)
						position = myReg[param2];
					else
						position += 3;
					break;
				// less than
				case 7:
					myReg[param3] = myReg[param1] < myReg[param2] ? 1 : 0;
					position += 4;
					break;
				// equals
				case 8:
					myReg[param3] = myReg[param1] === myReg[param2] ? 1 : 0;
					position += 4;
					break;
				default:
					console.error("Something went wrong, myReg opcode is", opCode, "position is", position);
					process.exit();
					break;
			}
			let newModes = getModes(myReg[position]);
			opCode = newModes?.opCode;
			modeA = newModes?.modeA;
			modeB = newModes?.modeB;
			modeC = newModes?.modeC;
		}

		return output;

	}
}

function getModes(instruction) {
	if (!instruction) return;
	let opCode, modeA, modeB, modeC;

	stringIns = instruction.toString();
	if (stringIns.length === 1 || stringIns.startsWith('-')) {
		opCode = instruction;
		modeA = 0;
		modeB = 0;
		modeC = 0;
	}
	else {
		// opCode is last two digits
		opCode = parseInt(stringIns[stringIns.length - 2] + stringIns[stringIns.length - 1]);

		// modeC is the third digit from the right
		modeC = stringIns.length >= 3 ? parseInt(stringIns.charAt(stringIns.length - 3)) : 0;
		// modeB is the fourth digit from the right
		modeB = stringIns.length >= 4 ? parseInt(stringIns.charAt(stringIns.length - 4)) : 0;
		// modeA is the fifth digit from the right
		modeA = stringIns.length === 5 ? parseInt(stringIns[0]) : 0;
	}

	return { opCode, modeA, modeB, modeC }
}

function getValueFromMode(mode, position, register) {
	switch(mode) {
		// position mode
		case 0:
			return register[position];
		// immediate mode
		case 1:
			return position;
	}
}

