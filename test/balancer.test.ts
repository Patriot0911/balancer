import { expect, test, describe } from 'vitest'
import { balanceByPair, validateInput, pairPlayers, getClosestPairs } from '@/scripts/balanceByPair'
import { IPlayer, Role } from '@/types'

const INPUT: IPlayer[] = [
  {
    name: 'tester1',
    roles: { tank: { rankName: 'Bronze', rankValue: 25 } }
  },
  {
    name: 'tester2',
    roles: {
      tank: { rankName: 'Bronze', rankValue: 55 },
      damage: { rankName: 'Bronze', rankValue: 25 }
    }
  },
  {
    name: 'tester3',
    roles: { tank: { rankName: 'Bronze', rankValue: 56 } }
  },
  {
    name: 'tester4',
    roles: { damage: { rankName: 'Bronze', rankValue: 100 } }
  },
  {
    name: 'tester5',
    roles: { damage: { rankName: 'Bronze', rankValue: 24 } }
  },
  {
    name: 'tester6',
    roles: {
      damage: { rankName: 'Bronze', rankValue: 111 },
      support: { rankName: 'Bronze', rankValue: 25 }
    }
  },
  {
    name: 'tester7',
    roles: { support: { rankName: 'Bronze', rankValue: 25 } }
  },
  {
    name: 'tester8',
    roles: { support: { rankName: 'Bronze', rankValue: 28 } }
  },
  {
    name: 'tester9',
    roles: {
      tank: { rankName: 'Bronze', rankValue: 1 },
      support: { rankName: 'Bronze', rankValue: 1000 }
    }
  },
  {
    name: 'tester10',
    roles: { support: { rankName: 'Bronze', rankValue: 1000 } }
  },
  {
    name: 'tester11',
    roles: { tank: { rankName: 'Bronze', rankValue: 30 } }
  }
]

const COUNTS = {
  tank: 5,
  damage: 4,
  support: 5,
}

describe('validateInput', () => {
  test('should return false if there are not enough input players', () => {
    const result = validateInput([], 2)

    expect(result).equal(false)
  })

  test('should return false if teamCount is not even', () => {
    const result = validateInput(new Array(5), 1)

    expect(result).equal(false)
  })

  test('should return false if the input NOT satisfy the team requirement', () => {
    const input = INPUT.map(({ name, roles: { damage, support } }) => (
      {
        name,
        roles: { damage, support }
      }
    ))

    const result = validateInput(input, 2)

    expect(result).equal(false)
  })

  test('should return true if the input satisfy the team requirement', () => {
    const result = validateInput(INPUT, 2)

    expect(result).equal(true)
  })
})

describe('pairPlayer', () => {
  test('should pair tanks correctly', () => {
    const result = pairPlayers(INPUT, COUNTS, [Role.Tank], Role.Tank)

    const expected = [
      { gap: 5, player1Index: 0, player2Index: 10 },
      { gap: 26, player1Index: 2, player2Index: 10 },
      { gap: 5, player1Index: 10, player2Index: 0 }
    ]

    expect(result).toEqual(expected)
  })

  test('should pair damagers correctly', () => {
    const result = pairPlayers(INPUT, COUNTS, [Role.Damage, Role.Tank], Role.Damage)

    const expected = [
      { gap: 1, player1Index: 1, player2Index: 4 },
      { gap: 11, player1Index: 3, player2Index: 5 },
      { gap: 1, player1Index: 4, player2Index: 1 },
      { gap: 11, player1Index: 5, player2Index: 3 }
    ]

    expect(result).toEqual(expected)
  })

  test('should pair supports correctly', () => {
    const result = pairPlayers(INPUT, COUNTS, [Role.Tank, Role.Damage, Role.Support], Role.Support)

    const expected = [
      { gap: 0, player1Index: 5, player2Index: 6 },
      { gap: 0, player1Index: 6, player2Index: 5 },
      { gap: 3, player1Index: 7, player2Index: 5 },
      { gap: 0, player1Index: 8, player2Index: 9 },
      { gap: 0, player1Index: 9, player2Index: 8 }
    ]

    expect(result).toEqual(expected)
  })
})

describe('getClosestPairs', () => {
  test('should get closest tank pairs correctly', () => {
    const result = getClosestPairs(INPUT, COUNTS, [Role.Tank], Role.Tank)

    const expected = [
      { gap: 26, player1Index: 2, player2Index: 10 },
      { gap: 5, player1Index: 10, player2Index: 0 }
    ]

    expect(result).toEqual(expected)
  })

  test('should get closest damager pairs correctly', () => {
    const result = getClosestPairs(INPUT, COUNTS, [Role.Tank, Role.Damage], Role.Damage)

    const expected = [
      { gap: 1, player1Index: 4, player2Index: 1 },
      { gap: 11, player1Index: 5, player2Index: 3 }
    ]

    expect(result).toEqual(expected)
  })

  test('should get closest support pairs correctly', () => {
    const result = getClosestPairs(INPUT, COUNTS, [Role.Tank, Role.Damage, Role.Support], Role.Support)

    const expected = [
      { gap: 0, player1Index: 6, player2Index: 5 },
      { gap: 3, player1Index: 7, player2Index: 5 },
      { gap: 0, player1Index: 9, player2Index: 8 }
    ]

    expect(result).toEqual(expected)
  })
})

describe('balanceByPair', () => {
  test('should balance the input players by pair correctly', () => {
    const result = balanceByPair(INPUT, 2)

    const expected = [
      {
        tank: [
          {
            name: 'tester11',
            roles: { tank: { rankName: 'Bronze', rankValue: 30 } }
          }
        ],
        damage: [
          {
            name: 'tester5',
            roles: { damage: { rankName: 'Bronze', rankValue: 24 } }
          },
          {
            name: 'tester6',
            roles: {
              damage: { rankName: 'Bronze', rankValue: 111 },
              support: { rankName: 'Bronze', rankValue: 25 }
            }
          }
        ],
        support: [
          {
            name: 'tester10',
            roles: { support: { rankName: 'Bronze', rankValue: 1000 } }
          },
          {
            name: 'tester8',
            roles: { support: { rankName: 'Bronze', rankValue: 28 } }
          }
        ],
        score: 1193
      },
      {
        tank: [
          {
            name: 'tester1',
            roles: { tank: { rankName: 'Bronze', rankValue: 25 } }
          }
        ],
        damage: [
          {
            name: 'tester2',
            roles: {
              tank: { rankName: 'Bronze', rankValue: 55 },
              damage: { rankName: 'Bronze', rankValue: 25 }
            }
          },
          {
            name: 'tester4',
            roles: { damage: { rankName: 'Bronze', rankValue: 100 } }
          }
        ],
        support: [
          {
            name: 'tester9',
            roles: {
              tank: { rankName: 'Bronze', rankValue: 1 },
              support: { rankName: 'Bronze', rankValue: 1000 }
            }
          },
          {
            name: 'tester7',
            roles: { support: { rankName: 'Bronze', rankValue: 25 } }
          }
        ],
        score: 1175
      }
    ]

    expect(result).toEqual(expected)
  })
})
