<template>
  <q-layout view="lHh Lpr lff">

    <q-header elevated class="main-header" height-hint="98">
      <div class="main-header__left">
        <q-toolbar>
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu"
            class="hamburger-button is-mobile-show" />
          <img src="~assets/logo.png" alt="" style="cursor: pointer; max-width: 172px;" @click="$router.push('/')" >
          <q-tabs v-model="tab" indicator-color="transparent" style="color: #ddd;" class="main-tabs is-desktop-show">
            <q-tab name="forums" @click="$router.push('/forums')" label="Forums" no-caps />
            <q-tab name="日本語掲示板" @click="$router.push('/forums-japan')" label="日本語掲示板" no-caps />
            <q-tab name="hotFocus" @click="$router.push('/hot-focus')" label="HOT Focus" no-caps />
            <!-- <q-tab name="deal"  @click="$router.push('/deal')" label="Hot Deal" no-caps/>
              <q-tab name="premiumService"  @click="$router.push('/premium-service')" label="Premium Service" no-caps/> -->
          </q-tabs>



        </q-toolbar>
      </div>
      <div class="main-header__right">
        <q-avatar v-if="loginUser && !loginUser.avatar" @click="$router.push('/my-page')" color="red" text-color="white"
          class="q-mr-md">{{ loginUser ? loginUser.nickname.slice(0, 1).toUpperCase() : '' }}</q-avatar>
        <q-avatar v-if="loginUser && loginUser.avatar" @click="$router.push('/my-page')" color="red" text-color="white"
          class="q-mr-md">
          <img :src="loginUser.avatar" alt="" srcset="">
        </q-avatar>
        <div class="main-header__right__nickname is-desktop-show" v-if="loginUser" @click="$router.push('/my-page')">{{
          loginUser.nickname }}</div>

        <q-btn class="login-button is-desktop-show" label="Login" flat no-caps v-if="!loginUser"
          @click="$router.push('/login')"></q-btn>
        <!-- <q-btn class="logout-button is-desktop-show" label="MyPage" flat no-caps v-if="loginUser" @click="$router.push('/my-page')"></q-btn> -->
        <q-btn class="register-button is-desktop-show" label="Register" no-caps v-if="!loginUser"
          @click="$router.push('/register')"></q-btn>
      </div>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1">
      <q-list>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/forums')">
          Forums
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/hot-focus')">
          HOT Focus
        </q-item>
        <!-- <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/deal')">
          Hot Deal
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/premium-service')">
          Premium Service
        </q-item> -->
      </q-list>
      <q-list v-show="!loginUser">
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/login')">
          login
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/register')">
          register
        </q-item>
      </q-list>
      <q-list v-show="loginUser">
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/my-page')">
          My page
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="logoutFirebase">
          Logout
        </q-item>
      </q-list>
    </q-drawer>
    <q-dialog v-model="contactUsModal">
      <q-card class="contact-us-modal">
        <q-card-section class="row items-center q-pb-none">
          <div class="contact-us-modal__title">Contact us</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section style="padding-top:0">
          <div class="contact-us-modal__text">
            If you have any questions, please feel free to contact us.
          </div>
          <div class="contact-us-modal__label">E-mail</div>
          <div class="contact-us-modal__input">
            <q-input type="text" outlined placeholder="Please enter your e-mail." v-model="contactEmail"></q-input>
          </div>
          <div class="contact-us-modal__label">Subject</div>
          <div class="contact-us-modal__input">
            <q-input type="text" outlined placeholder="Please enter the subject" v-model="contactSubject"></q-input>
          </div>
          <div class="contact-us-modal__label">Content</div>
          <div class="contact-us-modal__input">
            <q-input type="text" outlined placeholder="Please enter the content" v-model="contactContent"></q-input>
          </div>
          <div class="contact-us-modal__input">
            <q-btn outline label="Send" no-caps style="background:#366EB5;" @click="sendEmail"></q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-footer class="main-footer">
      <!-- <div class="main-footer__contact">
        <div>
          KAKAO Talk : mygangnaminsider
        </div>
        <div>
          Line : mygangnaminsider · WhatsApp : +821058304124
        </div>
        <div>
          © 2023 m3solution. All rights reserved.
        </div>
        <q-tabs v-model="footerTab" color="white" class="main-tabs ">
          <q-tab name="contactUs" @click="contactUsModal = true" label="Contact Us" no-caps />
          <q-tab name="termsAndRules" @click="$router.push('/terms-and-rules')" label="Terms and Conditions" no-caps />
          <q-tab name="privacyPolicy" @click="$router.push('/privacy-policy')" label="Privacy Policy" no-caps />
        </q-tabs>
      </div> -->

      <div class="main-footer__line-one">
        <div>
          <img src="~assets/logo.png" alt="" style="max-width: 440px;">
        </div>
        <div>
          <span style="font-weight:400;width:152px;display: block;font-size: 10px; line-height: 14px;">
            My Gangnam Insider: South Korea Plastic Surgery .
          </span>
          <span style="font-size:10px; line-height: 14px; color: #000;">
            Seo Description Here
          </span>
        </div>
          
      </div>
      <div class="main-footer__line-two">
        <div>
          Copyright © 2023 m3solution. All rights reserved.
        </div>
        <div>
          
        <q-tabs v-model="footerTab" color="white" class="main-tabs ">
          <q-tab name="contactUs" @click="contactUsModal = true" label="Contact Us" no-caps />
          <q-tab name="termsAndRules" @click="$router.push('/terms-and-rules')" label="Terms and Conditions" no-caps />
          <q-tab name="privacyPolicy" @click="$router.push('/privacy-policy')" label="Privacy Policy" no-caps />
        </q-tabs>
        </div>
      </div>



    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from 'firebase/auth';
