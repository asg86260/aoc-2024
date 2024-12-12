import { example, input, example2 } from './input'

// day11(input)

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

function blink(
  stones: number[],
  blinks: number,
  stoneCalcs: Map<string, number[]>,
) {
  for (let i = 0; i < blinks; i++) {
    const newStones = []

    console.log(stones)

    const exists = stoneCalcs.get(JSON.stringify(stones))
    if (exists) return exists

    for (const stone of stones) {
      const processed = processStone(stone, stoneCalcs)
      newStones.push(...processed)
    }

    stoneCalcs.set(JSON.stringify(stones), newStones)
    console.log('new length: ', i, newStones.length)
    stones = newStones
  }
  return stones
}

function processStone(stone: number, memo: Map<number, number[]>): number[] {
  const exists = memo.get(stone)
  if (exists) return exists

  let newStone: number[] = []
  if (stone === 0) {
    newStone = [1]
  } else if (stone.toString().length % 2 === 0) {
    newStone = splitNumber(stone)
  } else {
    newStone = [stone * 2024]
  }

  memo.set(stone, newStone)
  return newStone
}

function splitNumber(number: number): number[] {
  const numberString = number.toString()
  const stringLength = numberString.length
  const middle = Math.floor(stringLength / 2)
  const firstHalf = numberString.substring(0, middle)
  const secondHalf = numberString.substring(middle, stringLength)

  return [Number(firstHalf), Number(secondHalf)]
}

function day11Part2(input: string) {
  console.log(input)
  const stones = buildStoneArray(input)
  const stoneCalcs = new Map<string, number[]>()
  const blinks = 25
  console.log('new length', blinks, stones.length)
  let count = 0
  for (const stone of stones) {
    const newStones = blink([stone], blinks, stoneCalcs)
    count += newStones.length
  }

  console.log('number of stones', count)
}

day11Part2(input)

// day11Part2(example2)
