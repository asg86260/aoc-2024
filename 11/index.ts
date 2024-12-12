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

let count = 0
function blink(stones: number[], blinks: number) {
  for (let i = 0; i < blinks; i++) {
    const newStones = []

    for (const stone of stones) {
      const processed = processStone(stone)
      newStones.push(...processed)
    }

    stones = newStones

    console.log({ i, count })
  }
  return stones
}

function processStone(stone: number): number[] {
  const newStone: number[] = []
  if (stone === 0) {
    newStone.push(1)
  } else if (stone.toString().length % 2 === 0) {
    newStone.push(...splitNumber(stone))
  } else {
    newStone.push(stone * 2024)
  }

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

const pathMap = new Map<number, Map<number, number>>()
function blink2(stone: number, blinks: number): number {
  const currentStones = pathMap.get(stone) ?? new Map<number, number>()
  if (currentStones.has(blinks)) {
    return currentStones.get(blinks) ?? 0
  }

  let newCount = 0
  const newStones = processStone(stone)

  newCount += newStones.length > 1 ? 1 : 0

  if (blinks > 0) {
    for (let i = 0; i < newStones.length; i++) {
      newCount += blink2(newStones[i], blinks - 1)
    }
  }

  currentStones.set(blinks, newCount)
  pathMap.set(stone, currentStones)

  return newCount
}

function day11Part2(input: string) {
  console.log(input)
  const stones = buildStoneArray(input)

  const blinks = 75
  count = stones.length

  const t0 = performance.now()
  console.log('starting: ', new Date())
  let stoneCount = count
  for (const stone of stones) {
    stoneCount += blink2(stone, blinks - 1)
  }
  const t1 = performance.now()
  console.log(`${t1 - t0} milliseconds.`)
  console.log('number of stones', stoneCount)
}

day11Part2(input)
