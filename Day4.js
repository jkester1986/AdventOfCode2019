fs = require('fs');
fs.readFile('Day4.txt', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	let input = "278384-824795".split("-");
	let possiblePWs = [];

	for (let i = input[0]; i <= input[1]; i++) {
		let repeatingNumPattern = /(\d)\1/;
		// p2 Patter, which I 100% took from here: https://stackoverflow.com/questions/42622292/match-a-repeating-digit-the-same-one-exactly-two-times-in-javascript-with-rege
		// why? Because I'm lazy and it was there, and look-ahead/around/behinds are complicated
		let repeatingNumPattern = /(?:^|(.)(?!\1))(\d)\2(?!\2)/;
		let numString = i.toString();

		if (numString.match(repeatingNumPattern)
			&& !(numString.indexOf("0") > -1)
			&& !(numString.indexOf("1") > -1)) {
			//console.log("Might have a match", i);
			let numArray = numString.split("").map(Number);
			//console.log({numArray});
			if (numArray[0] <= numArray[1]
				&& numArray[1] <= numArray[2]
				&& numArray[2] <= numArray[3]
				&& numArray[3] <= numArray[4]
				&& numArray[4] <= numArray[5]) possiblePWs.push(i);
		}
	}

	console.log("Total possible passwords:", possiblePWs.length);

});