export default {
  name: "MainLayout",
  components: {
    // EssentialLink 
  },
  data() {
    return {
      tab: '',
      footerTab: '',
      hamburgerOpen: false,
      leftDrawerOpen: false,
      contactUsModal: false,
      contactEmail: '',
      contactSubject: '',
      contactContent: '',
    };
  },
  computed: {
    ...mapGetters({
      loginUser: "getLoginUser",
    }),
  },
  watch: {
    footerTab(value) {
      if (value == "contactUs") {
        if (this.$route.path == '/privacy-policy') {
          this.footerTab = 'privacyPolicy'
        }
        if (this.$route.path == '/terms-and-rules') {
          this.footerTab = 'termsAndRules'
        }
      }
    }
  },
  updated() {
    console.log(this.$route.path)
    if (this.$route.path == '/forums') {
      this.tab = 'forums'
    }

    if (this.$route.path == '/hot-focus') {
      this.tab = 'hotFocus'
    }

    if (this.$route.path == '/deal') {
      this.tab = 'deal'
    }

    if (this.$route.path == '/premium-service') {
      this.tab = 'premiumService'
    }

    if (this.$route.path == '/privacy-policy') {
      this.footerTab = 'privacyPolicy'
    }
    if (this.$route.path == '/terms-and-rules') {
      this.footerTab = 'termsAndRules'
    }
  },
  methods: {
    showLoading(message) {
      if (message) {
        this.$q.loading.show({
          message
        });
      } else {
        this.$q.loading.show();
      }
    },

    hideLoading() {
      this.$q.loading.hide();
    },
    successMessage(message) {
      this.$q.notify({
        position: "top",
        timeout: 1000,
        message,
        icon: "announcement"
      });
    },
    errorMessage(message) {
      this.$q.notify({
        position: "top",
        timeout: 1000,
        message,
        icon: "announcement"
      });
    },
    sendEmail() {
      const thisObj = this;
      thisObj.localErrorMessage = "";
      if (thisObj.contactEmail == "") {
        thisObj.errorMessage("Please enter your email address.");
        return false
      }
      if (thisObj.contactSubject == "") {
        thisObj.errorMessage("Please enter subject.");
        return false
      }
      if (thisObj.contactContent == "") {
        thisObj.errorMessage("Please enter content.");
        return false
      }
      // const url = "https://my-gangnam-insider-backend.herokuapp.com/contact-us?email="+thisObj.contactEmail
      const url = "https://mygangnaminsider-backend.herokuapp.com/contact-us?email=" + thisObj.contactEmail
      // const url = "http://localhost:4000/contact-us?email="+thisObj.contactEmail
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactEmail: thisObj.contactEmail,
          contactSubject: thisObj.contactSubject,
          contactContent: thisObj.contactContent,
        })
      };
      thisObj.showLoading()
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.errorInfo?.code == "auth/user-not-found") {
            const errorMessage = "The requested user '" + thisObj.contactEmail + "' could not be found.";
            thisObj.errorMessage(errorMessage)
          } else if (data.success) {
            thisObj.contactEmail = "";
            thisObj.contactSubject = "";
            thisObj.contactContent = "";
            thisObj.contactUsModal = false;
            thisObj.errorMessage("sent email")
          }
          thisObj.hideLoading()
        });
    },
    logoutFirebase() {
      const auth = getAuth();
      const thisObj = this;
      signOut(auth)
        .then(() => {
          thisObj.$q.notify({
            position: 'top',
            timeout: 500,
            message: 'logout',
            icon: 'announcement',
          });
        })
        .catch((error) => {
          // An error happened.
        });
    },
  }

};
</script>

