<template>
  <q-page class="flex items-center justify-center">
    <div class="flex column">
            <q-input
            autoComplete="new-password"
              filled
              v-model="localEmail"
              label="email"
              lazy-rules
            />
            <q-input
            autoComplete="new-password"
              filled
              v-model="localNickname"
              label="nickname"
              lazy-rules
            />

            <q-input
            autoComplete="new-password"
              filled
              type="password"
              v-model="password"
              label="password"
              lazy-rules
            />
            
            <div class="wrapper">
              <div class="captcha-area">
                <div class="captcha-img">
                  <img src="~assets/captcha-bg.png" alt="Captch Background">
                  <span class="captcha"></span>
                </div>
                <button class="reload-btn" @click="reloadCaptcha">
                <q-icon name="refresh"></q-icon></button>
              </div>
                <q-input autoComplete="new-password" label="captcha" filled type="text" placeholder="Enter captcha" maxlength="6" v-model="captchaText" ></q-input>
            </div>


            <div>
              <q-btn label="Register" @click="register" color="primary"/>
            </div>
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
      captchaText:""
    }
  },
  mounted() {
    // this.showLoading();
    const thisObj = this;
    thisObj.getCaptcha(); 

  },
  methods:{
    reloadCaptcha(){
      this.removeContent();
      this.getCaptcha();
    },
    captchaCheck(){
      const captcha = document.querySelector(".captcha");
      //adding space after each character of user entered values because I've added spaces while generating captcha
      let inputVal = this.captchaText.split('').join(' ');
      if (inputVal == captcha.innerText) { //if captcha matched
        return true
      } else {
        return false
      }
    },
    getCaptcha () {
      const captcha = document.querySelector(".captcha");

      //storing all captcha characters in array
      let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

      for (let i = 0; i < 6; i++) { //getting 6 random characters from the array
        let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        captcha.innerText += ` ${randomCharacter}`; //passing 6 random characters inside captcha innerText
      }
    },
    removeContent () {
      const captcha = document.querySelector(".captcha");
      this.captchaText = "";
      captcha.innerText = "";
    },
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
      if(!this.captchaCheck()){
        this.errorMessage("Captcha not matched. Please try again!");
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

<style>
/* Import Google font - Poppins & Noto */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital@1&family=Poppins:wght@400;500;600&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
::selection{
  color: #fff;
  background: #4db2ec;
}

.wrapper .captcha-area{
  display: flex;
  height: 35px;
  margin: 30px 0 20px;
  align-items: center;
  justify-content: space-between;
}
.captcha-area .captcha-img{
  height: 100%;
  width: 345px;
  user-select: none;
  background: #000;
  border-radius: 5px;
  position: relative;
}
.captcha-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  opacity: 0.95;
}
.captcha-img .captcha{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  color: #fff;
  font-size: 25px;
  text-align: center;
  letter-spacing: 10px;
  transform: translate(-50%, -50%);
  text-shadow: 0px 0px 2px #b1b1b1;
  font-family: 'Noto Serif', serif;
}
.wrapper button{
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  background: #4db2ec;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.wrapper button:hover{
  background: #2fa5e9;
}
.captcha-area .reload-btn{
  width: 50px;
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.captcha-area .reload-btn i{
  transition: transform 0.3s ease;
}
.captcha-area .reload-btn:hover i{
  transform: rotate(15deg);
}
.wrapper .input-area{
  height: 60px;
  width: 100%;
  position: relative;
}
.input-area input{
  width: 100%;
  height: 100%;
  outline: none;
  padding-left: 20px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
}
.input-area input:is(:focus, :valid){
  padding-left: 19px;
  border: 2px solid #4db2ec;
}
.input-area input::placeholder{
  color: #bfbfbf;
}
.input-area .check-btn{
  position: absolute;
  right: 7px;
  top: 50%;
  font-size: 17px;
  height: 45px;
  padding: 0 20px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
}
.input-area input:valid + .check-btn{
  opacity: 1;
  pointer-events: auto;
}
.wrapper .status-text{
  display: none;
  font-size: 18px;
  text-align: center;
  margin: 20px 0 -5px;
}

@media (max-width: 506px){
  body{
    padding: 0 10px;
  }
  .wrapper{
    padding: 22px 25px 35px;
  }
  .wrapper header{
    font-size: 25px;
  }
  .wrapper .captcha-area{
    height: 60px;
  }
  .captcha-area .captcha{
    font-size: 28px;
    letter-spacing: 5px;
  }
  .captcha-area .reload-btn{
    width: 60px;
    margin-left: 5px;
    font-size: 20px;
  }
  .wrapper .input-area{
    height: 55px;
  }
  .input-area .check-btn{
    height: 40px;
  }
  .wrapper .status-text{
    font-size: 15px;
  }
  .captcha-area .captcha-img{
    width: 250px;
  }
}
</style>