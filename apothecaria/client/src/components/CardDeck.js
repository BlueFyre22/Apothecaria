import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

const SUITS = ['♦️', '♠️', '♣️', '♥️']
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


export default class CardDeck {
  constructor(cards = freshDeck()) {
    cards.unshift(new Card('🃏', 'Red'))
    cards.push(new Card('🃏', 'Blk'))
    this.cards = cards
    logger.log("why are these cards and appstate is objects?", cards)
    AppState.cardDeck54 = cards
    //reset the flipped cards so they dont show on the page
    AppState.flippedCards = []
  }

  get numberOfCards() {
    return this.cards.length
  }


  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      // logger.log("new index", newIndex)
      const oldValue = this.cards[newIndex]
      // logger.log("old index", oldValue)
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }


}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  get color() {
    return this.suit === '♣️' || this.suit === "♠️" || this.value === "Blk" ? 'black' : 'red'
  }

}



function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}