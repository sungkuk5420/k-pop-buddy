<template>
  <q-page class="flex items-center justify-center">
          <q-form
            @submit="register"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="email"
              label="email"
              lazy-rules
            />
            <q-input
              filled
              v-model="nickName"
              label="nickName"
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { uid } from 'quasar';
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      email: "",
      nickName: "",
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
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user)
          const userUid = user.uid;
          set(ref(db, 'users/' + userUid), {
            email: thisObj.email,
            nickName: thisObj.nickName,
            createdAt: thisObj.createNowTime(),
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
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
