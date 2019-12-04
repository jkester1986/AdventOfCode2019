fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {

	if (err) {
		return console.log(err);
	}

	let wires = data.split('\n');
	let wire1dirs = wires[0].split(','),
		wire2dirs = wires[1].split(',');

	let wire1 = mapWire(wire1dirs),
		wire2 = mapWire(wire2dirs);

	let shortestManDis = 50000000;
	let intersection = "";

	Object.entries(wire1).forEach(point => {
		let key = point[0],
			val = point[1];

		if (key !== "0,0" && wire2[key]) {
			let manDis = manhattanDistance(val, {x:0, y:0});

			if (manDis < shortestManDis) {
				shortestManDis = manDis;
				intersection = key;
			}
		}
	})

	console.log("The shortest manhattan distance is:", shortestManDis);
	console.log("The intersection point is:", intersection);
});

function manhattanDistance(p1, p2) {
	return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function mapWire(wireDirs) {
	let wirePoints = {
		'0,0': {
			x:0,
			y:0
		}
	};
	let pos = {x:0, y:0},
		goal = "225,0", //know this from P1
		goalFound = false,
		steps = 0;

	wireDirs.forEach(dir => {
		let pattern = /^(\w)(\d+)$/;
		let found = dir.match(pattern);
		let direction = found[1],
			distance = parseInt(found[2]);

		for (let i = 0; i < distance; i++) {
			switch (direction) {
				case "L":
					pos.x--;
					break;
				case "R":
					pos.x++;
					break;
				case "U":
					pos.y++;
					break;
				case "D":
					pos.y--;
					break;
			}
			let point = `${pos.x},${pos.y}`;
			wirePoints[point] = {x:pos.x, y:pos.y};

			if (!goalFound) steps++;
			if (point === goal) found == true;
		}
	});

	// take this value from both wires, add them up
	console.log("steps to get to 255,0:", steps);

	return wirePoints;
}
