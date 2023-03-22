<template>
    <q-page class="flex items-start justify-center">
    
    <q-tabs align="left" class="top-header-tabs">
      <q-route-tab to="/forumns" label="Forumns" />
      <q-route-tab to="/hot-focus" label="HOT focus" />
      <q-route-tab to="/buddies-deal" label="Buddies Deal" />
      <q-route-tab to="/special-offer" label="Special Offer" />
    </q-tabs>
    <div class="flex column">
    <q-list bordered class="rounded-borders" style="max-width: 350px">
      <q-item-label header>Forumns</q-item-label>
      <q-separator inset="item" />
      <q-item clickable v-ripple v-for="(item,index) in allPosts" :key="index">
        <q-item-section avatar>
          <q-avatar v-if="item.writer&&!item.writer.avatar"  square color="red" text-color="white" class="q-mr-md">{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
          <q-avatar v-if="item.writer&&item.writer.avatar"  square color="red" text-color="white" class="q-mr-md">
            <img :src="item.writer.avatar" alt="" srcset="">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ item.content }}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">{{ item.writer.nickname }}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
      <q-btn label="write post" @click="$router.push('/write-post')"></q-btn>
    </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from 'firebase/database';
import { promised } from "q";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data(){
    return{
      allPosts:[]
    }
  },
  mounted() {
    // this.showLoading();
    this.getPosts();
  },
  methods:{
    
    getPosts(){
      const thisObj = this;
      const dbRef = ref(getDatabase());
      get(child(dbRef, `posts/`))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const data = snapshot.val();
            let allPosts = [];

            Object.keys(data).forEach(function(key, index) {
              const currentObject = data[key];
              let data2 = currentObject;
              allPosts.push({
                ...data2,
              });
            });

            console.log(allPosts)
            for(const currentPost of allPosts){
              await thisObj.getUserProfile(currentPost.writer).then( result=>{
                currentPost.writer = {
                ...result
                }
              });

            }

            console.log(allPosts)
            
            thisObj.allPosts = allPosts.sort((a, b)=>{
              return a.createdAt - b.createdAt;
            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.page-name{
  
}
</style>
