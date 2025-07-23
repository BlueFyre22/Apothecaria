<script setup>

import { logger } from '@/utils/Logger.js';
import CardDeck from './CardDeck.js';
import { computed, onMounted, ref } from 'vue';
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

// Variables to track drag-and-drop state
const dragIndex = ref(null)
const dropTargetIndex = ref(null)

// Start dragging a card
function onDragStart(card, index) {
  dragIndex.value = index
  logger.log('Started dragging card at index:', index)
}

// While dragging over a card, update the drop target
function onDragOver(e, index) {
  e.preventDefault()
  dropTargetIndex.value = index
}

// When entering a card area, update the drop target
function onDragEnter(e, index) {
  e.preventDefault()
  dropTargetIndex.value = index
}

// When leaving a card area, clear the drop target if needed
function onDragLeave(e, index) {
  e.preventDefault()
  // Only clear if leaving the last card
  if (dropTargetIndex.value === index) dropTargetIndex.value = null
}

// Drop the dragged card at the new position
function onDrop(e, dropIndex) {
  e.preventDefault()
  logger.log('Dropping card at index:', dropIndex)
  if (dragIndex.value === null || dragIndex.value === dropIndex) {
    dragIndex.value = null
    dropTargetIndex.value = null
    return
  }
  // Move the dragged card to the new position in flippedCards
  const cards = AppState.flippedCards
  const [moved] = cards.splice(dragIndex.value, 1)
  cards.splice(dropIndex, 0, moved)
  dragIndex.value = null
  dropTargetIndex.value = null
}









</script>


<template>
  <section class="container-fluid bg-primary ">
    <div class="row ">
      <div class="col-12 d-flex p-0 ms-2 ">
        <div v-if="shuffledDeck.length >= 0" class="col-sm-12 col-md-4 col-lg-5 mt-3">
          <button @click="getCardDeck()">Shuffle Deck!</button>
          <div class="d-flex gap-3 align-items-start">
            <div @click="flipCard()" role="button"
              class="mt-3 border border-success card deck-bg-img text-white flex-shrink-0">
              <p class="m-0 user-select-none">{{ shuffledDeck.length }}</p>
            </div>

            <!-- Flipped cards area: shows cards in a stacked layout with drag-and-drop -->
            <div class="flipped-cards-container bg-primary position-relative mt-3" v-if="flippedCards.length > 0">
              <template v-for="(card, i) in flippedCards.slice().reverse()" :key="card.id || i">
                <!-- Drop highlight before each card -->
                <div v-if="dropTargetIndex === (flippedCards.length - 1 - i)" class="drop-highlight" :style="{
                  left: `${(i % 27) * 30 - 5}px`,
                  top: `${Math.floor(i / 27) * 120}px`,
                  zIndex: 1000
                }">">
                </div>

                <!-- Card: draggable and positioned with stacking offset -->
                <div :class="[
                  card.color,
                  'bg-white',
                  'border',
                  'border-success',
                  'draggable',
                  'position-absolute',
                  (card.value == 'Blk' || card.value == 'Red') ? 'joker' : 'card'
                ]" :style="{
                  left: `${(i % 27) * 30}px`,
                  top: `${Math.floor(i / 27) * 120}px`,
                  zIndex: i + 1
                }" :data-value="`${card.value} ${card.suit}`" draggable="true"
                  @dragstart="onDragStart(card, flippedCards.length - 1 - i)"
                  @dragover="onDragOver($event, flippedCards.length - 1 - i)"
                  @dragenter="onDragEnter($event, flippedCards.length - 1 - i)"
                  @dragleave="onDragLeave($event, flippedCards.length - 1 - i)"
                  @drop="onDrop($event, flippedCards.length - 1 - i)">

                  <p class="user-select-none mt-3">{{ card.suit }}</p>
                </div>
              </template>

              <!-- Highlight at the end if dragging past last card -->
              <div v-if="dropTargetIndex === flippedCards.length" class="drop-highlight" :style="{
                left: `${(flippedCards.length % 27) * 30 - 5}px`,
                top: `${Math.floor(flippedCards.length / 27) * 120}px`,
                zIndex: 1000
              }">>">
              </div>
            </div>

            <!-- Placeholder to maintain layout when no cards are flipped -->
            <div v-else class="flipped-cards-container bg-primary position-relative mt-3"></div>
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

.joker.red {
  color: red
}

.joker.black {
  color: black;
}

.joker {
  font-size: xx-large;
  position: relative;
  max-height: 300px;
  min-height: 100px;
  aspect-ratio: 2/3;
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  border-width: 3px !important;
  border-radius: 8%;


  @media screen and (min-width: 768px) {
    max-height: 150px;
    max-width: 75px;
    font-size: 4rem;
    aspect-ratio: 2/3;
    font-size: xx-large;

  }

  @media screen and (min-width:2785px) {
    max-height: 400px;
    max-width: 250px;
    font-size: xx-large;
  }
}

.card {
  position: relative;
  max-height: 300px;
  min-height: 100px;
  aspect-ratio: 2/3;
  font-size: large;

  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  border-width: 3px !important;
  border-radius: 8%;

  @media screen and (min-width: 768px) {
    max-height: 150px;
    max-width: 75px;
    font-size: 4rem;
    aspect-ratio: 2/3;
    font-size: x-large;

  }

  @media screen and (min-width:2785px) {
    max-height: 400px;
    max-width: 250px;
    font-size: xx-large;
  }
}

.card::before,
.card::after {
  position: absolute;
  content: attr(data-value);
  font-size: small;


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

.joker::before,
.joker::after {
  position: absolute;
  content: attr(data-value);
  font-size: small;
}

.joker::before {
  top: .5rem;
  left: .5rem;
}

.joker::after {
  bottom: .5rem;
  right: .5rem;
  transform: rotate(180deg);
}




.deck-bg-img {
  background-image: url("/src/assets/img/woods\ image.jpg");
}



.draggable {
  cursor: move;
}

.flipped-cards-container {
  height: auto;
  min-height: 300px;
  /* Increased height to accommodate both rows plus padding */
  min-width: 820px;
  /* Minimum width for 27 cards (27 * 30px = 810px + padding) */
  background-color: #f5f5f5;
  /* Light grey background */
  border-radius: 8px;
  /* Rounded corners */
  padding: 10px;
  /* Padding around the cards */
}

.drop-highlight {
  position: absolute;
  top: 0;
  width: 10px;
  height: 180px;
  background: rgba(0, 123, 255, 0.3);
  border: 2px solid #007bff;
  border-radius: 4px;
  pointer-events: none;
  transition: left 0.1s;
}
</style>