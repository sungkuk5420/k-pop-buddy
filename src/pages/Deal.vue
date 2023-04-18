<template>
  <q-page class="deal-page">
    <div class="contianer">
      <div class="deal-page__left is-desktop-show">
        <div class="deal-page__title">Hot Deal</div>
        <div class="deal-page__left__menu">
          <div class="deal-page__left__menu__button" @click="openCloseTab = 'all'" :class="openCloseTab == 'all'?'is-active':''">
            ALL Event
          </div>
          <div class="deal-page__left__menu__button" @click="openCloseTab = 'open'" :class="openCloseTab == 'open'?'is-active':''">
            <span>Ongoing Event</span>
          </div>
          <div class="deal-page__left__menu__button" @click="openCloseTab = 'close'"  :class="openCloseTab == 'close'?'is-active':''">
            <span>Ended Event</span>
          </div>
        </div>
        <div style="margin-top: 16px; cursor: pointer;">
          <img src="~assets/banner-pc.png" alt="" @click="$router.push('/premium-service')">
        </div>
      </div>
      <div class="deal-page__right">
        <div class="tab-scroll is-mobile-show">
          <q-tabs
            v-model="openCloseTab"
            active-class="is-active"
            class=" mobile-tab"
          >
            <q-tab name="all" label="ALL Event" no-caps />
            <q-tab name="open" label="Ongoing Event" no-caps />
            <q-tab name="close"  label="Ended Event" no-caps />
          </q-tabs>
        </div>
        <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%; cursor:pointer;" @click="$router.push('/premium-service')">
        <div class="deal-page__right__title flex justify-between items-center" style="padding-right:20px;width: 100%;" >
          <div class="flex items-center">
            <div class="deal-page__title">Hot Deal (A special deal only our members)</div>
          </div>
          <q-btn class="write-button" flat label="Write" v-if="loginUser&&loginUser.isAdmin" no-caps @click="$router.push('/write-post?postCategory=deal')"></q-btn>
        </div>

        <div class="empty-list" v-show="dealPosts.length==0">
          There are no articles written.
        </div>
        <div class="deal-card-bg">
          <div class="deal-card" v-for="(currentPost,index) in dealPosts" :key="index"  @click="()=>goDetails(currentPost)" :class="currentPost.openOrClose=='close'?'is-close':''">
            <div class="deal-card__main-image">
              <div class="close-bg" v-show="currentPost.openOrClose=='close'">Closed</div>
              <img :src="currentPost.mainImage" alt="" srcset="">
            </div>
            <div class="deal-card__title">
              {{ currentPost.title }}
            </div>
            <div class="deal-card__date">
              <div class="deal-card__date__from">
                {{ convertedDateFormatEnglish(currentPost.fromDate)}}
              </div>
              <div>~</div>
              <div class="deal-card__date__to">
                {{ convertedDateFormatEnglish(currentPost.toDate)}}
              </div>
            </div>
            <div class="deal-card__price-wrapper">
              <div class="deal-card__discount" v-show="currentPost.discountedPrice!=0">
                {{ parseInt((1-currentPost.discountedPrice/currentPost.regularPrice)*100)  }}%
              </div>
              <div class="deal-card__price">
                {{ numberWithCommas(currentPost.discountedPrice) }}
              </div>
              <div class="deal-card__price-2">
                KRW 
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="main-footer__logo">
        <div class="flex q-mb-lg">
          <img src="~assets/logo.png" alt="" style="cursor: pointer;" @click="$router.push('/')">
        </div>
        <div class="flex is-mobile-show">
          Business license number : 803-01-03096
        </div>
        <div class="flex is-mobile-show">
          Address: 584, Gangnam-daero, 
        </div>
        <div class="flex is-mobile-show">
          Gangnam-gu, Seoul, Republic of Korea
        </div>
        <div class="flex is-mobile-show">
          © 2023 m3solution. All rights reserved.
        </div>
        <div class="flex is-desktop-show">
          Business license number : 803-01-03096
        </div>
        <div class="flex is-desktop-show">
          Address: 584, Gangnam-daero, Gangnam-gu, Seoul, Republic of Korea
        </div>
        <div class="flex is-desktop-show">
          © 2023 m3solution. All rights reserved.
        </div>
      </div>
