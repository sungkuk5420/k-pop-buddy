<template>
  <q-page class="deal-page">
    <div class="contianer">
      <div class="deal-page__left is-desktop-show">
        <div class="deal-page__title">Buddies Deal</div>
        <div class="deal-page__left__menu">
          <div class="deal-page__left__menu__button">
            ALL Event
          </div>
          <div class="deal-page__left__menu__button">
            <span>Ongoing Event</span>
          </div>
          <div class="deal-page__left__menu__button">
            <span>Ended Event</span>
          </div>
        </div>
        <div style="margin-top: 16px;">
          <img src="~assets/banner-pc.png" alt="">
        </div>
        <q-btn label="write post" no-caps @click="$router.push('/write-post?category=forums')"></q-btn>
      </div>
      <div class="deal-page__right">
        <div class="tab-scroll is-mobile-show">
          <q-tabs
            v-model="tab"
            active-class="is-active"
            class=" mobile-tab"
          >
            <q-tab name="all" label="ALL" no-caps />
            <q-tab name="boy" label="IDOL Group(BOY)" no-caps />
            <q-tab name="girl"  label="IDOL Group(Girl)" no-caps />
            <q-tab name="solo"  label="IDOL Group(Solo)" no-caps />
          </q-tabs>
        </div>
        <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%;">
        <div class="deal-page__right__title flex justify-between items-center" style="padding-right:20px;width: 100%;" >
          <div class="flex items-center">
            <div class="deal-page__title">Buddies Deal (A special sale only buddies)</div>
          </div>
          <q-btn class="write-button" flat label="Write"  no-caps @click="$router.push('/write-post?category=deal')"></q-btn>
        </div>

        <div class="empty-list" v-show="dealPosts.length==0">
          There are no articles written.
        </div>

        {{ dealPosts }}

      </div>
    </div>
  <div class="flex column">
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
    tab:"all",
    dealPosts:[],
  }
},
mounted() {
  // this.showLoading();
    this.getPosts();
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
    get(child(dbRef, `dealPosts/`))
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
          
          thisObj.dealPosts = allPosts.sort((a, b)=>{
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
.deal-page{
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
