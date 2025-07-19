<script setup>

import { logger } from '@/utils/Logger.js';
import CardDeck from './CardDeck.js';
import { computed, onMounted } from 'vue';
import { AppState } from '@/AppState.js';
import { cardDeckService } from '@/services/CardDeckService.js';

async function getCardDeck() {
  const deck = new CardDeck()
  // logger.log("♥️♣️♠️♦️", deck)
  deck.shuffle()
  // logger.log("shuffled", deck)
  playShuffleSound()


}
const flippedCards = computed(() => AppState.flippedCards)
const lastFlippedCard = computed(() => AppState.lastFlippedCard)

onMounted(() => {
  getCardDeck()
})

function playShuffleSound() {
  const shuffleSound = new Audio("/src/assets/Sounds/shuffling-cards-1.mp3");
  shuffleSound.volume = .35; // goes from 0.0 to 1.0 (nothing to as loud as possible)
  shuffleSound.play()
}

const shuffledDeck = computed(() => AppState.cardDeck54)

async function flipCard() {
  const returnedValue = await cardDeckService.flipCard()
  // logger.log("returned value 🎴🎴🎴", returnedValue)

}

</script>


<template>
  <section class="container-fluid bg-grey ">
    <div class="row ">
      <div class="col-12 d-flex p-0 ms-2 ">
        <div v-if="shuffledDeck.length >= 0" class="col-sm-12 col-md-4 col-lg-5 mt-3">
          <button @click="getCardDeck()">Shuffle Deck!</button>
          <div class="d-flex gap-3">
            <div @click="flipCard()" role="button"
              class="mt-3 border border-success col-md-4 card deck-bg-img text-white">
              <p class="m-0 user-select-none">{{ shuffledDeck.length }}</p>
            </div>
            <div v-if="flippedCards.length != 0"
              :class="`card ${lastFlippedCard.color} mt-3 border border-success col-md-4`"
              :data-value="`${lastFlippedCard.value} ${lastFlippedCard.suit}`">
              <p :class="`m-0 user-select-none`">{{ lastFlippedCard.suit }}</p>

            </div>

          </div>


        </div>
      </div>

    </div>
  </section>
</template>


<style lang="scss" scoped>
*,
*::after,
*::before {
  box-sizing: border-box;
}

.card.red {
  color: red
}

.card.black {
  color: black;
}

.card {
  position: relative;
  max-height: 20dvh;
  aspect-ratio: 2/3;
  font-size: 4rem;
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  border-width: 3px !important;
  border-radius: 8%;

  @media screen and (min-width: 768px) {
    max-height: 300px;
    max-width: 200px;
  }

  @media screen and (min-width:2785px) {
    max-height: 400px;
    max-width: 250px;
  }
}

.card::before,
.card::after {
  position: absolute;
  content: attr(data-value);
  font-size: 1.5rem;
}

.card::before {
  top: .5rem;
  left: .5rem;
}

.card::after {
  bottom: .5rem;
  right: .5rem;
  transform: rotate(180deg);
}




.deck-bg-img {
  background-image: url("/src/assets/img/woods\ image.jpg");
}



.flipped-cards {
  max-height: 20dvh;
  aspect-ratio: 2/3;
  padding: 3px;
  background-size: cover;
  border-width: 3px !important;
  border-radius: 8%;

  @media screen and (min-width: 768px) {
    max-height: 300px;
    max-width: 200px;
  }

  @media screen and (min-width:2785px) {
    max-height: 400px;
    max-width: 250px;
  }

}
</style>