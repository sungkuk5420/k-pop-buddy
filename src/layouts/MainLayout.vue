<template>
  <q-layout view="lHh Lpr lFf">

      <q-header elevated class="bg-primary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title style="cursor: pointer;" @click="$router.push('/')">
            My gangnam insider
          </q-toolbar-title>
          
          <q-avatar v-if="loginUser&&!loginUser.avatar"  @click="$router.push('/change-info')" square color="red" text-color="white" class="q-mr-md">{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
          <q-avatar v-if="loginUser&&loginUser.avatar" @click="$router.push('/change-info')"  square color="red" text-color="white" class="q-mr-md">
            <img :src="loginUser.avatar" alt="" srcset="">  
          </q-avatar>

          <q-btn label="Log in" color="white" text-color="black" class="q-mr-lg" v-if="!loginUser" @click="$router.push('/login')"></q-btn>
          <q-btn label="Log out" color="white" text-color="black" class="q-mr-lg" v-if="loginUser" @click="logout"></q-btn>
          <q-btn label="Register" color="white" text-color="black" v-if="!loginUser" @click="$router.push('/register')"></q-btn>
        </q-toolbar>
      </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";

// const linksData = [
//   {
//     title: "Docs",
//     caption: "quasar.dev",
//     icon: "school",
//     link: "https://quasar.dev",
//   },
//   {
//     title: "Github",
//     caption: "github.com/quasarframework",
//     icon: "code",
//     link: "https://github.com/quasarframework",
//   },
//   {
//     title: "Discord Chat Channel",
//     caption: "chat.quasar.dev",
//     icon: "chat",
//     link: "https://chat.quasar.dev",
//   },
//   {
//     title: "Forum",
//     caption: "forum.quasar.dev",
//     icon: "record_voice_over",
//     link: "https://forum.quasar.dev",
//   },
//   {
//     title: "Twitter",
//     caption: "@quasarframework",
//     icon: "rss_feed",
//     link: "https://twitter.quasar.dev",
//   },
//   {
//     title: "Facebook",
//     caption: "@QuasarFramework",
//     icon: "public",
//     link: "https://facebook.quasar.dev",
//   },
//   {
//     title: "Quasar Awesome",
//     caption: "Community Quasar projects",
//     icon: "favorite",
//     link: "https://awesome.quasar.dev",
//   },
// ];
import { mapGetters } from "vuex";
import { getAuth, signOut } from 'firebase/auth';
export default {
  name: "MainLayout",
  components: { 
    // EssentialLink 
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      loginUser: "getLoginUser",
    }),
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
</style>