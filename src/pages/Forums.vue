<template>
  <q-page class="forums-page">
    <div class="contianer">
      <div class="forums-page__left is-desktop-show">
        <div class="forums-page__title">Forums</div>
        <div class="forums-page__left__menu">
          <div class="forums-page__left__menu__button" clickable :class="category == 'all'?'is-active':''" @click="category = 'all'">
            ALL
          </div>
          <div class="forums-page__left__menu__button" clickable :class="category == 'plasticSurgeryAndCosmeticProcedures'?'is-active':''" @click="category = 'plasticSurgeryAndCosmeticProcedures'">
            <span>Plastic Surgery & Cosmetic Procedures </span>
            <span class="forums-page__left__menu__button__count"> ({{ plasticSurgeryAndCosmeticProceduresPosts.length }})</span>
          </div>
          <div class="forums-page__left__menu__button" clickable :class="category == 'nailAndHairAndSkinCare'?'is-active':''" @click="category ='nailAndHairAndSkinCare'">
            <span>Nail & Hair & SkinCare</span>
            <span class="forums-page__left__menu__button__count"> ({{ nailAndHairAndSkinCarePosts.length }})</span>
          </div>
          <div class="forums-page__left__menu__button" clickable :class="category == 'tripAndFoodAndHotel'?'is-active':''" @click="category ='tripAndFoodAndHotel'">
            <span>Trip & Food & Hotel</span>
            <span class="forums-page__left__menu__button__count"> ({{tripAndFoodAndHotelPosts.length}})</span>
          </div>
        </div>
        <div style="margin-top: 16px; cursor: pointer;">
          <img src="~assets/banner-pc.png" alt="" @click="$router.push('/premium-service')">
        </div>
      </div>
      <div class="forums-page__right">
        <div class="tab-scroll is-mobile-show">
          <q-tabs
            v-model="category"
            active-class="is-active"
            class=" mobile-tab"
          >
            <q-tab name="all" label="ALL" no-caps />
            <q-tab name="plasticSurgeryAndCosmeticProcedures" label="Plastic Surgery & Cosmetic Procedures" no-caps />
            <q-tab name="nailAndHairAndSkinCare"  label="Nail & Hair & SkinCare" no-caps />
            <q-tab name="tripAndFoodAndHotel"  label="Trip & Food & Hotel" no-caps />
          </q-tabs>
        </div>
        <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%; cursor:pointer;" @click="$router.push('/premium-service')">
        <div class="forums-page__right__title flex justify-between items-center" style="padding-right:20px;width: 100%;" v-show="category == 'all' || category == 'plasticSurgeryAndCosmeticProcedures'">
            <div class="flex items-center">
              <div class="forums-page__title">Plastic Surgery & Cosmetic Procedures</div>
              <div class="forums-page__see-all" v-show="category=='all'" @click="category='plasticSurgeryAndCosmeticProcedures'">See All</div>
            </div>
            <q-btn class="write-button" flat label="Write" v-show="category!='all'" no-caps @click="$router.push('/write-post?postCategory=forums&category='+category)"></q-btn>
        </div>

        <q-list class="list" v-show="category == 'all' || category == 'plasticSurgeryAndCosmeticProcedures'">
          <div class="empty-list" v-show="plasticSurgeryAndCosmeticProceduresPosts.length==0">
              There are no articles written.
          </div>
          <q-item clickable v-ripple v-for="(item,index) in plasticSurgeryAndCosmeticProceduresPosts" :key="index" @click="()=>goDetails(item)">
            <q-item-section avatar class="list-avatar is-desktop-show">
              <q-avatar v-if="item.writer&&!item.writer.avatar" color="red" text-color="white" class="q-mr-md">{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="item.writer&&item.writer.avatar" color="red" text-color="white" class="q-mr-md">
                <img :src="item.writer.avatar" alt="" srcset="">
              </q-avatar>
            </q-item-section>
            <q-item-section avatar class="list-avatar is-mobile-show" style="width:45px; min-width:45px; margin-right: 16px;">
              <q-avatar v-if="item.writer&&!item.writer.avatar" color="red" text-color="white" >{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="item.writer&&item.writer.avatar" color="red" text-color="white" >
                <img :src="item.writer.avatar" alt="" srcset="">
              </q-avatar>
            </q-item-section>

            <q-item-section class="list-content-and-wirter">
              <q-item-label class="list-title" lines="1">{{ item.title }}</q-item-label>
              <q-item-label caption lines="2" class="list-nickname-and-created-at">
                <span class="list-nickname-and-created-at__nickname">{{ item.writer.nickname }}</span>
                <span style="margin:0 6px;" > | </span>
                <span class="text-weight-bold">{{ convertedDateFormatEnglish(item.createdAt) }}</span>
              </q-item-label>
              <q-item-label class="mobile-list-view-replies-commenter is-mobile-show">
                <div class="list-view">
                  <div class="list-view__title">
                    Views
                  </div>
                  <div class="list-view__value">
                    {{item.views}}
                  </div>

                </div>
                <div class="spliter"></div>
                <div class="list-replies">
                  <div class="list-replies__title">
                    Replies
                  </div>
                  <div class="list-replies__value">
                    {{item.replies}}
                  </div>
                </div>
                <div class="spliter" v-show="item.lastCommentWriter"></div>
                <div class="list-commenter" v-show="item.lastCommentWriter">
                  <div class="list-commenter__avater">
                    <q-avatar v-if="item.lastCommentWriter&&!item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">{{ item.lastCommentWriter?item.lastCommentWriter.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                    <q-avatar v-if="item.lastCommentWriter&&item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">
                      <img :src="item.lastCommentWriter.avatar" alt="" srcset="">
                    </q-avatar>
                  </div>
                  <div class="list-commenter__nickname ellipsis">
                    {{item.lastCommentWriter?item.lastCommentWriter.nickname:""}}
                  </div>
                  <div class="list-commenter__created-at" v-show="item.lastCommentWriter">
                    {{item.updatedAt?timeSince(item.updatedAt):""}}
                  </div>
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section avatar class="list-view-replies-commenter is-desktop-show">

              <div class="list-commenter">
                <div class="list-commenter__left" >
                  <div class="list-commenter__avater">
                    <q-avatar v-if="item.lastCommentWriter&&!item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">{{ item.lastCommentWriter?item.lastCommentWriter.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                    <q-avatar v-if="item.lastCommentWriter&&item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">
                      <img :src="item.lastCommentWriter.avatar" alt="" srcset="">
                    </q-avatar>
                  </div>
                </div>
                <div class="list-commenter__right">
                  <div class="list-commenter__nickname">
                    {{item.lastCommentWriter?item.lastCommentWriter.nickname:""}}
                  </div>
                  <div class="list-commenter__created-at" v-show="item.lastCommentWriter">
                    {{item.updatedAt?timeSince(item.updatedAt):""}}
                  </div>
                </div>
              </div>
              <div class="spliter" v-show="item.lastCommentWriter"></div>
              <div class="list-view">
                <div class="list-view__title">
                  Views
                </div>
                <div class="list-view__value">
                  {{item.views}}
                </div>

              </div>
              <div class="spliter"></div>
              <div class="list-replies">
                <div class="list-replies__title">
                  Replies
                </div>
                <div class="list-replies__value">
                  {{item.replies}}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="forums-page__right__title flex justify-between items-center" style="padding-right:20px;width: 100%;" v-show="category == 'all' || category == 'nailAndHairAndSkinCare'">
          <div class="flex items-center">
            <div class="forums-page__title">Nail & Hair & SkinCare</div>
            <div class="forums-page__see-all" v-show="category=='all'" @click="category='nailAndHairAndSkinCare'">See All</div>
          </div>
          <q-btn class="write-button" flat label="Write" v-show="category!='all'" no-caps @click="$router.push('/write-post?postCategory=forums&category='+category)"></q-btn>
        </div>
        <q-list class="list" v-show="category == 'all' || category == 'nailAndHairAndSkinCare'">
          <div class="empty-list" v-show="nailAndHairAndSkinCarePosts.length==0">
            There are no articles written.
          </div>
          <q-item clickable v-ripple v-for="(item,index) in nailAndHairAndSkinCarePosts" :key="index" @click="()=>goDetails(item)">
            <q-item-section avatar class="list-avatar is-desktop-show">
              <q-avatar v-if="item.writer&&!item.writer.avatar" color="red" text-color="white" class="q-mr-md">{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="item.writer&&item.writer.avatar" color="red" text-color="white" class="q-mr-md">
                <img :src="item.writer.avatar" alt="" srcset="">
              </q-avatar>
            </q-item-section>
            <q-item-section avatar class="list-avatar is-mobile-show" style="width:45px; min-width:45px; margin-right: 16px;">
              <q-avatar v-if="item.writer&&!item.writer.avatar" color="red" text-color="white" >{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="item.writer&&item.writer.avatar" color="red" text-color="white" >
                <img :src="item.writer.avatar" alt="" srcset="">
              </q-avatar>
            </q-item-section>

            <q-item-section class="list-content-and-wirter">
              <q-item-label class="list-title" lines="1">{{ item.title }}</q-item-label>
              <q-item-label caption lines="2" class="list-nickname-and-created-at">
                <span class="list-nickname-and-created-at__nickname">{{ item.writer.nickname }}</span>
                <span style="margin:0 6px;" > | </span>
                <span class="text-weight-bold">{{ convertedDateFormatEnglish(item.createdAt) }}</span>
              </q-item-label>
              <q-item-label class="mobile-list-view-replies-commenter is-mobile-show">
                <div class="list-view">
                  <div class="list-view__title">
                    Views
                  </div>
                  <div class="list-view__value">
                    {{item.views}}
                  </div>

                </div>
                <div class="spliter"></div>
                <div class="list-replies">
                  <div class="list-replies__title">
                    Replies
                  </div>
                  <div class="list-replies__value">
                    {{item.replies}}
                  </div>
                </div>
                <div class="spliter" v-show="item.lastCommentWriter"></div>
                <div class="list-commenter">
                  <div class="list-commenter__avater">
                    <q-avatar v-if="item.lastCommentWriter&&!item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">{{ item.lastCommentWriter?item.lastCommentWriter.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                    <q-avatar v-if="item.lastCommentWriter&&item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">
                      <img :src="item.lastCommentWriter.avatar" alt="" srcset="">
                    </q-avatar>
                  </div>
                  <div class="list-commenter__nickname ellipsis">
                    {{item.lastCommentWriter?item.lastCommentWriter.nickname:""}}
                  </div>
                  <div class="list-commenter__created-at" v-show="item.lastCommentWriter">
                    {{item.updatedAt?timeSince(item.updatedAt):""}}
                  </div>
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section avatar class="list-view-replies-commenter is-desktop-show">

              <div class="list-commenter">
                <div class="list-commenter__left">
                  <div class="list-commenter__avater">
                    <q-avatar v-if="item.lastCommentWriter&&!item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">{{ item.lastCommentWriter?item.lastCommentWriter.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                    <q-avatar v-if="item.lastCommentWriter&&item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">
                      <img :src="item.lastCommentWriter.avatar" alt="" srcset="">
                    </q-avatar>
                  </div>
                </div>
                <div class="list-commenter__right">
                  <div class="list-commenter__nickname">
                    {{item.lastCommentWriter?item.lastCommentWriter.nickname:""}}
                  </div>
                  <div class="list-commenter__created-at" v-show="item.lastCommentWriter">
                    {{item.updatedAt?timeSince(item.updatedAt):""}}
                  </div>
                </div>
              </div>
              <div class="spliter" v-show="item.lastCommentWriter"></div>
              <div class="list-view">
                <div class="list-view__title">
                  Views
                </div>
                <div class="list-view__value">
                  {{item.views}}
                </div>

              </div>
              <div class="spliter"></div>
              <div class="list-replies">
                <div class="list-replies__title">
                  Replies
                </div>
                <div class="list-replies__value">
                  {{item.replies}}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="forums-page__right__title flex justify-between items-center" style="padding-right:20px;width: 100%;" v-show="category == 'all' || category == 'tripAndFoodAndHotel'">
          <div class="flex items-center">
            <div class="forums-page__title">Trip & Food & Hotel</div>
            <div class="forums-page__see-all" v-show="category=='all'" @click="category='tripAndFoodAndHotel'">See All</div>
          </div>
          <q-btn class="write-button" flat label="Write" v-show="category!='all'" no-caps @click="$router.push('/write-post?postCategory=forums&category='+category)"></q-btn>
        </div>
        <q-list class="list" v-show="category == 'all' || category == 'tripAndFoodAndHotel'">

          <div class="empty-list" v-show="tripAndFoodAndHotelPosts.length==0">
            There are no articles written.
          </div>
          <q-item clickable v-ripple v-for="(item,index) in tripAndFoodAndHotelPosts" :key="index" @click="()=>goDetails(item)">
            <q-item-section avatar class="list-avatar is-desktop-show">
              <q-avatar v-if="item.writer&&!item.writer.avatar" color="red" text-color="white" class="q-mr-md">{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="item.writer&&item.writer.avatar" color="red" text-color="white" class="q-mr-md">
                <img :src="item.writer.avatar" alt="" srcset="">
              </q-avatar>
            </q-item-section>
            <q-item-section avatar class="list-avatar is-mobile-show" style="width:45px; min-width:45px; margin-right: 16px;">
              <q-avatar v-if="item.writer&&!item.writer.avatar" color="red" text-color="white" >{{ item.writer?item.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="item.writer&&item.writer.avatar" color="red" text-color="white" >
                <img :src="item.writer.avatar" alt="" srcset="">
              </q-avatar>
            </q-item-section>

            <q-item-section class="list-content-and-wirter">
              <q-item-label class="list-title" lines="1">{{ item.title }}</q-item-label>
              <q-item-label caption lines="2" class="list-nickname-and-created-at">
                <span class="list-nickname-and-created-at__nickname">{{ item.writer.nickname }}</span>
                <span style="margin:0 6px;" > | </span>
                <span class="text-weight-bold">{{ convertedDateFormatEnglish(item.createdAt) }}</span>
              </q-item-label>
              <q-item-label class="mobile-list-view-replies-commenter is-mobile-show">
                <div class="list-view">
                  <div class="list-view__title">
                    Views
                  </div>
                  <div class="list-view__value">
                    {{item.views}}
                  </div>

                </div>
                <div class="spliter"></div>
                <div class="list-replies">
                  <div class="list-replies__title">
                    Replies
                  </div>
                  <div class="list-replies__value">
                    {{item.replies}}
                  </div>
                </div>
                <div class="spliter" v-show="item.lastCommentWriter"></div>
                <div class="list-commenter">
                  <div class="list-commenter__avater">
                    <q-avatar v-if="item.lastCommentWriter&&!item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">{{ item.lastCommentWriter?item.lastCommentWriter.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                    <q-avatar v-if="item.lastCommentWriter&&item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">
                      <img :src="item.lastCommentWriter.avatar" alt="" srcset="">
                    </q-avatar>
                  </div>
                  <div class="list-commenter__nickname ellipsis">
                    {{item.lastCommentWriter?item.lastCommentWriter.nickname:""}}
                  </div>
                  <div class="list-commenter__created-at" v-show="item.lastCommentWriter">
                    {{item.updatedAt?timeSince(item.updatedAt):""}}
                  </div>
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section avatar class="list-view-replies-commenter is-desktop-show">

              <div class="list-commenter">
                <div class="list-commenter__left">
                  <div class="list-commenter__avater">
                    <q-avatar v-if="item.lastCommentWriter&&!item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">{{ item.lastCommentWriter?item.lastCommentWriter.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                    <q-avatar v-if="item.lastCommentWriter&&item.lastCommentWriter.avatar" color="red" text-color="white" class="q-mr-md">
                      <img :src="item.lastCommentWriter.avatar" alt="" srcset="">
                    </q-avatar>
                  </div>
                </div>
                <div class="list-commenter__right">
                  <div class="list-commenter__nickname">
                    {{item.lastCommentWriter?item.lastCommentWriter.nickname:""}}
                  </div>
                  <div class="list-commenter__created-at" v-show="item.lastCommentWriter">
                    {{item.updatedAt?timeSince(item.updatedAt):""}}
                  </div>
                </div>
              </div>
              <div class="spliter" v-show="item.lastCommentWriter"></div>
              <div class="list-view">
                <div class="list-view__title">
                  Views
                </div>
                <div class="list-view__value">
                  {{item.views}}
                </div>

              </div>
              <div class="spliter"></div>
              <div class="list-replies">
                <div class="list-replies__title">
                  Replies
                </div>
                <div class="list-replies__value">
                  {{item.replies}}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from 'firebase/database';
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data(){
    return{
      category:"all",
      allPosts:[],
      plasticSurgeryAndCosmeticProceduresPosts:[],
      nailAndHairAndSkinCarePosts:[],
      tripAndFoodAndHotelPosts:[],
    }
  },
  watch : {
    category(value){
      if(value == 'all'){
        this.plasticSurgeryAndCosmeticProceduresPosts= this.plasticSurgeryAndCosmeticProceduresPosts.slice(0,3)
        this.nailAndHairAndSkinCarePosts= this.nailAndHairAndSkinCarePosts.slice(0,3)
        this.tripAndFoodAndHotelPosts= this.tripAndFoodAndHotelPosts.slice(0,3)
      }else{
        if(!window.isFirstChangecategory){
          this.$router.push(`/forums?category=${value}`)
        }else{
          delete window.isFirstChangecategory
        }
        this.plasticSurgeryAndCosmeticProceduresPosts = this.allPosts.filter(i=>i.category == 'plasticSurgeryAndCosmeticProcedures' )
        this.nailAndHairAndSkinCarePosts = this.allPosts.filter(i=>i.category == 'nailAndHairAndSkinCare' )
        this.tripAndFoodAndHotelPosts = this.allPosts.filter(i=>i.category == 'tripAndFoodAndHotel' )
      }
    }
  },
  mounted() {
    // this.showLoading();
      this.getPosts();
      if(this.$route.query.category){
        window.isFirstChangecategory = true
        this.category = this.$route.query.category;
      }
  },
  meta () {
    return {
      meta: {
        description: { name: 'description', content: "My Gangnam Insider" },
        keywords: { name: 'keywords', content: `${this.$route.name  }` },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      },
      title: "My Gangnam Insider",
    }
  },
  methods:{
    goDetails(post){
      console.log(post)
      this.$router.push({
          name: 'forumsDetails',
          query:{
            postUid:post.postUid
          },
          params: {
            post,
          },
      });
    },
    
    getPosts(){
      const thisObj = this;
      const dbRef = ref(getDatabase());
      get(child(dbRef, `forumsPosts/`))
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
              if(currentPost.lastCommentWriter){
                await thisObj.getUserProfile(currentPost.lastCommentWriter).then( result=>{
                  currentPost.lastCommentWriter = {
                  ...result
                  }
                });
              }
            }

            console.log(allPosts)
            
            thisObj.allPosts = allPosts.sort((a, b)=>{
              return b.updatedAt - a.updatedAt;
            })
            thisObj.plasticSurgeryAndCosmeticProceduresPosts = allPosts.filter(i=>i.category == 'plasticSurgeryAndCosmeticProcedures' )
            thisObj.nailAndHairAndSkinCarePosts = allPosts.filter(i=>i.category == 'nailAndHairAndSkinCare' )
            thisObj.tripAndFoodAndHotelPosts = allPosts.filter(i=>i.category == 'tripAndFoodAndHotel' )
            if(thisObj.category == 'all'){
              thisObj.plasticSurgeryAndCosmeticProceduresPosts= thisObj.allPosts.filter(i=>i.category == 'plasticSurgeryAndCosmeticProcedures' ).slice(0,3)
              thisObj.nailAndHairAndSkinCarePosts= thisObj.allPosts.filter(i=>i.category == 'nailAndHairAndSkinCare' ).slice(0,3)
              thisObj.tripAndFoodAndHotelPosts= thisObj.allPosts.filter(i=>i.category == 'tripAndFoodAndHotel' ).slice(0,3)
            }
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
        &.is-active{
          color: #366EB5;
        }
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
    color: #000;
  }
  &__right{
    flex: 1;
    width: calc(100% - 250px);
    &__title{
      display: flex;
      align-items: center;
      height: 40px;
      margin-bottom: 4px;
    }
    .forums-page__title{
      margin-right: 5px;
    }
    .forums-page__see-all{
      font-family: Spoqa Han Sans Neo;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;

      color: #1C579F;
      &:hover{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .empty-list{
    width: 100%;
    height: 150px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: center;
    color: #999;
  }
  .q-list{
    width: 100%;
    background :white;
    margin-bottom:24px;
  }
  .q-item{
    display: flex;
    height: 72px;
    border-bottom: 2px solid #F8F8F8;
    .q-item__section--side {
      padding-right: 0;
    }
    .list-avatar{
      display: flex;
      align-items: center;
      justify-content: center;
      .q-avatar{
        width: 36px;
        height: 36px;
      }
    }
    .list-content-and-wirter{
      display: flex;
      .list-title{
        font-family: Spoqa Han Sans Neo;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #333;
        margin-bottom: 4px;
      }
      .list-nickname-and-created-at{
        font-family: Spoqa Han Sans Neo;
        font-size: 10px;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0em;
        text-align: left;
        color: #999;
      }
    }

    .list-view-replies-commenter{
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 0;
      .spliter{
        display: flex;
        align-items: center;
        height: 22px;
        line-height: 50px;
        width: 1px;
        background: #ddd;
        margin: 0 20px;
      }
      .list-view__title,
      .list-replies__title{
        font-family: Spoqa Han Sans Neo;
        font-size: 10px;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0em;
        text-align: left;
        color: #999;
        margin-bottom: 4px;
      }
      .list-view__value,
      .list-replies__value{
        display: flex;
        justify-content: center;
        font-family: Spoqa Han Sans Neo;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
        color: #333;
      }
      .list-commenter{
        display: flex;
        flex-direction: row;
        &__left{
          display: flex;
          align-items: center;
          justify-content: center;
          .q-avatar{
            width: 36px;
            height: 36px;
          }
        }
        &__right{
          display: flex;
          flex-direction: column;
        }
        &__nickname{
          font-family: Spoqa Han Sans Neo;
          font-size: 12px;
          font-weight: 700;
          line-height: 18px;
          letter-spacing: 0em;
          text-align: left;
          color: #333;
          margin-bottom: 2px;
          max-width: 100px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
        &__created-at{
          font-family: Spoqa Han Sans Neo;
          font-size: 10px;
          font-weight: 700;
          line-height: 12px;
          letter-spacing: 0em;
          text-align: left;
          color: #999;
        }
      }
    }
  }

  .write-button{
    color: white;
    background: #366EB5;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;

  }


}


@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .forums-page {
    .contianer{
      padding: 0;
    }
    .forums-page__right{
      width: 100%;
    }
    .forums-page__title{
      margin-left: 24px;
    }
    .q-item{
      height: auto;
      padding: 16 px;
      .list-view-replies-commenter{
        display: flex;
        justify-content: flex-start ;
        .list-view{
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          .list-view__title{
            margin-right: 8px;
          }
        }
      }
      .list-nickname-and-created-at{
        &__nickname{
          max-width: 170px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          vertical-align: middle;
        }
      }

      .mobile-list-view-replies-commenter{
        display: flex;
        flex-direction: row;
        align-items: center;
        .spliter{
          margin:0 8px;
          width: 1px;
          background: #999;
          height: 11px;
        }
        .list-view{
          display: flex;
          align-items: center;
          &__title{
            font-family: Spoqa Han Sans Neo;
            font-size: 10px;
            font-weight: 700;
            line-height: 12px;
            letter-spacing: 0em;
            text-align: left;
            margin-right: 8px;
            color: #999;
          }
          &__value{
            font-family: Spoqa Han Sans Neo;
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
          }
        }
        .list-replies{
          display: flex;
          align-items: center;
          &__title{
            font-family: Spoqa Han Sans Neo;
            font-size: 10px;
            font-weight: 700;
            line-height: 12px;
            letter-spacing: 0em;
            text-align: left;
            margin-right: 8px;
            color: #999;
          }
          
          &__value{
            font-family: Spoqa Han Sans Neo;
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
          }
        }
        .list-commenter{
          display: flex;
          align-items: center;
          .list-commenter__avater{
              width: 18px;
              height: 18px;
              margin-right: 8px;
            .q-avatar{
              width: 18px;
              height: 18px;

            }
          }
          .list-commenter__nickname{
            margin-right: 8px;
            font-family: Spoqa Han Sans Neo;
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
            max-width: 25px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
        .list-commenter__created-at{
          font-family: Spoqa Han Sans Neo;
          font-size: 10px;
          font-weight: 700;
          line-height: 12px;
          letter-spacing: 0em;
          text-align: left;
          color: #999;

        }
      }
    }
    .tab-scroll{
      width: 100%;
      overflow: auto;
      display: flex;
      .q-tab{
        color: #000;
        font-family: Spoqa Han Sans Neo;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
        letter-spacing: 0em;
        text-align: left;

        &.q-tab--active{
          color: #1C579F;
        }
      }
      .q-tab__indicator{
        display: none;
      }
    }
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
}
</style>
