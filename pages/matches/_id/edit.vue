<template>
  <div class="block md:flex justify-center md:items-center h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="player-profile mt-8">
          <div class="title mb-6">
              <h2 class="text-lg md:text-3xl text-center"> Edit Match Fixture</h2>
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
                  placeholder="Select time"
                  >
                </el-time-select>
                <span class="error" v-if="$v.form.time.$error">Time is required</span>
              </div>
               <div class="flex flex-col mb-4 md:w-full">
                <label class="field-label" for="position">Fixture</label>
                <input 
                  class="field" 
                  type="text" 
                  name="fixture" 
                  v-model="form.fixture"  
                 >
                   <span class="error" v-if="$v.form.fixture.$error">Please enter Fixture</span>
              </div>
               <div class="flex flex-col mb-4 md:w-full">
                <label class="field-label" for="venue">Venue</label>
                <input 
                  class="field" 
                  type="text" 
                  name="venue" 
                  v-model="form.venue"
                >
                <span class="error" v-if="$v.form.venue.$error">Please enter venue</span>
              </div>
            
              <button
                class="btn btn-teal mx-auto" 
                type="submit"
                >
                <span v-if="loading"><fa icon="cog" spin/></span>
                <span v-else><fa icon="cog"/></span>
                  Update Fixture
              </button>
              
               <nuxt-link :to="{name: 'matches'}"
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
import { required, minLength, maxLength, between, sameAs, integer } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import format from "date-fns/format"

export default {
  middleware: 'auth',
  
  async asyncData ({ params, app }) {
    const { data: {match} }  = await app.$axios.get(`/matches/${params.id}`)

    return { match: match }
  },
  computed: {
    ...mapGetters({
      loading: 'util/loading'
    })
  },

  created() {
    this.form = {...this.match }
  },

  mixins: [ validationMixin ],

  validations: {
    form: {
        time: {
          required,
          minLength: minLength(4) 
      },
      fixture: {
          required,
          minLength: minLength(4) 
      },
      venue: {
          required,
          minLength: minLength(4  ) 
      }
    }
  },

  data () {
    return {
      form: {}
    }
  },

  methods: {
    setFirstName(value) {
        this.form.first_name = value
        this.$v.form.first_name.$touch()
      },

      setLastName(value) {
        this.form.last_name = value
        this.$v.form.last_name.$touch()
      },

      setPosition(value) {
        this.form.position = value
        this.$v.form.position.$touch()
      },
      setEmail(value) {
        this.form.email = value
        this.$v.form.email.$touch()
    },
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return 

      this.$store.commit('util/startLoading')

      const updated = {
        date: format(this.form.date, "YYYY-MM-DD"),
        time: this.form.time,
        venue: this.form.venue,
        fixture: this.form.fixture
      }
      const response = await this.$axios.put(`/matches/${this.match._id}`, updated)

       this.$store.commit('util/stopLoading')

      this.$router.push({
        path: '/matches'
      })
    }
  }
}
</script>


