fs = require('fs');

fs.readFile('Day6.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let orbitStrings = data.split("\n"),
		orbits = {};
	let directOrbitCount = orbitStrings.length;

	orbitStrings.forEach(orbit => {
		orbit = orbit.split("\)");
		orbits[orbit[1]] = orbit[0];
	});

	let orbitTotal = 0;
	let sanPathToRoot = [];

	function addIndirectOrbitCount(orbiter, trackTransfers = false) {
		if (orbits[orbiter]) {
			orbitTotal++;

			// this lets us keep track of the SAN path in P2
			if (trackTransfers) sanPathToRoot.push(orbits[orbiter]);

			addIndirectOrbitCount(orbits[orbiter], trackTransfers);
		}
	}

	Object.keys(orbits).forEach(orbiter => {
		let orbitsAround = orbits[orbiter];
		orbitTotal++;
		addIndirectOrbitCount(orbitsAround);
	});

	console.log("P1: total of direct and indirect orbits is", orbitTotal);

	// track whole path to the center of the universe for SAN
	addIndirectOrbitCount("SAN", true);

	let partialYouPath = [];

	// track path up to matching location in SAN path
	function trackYou(orbiter) {
		// haven't found a match on SAN yet
		let nodeVal = orbits[orbiter];
		let sanIndex = sanPathToRoot.indexOf(nodeVal) 
		if (sanIndex === -1) {
			partialYouPath.push(nodeVal);
			trackYou(nodeVal);
		}
		else {
			// found the match, now output the distance from YOU + the index that the node on SAN is at
			console.log("P2: orbital transfers required is", partialYouPath.length + sanIndex);
		}
	}

	trackYou("YOU");
});