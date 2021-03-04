<template>
<div class="bg-cover bg-green w-screen bg-no-repeat relative hero-home">
  <section class="flex justify-center items-center w-full pt-8">
      <div class="container min-h-screen flex justify-center"> 
          <div class="rounded overflow-hidden shadow-lg m-4">
            <div class="p-6">
              <div class="font-bold text-grey-light text-2xl text-center md:text-5xl  mb-4 mt-2">Shenstone U-18 FC</div>
              <p class="text-grey-light text-xl md:text-4xl">
                Team website of the Shenstone U-18 Football club
              </p>
            </div>
            <div class="p-6 flex justify-center">
              <nuxt-link 
                to="/matches" 
                class="no-underline text-grey-light text-xl md:text-2xl bg-green-darker hover:bg-green-darkest py-3 px-4">
                  Scheduled Matches
                </nuxt-link>
            </div>
          </div>
      </div>
  </section>
</div>
  
</template>

<script>

export default {
 auth: false
}
</script>

<style>

/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
