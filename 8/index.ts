import { input, example } from './input'
type Matrix = Frequency[]

type Antinodes = Set<string>

type FrequencyMap = Record<string, Frequency[]>

type Frequency = {
  x: number
  y: number
  frequency: string
}

type Coordinate = {
  x: number
  y: number
}

const bounds = {
  x: 0,
  y: 0,
}

let totalFrequencies = 0

function day8() {
  const matrix = buildMatrix(input)
  const frequencies = buildFrequencyMap(matrix)
  const antinodes = buildAntinodesMap(frequencies)

  console.log(antinodes.size)
}

function buildMatrix(input: string): Matrix {
  const matrix: Matrix = []

  input.split('\n').forEach((row, y) => {
    bounds.y = y
    row.split('').forEach((frequency, x) => {
      bounds.x = x
      matrix.push({
        x,
        y,
        frequency,
      })
    })
  })

  return matrix
}

function buildFrequencyMap(matrix: Matrix): FrequencyMap {
  const frequencies: Record<string, Frequency[]> = {}
  for (const coordinate of matrix) {
    if (coordinate.frequency !== '.') {
      totalFrequencies++
      if (frequencies[coordinate.frequency]) {
        frequencies[coordinate.frequency].push(coordinate)
      } else {
        frequencies[coordinate.frequency] = [coordinate]
      }
    }
  }

  return frequencies
}

function buildAntinodesMap(frequencies: FrequencyMap): Antinodes {
  const antinodes = new Set<string>()
  for (const frequency in frequencies) {
    const frequencyList = frequencies[frequency]
    for (let i = 0; i < frequencyList.length; i++) {
      const firstFrequency = frequencyList[i]
      antinodes.add(
        JSON.stringify({ x: firstFrequency.x, y: firstFrequency.y }),
      )
      for (let j = i + 1; j < frequencyList.length; j++) {
        const secondFrequency = frequencyList[j]
        const newAntinodes = getAntinodes(firstFrequency, secondFrequency)

        for (const antinode of newAntinodes) {
          antinodes.add(JSON.stringify(antinode))
        }
      }
    }
  }

  return antinodes
}

function getAntinodes(
  firstFrequency: Frequency,
  secondFrequency: Frequency,
): Coordinate[] {
  const { x: x1, y: y1 } = firstFrequency
  const { x: x2, y: y2 } = secondFrequency
  const xDiff = x1 - x2
  const yDiff = y1 - y2 //always negative
  let antinode1: Coordinate = { x: x1 + xDiff, y: y1 + yDiff }
  let antinode2: Coordinate = { x: x2 - xDiff, y: y2 - yDiff }
  const antinodes = [antinode1, antinode2]

  while (isAntinodeInBounds(antinode1)) {
    const newAntinode = { x: antinode1.x + xDiff, y: antinode1.y + yDiff }
    antinodes.push(newAntinode)
    antinode1 = { ...newAntinode }
  }

  while (isAntinodeInBounds(antinode2)) {
    const newAntinode = { x: antinode2.x - xDiff, y: antinode2.y - yDiff }
    antinodes.push(newAntinode)
    antinode2 = { ...newAntinode }
  }

  return antinodes.filter(isAntinodeInBounds)
}

function isAntinodeInBounds(antinode: Coordinate) {
  return (
    antinode.x >= 0 &&
    antinode.x <= bounds.x &&
    antinode.y >= 0 &&
    antinode.y <= bounds.y
  )
}

day8()
