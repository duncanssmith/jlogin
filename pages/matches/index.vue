<template>
  <div class="block md:flex justify-center  h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="matches mt-8">
          <div class="title mb-6">
              <div class="flex justify-between">
                <h2 class="m-4">Match Fixtures</h2>
                <nuxt-link :to="{'name': 'matches-create'}" class="no-underline block text-blue mt-6">Add new</nuxt-link>
              </div>
              
              <table class="table">
                <thead class="text-sm md:text-base">
                  <tr>
                    <th scope="col">Date</th>
                     <th scope="col">Time</th>
                    <th scope="col">Fixture</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-sm md:text-base" v-for="match in matches" :key="match.id">
                    <th scope="row">{{ match.date | formatDate }}</th>
                    <th scope="row">{{ match.time }}</th>
                    <td>{{ match.fixture }}</td>
                    <td>
                      <nuxt-link 
                        :to="{name: 'matches-id-show', params: {id: match._id}}"
                        class="no-underline text-sm text-green mr-2">
                        details
                      </nuxt-link>
                       <nuxt-link 
                        :to="{name: 'matches-id-edit', params: {id: match._id}}"
                        class="no-underline text-sm text-blue">
                        edit
                      </nuxt-link>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    middleware: 'auth',
    computed: {
      ...mapGetters({
        matches: 'team/matches'
      })
    },

    async fetch ({ store, app }) {
      const { data: {matches} }  = await app.$axios.get('/matches')
      store.commit('team/setMatches', matches)
    }
  }
</script>
