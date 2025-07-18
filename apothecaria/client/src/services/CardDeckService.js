import { AppState } from "@/AppState.js"

class CardDeckServices {
  flipCard() {
    const deck = AppState.cardDeck54
    const flippedCard = deck.pop()
    AppState.lastFlippedCard = flippedCard
    AppState.flippedCards.unshift(flippedCard)
    return flippedCard
  }


}

export const cardDeckService = new CardDeckServices()