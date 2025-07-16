<script setup>
import { ref } from 'vue';

const animalsAvailable = ['🦍', '🦧', '🐖', '🦖', '🐋', '🐅', '🐓', '🐄', '🐒', '🐈‍⬛', '🦏']
const bouncers = ref([])


function addAnimal(){
  const randomAnimal = animalsAvailable[Math.floor(Math.random()* animalsAvailable.length)]
  bouncers.value.push({emoji:randomAnimal, vSpeed: Math.random()* 4 + 2, hSpeed: Math.random()* 4 + 2})
}


</script>

<template>
  <div class="home-container">
    <article class="card shadow">
      <div class="card-body">
        <div class="card-title">
          <img src="../assets/img/vue-logo.png" class="vue-logo" alt="vue js logo">
          Vue Template
        </div>
        <button @click="addAnimal()" class="btn btn-vue w-100">click me!</button>
      </div>
    </article>
  </div>
  <div v-for="(animal, i) in bouncers" :key="animal + i" class="animal-bouncer" >
    <div :style="`--speed: ${animal.vSpeed}s`">
      <span :style="`--speed: ${animal.hSpeed}s`">{{ animal.emoji }}</span>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.home-container{
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-logo{
  width: 50px;
  height: auto;
  pointer-events: none;
}

.card-title{
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
}

.animal-bouncer{
  position: fixed;
  height: 100dvh;
  width: 100dvw;
  top: 0;
  left: 0;
  pointer-events: none;
  div{
    position: fixed;
    height: 100dvh;
    width: 100dvw;
    top: 0;
    left: 0;
    pointer-events: none;
    animation: var(--speed) up-down linear infinite alternate;
    span{
    animation: var(--speed) left-right linear infinite alternate;
    font-size: 18px;
  }
  }
}

@keyframes left-right {
  0%{
    margin-left: 0%;
  }
  100%{
    margin-left: calc(100dvw - 18px);
  }
}
@keyframes up-down {
  0%{
    margin-top: 0%;
  }
  100%{
    margin-top:calc(100dvh - 18px);
  }
}
</style>