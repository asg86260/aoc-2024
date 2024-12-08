import input, { example } from './input'

function add(val1: number, val2: number): number {
  return val1 + val2
}

function multiply(val1: number, val2: number): number {
  return val1 * val2
}

function concat(val1: number, val2: number): number {
  return Number(val1.toString().concat(val2.toString()))
}

const operators = {
  '+': add,
  '*': multiply,
  '||': concat,
}

type Equation = {
  expect: number
  numbers: number[]
}

const results: number[] = []
function factorial(n: number) {
  if (n === 0 || n === 1) return 1
  if (results[n] > 0) return results[n]
  results[n] = factorial(n - 1) * n
  return results[n]
}

function buildEquationArray(input: string): Equation[] {
  return input.split('\n').map((equation) => {
    const parts = equation.split(':')
    return {
      expect: Number(parts[0]),
      numbers: parts[1].trim().split(' ').map(Number),
    }
  })
}

function buildOperators(
  size: number,
  permutations = [],
  array = [],
): string[][] {
  for (const operator in operators) {
    if (size === 0) {
      return array.push(permutations)
    }
    buildOperators(size - 1, [operator, ...permutations], array)
  }

  return array
}

function testEquation(equation: Equation): number {
  const operatorCount = equation.numbers.length - 1
  const operatorCombinations = buildOperators(operatorCount)

  for (const combo of operatorCombinations) {
    let total = 0
    for (let i = 0; i < equation.numbers.length; i++) {
      if (i === 0) {
        total = equation.numbers[i]
        continue
      }
      if (combo[i - 1] === '+') {
        total = operators['+'](total, equation.numbers[i])
      }

      if (combo[i - 1] === '*') {
        total = operators['*'](total, equation.numbers[i])
      }

      if (combo[i - 1] === '||') {
        total = operators['||'](total, equation.numbers[i])
      }
    }

    if (total === equation.expect) {
      return equation.expect
    }
  }
}

function day7() {
  const equations = buildEquationArray(input)

  console.log(
    equations
      .map(testEquation)
      .filter(Boolean)
      .reduce((total, current) => total + current, 0),
  )
}

day7()
