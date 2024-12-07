const path = "./day2.txt";
const file = Bun.file(path);

const example = await file.text();


function generateReports(): number[][] {
  const reportRowsRaw = example.split("\n")

  const reports: number[][] = []

  reportRowsRaw.forEach(row => {
    reports.push(row.split(" ").map(Number))
  })

  return reports
}

function day2() {
 const reports = generateReports()

  analyzeDay2Reports(reports)
}

function analyzeDay2Reports(reports: number[][]) {
  const safeReports = reports.filter(isSafe)
  console.log(safeReports.length)
}

function isSafe(report: number[]) {
  return report.every((value, index) => {
    if (index === 0) return true
    const prevValue = report[index - 1]
    const diff = Math.abs(value - prevValue)
    return value > prevValue && diff < 4
  }) || report.every((value, index) => {
    if (index === 0) return true
    const prevValue = report[index - 1]
    const diff = Math.abs(value - prevValue)
    return value < prevValue && diff < 4
  })
}

function day2Part2() {
  const reports = generateReports()
  analyzeDay2Part2Reports(reports)
}

function isKindOfSafe(report: number[]) {
  let isSafe = true
  let maxDiff = 3
  let direction = null
  let adjusted = false

  for (let i = 0; i < report.length - 1; i++) {
    let current = report[i]
    let next = report [i + 1]
    let unsafeLevel = false
    
    if (!direction) {
      if (current < next) direction = 'increasing'
      else if (current > next) direction =  'decreasing'
      else unsafeLevel = true
    }

    let diff = Math.abs(current - next)
    if (diff === 0 || diff > maxDiff) unsafeLevel = true

    switch(direction) {
      case 'increasing':
        if (current > next) unsafeLevel = true
        break
      case 'decreasing':
        if (current < next) unsafeLevel = true
        break
      default: 
        break
    }


    if (unsafeLevel && !adjusted) {
      report.splice(i + 1, 1)
      i -= 2
      adjusted = true
      direction = null
    } else if (unsafeLevel) {
      isSafe = false
    }
      console.log(isSafe)
  }


  return isSafe
}

function bruteForce(reports: number[][]) {
  let count = 0
  for (let report of reports) {
    if (isSafe(report)) {
      count++
    } else {
      let barelySafe = false
      for (let i = 0; i < report.length; i++) {
        if (barelySafe) break
        barelySafe = isSafe(report.toSpliced(i, 1))
      }
      if (barelySafe) count++
    }
  }

  return count
}

function analyzeDay2Part2Reports(reports: number[][]) {
  try {
  const safeReports = bruteForce(reports)
  console.log(safeReports)
  } catch(err) {
    console.error(err)
  }

}



day2Part2()