<template>
  <div class="block md:flex justify-center md:items-center h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="player-profile mt-16">
          <div class="title mb-6">
              <h2 class="text-lg md:text-3xl text-center"> Player Profile</h2>
          </div>
          <!-- Avatar -->
          <div class="flex justify-center my-6">
            <div class="avatar">
              <img :src="player.image" class="rounded-full" alt="">
            </div>
          </div>
          <!-- Name -->
          <div class="flex text-base md:text-xl mb-2 justify-center text-grey-darker">
          <div>Name: </div>
              <div class="pl-2"> 
                {{ player.first_name}}  {{ player.last_name}} 
              </div>
          </div>

          <!-- Position -->
          <div class="flex text-base md:text-xl mb-2 justify-center text-grey-darker">
            <div class="mr-2">Position:</div>
              <div class="pl-2">
                {{ player.position}}
              </div>
          </div>

          <div class="flex text-base md:text-xl mb-2 justify-center text-grey-darker my-6">
            <nuxt-link to="/players" class="no-underline text-white py-2 px-3 bg-blue-dark">
              Back To List
            </nuxt-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth',
    
    async asyncData ({ params, app }) {
     const { data: {player} }  = await app.$axios.get(`/players/${params.id}`)

      return { player: player }
    }
  }
</script>
