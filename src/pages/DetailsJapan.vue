<template>
    <q-page class="forums-details-page">
      <div class="contianer">
        <div class="forums-details-page__left is-desktop-show">
          <div class="forums-details-page__title" v-show="category == 'forums' ">Forums</div>
          <div class="forums-details-page__left__menu"  v-show="category == 'forums' ">
            <div class="forums-details-page__left__menu__button" clickable :class="categoryTab == 'all'?'is-active':''" @click="categoryTab = 'all'; $router.push(`/forums`) ">
              ALL
            </div>
            <div class="forums-details-page__left__menu__button" clickable :class="categoryTab == 'plasticSurgeryAndCosmeticProceduresJapan'?'is-active':''" @click="categoryTab = 'plasticSurgeryAndCosmeticProceduresJapan';  $router.push(`/forums?category=plasticSurgeryAndCosmeticProceduresJapan`)">
              <span>整形手術&美容施術 </span>
              <span class="forums-details-page__left__menu__button__count"> ({{ plasticCount }})</span>
            </div>
            <div class="forums-details-page__left__menu__button" clickable :class="categoryTab == 'nailAndHairAndSkinCareJapan'?'is-active':''" @click="categoryTab ='nailAndHairAndSkinCareJapan'; $router.push(`/forums?category=nailAndHairAndSkinCareJapan`)">
              <span>ネイル&ヘア&スキンケア</span>
              <span class="forums-details-page__left__menu__button__count"> ({{ nailCount }})</span>
            </div>
            <div class="forums-details-page__left__menu__button" clickable :class="categoryTab == 'tripAndFoodAndHotelJapan'?'is-active':''" @click="categoryTab ='tripAndFoodAndHotelJapan'; $router.push(`/forums?category=tripAndFoodAndHotelJapan`)">
              <span>トリップ&フード&ホテル</span>
              <span class="forums-details-page__left__menu__button__count"> ({{tripCount}})</span>
            </div>
          </div>
          <div class="forums-details-page__title" v-show="category == 'deal' ">Hot Deal</div>
          <div class="forums-details-page__left__menu" v-show="category == 'deal'">
          <div class="forums-details-page__left__menu__button" @click="$router.push(`/deal?openCloseTab=all`)" :class="openCloseTab == 'all'?'is-active':''">
            ALL Event
          </div>
          <div class="forums-details-page__left__menu__button" @click="$router.push(`/deal?openCloseTab=open`)" :class="openCloseTab == 'open'?'is-active':''">
            <span>Ongoing Event</span>
          </div>
          <div class="forums-details-page__left__menu__button" @click="$router.push(`/deal?openCloseTab=close`)"  :class="openCloseTab == 'close'?'is-active':''">
            <span>Ended Event</span>
          </div>
        </div>
        <div style="margin-top: 16px; cursor: pointer;">
            
          <a href="https://mygangnaminsider.com/" target="_blank">
            <img src="~assets/banner-pc.png" alt="" style="width:100%;">
          </a>
          </div>
        </div>
        <div class="forums-details-page__right" v-if="!currentPost">
          <div class="forums-details-page__right__title">
            <div class="forums-details-page__title"></div>
          </div>
          <div class="forums-details-page__right__content-wrapper" style="height:300px">
          </div>
        </div>
        <div class="forums-details-page__right" v-if="currentPost">
          <div class="tab-scroll is-mobile-show" v-show="category == 'forums'">
            <q-tabs
              v-model="categoryTab"
              active-class="is-active"
              class=" mobile-tab"
            >
              <q-tab name="all" label="ALL" no-caps @click="$router.push(`/forums`) "/>
              <q-tab name="plasticSurgeryAndCosmeticProceduresJapan" label="整形手術&美容施術" no-caps @click="$router.push(`/forums?category=plasticSurgeryAndCosmeticProceduresJapan`)"/>
              <q-tab name="nailAndHairAndSkinCareJapan"  label="ネイル&ヘア&スキンケア" no-caps @click="$router.push(`/forums?category=nailAndHairAndSkinCareJapan`)"/>
              <q-tab name="tripAndFoodAndHotelJapan"  label="トリップ&フード&ホテル" no-caps @click="$router.push(`/forums?category=tripAndFoodAndHotelJapan`)"/>
            </q-tabs>
          </div>
          <div class="tab-scroll is-mobile-show" v-show="category == 'deal'">
            <q-tabs
              v-model="openCloseTab"
              active-class="is-active"
              class=" mobile-tab"
            >
              <q-tab name="all" label="ALL Event" no-caps @click="$router.push(`/deal?openCloseTab=all`) "/>
              <q-tab name="open" label="Ongoing Event" no-caps @click="$router.push(`/deal??openCloseTab=open`)"/>
              <q-tab name="close"  label="Ended Event" no-caps @click="$router.push(`/deal??openCloseTab=close`)"/>
            </q-tabs>
          </div>
          <!-- <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%; cursor:pointer;" @click="$router.push('/premium-service')"> -->
          <div class="forums-details-page__right__title">
            <h1 class="forums-details-page__title">{{ currentPost.title }}</h1>
            <q-btn label="setNotice" no-caps v-if="loginUser&&loginUser.isAdmin&&!currentPost.notice" @click="setNotice"></q-btn>
            <q-btn label="unsetNotice" no-caps v-if="loginUser&&loginUser.isAdmin&&currentPost.notice" @click="unSetNotice"></q-btn>
            <q-btn label="edit" v-if="loginUser&&loginUser.isAdmin" @click="$router.push(`/edit-post?postCategory=${category}&category=${categoryTab}&postUid=${currentPost.postUid}`)"></q-btn>
            <q-btn label="delete" v-if="loginUser&&loginUser.isAdmin" @click="deletePost"></q-btn>
          </div>
          <div class="forums-details-page__right__content-wrapper">
            
            <q-btn flat class="more-button" v-show="loginUser&&(currentPost.writer.uid == loginUser.uid)">
              <q-icon name="more_horiz"></q-icon>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editDialog = true">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 100px" @click="editDialog = true">
                  <q-item clickable v-close-popup>
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-dialog v-model="editDialog" >
              <q-card class="edit-dialog">
                <q-card-section>
                  <div class="edit-dialog__title">Unable to work.</div>
                </q-card-section>

                <q-card-section class="edit-dialog__content q-pt-none">
                  Editing and deleting of posts is not possible according to policy. If you wish to delete, please contact us by e-mail.
                </q-card-section>
                <q-card-section class="edit-dialog__content q-pt-none">
                  mygangnaminsider@gmail.com
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Close" color="primary" v-close-popup  no-caps/>
                </q-card-actions>
              </q-card>
            </q-dialog>
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
                  {{ convertedDateFormatEnglishWithTime(currentPost.createdAt) }}
                  <div class="spliter" v-show="category != 'deal'"></div>
                  <div class="view-replies-warpper__label" v-show="category != 'deal'">Views</div>
                  <div class="view-replies-warpper__value" v-show="category != 'deal'">{{ currentPost.views }}</div>
                  <div class="spliter" v-show="category != 'deal'"></div>
                  <div class="view-replies-warpper__label" v-show="category != 'deal'">Replies</div>
                  <div class="view-replies-warpper__value" v-show="category != 'deal'">{{currentPost.replies}}</div>
                </div>
                
                <div class="price-wrapper" v-if="category == 'deal'">
                  <div class="price-wrapper__discount" v-show="currentPost.discountedPrice!=0">
                    {{ parseInt((1-currentPost.discountedPrice/currentPost.regularPrice)*100)  }}%
                  </div>
                  <div class="price-wrapper__price">
                    {{ numberWithCommas(currentPost.discountedPrice) }}
                  </div>
                  <div class="price-wrapper__price-2">
                    KRW
                  </div>
                </div>
              </div>
            </div>
            <div class="forums-details-page__right__content-wrapper__content">
              <img :src="currentFile.url" alt="" v-show="category !== 'forums' " v-for="(currentFile, index) in currentPost.filePaths" :key="index" style="max-width:100%;">
              <p style="white-space: pre-line;  word-wrap: break-word;" v-html="currentPost.content"></p>

              <img :src="currentFile.url" alt="" v-show="category == 'forums' " v-for="(currentFile, index) in currentPost.filePaths" :key="index" style="max-width:100%;">
            </div>
          </div>
          <div class="comment-empty" v-show="comments.length == 0 && category != 'deal'">
            <div class="comment-empty__bg">
              There are no comments.
            </div>
          </div>

          <q-dialog v-model="commentDeletePopup">
            <q-card class="edit-dialog">
              <q-card-section>
                <div class="edit-dialog__title">Delete the post?</div>
              </q-card-section>

              <q-card-section class="edit-dialog__content q-pt-none">
                If you delete a post, it cannot be recovered.
              </q-card-section>

              <q-card-actions align="right">
              
                <q-btn flat label="Delete" color="primary" v-close-popup no-caps @click="commentDelete"/>
                <q-btn flat label="Close" color="primary" v-close-popup no-caps />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="commentEditPopup" persistent>
            <q-card class="edit-dialog" style="width: 100%">
              <q-card-section>
                <div class="edit-dialog__title">Edit the post?</div>
              </q-card-section>

              <q-card-section class="edit-dialog__content q-pt-none">
                <ckeditor :editor="editor" placeholder="Please write a comment" name="" id="" cols="30" rows="10" v-model="editCommentText" maxlength="5000"   :config="editorConfig2"></ckeditor>
                
            <!-- <q-input
              placeholder="Please write a comment" name="" id="" cols="30" rows="10" v-model="editCommentText"
              maxlength="5000"
              outlined
              type="textarea"
              :rules="[ val => val.length <= 4999 || errorMessage('Please enter a comment with at least 10 characters and no more than 5,000 characters.')]"
            /> -->
              </q-card-section>

              <q-card-actions align="right">
              
                <q-btn flat label="Cancel" color="primary" v-close-popup no-caps />
                <q-btn flat label="OK" color="primary" v-close-popup no-caps @click="commentEdit"/>
              </q-card-actions>
            </q-card>
          </q-dialog>


          <div class="forums-details-page__right__content-wrapper comment" v-for="(currentComment,index) in comments" :key="index">
            
            <q-btn flat class="more-button" v-show="loginUser&&(currentComment.writer.uid !== loginUser.uid) && !currentComment.isDeleted">
              <q-icon name="more_horiz"></q-icon>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="()=>{reply(currentComment)}">
                    <q-item-section>Reply</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn flat class="more-button" v-show="loginUser&&loginUser.isAdmin && !currentComment.isDeleted||(loginUser&&(currentComment.writer.uid == loginUser.uid)) && !currentComment.isDeleted">
              <q-icon name="more_horiz"></q-icon>
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="()=>{reply(currentComment)}">
                    <q-item-section>Reply</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="commentEditPopup = true;editOrDeleteCurrentComment = currentComment">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                </q-list>
                <q-list style="min-width: 100px" @click="commentDeletePopup = true;editOrDeleteCurrentComment = currentComment">
                  <q-item clickable v-close-popup>
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <div class="forums-details-page__right__content-wrapper__bg">
              <div class="forums-details-page__right__content-wrapper__writer">
                <div class="avatar">
                  <q-avatar v-if="currentComment.writer&&!currentComment.writer.avatar" color="red" text-color="white" class="q-mr-md">{{ currentComment.writer?currentComment.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                  <q-avatar v-if="currentComment.writer&&currentComment.writer.avatar" color="red" text-color="white" class="q-mr-md">
                    <img :src="currentComment.writer.avatar" alt="" srcset="">
                  </q-avatar>
                </div>
                <div class="nickname-wrapper">
                  <div class="nickname">
                    {{ currentComment.writer.nickname }}
                  </div>
                  <div class="view-replies-warpper">
                    {{ convertedDateFormat(currentComment.createdAt) }}
                  </div>
                </div>
              </div>
              <div class="forums-details-page__right__content-wrapper__content">
                <img :src="currentFile" alt=""  v-show="!currentComment.isDeleted" v-for="(currentFile, index) in currentComment.filePaths" :key="index" style="max-width:100%;">
                <p style="white-space: pre-line; word-wrap: break-word;" v-html="currentComment.isDeleted?'Comment deleted': currentComment.comment"></p>
  
              </div>

              <div class="reply"  v-for="(reply,index2) in currentComment.comments" :key="index2" style="padding-left:20px;">
                <q-btn flat class="more-button" v-show="loginUser&&loginUser.isAdmin && !reply.isDeleted||(loginUser&&(reply.writer.uid == loginUser.uid)) && !reply.isDeleted" style="right:0px">
                  <q-icon name="more_horiz"></q-icon>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <q-item clickable v-close-popup @click="commentEditPopup = true;editOrDeleteCurrentComment = reply; currentReplyEditComment = reply">
                        <q-item-section>Edit</q-item-section>
                      </q-item>
                    </q-list>
                    <q-list style="min-width: 100px" @click="commentDeletePopup = true; editOrDeleteCurrentComment = reply; currentReplyEditComment = reply">
                      <q-item clickable v-close-popup>
                        <q-item-section>Delete</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
                <!-- <q-icon name="reply" style="    transform: rotateZ(178deg);    font-size: 20px;    position: absolute; margin-left: -20px;margin-top: 20px;"></q-icon> -->
                <div class="forums-details-page__right__content-wrapper__bg">
                  <div class="forums-details-page__right__content-wrapper__writer">
                    <div class="avatar">
                      <q-avatar v-if="reply.writer&&!reply.writer.avatar" color="red" text-color="white" class="q-mr-md">{{ reply.writer?reply.writer.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
                      <q-avatar v-if="reply.writer&&reply.writer.avatar" color="red" text-color="white" class="q-mr-md">
                        <img :src="reply.writer.avatar" alt="" srcset="">
                      </q-avatar>
                    </div>
                    <div class="nickname-wrapper">
                      <div class="nickname">
                        {{ reply.writer.nickname }}
                      </div>
                      <div class="view-replies-warpper">
                        {{ convertedDateFormat(reply.createdAt) }}
                      </div>
                    </div>
                  </div>
                  <div class="forums-details-page__right__content-wrapper__content">
                    <img :src="currentFile" alt="" v-show="!reply.isDeleted" v-for="(currentFile, index) in reply.filePaths" :key="index" style="max-width:100%;">
                    <p style="white-space: pre-line; word-wrap: break-word;" v-html="reply.isDeleted?'Comment deleted': reply.comment"></p>
      
                  </div>
                </div>

              </div>

            </div>

          </div>


          <div class="forums-details-page__right__conmment-wrapper" >
            <!-- <q-input
              placeholder="Please write a comment" name="" id="" cols="30" rows="10" v-model="commentText"
              maxlength="5000"
              outlined
              type="textarea"
              :rules="[ val => val.length <= 4999 || errorMessage('Please enter a comment with at least 10 characters and no more than 5,000 characters.')]"
            /> -->
            <div class="reply-info" v-if="currentReplyComment">
             <div class="reply-info__close"><q-icon name="close" @click="currentReplyComment=null"></q-icon></div>
              <div>reply: {{ currentReplyComment.writer.nickname }}</div>
              <div v-html="currentReplyComment.comment"></div>

            </div>
            <ckeditor :editor="editor" placeholder="Please write a comment" name="" id="" cols="30" rows="10" v-model="commentText" maxlength="5000"   :config="editorConfig"></ckeditor>
            <div class="flex justify-between" style="margin-top: 12px;">
              <div class="clearfix">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  :file-list="fileList"
                  :before-upload="beforeUpload"
                  @preview="handlePreview"
                  @change="handleChange"
                  class="custom-upload"
                >
                  <div v-if="fileList.length < 8">
                    <div class="ant-upload-text">
                      Photo Upload
                    </div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
              <q-btn label="Comment" no-caps class="write-comment" @click="writeComment"></q-btn>

            </div>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getStorage, ref as fileRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, set, child, get,update  } from 'firebase/database';
import { uid } from 'quasar';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
export default {
  name:"forumsDetails",
  mixins: [ComputedMixin, UtilMethodMixin],
  props:{
    category:{
      type:String,
      require:true
    }
  },
  data(){
    return{
      editor: ClassicEditor,
      editorConfig: {
          toolbar: {
              items: [
                  'bold',
                  'italic',
                  'link',
              ]
          }
      },
      editorConfig2: {
          toolbar: {
              items: [
              ]
          }
      },
      categoryTab:"",
      openCloseTab:"",
      currentPost:null,
      previewVisible: false,
      previewImage: '',
      commentText: '',
      fileList: [],
      comments:[],
      metaTitle:"",
      metaContent:"",
      editDialog: false,
      commentDeletePopup: false,
      commentEditPopup: false,
      editOrDeleteCurrentComment:null,
      editCommentText:"",
      plasticCount:0,
      nailCount:0,
      tripCount:0,
      currentReplyComment:null,
      currentReplyEditComment:null,
    }
  },
  watch : {
    categoryTab(value){
      // if(value == 'all'){
      //     this.$router.push(`/forums?category=all`)
      //     delete window.isFirstChangecategory
      // }else{
      //   if(!window.isFirstChangecategory){
      //     this.$router.push(`/forums?category=${value}`)
      //   }else{
      //     delete window.isFirstChangecategory
      //   }
      // }
    },
    commentEditPopup(value){
      if(value){
        this.editCommentText = this.editOrDeleteCurrentComment.comment
      }

    }
  },
  computed: {
      getPost() {
          return this.$route.params.post;
      },
  },
  async mounted() {
    
    
    setTimeout(async () => {
      
    // if(!this.loginUser){
    //   this.$router.push('/login')
    // }
    if(!this.getPost){
      await this.getPostDetails()
    }else{
      this.currentPost = this.getPost
    }
    await this.getComments();
    if(this.category != 'deal'){
      this.plusView()
    }
    
    
    this.plasticCount = localStorage.getItem('plasticCount')
    this.nailCount = localStorage.getItem('nailCount')
    this.tripCount = localStorage.getItem('tripCount')
    // window.isFirstChangecategory = true
    if(this.currentPost.category){
      this.categoryTab = this.currentPost.category
    }
    this.metaTitle = this.currentPost.title
    this.metaContent = this.currentPost.content
    // if(this.fileList[0]){
    //   this.metaImage = this.fileList[0]
    // }else{
    //   this.metaImage = 'https://mygangnaminsider.com/img/banner-pc.44e91d6a.png'
    // }
    if(this.category == "deal"){
      if( this.currentPost.toDate instanceof moment){
        let openOrCloseString = this.currentPost.toDate.fromNow();
        let openOrClose = openOrCloseString.indexOf("in")==-1? "close":"open"
        this.openCloseTab = openOrClose
      }else{
        let  toYear =this.currentPost.toDate.slice(0,4);
        let  toMonth =this.currentPost.toDate.slice(5,7);
        let  toDay =this.currentPost.toDate.slice(8,10);
        let openOrCloseString = moment(`${toYear}${toMonth}${toDay}`, "YYYYMMDD").fromNow();
        let openOrClose = openOrCloseString.indexOf("in")==-1? "close":"open"
        this.openCloseTab = openOrClose
      }
    }
    
    var anchors = document.getElementsByTagName("a");
    for (var i=0; i<anchors.length; i++)
    {
        var anchor = anchors[i];
        if(anchor.getAttribute("href"))
          anchor.target = "_blank";
    } 
    }, 200);
  },
   meta () {
    return {
      meta: {
        // 'og:url': { property: 'og:url', content: 'https://mygangnaminsider.com/#'+this.$route.fullPath },
        // 'og:type': { property: 'og:type', content: "article" },
        // 'og:description': { property: 'og:description', content: this.metaContent },
        // 'og:title': { property: 'og:title', content: this.metaTitle },
        // 'og:image': { property: 'og:image', content: this.metaImage },
        description: { name: 'description', content: this.metaContent },
        keywords: { name: 'keywords', content: `${this.$route.name  }` },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      },
      title: this.metaTitle,
    }
  },
  methods:{
    reply(currentComment){
      this.currentReplyComment = currentComment;
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    },
    plusView(){
      const postUid = this.currentPost.postUid;
      const db = getDatabase();
      const category = this.category == 'forums'?'forumsPosts':(this.category == 'forumsJapan'?'forumsPostsJapan':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts'))

      const updates = {};
      updates[`${category}/${postUid}/views`] = this.currentPost.views+1;
          this.currentPost = {
            ...this.currentPost,
            views:this.currentPost.views+1
          }
      update(ref(db), updates);
    },
    plusReplies(count){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.currentPost.postUid;
          const db = getDatabase();
          const category = this.category == 'forums'?'forumsPosts':(this.category == 'forumsJapan'?'forumsPostsJapan':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts'))
          const updates = {};
          updates[`${category}/${postUid}/replies`] = count
          update(ref(db), updates);
          this.currentPost = {
            ...this.currentPost,
            replies:count
          }
          resolve()
        }, 0);
      })
    },
    setNotice(count){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.currentPost.postUid;
          const db = getDatabase();
          const category = this.category == 'forums'?'forumsPosts':(this.category == 'forumsJapan'?'forumsPostsJapan':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts'))
          const updates = {};
          updates[`${category}/${postUid}/notice`] = true
          update(ref(db), updates);
          this.currentPost = {
            ...this.currentPost,
            notice:true
          }
          resolve()
        }, 0);
      })
    },
    unSetNotice(count){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.currentPost.postUid;
          const db = getDatabase();
          const category = this.category == 'forums'?'forumsPosts':(this.category == 'forumsJapan'?'forumsPostsJapan':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts'))
          const updates = {};
          updates[`${category}/${postUid}/notice`] = false
          update(ref(db), updates);
          this.currentPost = {
            ...this.currentPost,
            notice:false
          }
          resolve()
        }, 0);
      })
    },
    updasteLastComment(){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.currentPost.postUid;
          const db = getDatabase();
          const dbRef = ref(getDatabase());
          const category = this.category == 'forums'?'forumsPosts':(this.category == 'forumsJapan'?'forumsPostsJapan':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts'))
          get(child(dbRef, `${category}/${postUid}`))
          .then(async (snapshot) => {
            if (snapshot.exists()) {
              // console.log(snapshot.val());
              const data = snapshot.val();
              set(ref(db, `${category}/${postUid}`), {
                ...data,
                lastCommentWriter:this.loginUser.uid,
                updatedAt:this.createNowTime(),
              })
              resolve()
            }
          })
          .catch((error) => {
            console.error(error);
          });
        }, 0);
      })
    },
    async getComments(){
      const thisObj = this;
      const dbRef = ref(getDatabase());
      const postUid = this.currentPost.postUid;
      await get(child(dbRef, `comments/${postUid}`))
      .then(async (snapshot) => {
          if (snapshot.exists()) {
              // console.log(snapshot.val());
              const data = snapshot.val();
              let comments = data.comments

              for(const currentComment of comments){
                await thisObj.getUserProfile(currentComment.writer).then( result=>{
                  currentComment.writer = {
                  ...result
                  }
                });
                if(currentComment.comments){
                  for(const reply of currentComment.comments){
                    await thisObj.getUserProfile(reply.writer).then( result=>{
                      reply.writer = {
                      ...result
                      }
                    });
                  }
                }
              }
              this.comments = comments
          }
      })
      .catch((error) => {
          console.error(error);
      });
    },
    async writeComment(){
      const thisObj =this;
      const storage = getStorage();
      let filePaths = [];
      if(!this.loginUser){
        this.errorMessage("Please log in to creat a post");
        console.log("error")
        return false;
      }
      if(this.commentText==""){
        this.errorMessage("Please enter comment");
        console.log("error")
        return false;
      }
      const commentUid = uid().replace("-","").slice(0,12)
      for (const currentFile of this.fileList) {
          await new Promise(resolve2 => {
            const file = currentFile.originFileObj
            const storageRef = fileRef(storage, 'images/'+commentUid+'/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, {contentType: file.type});

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
              (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                thisObj.showLoading('Upload is ' + progress + '% done ');
                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              },
              (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                  case 'storage/canceled':
                    // User canceled the upload
                    break;

                  // ...

                  case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
              },
              () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  filePaths.push(downloadURL)
                  resolve2();
                });
              }
            );
          });
      };
      const postUid = this.currentPost.postUid;
      let currentPostComments = []
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `comments/${postUid}`))
      .then((snapshot) => {
          if (snapshot.exists()) {
              // console.log(snapshot.val());
              const data = snapshot.val();
              currentPostComments = data.comments
          }
      })
      .catch((error) => {
          console.error(error);
      });
      const db = getDatabase();
      if(this.currentReplyComment){
        for (let i = 0; i < currentPostComments.length; i++) {
          const element = currentPostComments[i];
          if(element.commentUid == this.currentReplyComment.commentUid){
            if(element.comments){
              element.comments = [...element.comments,
                {
                  commentUid,
                  comment:this.commentText,
                  createdAt: thisObj.createNowTime(),
                  filePaths,
                  writer: thisObj.loginUser.uid,
                  isDeleted:false
                }
              ]
            }else{
              element.comments = [
                {
                  commentUid,
                  comment:this.commentText,
                  createdAt: thisObj.createNowTime(),
                  filePaths,
                  writer: thisObj.loginUser.uid,
                  isDeleted:false
                }
              ]
            }
          }
        }
      }else if(currentPostComments){
        currentPostComments = [...currentPostComments,
          {
            commentUid,
            comment:this.commentText,
            createdAt: thisObj.createNowTime(),
            filePaths,
            writer: thisObj.loginUser.uid,
            isDeleted:false,
          }
        ]
      }else{
        currentPostComments = [
          {
            commentUid,
            comment:this.commentText,
            createdAt: thisObj.createNowTime(),
            filePaths,
            writer: thisObj.loginUser.uid,
            isDeleted:false,
          }
        ]
      }
      

      set(ref(db, 'comments/' + postUid), {
        postUid:postUid,
        comments:currentPostComments
      })
      await this.plusReplies(currentPostComments.length);
      await this.updasteLastComment();
      // let comments = currentPostComments

      // for(const currentComment of comments){
      //   await thisObj.getUserProfile(currentComment.writer).then( result=>{
      //     currentComment.writer = {
      //     ...result
      //     }
      //   });
      // }
      // this.comments = comments
      
      this.commentText = ""
      this.currentReplyComment = null
      await this.getComments();
      this.fileList = []
      thisObj.hideLoading()

    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList.filter(i=>(i.type === 'image/jpg'||i.type === 'image/jpeg'||i.type === 'image/png' )
      &&(i.size / 1024 / 1024 < 10)       );
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.errorMessage('Only jpg and png files can be uploaded.');
        // this.errorMessage('You can only upload JPG file or PNG file!');
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.errorMessage('Photos can be up to 10 MB in size.');
        // this.errorMessage('Image must smaller than 10MB!');
      }
      return isJpgOrPng && isLt10M;
    },
    getPostDetails(){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.$route.query.postUid
          const dbRef = ref(getDatabase());
          const thisObj = this;
          console.log(postUid)
          // const category = this.category == 'forums'?'forumsPosts':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts')
          const category = this.category == 'forums'?'forumsPosts':(this.category == 'forumsJapan'?'forumsPostsJapan':(this.category =='hot-focus'?'hotFocusPosts':'dealPosts'))
          get(child(dbRef, `${category}/${postUid}`))
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
                resolve(currentPost);
                
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }, 0);
      })
    },

    async commentDelete(){
      const currentComment = this.editOrDeleteCurrentComment
      const db = getDatabase();
      
      const postUid = this.currentPost.postUid;
      let currentPostComments = []
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `comments/${postUid}`))
      .then((snapshot) => {
          if (snapshot.exists()) {
              // console.log(snapshot.val());
              const data = snapshot.val();
              currentPostComments = data.comments
          }
      })
      .catch((error) => {
        console.error(error);
      });
      const lastCommentUid = currentPostComments[currentPostComments.length-1].commentUid
      
      let currentPostComment = currentPostComments.filter(i=>i.commentUid==currentComment.commentUid)[0];
      // currentPostComments = currentPostComments.filter(i=>i.commentUid!=currentComment.commentUid);
      if(this.currentReplyEditComment){
        for (let i = 0; i < currentPostComments.length; i++) {
          const element = currentPostComments[i];
          if(element.comments){
            for (let j = 0; j < element.comments.length; j++) {
              const reply = element.comments[j];
              
              if(reply.commentUid ==this.currentReplyEditComment.commentUid){
                element.comments[j] = {
                 ...reply,
                 isDeleted :true 
                };
              }
              
            }
            
          }
        }
        this.currentReplyEditComment = null
      }else{
        for (let i = 0; i < currentPostComments.length; i++) {
          const element = currentPostComments[i];
          if(element.commentUid ==currentComment.commentUid){
            element.isDeleted = true
          }
        }
        if(lastCommentUid ==currentPostComment.commentUid){
          const isNotDeletePosts = currentPostComments.filter(i=>i.isDeleted != true)
          if(isNotDeletePosts[isNotDeletePosts.length-1]){
            const lastCommentWriter = isNotDeletePosts[isNotDeletePosts.length-1].writer
            this.updateLastCommentOfPost(lastCommentWriter )
          }else{
            this.updateLastCommentOfPost(null)

          }
        }
      }
      set(ref(db, 'comments/' + postUid),{ 
        postUid:postUid,
        comments:currentPostComments
      })
      await this.getComments()
    },
    async commentEdit(){
      console.log(this.editCommentText) 
      const currentComment = this.editOrDeleteCurrentComment

      const db = getDatabase();
      
      const postUid = this.currentPost.postUid;
      let currentPostComments = []
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `comments/${postUid}`))
      .then((snapshot) => {
          if (snapshot.exists()) {
              // console.log(snapshot.val());
              const data = snapshot.val();
              currentPostComments = data.comments
          }
      })
      .catch((error) => {
        console.error(error);
      });
      let newComments =  []
      if(this.currentReplyEditComment){
        for (let i = 0; i < currentPostComments.length; i++) {
          let element = currentPostComments[i];
          if(element.comments){
            for (let j = 0; j < element.comments.length; j++) {
              let reply = element.comments[j];
              if(reply.commentUid == this.currentReplyEditComment.commentUid){
                element.comments[j] = {
                  ...reply,
                  comment:this.editCommentText
                }
              }
              
            }
          } 
          newComments.push(element)        
        }
        this.currentReplyEditComment = null
      }else{
        for (let i = 0; i < currentPostComments.length; i++) {
          let element = currentPostComments[i];
          if(element.commentUid == currentComment.commentUid){
            console.log(element)
            element = {
              ...element,
              comment:this.editCommentText
            }
          }
          newComments.push(element)        
        }
      }
      set(ref(db, 'comments/' + postUid),{ 
        postUid:postUid,
        comments:newComments
      })
      await this.getComments()
    },

    deletePost(){
      
      this.$q.dialog({
        title: 'Delete',
        message: 'Delete Post?',
        cancel: true,
      }).onOk(() => {
        const db = getDatabase();
        console.log(this.$router.path)
        const postCategory = this.$route.path.indexOf('japan-forums')!=-1?'forumsPostsJapan' :(this.$route.path.indexOf('forums')!=-1?'forumsPosts':(this.$route.path.indexOf('hot-focus')!=-1)?'hotFocusPosts':'dealPosts')
        const postUid = this.$route.query.postUid
        set(ref(db, postCategory+'/' + postUid),null)
        this.$router.go(-1)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    
    updateLastCommentOfPost(lastCommentWriter){
      const postUid = this.currentPost.postUid;
      const db = getDatabase();
      const postCategory = this.$route.path.indexOf('japan-forums')!=-1?'forumsPostsJapan' :(this.$route.path.indexOf('forums')!=-1?'forumsPosts':(this.$route.path.indexOf('hot-focus')!=-1)?'hotFocusPosts':'dealPosts')

      const updates = {};
      updates[`${postCategory}/${postUid}/lastCommentWriter`] = lastCommentWriter;
      update(ref(db), updates);
    },
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
  
  .ck-content{
    height: 100px;
  }
  &__left{
    width: 240px;
    margin-right: 36px;
    &__menu{
      margin-top: 12px;
      background: white;
      width: 200px;
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
        &:not(.forums-details__left__menu__title):hover{
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
    width: 100%;
    word-wrap: break-word;
  }
  &__right{
    flex: 1;
    width: 100%;
    &__title{
      display: flex;
      align-items: center;
      justify-content: space-between;
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
      position: relative;
      &.comment{
        padding: 0px 24px 24px 24px;
        .forums-details-page__right__content-wrapper__bg{
          background: #F8F8F8;
          padding: 20px;
        }

        .more-button{
          top: 10px;
          right: 30px;
        }
      }
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


    .more-button{
      position: absolute;
      right: 10px;
    }
    .comment-empty{
      background: white;
      padding: 20px;
      &__bg{
        background: #F8F8F8;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 130px;
        font-family: Spoqa Han Sans Neo;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: center;
        color: #000;
      }
    }

    &__conmment-wrapper{
      background: white;
      padding: 24px 24px;
      margin-top: 20px;
      // textarea{
        // padding: 12px;
        // border: 1px solid #999;
        // border-radius: 6px;
        // width: 100%;
        // height: 100%;
        // resize: none;
        // height: 108px;
        // background: white;
        // &:focus,
        // &:active{
        //   border:2px solid #366EB5;
        //   outline: none !important;
        // }
      // }
      .ant-upload{
        height: 32px !important;
        width: 113px;
        border-radius: 6px;
        background: white;
        color: #366EB5;
        border: 1px solid #366EB5;
        font-family: Spoqa Han Sans Neo;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        padding: 0 !important;

      }

      .write-comment{
        background: #366EB5;
        color: white;
        height: 32px;
        border: 1px solid #366EB5;
        font-family: Spoqa Han Sans Neo;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;

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

  .price-wrapper{
    display: flex;
    align-items: center;
    margin-top: 10px;
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
  }
  .reply{
    position: relative;
  }
  .reply-info{
    position: relative;
    &__close{
      position: absolute;
      right: 0;
      font-size: 20px;
      &:hover{
        cursor: pointer;
      }
    }
  }

}

.edit-dialog{
  width: 270px;
  &__title{
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    color: #000;
  }
  &__content{
    //styleName: Body2;
    font-family: Spoqa Han Sans Neo;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
  }
}


@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .forums-details-page {
    .contianer{
      padding: 0;
    }
    .forums-details-page__right__title{
      padding-left: 20px;
      margin-top: 10px;
    }
    .forums-details-page__right{
      width: 100%;
    }
    .forums-details-page__right__content-wrapper__content{
      padding: 0;
    }
    .forums-details-page__right__content-wrapper.comment{
      padding: 0 0 12px 0;
    }
    .forums-details-page__right__conmment-wrapper{
      padding: 10px;
    }
    .ant-upload{
      direction: rtl;
    }
    .custom-upload{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      max-width: 230px;
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
