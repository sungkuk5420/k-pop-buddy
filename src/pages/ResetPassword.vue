<template>
  <q-page class="reset-password-page">
    <div class="container">
      <div class="title-1">Kbeauty Buddie</div>
      <!-- <div class="title-2">비밀번호 찾으실 이메일을 알려주세요.</div> -->
      <div class="title-2">Please enter your email address.</div>
      <!-- <div class="sub-title">임시 비밀번호가 가입한 이메일로 발급됩니다.</div> -->
      <div class="sub-title">New password will be sent to your email address.</div>
      <div class="label">E-mail</div>
        <q-input
          autoComplete="new-password"
          style="width:100%;margin-bottom:24px;"
          outlined 
          v-model="localEmail"
          placeholder="Please enter your e-mail."
          lazy-rules
        />
      <div  class="error-message" v-show="localErrorMessage">{{ localErrorMessage }}</div>
      <q-btn label="Send Email"  class="login-button" @click="resetPassword" />
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
      localEmail:"",
      localErrorMessage:"",
    }
  },
  mounted() {
    // this.showLoading();
  },
  
  methods: {
    resetPassword(){
      const thisObj = this;
      thisObj.localErrorMessage ="";
      if(this.localEmail == ""){
        thisObj.localErrorMessage = "Please enter your email address."
        return false
      }
      const url = "https://my-gangnam-insider-backend.herokuapp.com/reset-password?email="+this.localEmail
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
<style lang="scss">
.reset-password-page{
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
