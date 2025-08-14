<script setup>

</script>


<template>

  <section class="container text-white text-shadow">
    <div class="row">
      <div class="col-12 d-flex flex-column justify-content-center">
        <h3 class="text-center fw-bold mb-0">Week X of "SEASON"</h3>
        <h2 class="text-center fw-bold mb-0">Patient</h2>
        <div class="rounded col-12 d-flex">
          <div class="rounded col-md-6 d-flex justify-content-between ">
            <input type="text" placeholder="Name" class="fs-5 rounded flex-grow-1 m-1">
          </div>
          <div class="rounded col-md-6 d-flex justify-content-between">
            <input type="text" placeholder="Job" class="fs-5 rounded flex-grow-1 m-1">
          </div>

        </div>
        <div class="d-flex justify-content-center">
          <div class="col-md-8 d-flex">
            <textarea placeholder="Description" rows="5" id="weekly-log"
              class="fs-6 rounded m-1 flex-grow-1"></textarea>
          </div>
          <div class="col-md-4 d-flex flex-column fs-3 justify-content-center align-items-center timer-rounded ">
            <b class="text-center">Timer:</b>
            <b class="text-center">13/13</b>
          </div>

        </div>
      </div>
    </div>
  </section>

</template>


<style lang="scss" scoped>
.timer-rounded {
  aspect-ratio: 1/1;
  border-radius: 50%;
  border-color: indigo;
  border-width: medium;
  border-style: solid;
}
</style>