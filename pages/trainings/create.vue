<template>
  <div class="block md:flex justify-center md:items-center h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="player-profile mt-8">
          <div class="title mb-6">
              <h2 class="text-lg md:text-3xl text-center"> Create Training Schedule</h2>
          </div>
      
          <div class="flex justify-center">
            <form 
              class="mb-4 md:flex md:flex-wrap md:justify-between" 
              action="/" 
              method="post" 
              @submit.prevent="submit" enctype="multipart/form-data">
              <div class="flex flex-col mb-4 md:w-1/2">
                <label class="field-label" for="date">Date</label>
                  <el-date-picker
                  v-model="form.date"
                  type="date"
                  format="dd/MM/yyyy"
                  placeholder="Pick a day">
                </el-date-picker>
              </div>
              <div class="flex flex-col mb-4 md:w-1/2">
                <label class="field-label" for="time">Time</label>
                <el-time-select
                  v-model="form.time"
                  placeholder="Select time">
                </el-time-select>
              </div>
               <div class="flex flex-col mb-4 md:w-full">
                <label class="field-label" for="position">Venue</label>
                <input class="field" type="text" name="venue" v-model="form.venue">
              </div>
            
              <button
                class="btn btn-teal mx-auto" 
                type="submit"
              >
               <span v-if="loading"><fa icon="cog" spin/></span>
               <span v-else><fa icon="cog"/></span>
              Create Schedule
              </button>
              
               <nuxt-link :to="{name: 'trainings'}"
                class="no-underline btn btn-outline mx-auto" type="submit">
                  Back To List
                </nuxt-link>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import format from "date-fns/format"

export default {
  middleware: 'auth',

  data () {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters({
      loading: 'util/loading'
    })
  },

  methods: {
    async submit() {
      this.$store.commit('util/startLoading')

      const created = {
        date: format(this.form.date, "YYYY-MM-DD"),
        time: this.form.time,
        venue: this.form.venue
      }
      const response = await this.$axios.post(`/trainings`, created)

       this.$store.commit('util/stopLoading')

      this.$router.push({
        path: '/trainings'
      })
    }
  }
}
</script>


