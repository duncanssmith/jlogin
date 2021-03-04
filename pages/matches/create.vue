<template>
  <div class="block md:flex justify-center md:items-center h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="player-profile mt-8">
          <div class="title mb-6">
              <h2 class="text-lg md:text-3xl text-center"> Create Match Fixture</h2>
          </div>
      
          <div class="flex justify-center">
            <form 
              class="mb-4 md:flex md:flex-wrap md:justify-between" 
              action="/" 
              method="post" 
              @submit.prevent="submit" enctype="multipart/form-data">
              <div 
                class="flex flex-col mb-4 md:w-1/2"
                >
                <label class="field-label" for="date">Date</label>
                  <el-date-picker
                  v-model="form.date"
                  type="date"
                  format="dd/MM/yyyy"
                  placeholder="Pick a day">
                </el-date-picker>
              </div>
              <div 
                class="flex flex-col mb-4 md:w-1/2"
                :class="{ 'hasError': $v.form.time.$error }"
                >
                <label class="field-label" for="time">Time</label>
                <el-time-select
                  v-model="form.time"
                  placeholder="Select time">
                </el-time-select>
                 <span class="error" v-if="$v.form.time.$error">Time is required</span>
              </div>
               <div 
               class="flex flex-col mb-4 md:w-full"
               :class="{ 'hasError': $v.form.fixture.$error }"
               >
                <label class="field-label" for="position">Fixture</label>
                <input class="field" type="text" name="fixture" v-model="form.fixture">
                <span class="error" v-if="$v.form.fixture.$error">Please enter fixture (Team A vs Team B)</span>
              </div>
               <div 
                class="flex flex-col mb-4 md:w-full"
                :class="{ 'hasError': $v.form.venue.$error }"
                >
                <label class="field-label" for="venue">Venue</label>
                <input class="field" type="text" name="venue" v-model="form.venue">
                 <span class="error" v-if="$v.form.venue.$error">Please enter venue</span>
              </div>
            
              <button
                class="btn btn-teal mx-auto" 
                type="submit"
              >
               <span v-if="loading"><fa icon="cog" spin/></span>
                <span v-else><fa icon="cog"/></span>
                Create Fixture
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

  computed: {
    ...mapGetters({
      loading: 'util/loading'
    })
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
           minLength: minLength(2) 
        },
        venue: {
           required,
           minLength: minLength(4)
        }
      }
    },

  data () {
    return {
      form: {
        date: '',
        time: '',
        fixture: '',
        venue: ''
      }
    }
  },

  methods: {
    setDate(value) {
      this.form.date = value
      this.$v.form.date.$touch()
    },
    setTime(value) {
      this.form.time = value
      this.$v.form.time.$touch()
    },
     setFixture(value) {
      this.form.fixture = value
      this.$v.form.fixture.$touch()
    },
     setVenue(value) {
      this.form.venue = value
      this.$v.form.venue.$touch()
    },

    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) return 

      this.$store.commit('util/startLoading')

      const created = {
        date: format(this.form.date, "YYYY-MM-DD"),
        time: this.form.time,
        venue: this.form.venue,
        fixture: this.form.fixture
      }
      const response = await this.$axios.post(`/matches`, created)

       this.$store.commit('util/stopLoading')

      this.$router.push({
        path: '/matches'
      })
    }
  }
}
</script>


