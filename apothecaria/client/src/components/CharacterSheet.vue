<script setup>


</script>


<template>
  <section class="container-fluid bg-info ">
    <div class="row gap-1 justify-content-around">


      <div class="col-md-5 m-1 border rounded flex-grow-1">
        <div class="col">
          <h1 class="text-center text-dark rounded fw-bold display-3 mb-0">Apothecaria</h1>
          <p class="text-center mt-0 fs-5">Character Sheet</p>
        </div>
        <!-- SECTION Character Sheet -->
        <div class="col d-flex flex-row align-items-start">
          <div class="col-md-8 d-flex flex-column">
            <span>Name:</span>
            <span>Age:</span>
            <span>Description:</span>
          </div>
          <div class="col-md-4 d-flex flex-column align-items-start">
            <span><i class="text-red mdi mdi-account-heart-outline"></i> Reputation: 0</span>
            <span class=""><i class=" mdi mdi-purse"></i>Silver: 0</span>

          </div>
        </div>
        <div class="d-flex flex-row mt-3">
          <div class="col-md-8">
            <h2 class="text-center">Familiar</h2>
            <div class="d-flex flex-column">
              <span>Name:</span>
              <span>Animal:</span>
              <span>Skill:</span>
            </div>
          </div>
          <div class="col-md-4 d-flex justify-content-end">
            <img
              src="https://media.istockphoto.com/id/1093691338/photo/carrion-crow-bright-background.jpg?s=612x612&w=0&k=20&c=jnHuhs8TL6PLSKiUNOP6gKB2h_Bx4KFrGFTqVGckhZ8="
              alt="" class="img-fluid img-style ">
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap">
          <div class="col-md-12">

            <h2 class="text-center">Tools</h2>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-column">
              <div class="position-relative border-bottom">

                <span class="bottom-left ">Mortar & Pestal</span>
              </div>
              <div class="position-relative border-bottom">
                <span>Alembic</span>
              </div>
              <div class="position-relative border-bottom">
                <span>Cauldron</span>
              </div>
              <div class="position-relative border-bottom"></div>
            </div>
          </div>

          <div class="ps-3 mb-3 col-md-6">
            <div class="d-flex flex-column ">
              <div class="position-relative border-bottom"></div>
              <div class="position-relative border-bottom"></div>
              <div class="position-relative border-bottom"></div>
              <div class="position-relative border-bottom"></div>
            </div>
          </div>
        </div>
      </div>



      <div class="col-md-5 m-1 border rounded flex-grow-1">
        <div class="col">
          <h1 class="text-center text-dark rounded fw-bold display-3 mb-0">Apothecaria</h1>
          <p class="text-center mt-0 fs-5">Character Sheet</p>
        </div>
      </div>
    </div>


  </section>
</template>


<style lang="scss" scoped>
.img-style {
  height: 150px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%;
}

.bottom-left {
  position: absolute;
  left: 0;
  bottom: 0;
}

.position-relative {
  height: 1.5rem;
}
</style>