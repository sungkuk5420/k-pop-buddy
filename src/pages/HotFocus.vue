<template>
  <q-page class="hot-focus-page">
    <div class="contianer">
      <div class="hot-focus-page__left is-desktop-show">
        <div >
          <img src="~assets/banner-pc.png" alt="">
        </div>
      </div>
      <div class="hot-focus-page__right">
        <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%; cursor:pointer;" @click="$router.push('/premium-service')">
        <div class="flex search-form" v-show="category != 'all'" >
          <q-input v-model="searchText" outlined placeholder="search text..."> </q-input>
        </div>
        <div class="hot-focus-page__right__title flex justify-between items-center" style="padding-right:20px;width: 100%;" >
          <div class="flex items-center">
            <div class="hot-focus-page__title">HOT Focus</div>
          </div>
          <q-btn class="write-button" flat label="Write" v-if="loginUser&&loginUser.isAdmin" no-caps @click="$router.push('/write-post?postCategory=hotFocus')"></q-btn>
        </div>

        <div class="empty-list" v-show="hotPosts.length==0">
            There are no articles written.
          </div>
        <q-list class="list">
          <q-item clickable v-ripple v-for="(item,index) in hotPosts[currentPage-1]" :key="index" @click="()=>goDetails(item)">
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
        <q-pagination
          v-model="currentPage"
          color="primary"
          :max="maxPage"
          :max-pages="6"
          boundary-numbers
          v-show="searchText==''"
        />
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
    allPosts:[],
    hotPosts:[],
    currentPage:1,
    searchText:"",
    maxPage:1,
  }
},
mounted() {
  // this.showLoading();
    this.getPosts();
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
  searchText(value){
      if(value){
          let allPosts = []
          this.hotPosts.map(i=>{
            i.map(item=>{
              allPosts.push(item)
            })
          });
          this.hotPosts[0] = allPosts.filter(i=>i.title.indexOf(value) != -1)
          this.currentPage=1;

      }else{
        this.getPageNation()
      }
    },
},
methods:{
  goDetails(post){
    console.log(post)
    this.$router.push({
        name: 'hotFocusDetails',
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
    get(child(dbRef, `hotFocusPosts/`))
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
          thisObj.getPageNation();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getPageNation(){
      let CONTENT_LENGTH= 10;
      let newArray = [];
      let pageIndex = 0
      for (let index = 0; index < this.allPosts.length; index++) {
        const i = this.allPosts[index];
        if(newArray[pageIndex] ===undefined){
          newArray.push([i])
        }else{
          newArray[pageIndex].push(i)
        }
        if(newArray[pageIndex].length>=CONTENT_LENGTH){
          pageIndex = pageIndex+1;
        }
      }
      this.hotPosts = newArray
      this.maxPage = this.hotPosts.length
  }
},
};
</script>

<style lang="scss">
.hot-focus-page{
display: flex; 
justify-content: center;
background: #F8F8F8;
.search-form{
  width: 100%;
  .q-input{
    width: 100%;
    background: white;
  }
}
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
      &:not(.hot-focus-page__left__menu__title):hover{
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
    width: calc(100% - 250px);
  &__title{
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 4px;
  }
  .hot-focus-page__title{
    margin-right: 5px;
  }
  .hot-focus-page__see-all{
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
.hot-focus-page {
  .contianer{
    padding: 0;
  }
  .hot-focus-page__right{
    width: 100%;
  }
  .hot-focus-page__title{
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
