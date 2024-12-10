import { example, input } from './input'

type File = {
  id: number
  size: number
  start: number
  remainingSpace: number
}

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
  const files = buildFiles(fileSizes, freeSpaces)
  const compressed = compressWholeFiles(files)
  const sorted = sortByStart(compressed)
  const blockChecksum = fileChecksum(sorted)
  console.log(blockChecksum)
}

function buildFiles(fileSizes: number[], freeSpaces: number[]): File[] {
  const blocks: File[] = []
  let currentPosition = 0
  for (let i = 0; i < fileSizes.length; i++) {
    const block = {
      id: i,
      size: fileSizes[i],
      start: currentPosition,
      remainingSpace: freeSpaces[i] ?? 0,
    }

    currentPosition += fileSizes[i] + freeSpaces[i]

    blocks.push(block)
  }

  return blocks
}

//linked list would have been good to re order these efficiently.
function compressWholeFiles(files: File[]): File[] {
  for (const movingFile of files.toReversed()) {
    files = sortByStart(files)
    for (const checkingFile of files) {
      if (checkingFile.start > movingFile.start) {
        break
      }

      if (movingFile.size <= checkingFile.remainingSpace) {
        movingFile.start = checkingFile.start + checkingFile.size
        movingFile.remainingSpace =
          checkingFile.remainingSpace - movingFile.size
        checkingFile.remainingSpace = 0
        break
      }
    }
  }
  return files
}

function sortByStart(files: File[]) {
  return files.toSorted((fileA, fileB) => fileA.start - fileB.start)
}

function fileChecksum(files: File[]): number {
  let index = 0
  let total = 0

  for (const file of files) {
    index = file.start
    for (let i = 0; i < file.size; i++) {
      total += Number(file.id) * Number(index)
      index++
    }
  }
  return total
}

day9Part2(input)
