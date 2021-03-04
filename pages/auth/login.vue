<template>
 <div class="h-screen font-sans w-full">
     <div class="container mx-auto h-full flex justify-center mt-16">
        <div class="w-full md:w-1/3">
            <h1 class="font-hairline mb-6 text-center">Login</h1>
            <form action="" @submit.prevent="submit" class="p-6 md:p-0">
               <div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Email</label>
                    <input
                      v-model="email"
                      type="text" 
                      class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" 
                      placeholder="Enter your email">
                </div>

                <div class="mb-4">
                    <label class="font-bold text-grey-darker block mb-2">Password</label>
                    <input
                        v-model="password"
                      type="password" class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" 
                      placeholder="enter your password">
                </div>

                <div class="flex items-center justify-between">
                    <button class="bg-teal-dark hover:bg-teal text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </div>
              </div>
            </form>
        </div>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
     async submit() {
      const loginData = {
        email: this.email,
        password: this.password
      }

      await this.$auth.login({
        data: loginData
			})
		
      this.$router.push({
        path: this.$route.query.redirect || "/matches"
      })

      
    }
  }
}
</script>