<style lang="scss">
.q-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;

  .q-list {
    .q-item {
      border-top: 1px solid #ddd;
    }
  }
}

.top-header-tabs {
  width: 100%;
  background: white;
  color: black;

  .q-tabs__content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1080px;
    display: flex;
  }

  .q-tab {
    width: 25%;
    border: 1px solid #ddd;
    border-right: 0;
    flex: 1;

    &:last-child {
      border-right: 1px solid #ddd;
    }
  }

  .q-tab__label {
    align-items: center;
    flex: 1 1 0%;
    min-width: 1px;
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
    line-height: 38px;
  }
}

.q-layout__shadow {
  display: none;
}

.default-avatar {
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: #ef5350;
  color: #ff8a80;
}

.main-header {
  background: white;
  color: #333;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__right {
    display: flex;
    align-items: center;
    padding-right: 20px;

    .q-avatar {
      width: 28px;
      height: 28px;

      &:hover {
        cursor: pointer;
      }
    }

    &__nickname {
      font-family: Spoqa Han Sans Neo;
      font-size: 10px;
      font-weight: 700;
      line-height: 12px;
      letter-spacing: 0em;
      text-align: left;
      color: #333;

      &:hover {
        cursor: pointer;
      }
    }
  }

  .q-tabs {
    //styleName: Subtitle3;
    margin-left: 28px;

    .q-tab--active {
      color: #366EB5 !important;
    }

    .q-tab-label {
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  .login-button {
    //styleName: Caption1;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    box-shadow: none;
    margin-right: 24px;

  }

  .register-button {
    //styleName: Subtitle4;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    color: white;
    background: #366EB5;
  }

}

.main-footer {
  background: white;
  color: #333;
  width: 100%;

  .q-tabs {
    //styleName: Subtitle3;
    margin-left: 28px;

    .q-tab--active {
      color: #DD77A1 !important;
    }

    .q-tab-label {
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
    .q-tabs__content{
      font-size: 14px;
    }
    .q-tab{
      min-height: auto;
    }
    .q-tab__label{
      font-size: 11px;
    }
  }

  .q-tab__indicator {
    display: none;
  }

  &__logo {
    padding: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    //styleName: Caption1;
    background: white;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: center;


    .q-btn {
      margin-top: 30px;
      color: #366EB5 !important;
      font-family: Spoqa Han Sans Neo;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
    }
  }

  &__contact {
    background: #3C4A5C;
    padding: 20px;
    color: white;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;

  }

  &__line-one{
    border-top: 6px solid;
    border-color: #DD77A1;
    padding: 10px 20px 0px 20px;
    display: flex;
    img{
      width: 174px;
      padding: 0 20px 8px 0;
    }
  }
  &__line-two{
    padding: 0px 20px 20px 20px;
    color: rgb(131, 131, 131);
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.contact-us-modal {
  &__title {
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #333;
    margin-bottom: 10px;
  }

  &__text {
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #333;
    margin-bottom: 24px;
    ;

  }

  &__label {
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #000;
    margin-bottom: 4px;
    ;
  }

  &__input {
    margin-bottom: 24px;
    width: 100%;

    .q-btn {
      width: 100%;
      background: #366EB5 !important;
      color: white !important;
      font-family: Spoqa Han Sans Neo;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      height: 48px;
      border-radius: 6px;


    }
  }
}

@media only screen and (max-width: 1079px) {

  /* For mobile: */
  .main-header {
    justify-content: flex-start;

    &__left {
      width: 100%;

      .q-toolbar {
        display: flex;
        justify-content: center;

        .hamburger-button {
          position: absolute;
          left: 12px;
        }
      }
    }

    .q-toolbar,
    .main-header__right {
      padding-right: 0;
    }

    .q-avatar {
      position: absolute;
      right: 0;
    }
  }

  .q-header {
    img {}
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
}
</style>