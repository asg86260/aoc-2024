import { example, input } from './input'

type TrailNode = {
  x: number
  y: number
  height: number
  north: number | null
  east: number | null
  south: number | null
  west: number | null
}

type TopographicMap = Map<string, TrailNode>

type TrailEnds = TrailNode[]

day10(input)

function day10(input: string) {
  const map = buildMap(input)
  const trailHeads = findTrailHeads(map)
  const trailCount = findTrails(map, trailHeads)
  console.log('trailCount', trailCount)
}

function buildMap(input: string): TopographicMap {
  const map: TopographicMap = new Map()
  const rows = input.split('\n')
  rows.forEach((row, y) => {
    const columns = row.split('')
    columns.forEach((height, x) => {
      map.set(JSON.stringify({ x, y }), {
        x,
        y,
        height: Number(height),
        north: rows[y - 1] ? Number(rows[y - 1][x]) : null,
        east: columns[x + 1] ? Number(columns[x + 1]) : null,
        south: rows[y + 1] ? Number(rows[y + 1][x]) : null,
        west: columns[x - 1] ? Number(columns[x - 1]) : null,
      })
    })
  })

  return map
}

function findTrailHeads(map: TopographicMap): TrailNode[] {
  const trailHeads: TrailNode[] = []
  for (const [key, position] of map) {
    if (position.height === 0) {
      trailHeads.push(position)
    }
  }

  return trailHeads
}

function findTrails(map: TopographicMap, trailheads: TrailNode[]): number {
  let trailScore = 0
  for (const trailhead of trailheads) {
    const trailEnds: TrailEnds = []
    travel(map, trailhead, trailEnds)
    trailScore += trailEnds.length
  }

  return trailScore
}

function travel(
  map: TopographicMap,
  position: TrailNode,
  trailEnds: TrailEnds,
) {
  const { height, north, east, south, west, x, y } = position
  let newPosition = null

  if (position.height === 9) {
    trailEnds.push(position)
  }

  if (north === height + 1) {
    newPosition = map.get(getPositionKey({ x, y: y - 1 }))
    if (!newPosition) return
    travel(map, newPosition, trailEnds)
  }
  if (east === height + 1) {
    newPosition = map.get(getPositionKey({ x: x + 1, y }))
    if (!newPosition) return
    travel(map, newPosition, trailEnds)
  }
  if (south === height + 1) {
    newPosition = map.get(getPositionKey({ x, y: y + 1 }))
    if (!newPosition) return
    travel(map, newPosition, trailEnds)
  }
  if (west === height + 1) {
    newPosition = map.get(getPositionKey({ x: x - 1, y }))
    if (!newPosition) return
    travel(map, newPosition, trailEnds)
  }
}

function getPositionKey(position: Pick<TrailNode, 'x' | 'y'>): string {
  return JSON.stringify({ x: position.x, y: position.y })
}
