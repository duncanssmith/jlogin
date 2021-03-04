<template>
  <div class="block md:flex justify-center md:items-center h-screen w-full">
    <div class="w-full md:w-3/4 bg-white p-6 rounded-lg">
       <div class="player-profile mt-8">
          <div class="title mb-6">
              <h2 class="text-lg md:text-3xl text-center"> Create Player</h2>
          </div>
        
          <div class="flex justify-center">
            <form class="mb-4 md:flex md:flex-wrap md:justify-between" 
              action="/" method="post" 
              @submit.prevent="submit" enctype="multipart/form-data"
              >
              <!-- First name -->
              <div 
                class="flex flex-col mb-4 md:w-1/2"
                :class="{ 'hasError': $v.form.first_name.$error }"
                >
                <label class="field-label" for="first_name">First Name</label>
                <input 
                  class="field md:mr-2" 
                  type="text" 
                  name="first_name" 
                  v-model.trim="form.first_name"
                  @input="setFirstName($event.target.value)"
                >
                <span class="error" v-if="$v.form.first_name.$error">First name is required</span>
              </div>

              <!-- Last name -->
              <div 
                class="flex flex-col mb-4 md:w-1/2"
                :class="{ 'hasError': $v.form.last_name.$error }"
                >
                <label class="field-label md:ml-2" for="last_name">Last Name</label>
                <input 
                  class="field md:ml-2" 
                  type="text" 
                  name="last_name" 
                  v-model="form.last_name"
                  @input="setLastName($event.target.value)"
                >
                <span class="error md:ml-2" v-if="$v.form.last_name.$error">Last name is required</span>
              </div>

              <!-- Position -->
               <div 
                class="flex flex-col mb-4 md:w-1/2"
                :class="{ 'hasError': $v.form.position.$error }"
                >
                <label class="field-label" for="position">Position</label>
                <input 
                  class="field md:mr-2" 
                  type="position" 
                  name="position" 
                  v-model="form.position"
                  @input="setPosition($event.target.value)"
                >
                <span class="error md:ml-2" v-if="$v.form.position.$error">Position is required (Example 'ST' for Striker or CB for Centre Back)</span>
              </div>
              <div 
                class="flex flex-col mb-4 md:w-1/2"
                :class="{ 'hasError': $v.form.email.$error }"
                >
                <label class="field-label md:ml-2" for="email">Email</label>
                <input 
                  class="field ml-2" 
                  type="email" 
                  name="email" 
                  v-model="form.email"
                  @input="setEmail($event.target.value)"
                >
                <span class="error md:ml-2" v-if="$v.form.email.$error">Email is required</span>
              </div>
               <div class="flex flex-col mb-4 md:w-full">
                <label class="field-label" for="email">Upload image</label>
                <input class="field" type="file" name="image" @change="onFileSelected">
              </div>
                <div class="mb-2">                
                    <div class="form-switch inline-block align-middle">
                        <input type="checkbox" name="1" id="1" class="form-switch-checkbox" v-model="form.userFlag"/>
                        <label class="form-switch-label" for="1"></label>
                    </div>
                    <label class="text-xs text-grey-dark" for="1">Create as user? (on)</label>
                </div>
              <button class="btn btn-teal mx-auto" type="submit">
                <span v-if="loading"><fa icon="cog" spin/></span>
                <span v-else><fa icon="cog"/></span>
                Create
              </button>
               <nuxt-link :to="{name: 'players'}"
                class="no-underline btn btn-outline mx-auto" type="submit">
                  Cancel
                </nuxt-link>
            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
 import { mapGetters, mapMutations } from 'vuex'
 import { validationMixin } from 'vuelidate'
 import { required, minLength } from 'vuelidate/lib/validators'
 
  export default {
    middleware: 'auth',
    mixins: [ validationMixin ],

    validations: {
      form: {
         first_name: {
           required,
           minLength: minLength(4) 
        },
        last_name: {
           required,
           minLength: minLength(4) 
        },
        position: {
           required,
           minLength: minLength(2) 
        },
        email: {
           required,
           minLength: minLength(4) 
        }
      }
    },

    data () {
      return {
        form: {
          first_name: '',
          last_name: '',
          email: '',
          position: '',
          userFlag: false
        },
      
        selectedFile: null
      }
    },
    computed: {
      ...mapGetters({
        loading: 'util/loading'
      })
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
  
        const fd = new FormData()
        fd.append('first_name', this.form.first_name)
        fd.append('last_name', this.form.last_name)
        fd.append('email', this.form.email)
        fd.append('position', this.form.position)
        fd.append('user_flag', this.form.userFlag)
      
        if (this.selectedFile) {
            fd.append('image', this.selectedFile, this.selectedFile.name)
        }
      
        try {
          const { data } = await this.$axios.post('/players', fd)

          if (data.result_id) {
            const userCreated = await await this.$axios.post('/auth/create', {
              first_name: this.form.first_name,
              last_name: this.form.last_name,
              email: this.form.email,
              role: 'player',
              password: 'mypass'
            })
          }

        this.$store.commit('util/stopLoading')

        this.$router.push({
          path: '/players'
        })
      } catch (err) {
        this.$store.commit('util/stopLoading')
        console.log(err)
      }
      },
      onFileSelected(event) {
        this.selectedFile = event.target.files[0]
      }
    }
  }
</script>


