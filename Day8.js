fs = require('fs');
fs.readFile('Day8.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let width = 25,
		height = 6;
	let layerSize = width*height;
	
	//split the input data every 150 chars (25*6)
	let layers = data.match(/.{150}/g);
	
	let lowestZeroCount = 150,
		layerWithLeastZeros;

	layers.forEach((layer, i) => {
		// look for how many zeros there are; Every match gets added to the returned array of matches;
		// Count the length of the result
		let zeroCount = layer.match(/0/g || []).length;

		if (zeroCount < lowestZeroCount) {
			lowestZeroCount = zeroCount;
			layerWithLeastZeros = i;
		}
	});

	//get ones and twos count
	let oneDigits = layers[layerWithLeastZeros].match(/1/g).length,
		twoDigits = layers[layerWithLeastZeros].match(/2/g).length;

	console.log("P1:", oneDigits * twoDigits);

	function determinePixel(layerLevel, charPos) {
		let char = layers[layerLevel].charAt(charPos);
		if (char == "2") {
			return determinePixel(layerLevel+1, charPos);
		}
		else if (layerLevel == depth){
			return "2";
		}
		else {
			return char == "0" ? " " : "1";
		}
	}

	let depth = layers.length,
		image = "";

	for (let i = 0; i < 150; i++) {
		image = image + determinePixel(0, i);
	}

	console.log(image.match(/.{25}/g));

});