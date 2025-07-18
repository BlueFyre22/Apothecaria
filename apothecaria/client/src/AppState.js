import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/Card.js').Card[]} */
  cardDeck52: [],
  /** @type {import('./models/Card.js').Card[]} */
  cardDeck54: [],

  /** @type {import('./models/Card.js').Card} */
  card: null,

  flippedCards: [],
  lastFlippedCard: {}
})

