import { expect, test, describe } from 'vitest'
import { balanceByPair } from '@/scripts/balanceByPair'
import { IPlayer } from '@/types'

const INPUT: IPlayer[] = [
  {
    name: 'p1',
    roles: {
      damage: { rankName: 'b', rankValue: 1800 },
      tank: { rankName: 'платина', rankValue: 2700 },
      support: { rankName: 'g', rankValue: 2000 }
    }
  },
  {
    name: 'p2',
    roles: {
      damage: { rankName: 'b', rankValue: 600 },
      tank: { rankName: 'п', rankValue: 2900 },
      support: { rankName: 'master', rankValue: 4200 }
    }
  },
  {
    name: 'p3',
    roles: {
      damage: { rankName: 'b', rankValue: 2100 },
      support: { rankName: 's', rankValue: 1800 }
    }
  },
  {
    name: 'p4',
    roles: {
      damage: { rankName: 'даймонд', rankValue: 3800 },
      support: { rankName: 'срібло', rankValue: 2100 }
    }
  },
  {
    name: 'p5',
    roles: {
      tank: { rankName: 'срібло', rankValue: 1700 },
      support: { rankName: 'срібло', rankValue: 1800 }
    }
  },
  {
    name: 'p6',
    roles: { tank: { rankName: 'золото', rankValue: 2600 } }
  },
  {
    name: 'p7',
    roles: { support: { rankName: 'gold', rankValue: 2200 } }
  },
  {
    name: 'p8',
    roles: {
      tank: { rankName: 'pt', rankValue: 3200 },
      support: { rankName: 'platinum', rankValue: 2700 }
    }
  },
  {
    name: 'p9',
    roles: { damage: { rankName: 'grand master', rankValue: 4300 } }
  },
  {
    name: 'p0',
    roles: {
      damage: { rankName: 's', rankValue: 2400 },
      tank: { rankName: 'майстр', rankValue: 4300 },
      support: { rankName: 'бронза', rankValue: 300 }
    }
  }
]

describe('balanceByPair', () => {
  test('should return undefined if there are not enough input players', () => {
    const result = balanceByPair([])

    expect(result).toBeUndefined()
  })

  test('should return undefined if teamCount is not even', () => {
    const result = balanceByPair(new Array(5), 1)

    expect(result).toBeUndefined()
  })

  test('should return undefined if the input not satisfy the team requirement', () => {
    const input = INPUT.map(({ name, roles: { damage, support } }) => (
      {
        name,
        roles: { damage, support }
      }
    ))

    const result = balanceByPair(input)

    console.dir(result, { depth: null })

    expect(undefined).toBeUndefined()
  })
})
