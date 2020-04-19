function boardToNumber(board) {
  const bytes = board.current;
  if (bytes.length > 52) {
    throw new Error('board too big');
  }
  let number = 0;
  for (let i = 0; i < bytes.length; i++) {
    number = number * 2 + (bytes[i] & 1);
  }
  return number;
}

function numberToBoard(number, board) {
  const bytes = board.current;
  if (bytes.length > 52) {
    throw new Error('board too big');
  }
  for (let i = bytes.length - 1; i >= 0; i--) {
    bytes[i] = number % 2;
    number = Math.floor(number / 2);
  }
}

function findOscillators(width, height) {
  const transitionMap = [];
  const boardCount = 2 ** (width * height);
  const board = new Board(width, height);
  const oscillators = [];
  for (let b = 0; b < boardCount; b++) {
    if (transitionMap[b] !== undefined) {
      continue;
    }
    const visited = new Set();
    numberToBoard(b, board);
    let c = b;
    while (!visited.has(c) && transitionMap[c] === undefined) {
      visited.add(c);
      board.step();
      d = boardToNumber(board);
      transitionMap[c] = d;
      c = d;
    }
    if (visited.has(c) && transitionMap[c] != c) {
      oscillators.push(c);
    }
  }
  return oscillators;
}