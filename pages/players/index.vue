<template>
  <div class="w-full md:w-1/2 p-6 bg-white mt-8">
    <div class="flex justify-between">
       <h2 class="m-4">Team List</h2>
       <nuxt-link :to="{'name': 'players-create'}" class="no-underline block text-blue mt-6">Add new</nuxt-link>
    </div>
   
    <div class="team-list">
       <table class="text-left m-4" style="border-collapse:collapse">
        <thead>
            <tr>
                <th class="py-2 px-2 font-sans text-sm  text-grey border-b border-grey-light">Position</th>
                <th class="py-2 px-2 font-sans text-sm  text-grey border-b border-grey-light">Player</th>
                <th class="py-2 px-2 font-sans text-sm  text-grey border-b border-grey-light"></th>
                <th class="py-2 px-2 font-sans text-sm  text-grey border-b border-grey-light"></th>

            </tr>
        </thead>
          <tbody>
              <tr class="hover:bg-blue-lightest" v-for="player in players" :key="player.id">
                  <td class="py-2 px-2 border-b border-grey-light text-sm"> {{ player.position }}</td>
                  <td class="py-2 px-2 border-b border-grey-light text-sm">
                    <nuxt-link 
                      :to="{name: 'players-id', params: {id: player._id}}"
                      class="no-underline text-blue">
                       {{ player.first_name }} {{ player.last_name }}
                    </nuxt-link>
                    
                  </td>
                  <td class="py-2 px-2 border-b border-grey-light">
                    <img 
                      class="block rounded-full mx-auto border border-grey w-8" 
                      :src="player.image ? player.image : '/img/profile.png'" alt=""/>
                  </td>
                  <td>
                    <nuxt-link 
                      :to="{name: 'players-id-edit', 
                      params: {id: player._id}}"
                      class="no-underline text-blue p-2"
                      >
                      Edit
                    </nuxt-link>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    middleware: 'auth',
    
    computed: {
      ...mapGetters({
        players: 'team/players'
      })
    },

    async fetch ({ store, app }) {
      const { data: {players} } = await app.$axios.get('/players')
      
      store.commit('team/setTeamList', players)
    }
  }
</script>
