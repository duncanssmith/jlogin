<template>
  <div class="block md:flex justify-center min-h-screen w-full mt-8">
    <div class="w-full p-6">
      <div class="text-center">
         <h2 class="mb-2">Match Report</h2>
        <p>{{ match.fixture }}</p>
      </div>
      <div>
        <MatchReportList />
      </div>
    </div>
  </div>
</template>

<script>
import { maoGetters, mapGetters } from 'vuex'
import MatchReportList from '@/components/MatchReportList'

export default {
  middleware: 'auth',
  
  components: {
    MatchReportList
  },
  computed: {
    ...mapGetters({
      match: 'team/match'
    })
  },
  async fetch ({ store, params, app }) {
  let { data: { match, matchReports} } = await app.$axios.get(`http://localhost:4000/match-reports/${params.matchid}`)

  store.commit('team/setMatch', match)
  store.commit('team/setMatchReports', matchReports)
  }
}
</script>

<style scoped>

</style>