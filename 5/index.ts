import { getInput } from '../utils/fileReader'

type Rule = number[]
type Update = number[]

function getRulesAndUpdates(input: string) {
  const rulesAndUpdates = input.split('\n\n')
  const ruleRows = rulesAndUpdates[0].split('\n')
  const updateRows = rulesAndUpdates[1].split('\n')

  const rules: Rule[] = []
  for (const ruleRow of ruleRows) {
    rules.push([Number(ruleRow.split('|')[0]), Number(ruleRow.split('|')[1])])
  }

  const updates: Update[] = []
  for (const updateRow of updateRows) {
    updates.push(updateRow.split(',').map(Number))
  }

  return { rules, updates }
}

async function day5() {
  const input = await getInput('5/input.txt')
  const { rules, updates } = getRulesAndUpdates(input)

  let total = 0
  for (const update of updates) {
    const validRules = getRulesForUpdate(update, rules)

    total += testUpdate(update, validRules)
  }

  console.log('Part 1 total: ', total)
}

function testUpdate(update: Update, rules: Rule[]): number {
  let valid = true
  for (const rule of rules) {
    const firstPage = rule[0]
    const nextPage = rule[1]
    const firstPageIndex = update.findIndex((page) => page === firstPage)
    const nextPageIndex = update.findIndex((page) => page === nextPage)

    if (firstPageIndex < 0 || nextPageIndex < 0) {
      continue
    }

    if (nextPageIndex < firstPageIndex) {
      valid = false
    }
  }

  return valid ? getMiddlePage(update) : 0
}

function getMiddlePage(update: Update) {
  return update[Math.floor(update.length / 2)]
}

// day5()

async function day5Part2() {
  const input = await getInput('5/input.txt')
  const { rules, updates } = getRulesAndUpdates(input)

  let total = 0
  for (const update of updates) {
    const validRules = getRulesForUpdate(update, rules)
    const isValid = testUpdatePart2(update, validRules)

    if (!isValid) {
      const newUpdate = correctUpdate(update, validRules)
      total += getMiddlePage(newUpdate)
    }
  }

  console.log('Part 2 total: ', total)
}

function testUpdatePart2(update: Update, rules: Rule[]): boolean {
  let valid = true

  for (const rule of rules) {
    const firstPage = rule[0]
    const nextPage = rule[1]
    const firstPageIndex = update.findIndex((page) => page === firstPage)
    const nextPageIndex = update.findIndex((page) => page === nextPage)

    if (nextPageIndex < firstPageIndex) {
      valid = false
    }
  }

  return valid
}

function getRulesForUpdate(update: Update, rules: Rule[]): Rule[] {
  const validRules: Rule[] = []
  for (const rule of rules) {
    if (rule.every((rulePage) => update.includes(rulePage))) {
      validRules.push(rule)
    }
  }

  return validRules
}

function correctUpdate(update: Update, rules: Rule[]) {
  while (!testUpdatePart2(update, rules)) {
    for (const rule of rules) {
      const firstPage = rule[0]
      const nextPage = rule[1]
      const firstPageIndex = update.findIndex((page) => page === firstPage)
      const nextPageIndex = update.findIndex((page) => page === nextPage)

      if (firstPageIndex > nextPageIndex) {
        const element = update[nextPageIndex]
        update.splice(nextPageIndex, 1)
        update.splice(firstPageIndex, 0, element)
      }
    }
  }

  return update
}

day5Part2()