</q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from 'firebase/database';
import moment from 'moment';
export default {
mixins: [ComputedMixin, UtilMethodMixin],
data(){
  return{
    openCloseTab:"all",
    allPosts:[],
    dealPosts:[],
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
watch:{
  openCloseTab(value){
      if(value == 'all'){
        this.dealPosts= this.allPosts
      }else if(value == 'open'){
        this.dealPosts= this.allPosts.filter(i=>i.openOrClose=='open')
      }else if(value == 'close'){
        this.dealPosts= this.allPosts.filter(i=>i.openOrClose=='close')
      }
  }
},
async mounted() {
  // this.showLoading();
    await this.getPosts();
    
    if(this.$route.query.openCloseTab){
      this.openCloseTab = this.$route.query.openCloseTab;
      if(this.openCloseTab == 'all'){
        this.dealPosts= this.allPosts
      }else if(this.openCloseTab == 'open'){
        this.dealPosts= this.allPosts.filter(i=>i.openOrClose=='open')
      }else if(this.openCloseTab == 'close'){
        this.dealPosts= this.allPosts.filter(i=>i.openOrClose=='close')
      }
    }
},
methods:{
  goDetails(post){
    console.log(post)
    this.$router.push({
        name: 'dealDetails',
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
    return new Promise(resolve=>{
      get(child(dbRef, `dealPosts/`))
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          const data = snapshot.val();

          Object.keys(data).forEach(function(key, index) {
            const currentObject = data[key];
            let data2 = currentObject;
            thisObj.allPosts.push({
              ...data2,
            });
          });

          console.log(thisObj.allPosts)
          for(const currentPost of thisObj.allPosts){
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

          console.log(thisObj.allPosts[0].fromDate)
          
          thisObj.allPosts = thisObj.allPosts.map(i=>{
            console.log(i.fromDate)
            console.log(`${i.fromDate.slice(0,4)}-${i.fromDate.slice(5,7)}-${i.fromDate.slice(8,10)}`)
            let  fromYear =i.fromDate.slice(0,4);
            let  fromMonth =i.fromDate.slice(5,7);
            let  fromDay =i.fromDate.slice(8,10);
            let  toYear =i.toDate.slice(0,4);
            let  toMonth =i.toDate.slice(5,7);
            let  toDay =i.toDate.slice(8,10);
            let newFromDate = moment(`${fromYear}${fromMonth}${fromDay}`, "YYYYMMDD")
            let newtoDate = moment(`${toYear}${toMonth}${toDay}`, "YYYYMMDD")
            let openOrCloseString = moment(`${toYear}${toMonth}${toDay}`, "YYYYMMDD").fromNow();
            let openOrClose = openOrCloseString.indexOf("in")==-1? "close":"open"
            return {
              ...i,
              fromDate:newFromDate,
              toDate:newtoDate,
              openOrClose
            }
          })
          thisObj.dealPosts = thisObj.allPosts.sort((a, b)=>{
            return b.createdAt - a.createdAt;
          }).sort((a, b)=>{
            if ( a.openOrClose < b.openOrClose ){
              return 1;
            }
            if ( a.openOrClose > b.openOrClose ){
              return -1;
            }
            return 0
          })

          resolve()
        }
      })
      .catch((error) => {
        console.error(error);
      });
    })
  },
},
};
</script>

<style lang="scss">
.deal-page{
  display: flex; 
  justify-content: center;
  background: #F8F8F8;
  flex-direction: column;
  align-items: center;
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
      height: 150px;
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
        &:not(.deal-page__left__menu__title):hover{
          cursor: pointer;
          background: #ddd;
          opacity: 0.8;
        }
      }
      &__button{
        &.is-active{
          color: #366EB5 !important;
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
    &__title{
      display: flex;
      align-items: center;
      height: 40px;
      margin-bottom: 4px;
    }
    .deal-page__title{
      margin-right: 5px;
    }
    .deal-page__see-all{
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

  .deal-card-bg{
    background: white;
    padding: 20px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .deal-card{
    cursor: pointer;
    width: calc(33% - 15px);
    &__main-image{
      max-width: 250px;
      width: 100%;
      margin-bottom: 16px;
      img{
        width: 100%;
      }
    }
    &__title{
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #333;
      margin-bottom: 8px;
    }
    &__date{
      font-family: Spoqa Han Sans Neo;
      font-size: 10px;
      font-weight: 700;
      line-height: 12px;
      letter-spacing: 0em;
      text-align: left;
      color: #999;
      display: flex;
      gap: 3px;
      margin-bottom: 20px;
    }
    &__price-wrapper{
      display: flex;
      align-items: center;
    }
    &__discount{
      font-family: Spoqa Han Sans Neo;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #EF5350;
      margin-right: 8px;
    }
    &__price{
      //styleName: Subtitle3;
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #333;
      margin-right: 2px;
    }
    &__price-2{
      //styleName: Subtitle4;
      font-family: Spoqa Han Sans Neo;
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
      color: #333;
      margin-top: 2px;
    }

    &.is-close{
      .deal-card__main-image{
        position: relative;
      }
      .deal-card__price,
      .deal-card__price-2,
      .deal-card__price-wrapper,
      .deal-card__title{
        color: #999 !important;
      }
      .close-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        background:#00000070;
        color:white;
        display: flex;
        align-items: center;
        justify-content: center;
        //styleName: Subtitle3;
        font-family: Spoqa Han Sans Neo;
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
  }

}


@media only screen and (max-width: 1079px) {
/* For mobile: */
.deal-page {
  .contianer{
    padding: 0;
  }
  .deal-page__right{
    width: 100%;
  }
  .deal-page__title{
    margin-left: 24px;
  }

  .deal-page__title{
      max-width: 230px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  .deal-card-bg{
    flex-wrap: wrap;
    .deal-card{
      width: 100%;
      &__main-image{
        max-width: unset;
        img{
          width: 100%;
        }
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
