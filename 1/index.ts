const path = "./day1.txt";
const file = Bun.file(path);

const example = await file.text();

function getLists() {
  const rowPairs = example.split("\n")
  const lefts: number[] = []
  const rights: number[] = []

  rowPairs.forEach((row) => {
    const pairs = row.split("   ")
    lefts.push(Number(pairs[0]))
    rights.push(Number(pairs[1]))
  });

  return { lefts, rights }
}

function day1() {
  const { lefts, rights } = getLists()

  const sortedLefts = lefts.sort()
  const sortedRights = rights.sort()

  let totalDistance = 0
  sortedLefts.forEach((left, index) => {
    totalDistance += Math.abs(left - sortedRights[index])
  })

  console.log(totalDistance)
}

// day1()

function day1Part2() {
  const { lefts, rights } = getLists()

  let similarity = 0
  lefts.forEach(left => {
    const count = rights.filter(right => left === right).length
    similarity += count * left
  })

  console.log(similarity)
}

day1Part2()