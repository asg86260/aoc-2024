import { example, input } from './input'

function day9(input: string) {
  const [fileSizes, freeSpaces] = splitFilesAndFreeSpace(input)

  const blocks = buildFileBlocks(fileSizes, freeSpaces)
  const compressed = compress(blocks)
  const blockChecksum = checksum(compressed)
  console.log(blockChecksum)
}

function splitFilesAndFreeSpace(input: string) {
  const fileSizes: number[] = []
  const freeSpaces: number[] = []

  for (let i = 0; i < input.length; i++) {
    const isFile = i % 2 === 0

    if (isFile) fileSizes.push(Number(input[i]))
    else freeSpaces.push(Number(input[i]))
  }

  return [fileSizes, freeSpaces]
}

function buildFileBlocks(fileSizes: number[], freeSpaces: number[]): string[] {
  const blocks: string[] = []
  let totalBlocks = 0
  for (let i = 0; i < fileSizes.length; i++) {
    totalBlocks += fileSizes[i]
    const block = [
      ...Array(fileSizes[i]).fill(i),
      ...Array(freeSpaces[i] ?? 0).fill('.'),
    ]

    blocks.push(...block)
  }

  return blocks
}

function compress(blocks: string[]): string[] {
  const compressed: string[] = [...blocks]
  for (let i = 0; i < compressed.length; i++) {
    const currentBlock = compressed[i]

    if (currentBlock === '.') {
      const blockToMoveIndex = getLastBlockIndex(compressed)

      if (blockToMoveIndex < 0) continue

      compressed.splice(i, 1, compressed[blockToMoveIndex])
      compressed.splice(blockToMoveIndex, 1, '.')
    } else if (currentBlock === undefined) {
      break
    }
  }

  return compressed
}

function getLastBlockIndex(blocks: string[]) {
  return blocks.findLastIndex((block) => block !== '.')
}

function checksum(blocks: string[]): number {
  return blocks
    .filter((block) => block !== '.')
    .reduce((total, block, index) => {
      return total + Number(block) * index
    }, 0)
}

// day9(input)

function day9Part2(input: string) {
  const [fileSizes, freeSpaces] = splitFilesAndFreeSpace(input)

  const blocks = buildFileBlocks(fileSizes, freeSpaces)
  const compressed = compress(blocks)
  const blockChecksum = checksum(compressed)
  console.log(blockChecksum)
}

function compressWholeFiles(blocks) {}

day9Part2(example)
