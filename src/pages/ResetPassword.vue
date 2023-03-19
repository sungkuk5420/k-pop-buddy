<template>
  <q-page class="flex items-center justify-center">
    <q-form
      @submit="resetPassword"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="localEmail"
        label="email"
        lazy-rules
      />


      <div>
        <q-btn label="reset password" type="submit" color="primary"/>
      </div>
    </q-form>
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
    resetPassword(){
      const thisObj = this;
      const url = "http://localhost:4000/reset-password?email="+this.localEmail
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
      this.showLoading()
      fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              if(data.errorInfo?.code == "auth/user-not-found"){
                const errorMessage = "The requested user '"+ this.localEmail+ "' could not be found.";
                thisObj.errorMessage(errorMessage )
              }else if(data.success){
                thisObj.errorMessage("sent new password")
              }
              thisObj.hideLoading()
            });
    },
  }
};
</script>

<style>
.page-name{
  
}
</style>
