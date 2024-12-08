import input, { example } from './input'

type Matrix = string[][]
type TrackerMatrix = { visited: boolean; directions: Direction[] }[][]
type Position = {
  row: number
  column: number
}

type Direction = 'N' | 'E' | 'S' | 'W'

function isTrackerMatrix(
  matrix: Matrix | TrackerMatrix,
): matrix is TrackerMatrix {
  return !!matrix[0][0]
}

function buildMatrix(string: string): Matrix {
  const charMatrix: Matrix = []
  const rows = string.split('\n')

  for (const row of rows) {
    charMatrix.push(row.split(''))
  }

  return charMatrix
}

const guard = '^'

function findGuardPosition(matrix: Matrix): Position | undefined {
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < matrix[rowIndex].length;
      columnIndex++
    ) {
      if (matrix[rowIndex][columnIndex] === guard) {
        return { row: rowIndex, column: columnIndex }
      }
    }
  }
}

let direction: Direction = 'N'
type Status = 'DONE' | 'CLEAR' | 'OBSTACLE' | 'LOOP'

const position = { row: 0, column: 0 }

function step(tracker: Matrix | TrackerMatrix) {
  const newPosition = { row: position.row, column: position.column }
  switch (direction) {
    case 'N':
      newPosition.row--
      break
    case 'E':
      newPosition.column++
      break
    case 'S':
      newPosition.row++
      break
    case 'W':
      newPosition.column--
      break
    default:
      console.log('what direction are you going?')
      break
  }

  updateCurrentPosition(newPosition)
  if (isTrackerMatrix(tracker)) {
    logPositionAndDirection(newPosition, tracker)
  } else {
    logPosition(newPosition, tracker)
  }
}

function logPosition(newPosition: Position, tracker: Matrix) {
  tracker[newPosition.row][newPosition.column] = 'X'
}

function logPositionAndDirection(
  newPosition: Position,
  tracker: TrackerMatrix,
) {
  const directions = tracker[newPosition.row][newPosition.column].directions
  tracker[newPosition.row][newPosition.column] = Object.assign({
    visited: true,
    directions: [...directions, direction],
  })
}

function check(
  matrix: Matrix,
  position: Position,
  tracker?: TrackerMatrix,
): Status {
  let checkPosition = Object.assign({ ...position })
  switch (direction) {
    case 'N':
      checkPosition = {
        column: position.column,
        row: position.row - 1,
      }
      break
    case 'E':
      checkPosition = {
        column: position.column + 1,
        row: position.row,
      }
      break
    case 'S':
      checkPosition = {
        column: position.column,
        row: position.row + 1,
      }
      break
    case 'W':
      checkPosition = {
        column: position.column - 1,
        row: position.row,
      }
      break
    default:
      console.log('what direction are you going?')
  }

  if (
    !matrix[checkPosition.row] ||
    !matrix[checkPosition.row][checkPosition.column]
  ) {
    return 'DONE'
  }

  if (tracker) {
    if (
      tracker[checkPosition.row][checkPosition.column].directions.includes(
        direction,
      )
    ) {
      return 'LOOP'
    }
  }

  if (
    matrix[checkPosition.row][checkPosition.column] === '.' ||
    matrix[checkPosition.row][checkPosition.column] === '^'
  )
    return 'CLEAR'
  if (matrix[checkPosition.row][checkPosition.column] === '#') return 'OBSTACLE'
}

function changeDirection() {
  switch (direction) {
    case 'N':
      direction = 'E'
      break
    case 'E':
      direction = 'S'
      break
    case 'S':
      direction = 'W'
      break
    case 'W':
      direction = 'N'
      break
  }
}

function updateCurrentPosition(newPosition: Position) {
  position.row = newPosition.row
  position.column = newPosition.column
}

function buildTracker(matrix: Matrix): Matrix {
  const rows = matrix.length
  const columns = matrix[0].length
  const trackingMatrix = []

  for (let row = 0; row < rows; row++) {
    trackingMatrix[row] = Array(columns)
  }

  return trackingMatrix
}

function countSteps(tracker: Matrix): number {
  let total = 0
  for (const row in tracker) {
    for (const column in tracker[row]) {
      if (tracker[row][column] === 'X') total++
    }
  }
  return total
}

function day6() {
  const matrix = buildMatrix(example)
  const tracker = buildTracker(matrix)

  const startingPosition = findGuardPosition(matrix)

  if (!startingPosition) {
    console.log('No Guard?')
    return
  }

  updateCurrentPosition(startingPosition)
  logPosition(startingPosition, tracker)
  let status: Status = check(matrix, position)
  while (status !== 'DONE') {
    status = check(matrix, position)
    if (status === 'CLEAR') {
      step(tracker)
    } else if (status === 'OBSTACLE') {
      changeDirection()
    }
  }
  const totalSteps = countSteps(tracker)
  console.log('Total Steps: ', totalSteps)
}

// day6()

function buildDirectionTracker(matrix: Matrix): TrackerMatrix {
  const rows = matrix.length
  const columns = matrix[0].length
  const trackingMatrix = []

  for (let row = 0; row < rows; row++) {
    trackingMatrix[row] = Array(columns).fill({
      visited: false,
      directions: [],
    })
  }
  return trackingMatrix
}

function countTrackerSteps(tracker: TrackerMatrix): number {
  let total = 0
  for (const row in tracker) {
    for (const column in tracker[row]) {
      if (tracker[row][column].visited) {
        total++
      }
    }
  }
  return total
}

function day6Part2() {
  const matrix = buildMatrix(input)
  const startingPosition = findGuardPosition(matrix)

  if (!startingPosition) {
    console.log('No Guard?')
    return
  }

  let loopCount = 0
  for (const row in matrix) {
    for (const column in matrix[row]) {
      const testMatrix = matrix.map((arr) => arr.slice())
      if (
        startingPosition.column === Number(column) &&
        startingPosition.row === Number(row)
      ) {
        continue
      }

      if (testMatrix[row][column] === '#') {
        continue
      }

      testMatrix[row][column] = '#'

      updateCurrentPosition(startingPosition)
      direction = 'N'
      const testTracker = buildDirectionTracker(testMatrix)
      logPositionAndDirection(startingPosition, testTracker)
      let status: Status = check(testMatrix, position, testTracker)

      while (status !== 'DONE') {
        status = check(testMatrix, position, testTracker)
        if (status === 'CLEAR') {
          step(testTracker)
        } else if (status === 'OBSTACLE') {
          changeDirection()
        } else if (status === 'LOOP') {
          loopCount++
          break
        }
      }
    }
  }

  console.log('Total Obstacles ', loopCount)
}

day6Part2()
