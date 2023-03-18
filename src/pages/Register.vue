<template>
  <q-page class="flex items-center justify-center">
          <q-form
            @submit="register"
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
              v-model="localNickname"
              label="nickname"
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
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { uid } from 'quasar';
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      localEmail: "",
      localNickname: "",
      password: "",
    }
  },
  mounted() {
    // this.showLoading();
  },
  methods:{
    register(){
      const db = getDatabase();
      const auth = getAuth();
      const thisObj= this;
      if(this.localEmail == ""){
        thisObj.errorMessage("Please enter your email address")
        return false
      }
      if(this.localNickname == ""){
        thisObj.errorMessage("Please enter your nickname")
        return false
      }
      if(this.password == ""){
        thisObj.errorMessage("Please enter your password")
        return false
      }
      createUserWithEmailAndPassword(auth, this.localEmail, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user)
          const userUid = user.uid;
          set(ref(db, 'users/' + userUid), {
            email: thisObj.localEmail,
            nickname: thisObj.localNickname,
            createdAt: thisObj.createNowTime(),
          })
          thisObj.successMessage("Log in")
          thisObj.$router.push("/")
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = error.message;
          if(error.message.indexOf('auth/email-already-in-use')!=-1){
            errorMessage = "email already in use";
          }
          if(error.message.indexOf('(auth/weak-password)')!=-1){
            errorMessage = "Password should be at least 6 characters ";
          }
          thisObj.errorMessage(errorMessage)
          // ..
        });
    }
  }
};
</script>

<style>
.page-name{
  
}
</style>
