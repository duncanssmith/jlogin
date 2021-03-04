<template>
  <div class="block md:flex justify-center min-h-screen w-full mt-8">
     <div class="w-full md:w-1/2">
      <div class="team-list bg-white p-6 min-h-half mx-3">
        <h4 class="text-center mb-6">Match Fixture Details</h4>
        <div class="match-fixture">
             <!-- fixture -->
          <div class="flex text-base md:text-xl mb-2 justify-center text-grey-darker">
              <div class="pl-2"> 
                {{ match.fixture}}
              </div>
          </div>

          <!-- Date -->
          <div class="flex text-base md:text-xl mb-2 justify-center text-grey-darker">
            <div class="mr-2">Date:</div>
              <div class="pl-2">
                {{ match.date | formatDate }}
              </div>
          </div>
          <!-- Position -->
          <div class="flex text-base md:text-xl mb-2 justify-center text-grey-darker">
            <div class="mr-2">Time:</div>
              <div class="pl-2">
                {{ match.time }}
              </div>
          </div>

          <div class="flex text-sm md:text-xl mb-2 justify-center text-grey-darker my-6">
            <nuxt-link to="/matches" class="no-underline text-sm text-white py-2 px-3 bg-blue-dark">
              Back To fixtures
            </nuxt-link>
            <nuxt-link 
               :to="{name: 'match-report-matchid', params: {matchid: match._id}}"
              class="no-underline text-sm text-white py-2 px-3 bg-orange-dark hover:bg-orange-darker ml-2">
              Match report
            </nuxt-link>
            <button
              @click.prevent="saveSelectedPlayers"
              class="bg-green text-sm text-white px-4 py-2 ml-2">Save selection
            </button>
        
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-full md:w-1/2">
      <div class="team-list bg-white p-6 min-h-half mx-6">
        <h4>Team Selection</h4>
        <div class="team-list">
          <PlayerList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PlayerList from '@/components/players/PlayerList'
import PlayerTarget from '@/components/modals/PlayerTarget'


export default {
  async fetch ({ store, params, app }) {
      let { data: { match} } = await app.$axios.get(`/matches/${params.id}`)
      store.commit('team/setMatch', match)
      store.commit('team/setSelectedPlayers', match.selection)
  },

  created () {
    this.$store.dispatch('team/getPlayers')
  },

  computed: {
    ...mapGetters({
      match: 'team/match',
      selectedPlayers: 'team/selectedPlayers'
    })
  },
  components: {
    PlayerList,
    PlayerTarget
  },
  methods: {
    async saveSelectedPlayers() {
      const matchId = this.match._id
      const result = await this.$axios.put(`/matches/${matchId}/selection`, 
        { selectedPlayers: this.selectedPlayers }
      )
      console.log(result)
    }
  }
}
</script>
