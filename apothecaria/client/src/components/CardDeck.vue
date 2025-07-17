<script setup>

import { logger } from '@/utils/Logger.js';
import CardDeck from './CardDeck.js';
import { computed, onMounted } from 'vue';
import { AppState } from '@/AppState.js';

async function getCardDeck() {
  const deck = new CardDeck()
  logger.log("♥️♣️♠️♦️", deck)
  deck.shuffle()
  logger.log("shuffled", deck)

}

onMounted(() => {
  getCardDeck()
})

const shuffledDeck = computed(() => AppState.cardDeck54)

</script>


<template>
  <section class="container-fluid">
    <div class="row ">
      <div class="col-12 d-flex p-0 ms-2">
        <div v-if="shuffledDeck.length == 54" class="col-sm-12 col-md-4 col-lg-6 mt-3 ">

          <button @click="getCardDeck()">Shuffle Deck!</button>
          <div class="mt-3 border border-black rounded col-md-4 deck-of-cards">

            <p class="m-0">{{ shuffledDeck.length }}</p>
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

.deck-of-cards {
  max-height: 20dvh;
  aspect-ratio: 2/3;
  font-size: 3rem;
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  border-width: 3px !important;



  @media screen and (min-width: 768px) {
    max-height: 400px;
    max-width: 250px;
  }

  @media screen and (min-width:2785px) {
    max-height: 400px;
    max-width: 250px;
  }

}
</style>