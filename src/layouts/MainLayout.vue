<template>
  <q-layout view="lHh Lpr lFf">

      <q-header elevated class="main-header" height-hint="98">
        <div class="main-header__left">
          <q-toolbar>
            <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" class="hamburger-button is-mobile-show" />
            <img src="~assets/logo.png" alt="" style="cursor: pointer;" @click="$router.push('/app')">
            <q-tabs
              v-model="tab"
              indicator-color="transparent"
              style="color: #ddd;"
              class="main-tabs is-desktop-show"
            >
              <q-tab name="forums"  @click="$router.push('/forums')" label="Forums" no-caps/>
              <q-tab name="hotFocus"  @click="$router.push('/hot-focus')" label="HOT Focus" no-caps/>
              <q-tab name="deal"  @click="$router.push('/deal')" label="Buddies Deal" no-caps/>
              <q-tab name="Premium Service"  @click="$router.push('/premium-service')" label="Special Offer" no-caps/>
            </q-tabs>
  
  

          </q-toolbar>
        </div>
        <div class="main-header__right">
          <!-- <q-avatar v-if="loginUser&&!loginUser.avatar"  @click="$router.push('/change-info')" square color="red" text-color="white" class="q-mr-md">{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
          <q-avatar v-if="loginUser&&loginUser.avatar" @click="$router.push('/change-info')"  square color="red" text-color="white" class="q-mr-md">
            <img :src="loginUser.avatar" alt="" srcset="">  
          </q-avatar> -->

          <q-btn class="login-button is-desktop-show" label="Login" flat  no-caps v-if="!loginUser" @click="$router.push('/login')"></q-btn>
          <q-btn class="logout-button is-desktop-show" label="MyPage" flat no-caps v-if="loginUser" @click="$router.push('/my-page')"></q-btn>
          <q-btn class="register-button is-desktop-show" label="Register" no-caps v-if="!loginUser" @click="$router.push('/register')"></q-btn>
        </div>

      </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    > 
      <q-list>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/forums')">
          Forums
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/hot-focus')">
          HOT Focus
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/deal')">
          Buddies Deal
        </q-item>
        <q-item v-ripple clickable class="text-grey-8" @click="$router.push('/premium-service')">
          Premium Service
        </q-item>
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
        <q-item v-ripple clickable class="text-grey-8" @click="logout">
          Logout
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <!-- <q-list
            v-if="hamburgerOpen"
            dense
            bordered
            padding
            class="rounded-borders h-nav"
          >
            <q-item clickable v-ripple>
              <q-item-section>
                Slotted
              </q-item-section>
            </q-item>
          </q-list> -->
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
      hamburgerOpen:false,
      leftDrawerOpen:false
    };
  },
  computed: {
    ...mapGetters({
      loginUser: "getLoginUser",
    }),
  },
  updated(){
    console.log(this.$route.path)
    if(this.$route.path == '/forums' ){
      this.tab = 'forums'
    }else if(this.$route.path == '/hot-focus' ){
      this.tab = 'hotFocus'
    }else if(this.$route.path == '/deal' ){
      this.tab = 'deal'
    }else{
      this.tab = ''
    }
  },
  methods:{
    logout () {
      const auth = getAuth();
      const thisObj =this;
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
.q-drawer__content{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
  .q-list{
    .q-item{
      border-top: 1px solid #ddd;
    }
  }
}
.top-header-tabs{
  width: 100%;
  background: white;
  color: black;
  .q-tabs__content{
    margin-left: auto;
    margin-right: auto;
    max-width: 1080px;
    display: flex;
  }
  .q-tab{
    width:25%;
    border: 1px solid #ddd;
    border-right: 0;
    flex: 1;
    &:last-child{
      border-right: 1px solid #ddd;
    }
  }
  .q-tab__label{    
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

.default-avatar{
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

.main-header{
  background: white;
  color: #333;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .q-tabs{
    //styleName: Subtitle3;
    margin-left: 28px;
    
    .q-tab--active{
      color:#366EB5 !important;
    }
    .q-tab-label{
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
    }
  }

  .login-button{
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
  .register-button{
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
@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .main-header{
    justify-content: flex-start;
    &__left{
      width: 100%;
      .q-toolbar{
        display: flex;
        justify-content: center;
        .hamburger-button{
          position: absolute;
          left: 12px;
        }
      }
    }
  }

  .q-header{
    img{
    }
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
}
</style>