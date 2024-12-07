import { getInput } from '../utils/fileReader'

function buildMatrix(string: string): string[][] {
  const charMatrix: string[][] = []
  const rows = string.split('\n')

  for (const row of rows) {
    charMatrix.push(row.split(''))
  }

  return charMatrix
}
let foundCount = 0

function incrementFoundCount() {
  foundCount++
}

async function day4() {
  const input = await getInput('4/input.txt')

  const word = 'XMAS'
  const wordArray = word.split('')
  const startingLetter = wordArray[0]

  const wordSearch = buildMatrix(input)
  for (let row = 0; row < wordSearch.length; row++) {
    for (let column = 0; column < wordSearch[row].length; column++) {
      const currentLetter = wordSearch[row][column]
      if (startingLetter === currentLetter) {
        checkReverseDiagonalLeft(wordSearch, row, column, word)
        checkReverseVertical(wordSearch, row, column, word)
        checkReverseDiagonalRight(wordSearch, row, column, word)
        checkRight(wordSearch, row, column, word)
        checkDiagonalRight(wordSearch, row, column, word)
        checkVertical(wordSearch, row, column, word)
        checkDiagonalLeft(wordSearch, row, column, word)
        checkLeft(wordSearch, row, column, word)
      }
    }
  }

  console.log('TOTAL FOUND: ', foundCount)
}

function checkReverseDiagonalLeft(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row - index]
    if (!currentRow) continue

    const currentChar = currentRow[column - index]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    console.log('Found Reverse Diagonal Left', row, column)
    incrementFoundCount()
  }
}

function checkReverseVertical(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row - index]
    if (!currentRow) continue

    const currentChar = currentRow[column]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    console.log('Found Reverse Vertical', row, column)
    incrementFoundCount()
  }
}

function checkReverseDiagonalRight(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row - index]
    if (!currentRow) continue

    const currentChar = currentRow[column + index]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    incrementFoundCount()
    console.log('Found Reverse Diagonal Right', row, column)
  }
}

function checkRight(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row]
    if (!currentRow) continue

    const currentChar = currentRow[column + index]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    incrementFoundCount()
    console.log('Found Right', row, column)
  }
}

function checkDiagonalRight(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row + index]
    if (!currentRow) continue

    const currentChar = currentRow[column + index]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    incrementFoundCount()
    console.log('Found Diagonal Right', row, column)
  }
}

function checkVertical(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row + index]
    if (!currentRow) continue

    const currentChar = currentRow[column]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
    console.log('vertical', { attempt, currentChar })
  }

  if (attempt === word) {
    incrementFoundCount()
    console.log('Found Vertical', row, column)
  }
}

function checkDiagonalLeft(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row + index]
    if (!currentRow) continue

    const currentChar = currentRow[column - index]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    incrementFoundCount()
    console.log('Found Diagonal Left', row, column)
  }
}

function checkLeft(
  matrix: string[][],
  row: number,
  column: number,
  word: string,
) {
  const wordArray = word.split('')

  let attempt = ''
  for (let index = 0; index < wordArray.length; index++) {
    const currentRow = matrix[row]
    if (!currentRow) continue

    const currentChar = currentRow[column - index]
    if (!currentChar) continue

    attempt = attempt.concat(currentChar)
  }

  if (attempt === word) {
    incrementFoundCount()
    console.log('Found Left', row, column)
  }
}

day4()

async function day4Part2() {
  const input = await getInput('4/input.txt')
  const startingLetter = 'A'
  const wordSearch = buildMatrix(input)
  for (let row = 1; row < wordSearch.length - 1; row++) {
    for (let column = 1; column < wordSearch[row].length - 1; column++) {
      const currentLetter = wordSearch[row][column]
      if (startingLetter === currentLetter) {
        checkXMAS(wordSearch, row, column)
      }
    }
  }

  console.log('PART 2 TOTAL FOUND: ', foundCount)
}

function checkXMAS(wordSearch: string[][], row: number, column: number) {
  const topLeft = wordSearch[row - 1][column - 1]
  const topRight = wordSearch[row - 1][column + 1]
  const bottomLeft = wordSearch[row + 1][column - 1]
  const bottomRight = wordSearch[row + 1][column + 1]

  const letters = [topLeft, topRight, bottomLeft, bottomRight]
  let sCount = 0
  let mCount = 0

  for (const letter of letters) {
    if (letter === 'M') {
      mCount++
    } else if (letter === 'S') {
      sCount++
    }
  }

  if (sCount === 2 && mCount === 2) {
    if (topLeft !== bottomRight && topRight !== bottomLeft)
      incrementFoundCount()
  }
}

day4Part2()
