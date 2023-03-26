<template>
  <q-page class="login-page">
    <div class="container">
      <div class="title-1">
        <img src="~assets/logo.png" alt="">
      </div>
      <!-- <div class="title-2">커뮤니티에 오신 것을 환영해요 👋🏻 </div> -->
      <div class="title-2">Welcome to the community👋🏻 </div>
      <!-- <div class="sub-title">계정에 로그인하고 이야기를 시작해보세요!</div> -->
      <div class="sub-title">Please login to start communication!</div>
      <div class="label">E-mail</div>
        <q-input
        style="width:100%;"
          outlined 
          v-model="localEmail"
          placeholder="Please enter your e-mail."
          lazy-rules
        />
      <div class="label" style="margin-top: 12px;">Password</div>
      <q-input
      style="width:100%; margin-bottom:24px;"
        outlined 
        :type="isPwd ? 'password' : 'text'"
        placeholder="Please enter your password."
        v-model="password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="flex items-center justify-between" style="width:100%; margin-bottom: 12px;">
        <q-checkbox class="remember-id" right-label v-model="rememberId" label="Remember my ID" />
        <span class="find-password" @click="$router.push('/reset-password')">Forgot password?</span>
      </div>
      <div  class="error-message" v-show="localErrorMessage">{{ localErrorMessage }}</div>
      <q-btn label="Log in"  class="login-button" @click="login" />
      <div class="flex items-center justify-center" style="width:100%; margin-top: 24px;">
        <span class="sub-text">Don't have an account?</span>
        <span class="register-text" @click="$router.push('/register')">Register now</span>
      </div>
    </div>
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
      localErrorMessage:"",
      localEmail:"",
      password:"",
      isPwd: true,
      rememberId: true,
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
          thisObj.localErrorMessage = errorMessage
        });
    }
  }
};
</script>

<style lang="scss">
.login-page{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  .container{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 440px;
    width: 100%;
  }
  .title-1{
    font-family: 'Abhaya Libre', serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 24px;
    color: #000;
  }

  .title-2{
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 10px;
    color: #333333;
  }
  .sub-title{
    //styleName: Body1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #333333;
    margin-bottom: 24px
;
  }

  .label{
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #000;
    margin-bottom: 4px;
  }

  .remember-id{
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #333333;
  }

  .find-password{
    //styleName: Body1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    color: #2E5AFF;
    cursor: pointer;
  }

  .error-message{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    color: #EF5350;
    //styleName: Body1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: right;
    margin-bottom: 24px;;

  }

  .login-button{
    background: #111;
    color: white;
    width: 100%;
    height: 48px;
    border-radius: 6px;
    padding: 0px 16px 0px 16px;
  }

  .sub-text{
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    margin-right: 5px;
  }

  
  .register-text{
    //styleName: Body1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    color: #2E5AFF;
    cursor: pointer;
  }
}
</style>
