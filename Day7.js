fs = require('fs');
intcode = require('./intcode_computer.js');
const { Permutation } = require('js-combinatorics');

fs.readFile('Day7.txt', 'utf8', function (err, data) {

  if (err) {
    return console.log(err);
  }
  let register = data.split(',').map(Number);

  let sequence = [0, 1, 2, 3, 4];
  let allSequences = [...new Permutation(sequence)];
  let sequenceTotal = allSequences.length;

  let highestOut = 0;
  let bestSequence = [0, 1, 2, 3, 4];
  for (let i = 0; i < sequenceTotal; i++) {
    const A = intcode.compute(register[1], register[2], register, allSequences[i][0], 0);
    const B = intcode.compute(register[1], register[2], register, allSequences[i][1], A);
    const C = intcode.compute(register[1], register[2], register, allSequences[i][2], B);
    const D = intcode.compute(register[1], register[2], register, allSequences[i][3], C);
    const E = intcode.compute(register[1], register[2], register, allSequences[i][4], D);

    if (E > highestOut) {
      highestOut = E;
      bestSequence = allSequences[i];
    }
  }

  // see https://www.reddit.com/r/adventofcode/comments/e7aqcb/2019_day_7_part_2_confused_with_the_question/ for P2 clarifications

  console.log("highest output:", highestOut);
});
