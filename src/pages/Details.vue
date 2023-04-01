<template>
    <q-page class="forums-details-page">
      <div class="contianer">
        <div class="forums-details-page__left is-desktop-show">
          <div class="forums-details-page__title" v-show="category == 'forums' ">Forums</div>
          <div class="forums-details-page__left__menu" v-show="category == 'forums' ">
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
        <div class="forums-details-page__right" v-if="!currentPost">
          <div class="forums-details-page__right__title">
            <div class="forums-details-page__title"></div>
          </div>
          <div class="forums-details-page__right__content-wrapper" style="height:300px">
          </div>
        </div>
        <div class="forums-details-page__right" v-if="currentPost">
          <div class="forums-details-page__right__title">
            <div class="forums-details-page__title">{{ currentPost.title }}</div>
            <q-btn label="edit" v-show="loginUser&&currentPost.writer.uid === loginUser.uid" @click="$router.push(`/edit-post?category=${category}&postUid=${currentPost.postUid}`)"></q-btn>
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

              <img :src="currentFile.url" alt="" v-for="(currentFile, index) in currentPost.filePaths" :key="index" style="width:100%;">
            </div>
          </div>
          <div class="comment-empty" v-show="comments.length == 0">
            <div class="comment-empty__bg">
              There are no comments.
            </div>
          </div>
          <div class="forums-details-page__right__content-wrapper comment" v-for="(currentComment,index) in comments" :key="index">
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
                <p style="white-space: pre-line;">{{ currentComment.comment }}</p>
  
                <img :src="currentFile" alt="" v-for="(currentFile, index) in currentComment.filePaths" :key="index" style="width:100%;">
              </div>
            </div>
          </div>
          <div class="forums-details-page__right__conmment-wrapper">
            <textarea placeholder="Please write a comment" name="" id="" cols="30" rows="10" v-model="commentText"></textarea>
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
      tab:"all",
      currentPost:null,
      previewVisible: false,
      previewImage: '',
      commentText: '',
      fileList: [],
      comments:[]
    }
  },
  computed: {
      getPost() {
          return this.$route.params.post;
      },
  },
  async mounted() {
    // this.showLoading();
    
    
    if(!this.getPost){
      await this.getPostDetails()
    }else{
      this.currentPost = this.getPost
    }
    this.getComments();
    this.plusView()
  },
  methods:{
    plusView(){
      const postUid = this.currentPost.postUid;
      const db = getDatabase();
      const category = this.category == 'forums'?'forumsPosts':'hotFocusPosts'

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
          const category = this.category == 'forums'?'forumsPosts':'hotFocusPosts'
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
    updasteLastComment(){
      
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.currentPost.postUid;
          const db = getDatabase();
          const dbRef = ref(getDatabase());
          const category = this.category == 'forums'?'forumsPosts':'hotFocusPosts'
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
        this.errorMessage("로그인한 사용자만 작성할 수 있습니다.");
        console.log("error")
        return false;
      }
      if(this.commentText==""){
        this.errorMessage("코멘트를 작성해주세요");
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
      
      currentPostComments = [...currentPostComments,
        {
          commentUid,
          comment:this.commentText,
          createdAt: thisObj.createNowTime(),
          filePaths,
          writer: thisObj.loginUser.uid,
        }
      ]

      set(ref(db, 'comments/' + postUid), {
        postUid:postUid,
        comments:currentPostComments
      })
      await this.plusReplies(currentPostComments.length);
      await this.updasteLastComment();
      let comments = currentPostComments

      for(const currentComment of comments){
        await thisObj.getUserProfile(currentComment.writer).then( result=>{
          currentComment.writer = {
          ...result
          }
        });
      }
      this.comments = comments
      this.commentText = ""
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
      this.fileList = fileList.filter(i=>i.type === 'image/jpg'||i.type === 'image/jpeg'||i.type === 'image/png');
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.errorMessage('You can only upload JPG file or PNG file!');
      }
      return isJpgOrPng ;
    },
    getPostDetails(){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.$route.query.postUid
          const dbRef = ref(getDatabase());
          const thisObj = this;
          console.log(postUid)
          const category = this.category == 'forums'?'forumsPosts':'hotFocusPosts'
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
                resolve();
                
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }, 0);
      })
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
      &.comment{
        padding: 0px 24px 24px 24px;
        .forums-details-page__right__content-wrapper__bg{
          background: #F8F8F8;
          padding: 20px;
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
      textarea{
        padding: 12px;
        border: 1px solid #999;
        border-radius: 6px;
        width: 100%;
        height: 100%;
        resize: none;
        height: 108px;
        background: white;
        &:focus,
        &:active{
          border:2px solid #366EB5;
          outline: none !important;
        }
      }
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
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
}
</style>
