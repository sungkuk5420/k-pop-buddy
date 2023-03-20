<template>
  <q-layout view="lHh Lpr lFf">
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