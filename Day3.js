// had a request for comments, so extra-commented this file
fs = require('fs');
fs.readFile('Day3.txt', 'utf8', function (err, data) {

	// if for some reason the file can't be read, throw an error and be done
	if (err) {
		// this should really probably be console.error,
		// but I'm lazy and this is what I've always done. Yay copy/paste!
		return console.log(err);
	}

	// each wire is on its own line
	let wires = data.split('\n');

	// get each direction/distance for each wire
	let wire1dirs = wires[0].split(','),
		wire2dirs = wires[1].split(',');

	// set up an object (js uses JSON formatting for objects) full of each wire's points
	let wire1 = mapWire(wire1dirs),
		wire2 = mapWire(wire2dirs);

	// set a really high #, we are looking for lowest so need a way to compare
	let shortestManDis = 50000000,
		leastSteps = 50000000,
		intersection = "";

	// Object.entries(<objec>) creates an array, and then I look at every entry
	// in the array (as a point) and do something. So here, I'm iterating over the points
	// in wire1, and seeing where they cross with wire2
	Object.entries(wire1).forEach(point => {
		// key and value are mapped to point at 0 and point at 1, respectively. Set them for clarity and reuse
		let key = point[0], // remember, the key is a string coordinate
			val = point[1]; // and val is an object that contains x, y, and steps

		// For if not at the starting point, and it DOES exist in wire2.
		// Since we have set the key as a coordinate in mapWire(),
		// it's really easy to lookup if the coordinate exists in both wires (wire2, in this case)
		if (key !== "0,0" && wire2[key]) {
			// get the manhattan distance between the current point on wire1 (and consequently wire2), and 0,0
			let manDis = manhattanDistance(val, {x:0, y:0});
			
			// get the current steps taken for both wires
			let currentSteps = val.steps + wire2[key].steps;

			// if the current number of steps is less than the existing lowest total steps, replace the lowest with the new lower value
			if (currentSteps < leastSteps) leastSteps = currentSteps;

			// If the manhattan distance is lower than the existing lowest manhattan distance, replace the lowest with the new lower value.
			// Also set the intersection point (this isn't actually needed for anything, I just used it for troubleshooting and never took it out)
			if (manDis < shortestManDis) {
				shortestManDis = manDis;
				intersection = key;
			}
		}
	})

	console.log("The shortest manhattan distance is:", shortestManDis);
	console.log("The intersection point is:", intersection);
	//console.log("The total number of intersections is:", totalInters);
	console.log("The least total steps to intersection is:", leastSteps);
});

// return the manhattan distance between the two points
function manhattanDistance(p1, p2) {
	return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

// takes directions, and returns an object full of points.
// the key is each point's coordinate,
// and the value is another object that contains keys for the x and y values
// as well as how many steps have been taken to get to that point
function mapWire(wireDirs) {
	let wirePoints = {
		'0,0': {
			x:0,
			y:0,
			steps: 0
		}
	};
	let pos = {x:0, y:0},
		steps = 0;

	// iterate over the array of directions
	wireDirs.forEach(dir => {
		// use regex to get first group as the direction (\w) for character, second group is the distance (\d+) for all digits after.
		// the parentheses is what lets capture a group, without them we would just see there's a match
		// but not be able to get the specific pieces that we want out
		let pattern = /^(\w)(\d+)$/;
		let found = dir.match(pattern);

		// set the diretion and distance based on the matched groups
		let direction = found[1],
			distance = parseInt(found[2]);

		// for every direction,increment or decrement the x/y value
		// based on the direction the wire is moving.
		// Then, increment the step by one and set the point as a new point in the wire's point object.
		// Repeat until the distance is achieved
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
			steps++;

			// This is a clever trick that I learned. Since keys in objects are string values,
			// you can set them in two different ways:
			// object.<key> or object[<key>]. I use the second method significantly more, as I can input a string variable.
			// This lets me do some nifty things like look up the value based on the key as a variable
			// (see how I did the lookup in my Object.entries() back in my fs.readFile code).
			// Basically, it's nice when you don't actually know what the key should be, which happens pretty frequently
			wirePoints[point] = {x:pos.x, y:pos.y, steps};
		}
	});

	return wirePoints;
}
