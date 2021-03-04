<template>
  <div class="block md:flex justify-center md:items-center h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="player-profile mt-8">
          <div class="title mb-6">
              <h2 class="text-lg md:text-3xl text-center"> Edit Training Schedule</h2>
          </div>
      
          <div class="flex justify-center">
            <form 
              class="mb-4 md:flex md:flex-wrap md:justify-between" 
              action="/" 
              method="post" 
              @submit.prevent="submit" enctype="multipart/form-data">
              <div class="flex flex-col mb-4 md:w-1/2">
                <label class="field-label" for="first_name">Date</label>
                  <el-date-picker
                  v-model="form.date"
                  type="date"
                  format="dd/MM/yyyy"
                  placeholder="Pick a day">
                </el-date-picker>
              </div>
              <div class="flex flex-col mb-4 md:w-1/2">
                <label class="field-label" for="last_name">Time</label>
                <input class="field md:ml-2" type="text" name="last_name" v-model="form.time">
              </div>
               <div class="flex flex-col mb-4 md:w-full">
                <label class="field-label" for="position">Venue</label>
                <input class="field" type="position" name="position" v-model="form.venue">
              </div>
            
              <button
                class="btn btn-teal mx-auto" 
                type="submit">Update Schedule
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
import format from "date-fns/format"

export default {
  middleware: 'auth',
  
  async asyncData ({ params, app }) {
    const { data: {training} }  = await app.$axios.get(`/trainings/${params.id}`)

    return { training: training }
  },

  created() {
    this.form = {...this.training }
  },

  data () {
    return {
      form: {}
    }
  },

  methods: {
    async submit() {
      const updated = {
        date: format(this.form.date, "YYYY-MM-DD"),
        time: this.form.time,
        venue: this.form.venue
      }
      const response = await this.$axios.put(`/trainings/${this.training._id}`, updated)

      this.$router.push({
        path: '/trainings'
      })
    }
  }
}
</script>


