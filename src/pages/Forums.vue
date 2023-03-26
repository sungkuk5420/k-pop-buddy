<template>
    <q-page class="forums-page">
      <div class="forums-page__left is-desktop-show">
        <div class="forums-page__title">Forums</div>
        <div class="forums-page__left__menu">
          <div class="forums-page__left__menu__title">
            ALL
          </div>
          <div class="forums-page__left__menu__button">
            <span>IDOL Group(BOY) </span>
            <span class="forums-page__left__menu__button__count"> (11)</span>
          </div>
          <div class="forums-page__left__menu__button">
            <span>IDOL Group(Girl)</span>
            <span class="forums-page__left__menu__button__count"> (4)</span>
          </div>
          <div class="forums-page__left__menu__button">
            <span>IDOL Group(Solo)</span>
            <span class="forums-page__left__menu__button__count"> (574)</span>
          </div>
        </div>
        <div style="margin-top: 16px;">
          <img src="~assets/banner-pc.png" alt="">
        </div>
      </div>
      <div class="forums-page__right"></div>
    <div class="flex column">
    <q-list bordered class="rounded-borders" style="max-width: 350px">
      <q-item-label header>Forums</q-item-label>
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

<style lang="scss">
.forums-page{
  display: flex; 
  justify-content: center;
  background: #F8F8F8;
  
  &__left{
    padding: 24px 0;
    width: 240px;
    margin-right: 36px;
    &__menu{
      margin-top: 12px;
      background: white;
      width: 200px;
      height: 200px;
      padding: 12px 0;
      &>div{
        padding: 0 22px;
        height: 43px;
        font-family: Spoqa Han Sans Neo;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:not(.forums-page__left__menu__title):hover{
          cursor: pointer;
          background: #ddd;
          opacity: 0.8;
        }
      }
      &__button{
        &__count{
          font-family: Spoqa Han Sans Neo;
          font-size: 12px;
          font-weight: 400;
          line-height: 15px;
          letter-spacing: 0em;
          text-align: left;
          margin-left: 4px;
          color: #999;
        }
      }
    }
  }
  &__title{
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
  &__right{
    padding: 24px 0;;
  }
}
</style>
