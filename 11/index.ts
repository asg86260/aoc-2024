import { example, input } from './input'

// day11(input)

day11Part2(input)

function day11(input: string) {
  console.log(input)
  const stones = buildStoneArray(input)
  const blinks = 25
  const newStones = blink(stones, blinks)

  console.log(newStones.length)
}

function buildStoneArray(input: string): number[] {
  return input.split(' ').map(Number)
}

function blink(stones: number[], blinks: number) {
  for (let i = 0; i < blinks; i++) {
    const newStones = []
    console.log(i)
    for (let j = 0; j < stones.length; j++) {
      const stone = stones[j]
      const processed = processStone(stone)
      console.log(stone, processed)
      newStones.push(...processed)
    }
    stones = newStones
  }
  return stones
}

function processStone(stone: number): number[] {
  console.log('stone: ', stone)
  if (stone === 0) return [1]

  if (stone.toString().length % 2 === 0) return splitNumber(stone)

  return [stone * 2024]
}

function splitNumber(number: number): number[] {
  const numberString = number.toString()
  const stringLength = numberString.length
  const firstHalf = numberString.substring(0, Math.floor(stringLength / 2))
  const secondHalf = numberString.substring(
    Math.ceil(stringLength / 2),
    stringLength,
  )

  return [Number(firstHalf), Number(secondHalf)]
}

function day11Part2(input: string) {
  console.log(input)
  const stones = buildStoneArray(input)
  const blinks = 75
  const newStones = blink(stones, blinks)

  console.log(newStones.length)
}

const stoneCalcs = new Map<number, number[]>()

function processEachStone(stone: number, blinks: number) {
  for (let i = 0; i < blinks; i++) {
    if (stoneCalcs.get(stone)) return stoneCalcs.get(stone)
  }
}
