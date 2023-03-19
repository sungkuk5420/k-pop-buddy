<template>
  <q-page class="flex items-center justify-center">
    <q-form
      @submit="login"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="localEmail"
        label="email"
        lazy-rules
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="password"
        lazy-rules
      />


      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
    <q-btn label="reset password" color="white" text-color="black" class="q-mr-lg"  @click="$router.push('/reset-password')"></q-btn>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getAuth,  signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from 'firebase/database';
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data(){
    return {
      localEmail:"",
      password:"",
    }
  },
  mounted() {
    // this.showLoading();
  },
  
  methods: {
    login () {
      const db = getDatabase();
      const auth = getAuth();
      console.log("login!!")
      const thisObj = this;
      signInWithEmailAndPassword(auth, this.localEmail, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user)
          thisObj.$router.push("/")
          thisObj.successMessage("login")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          
          if (error.message.indexOf('(auth/user-not-found)') != -1) {
              errorMessage = "The requested user '"+ this.localEmail+ "' could not be found.";
          }
          if (error.message.indexOf('(auth/wrong-password)') != -1) {
              errorMessage = "Incorrect password. Please try again.";
          }
          if (error.message.indexOf('(auth/weak-password)') != -1) {
            errorMessage = "Password should be at least 6 characters.";
          }
          if (error.message.indexOf('(auth/invalid-email)') != -1) {
            errorMessage = "Please enter a valid email address.";
          }
          thisObj.errorMessage(errorMessage)
        });
    }
  }
};
</script>

<style>
.page-name{
  
}
</style>
