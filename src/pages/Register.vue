<template>
  <q-page class="register-page">
    <div class="container">
      <div class="title-1">Kbeauty Buddie</div>
      <div class="title-2">만나서 반가워요 👋🏻  </div>
      <div class="sub-title">간단하게 계정을 생성하고, 이야기를 시작해보세요!</div>
      <div class="label">Nickname</div>
        <q-input
          autoComplete="new-password"
          style="width:100%;"
          outlined 
          v-model="localNickname"
          placeholder="Please enter your nickname."
          lazy-rules
        />
        <div class="nickname-sub-text">
          This is the name that will be shown with your messages. You may use any name you wish
        </div>
      <div class="label">E-mail</div>
        <q-input
          autoComplete="new-password"
          style="width:100%;"
          outlined 
          v-model="localEmail"
          placeholder="Please enter your e-mail."
          lazy-rules
        />
      <div class="label" style="margin-top: 12px;">Password</div>
      <q-input
        autoComplete="new-password"
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
      
      <div class="h-captcha" data-sitekey="e6a6c115-edd5-4575-91d8-77b23e148624"></div>

      <div class="flex items-center justify-start items-center" style="width:100%; margin-bottom: 12px;">
        <q-checkbox class="remember-id" right-label v-model="agree"  />
        <span class="agree-text">I agree to the </span>
        <span class="agree-link" @click="$router.push('/reset-password')">terms</span>
        <span class="agree-text"> and </span>
        <span class="agree-link" @click="$router.push('/reset-password')">privacy policy.</span>
      </div>
      <div  class="error-message" v-show="localErrorMessage">{{ localErrorMessage }}</div>
      <q-btn label="Register"  class="login-button" @click="register" />
    </div>
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
      localErrorMessage: "",
      isPwd: true,
      agree: false,
    }
  },
  mounted() {
    // this.showLoading();
  },
  methods:{
    hCaptcha(){
      const element = document.querySelector('#post-request .article-id');
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ d: 'response=CLIENT-RESPONSE&secret=0x3DFDc1C70D64EA043483e7b430B18D3b5f717ee2' })
      };
      fetch('https://hcaptcha.com/siteverify', requestOptions)
          .then(response => response.json())
          .then(data => element.innerHTML = data.id );
    },
    register(){
      const db = getDatabase();
      const auth = getAuth();
      const thisObj= this;
      if(this.localNickname == ""){
        thisObj.localErrorMessage = "Please enter your nickname."
        return false
      }
      if(this.localEmail == ""){
        thisObj.localErrorMessage = "Please enter your email address."
        return false
      }
      if(this.password == ""){
        thisObj.localErrorMessage = "Please enter your password."
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
          let errorMessage = error.message;
          if(error.message.indexOf('auth/email-already-in-use')!=-1){
            errorMessage = "Email already in use";
          }
          if(error.message.indexOf('(auth/weak-password)')!=-1){
            errorMessage = "Password should be at least 6 characters ";
          }
          if(error.message.indexOf('(auth/invalid-email)')!=-1){
            errorMessage = "Please enter a valid email address";
          }
          thisObj.localErrorMessage = errorMessage
          // ..
        });
    }
  }
};


</script>

<style lang="scss">
.register-page{
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

  .agree-text{
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
  .agree-link{
    //styleName: Body1;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    color: #2E5AFF;
    cursor: pointer;
    margin: 0 2px;
    text-decoration: underline;
  }

  .nickname-sub-text{
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    text-align: left;
    color: #666;
    margin-top: 6px;
    margin-bottom: 19px;

  }
}
</style>
