<template>
  <div class="w-full h-screen md:w-1/2 p-6 bg-white mt-8">
    <div class="flex justify-between">
       <h2 class="m-4">Training Schedule</h2>
       <nuxt-link :to="{'name': 'trainings-create'}" class="no-underline block text-blue mt-6">Add new</nuxt-link>
    </div>
   
    <div class="training-list">
       <TrainingList />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import TrainingList from '@/components/training/TrainingList'

  export default {
    middleware: 'auth',

    components: {
      TrainingList
    },
    
    computed: {
      ...mapGetters({
        players: 'team/players'
      })
    },

    async fetch ({ store, app }) {
      const { data: {trainings} } = await app.$axios.get('/trainings')
      
      store.commit('training/setTrainingSchedules', trainings)
    }
  }
</script>
