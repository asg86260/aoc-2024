const path = "./day3.txt";
const file = Bun.file(path);

const example = await file.text();

function day3() {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
  const matches = example.matchAll(regex)
  const total = matches.reduce((total, match) => {
    const multi = match[1] * match[2]
    return total + multi
  }, 0)

  console.log(total)
}

// day3()

function day3Part2() {
  const regex = /(do\(\)).*?mul\((?<val1>\d{1,3}),(?<val2>\d{1,3})\)|(don't\(\)).*?mul\((?<val1>\d{1,3}),(?<val2>\d{1,3})\)|mul\((?<val1>\d{1,3}),(?<val2>\d{1,3})\)/g
  const matches = example.matchAll(regex)
  let total = 0
  let enabled = true
  matches.forEach(match => {
    if (match[0].includes("don't()")) {
      enabled = false
    } else if (match[0].includes('do()')) {
      enabled = true
    }

    if (enabled) {
      total += Number(match.groups.val1) * Number(match.groups.val2)
    }
  })

  console.log(total)
}
day3Part2()