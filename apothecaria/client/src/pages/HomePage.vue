<script setup>
import CardDeck from '@/components/CardDeck.vue';
import CharacterSheet from '@/components/CharacterSheet.vue';



</script>

<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-12 p-0 bg-image">
        <div class="col-md-6 m-0">
          <CardDeck />

        </div>
        <div class="col-md-6">

        </div>

      </div>

      <div class="col-12 p-0">
        <CharacterSheet />

      </div>
    </div>

  </section>

</template>

<style scoped lang="scss">
.bg-image {
  background-image: url('https://images.unsplash.com/photo-1622209470866-3692e27d665c?q=80&w=1213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  object-fit: contain;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
