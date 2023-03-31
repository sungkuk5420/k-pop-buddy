<template>
    <q-page class="forums-details-page">
      <div class="contianer">
        <div class="forums-details-page__left is-desktop-show">
          <div class="forums-details-page__title">Forums</div>
          <div class="forums-details-page__left__menu">
            <div class="forums-details-page__left__menu__button">
              ALL
            </div>
            <div class="forums-details-page__left__menu__button">
              <span>IDOL Group(BOY) </span>
              <span class="forums-details-page__left__menu__button__count"> (11)</span>
            </div>
            <div class="forums-details-page__left__menu__button">
              <span>IDOL Group(Girl)</span>
              <span class="forums-details-page__left__menu__button__count"> (4)</span>
            </div>
            <div class="forums-details-page__left__menu__button">
              <span>IDOL Group(Solo)</span>
              <span class="forums-details-page__left__menu__button__count"> (574)</span>
            </div>
          </div>
          <div style="margin-top: 16px;">
            <img src="~assets/banner-pc.png" alt="">
          </div>
        </div>
        <div class="forums-details-page__right" v-if="currentPost">
          <div class="forums-details-page__right__title">
            <div class="forums-details-page__title">{{ currentPost.title }}</div>
          </div>
          <div class="forums-details-page__right__content-wrapper">
            <div class="forums-details-page__right__content-wrapper__writer">
              <div class="avatar">
                <q-avatar v-if="currentPost.writer&&!currentPost.writer.avatar" color="red" text-color="white" class="q-mr-md">{{ currentPost.writer?currentPost.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                <q-avatar v-if="currentPost.writer&&currentPost.writer.avatar" color="red" text-color="white" class="q-mr-md">
                  <img :src="currentPost.writer.avatar" alt="" srcset="">
                </q-avatar>
              </div>
              <div class="nickname-wrapper">
                <div class="nickname">
                  {{ currentPost.writer.nickname }}
                </div>
                <div class="view-replies-warpper">
                  {{ convertedDateFormatEnglish(currentPost.createdAt) }}
                  <div class="spliter"></div>
                  <div class="view-replies-warpper__label">Views</div>
                  <div class="view-replies-warpper__value">{{ currentPost.views }}</div>
                  <div class="spliter"></div>
                  <div class="view-replies-warpper__label">Replies</div>
                  <div class="view-replies-warpper__value">{{currentPost.replies}}</div>
                </div>
              </div>
            </div>
            <div class="forums-details-page__right__content-wrapper__content">
              <p style="white-space: pre-line;">{{ currentPost.content }}</p>

              <img :src="currentFile" alt="" v-for="(currentFile, index) in currentPost.filePaths" :key="index" style="width:100%;">
            </div>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from 'firebase/database';
export default {
  name:"forumsDetails",
  mixins: [ComputedMixin, UtilMethodMixin],
  data(){
    return{
      tab:"all",
      currentPost:null
    }
  },
  computed: {
      getPost() {
          return this.$route.params.post;
      },
  },
  mounted() {
    // this.showLoading();
    
    if(!this.getPost){
      this.getPostDetails()
    }else{
      this.currentPost = this.getPost
    }
  },
  methods:{
    getPostDetails(){
      const postUid = this.$route.query.postUid
      const dbRef = ref(getDatabase());
      const thisObj = this;
      console.log(postUid)
      get(child(dbRef, `posts/${postUid}`))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const data = snapshot.val();
            console.log(data)
            let currentPost = data;
            await thisObj.getUserProfile(currentPost.writer).then( result=>{
              currentPost.writer = {
              ...result
              }
            });
            if(currentPost.lastCommentWriter){
              await thisObj.getUserProfile(currentPost.lastCommentWriter).then( result=>{
                currentPost.lastCommentWriter = {
                ...result
                }
              });
            }
            this.currentPost = currentPost
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
};
</script>

<style lang="scss">
.forums-details-page{
  display: flex; 
  justify-content: center;
  background: #F8F8F8;
  .contianer{
    display: flex; 
    justify-content: center;
    width: 100%;
    max-width: 1080px;
    padding: 24px;

  }
  
  &__left{
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
    flex: 1;
    &__title{
      display: flex;
      align-items: center;
      //styleName: Subtitle1;
      font-family: Spoqa Han Sans Neo;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;
      text-align: left;
      color: #000;
      margin-bottom:12px;
    }
    &__content-wrapper{
      background: white;
      padding: 32px 24px;
      &__writer{
        display: flex;
        align-items: center;
        margin-bottom: 19px;
        
        .nickname-wrapper{
          display: flex;
          flex-direction: column;
          
          .nickname{
            //styleName: Subtitle3;
            font-family: Spoqa Han Sans Neo;
            font-size: 14px;
            font-weight: 700;
            line-height: 20px;
            letter-spacing: 0em;
            text-align: left;
          }
        }
        .view-replies-warpper{
          display: flex;
          align-items: center;
          //styleName: Caption2;
          font-family: Spoqa Han Sans Neo;
          font-size: 10px;
          font-weight: 700;
          line-height: 12px;
          letter-spacing: 0em;
          text-align: left;
          color: #999;

          &__label{
            margin-right: 8px;
          }
          &__value{
            font-family: Spoqa Han Sans Neo;
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
            margin-right: 8px;

          }

        }

      }
      &__content{
        padding-left: 65px;
      }
    }
    
    .spliter{
        display: flex;
        align-items: center;
        height: 12px;
        line-height: 50px;
        width: 1px;
        background: #999;
        margin: 0 8px;
      }
  }


}


@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .forums-details-page {
    .contianer{
      padding: 0;
    }
    .forums-details-page__right__title{
      margin-left: 20px;
      margin-top: 10px;
    }
    .forums-page__right{
      width: 100%;
    }
    .forums-details-page__right__content-wrapper__content{
      padding: 0;
    }
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
}
</style>
