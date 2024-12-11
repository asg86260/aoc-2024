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
  stoneCalcs: Map<number, number[]>,
) {
  for (let i = 0; i < blinks; i++) {
    const newStones = []
    console.log(i)
    for (let j = 0; j < stones.length; j++) {
      const stone = stones[j]
      const processed = processStone(stone, stoneCalcs)
      newStones.push(...processed)
    }
    console.log('new length: ', newStones.length)
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
  const stoneCalcs = new Map<number, number[]>()
  const blinks = 75
  const newStones = blink(stones, blinks, stoneCalcs)
  // console.log(stoneCalcs)
  console.log('number of stones', newStones.length)
}

function processEachStone(
  stones: number[],
  blinks: number,
  calcs: Map<number, number[]>,
) {
  const newStones = []
  for (const stone of stones) {
    const currentStones = [stone]
    for (let i = 0; i < blinks; i++) {
      for (const currentStone of currentStones) {
        const alreadyProcessed = calcs.get(currentStone)
        if (alreadyProcessed) currentStones.push(...alreadyProcessed)
        const processed = processStone(currentStone, calcs)

        calcs.set(stone, processed)
        console.log(stone, processed)
      }
      currentStones.push(...processed)
    }
    newStones.push(...currentStones)
  }
  return newStones
}

day11Part2(input)

// day11Part2(example2)
