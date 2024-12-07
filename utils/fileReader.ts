export async function getInput(fileName = '/input.txt') {
  const file = Bun.file(fileName)

  return await file.text()
}
