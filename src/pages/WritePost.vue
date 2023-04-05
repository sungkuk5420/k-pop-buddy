<template>
  <q-page class="flex items-center justify-center write-post-page">
    <div class="contianer">
      <div class="write-post-page__left is-desktop-show">
        <div class="write-post-page__title" v-show="postCategory=='forums'">Forums</div>
        <div class="write-post-page__title" v-show="postCategory=='deal'">Buddies Deal</div>
        <div class="write-post-page__left__menu" v-show="postCategory=='forums'">
          <div class="write-post-page__left__menu__button" :class="category == 'all'?'is-active':''" @click="category = 'all'">
            <span>ALL </span>
            <span class="write-post-page__left__menu__button__count"> (11)</span>
          </div>
          <div class="write-post-page__left__menu__button" :class="category == 'plasticSurgeryAndCosmeticProcedures'?'is-active':''" @click="category = 'plasticSurgeryAndCosmeticProcedures'">
            <span>Plastic Surgery & Cosmetic Procedures </span>
            <span class="write-post-page__left__menu__button__count"> (11)</span>
          </div>
          <div class="write-post-page__left__menu__button" :class="category == 'nailAndHairAndSkinCare'?'is-active':''" @click="category ='nailAndHairAndSkinCare'">
            <span>Nail & Hair & SkinCare</span>
            <span class="write-post-page__left__menu__button__count"> (4)</span>
          </div>
          <div class="write-post-page__left__menu__button" :class="category == 'tripAndFoodAndHotel'?'is-active':''" @click="category ='tripAndFoodAndHotel'">
            <span>Trip & Food & Hotel</span>
            <span class="write-post-page__left__menu__button__count"> (574)</span>
          </div>
        </div>
        <div class="write-post-page__left__menu" v-show="postCategory=='deal'">
          <div class="write-post-page__left__menu__button" :class="dealOpenEnd == 'all'?'is-active':''" @click="dealOpenEnd = 'all'">
            <span>ALL Event </span>
          </div>
          <div class="write-post-page__left__menu__button" :class="dealOpenEnd == 'open'?'is-active':''" @click="dealOpenEnd = 'open'">
            <span>Ongoing Event </span>
          </div>
          <div class="write-post-page__left__menu__button" :class="dealOpenEnd == 'end'?'is-active':''" @click="dealOpenEnd ='end'">
            <span>Ended Event</span>
          </div>
        </div>
        <div style="margin-top: 16px;">
          <img src="~assets/banner-pc.png" alt="">
        </div>
      </div>
      <div class="write-post-page__right">
        <div class="tab-scroll is-mobile-show" v-show="postCategory=='forums'">
          <q-tabs
            v-model="category"
            active-class="is-active"
            class=" mobile-tab"
          >
            <q-tab name="all" label="ALL" no-caps />
            <q-tab name="boy" label="Plastic Surgery & Cosmetic Procedures" no-caps />
            <q-tab name="girl"  label="Nail & Hair & SkinCare" no-caps />
            <q-tab name="solo"  label="Trip & Food & Hotel" no-caps />
          </q-tabs>
        </div>
        <div class="tab-scroll is-mobile-show" v-show="postCategory=='deal'">
          <q-tabs
            v-model="dealOpenEnd"
            active-class="is-active"
            class=" mobile-tab"
          >
            <q-tab name="all" label="ALL Event" no-caps />
            <q-tab name="open" label="Ongoing Event" no-caps />
            <q-tab name="end"  label="Ended Event" no-caps />
          </q-tabs>
        </div>
        <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%;">
        <div class="write-post-page__right__title flex justify-between items-center" style="width: 100%;" v-show="category == 'all' || category == 'plasticSurgeryAndCosmeticProcedures'">
            <div class="flex items-center">
              <div class="write-post-page__title">Plastic Surgery & Cosmetic Procedures</div>
            </div>
        </div>
        <div class="write-post-page__right__title flex justify-between items-center" style="width: 100%;" v-show="category == 'all' || category == 'nailAndHairAndSkinCare'">
          <div class="flex items-center">
            <div class="write-post-page__title">Nail & Hair & SkinCare</div>
          </div>
        </div>
        <div class="write-post-page__right__title flex justify-between items-center" style="width: 100%;" v-show="category == 'all' || category == 'tripAndFoodAndHotel'">
          <div class="flex items-center">
            <div class="write-post-page__title">Trip & Food & Hotel</div>
          </div>
        </div>
        <div class="write-post-page__right__title flex justify-between items-center" style="width: 100%;" v-show="postCategory == 'hotFocus'">
          <div class="flex items-center">
            <div class="write-post-page__title">HOT Focus</div>
          </div>
        </div>
        <div class="write-post-page__right__title flex justify-between items-center" style="width: 100%;" v-show="postCategory == 'deal'">
          <div class="flex items-center">
            <div class="write-post-page__title">Buddies Deal (A special sale only buddies)</div>
          </div>
        </div>
        <div class="write-post-page__bg">
          <q-input
            v-model="title"
            outlined
            placeholder="Please enter the subject"
            type="text"
            style="width:100%; margin-bottom: 10px; background: white;" 
          />
          <div class="flex" style="gap:10px" v-show="postCategory=='deal'">
            <div style="flex:1">
              <q-input outlined v-model="fromDate" placeholder="start date">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateRange" range>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div style="flex:1">
              <q-input outlined v-model="toDate" placeholder="end date" >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateRange" range>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div style="flex:1">
              <q-input
                v-model="regularPrice"
                outlined
                placeholder="regular price"
                type="text"
                style="width:100%; margin-bottom: 10px; background: white;" 
              />
            </div>
            <div style="flex:1">
              <q-input
                v-model="discountedPrice"
                outlined
                placeholder="Discounted prices"
                type="text"
                style="width:100%; margin-bottom: 10px; background: white;" 
              />
            </div>
          </div>
          <textarea  placeholder="Please enter the content of the article" name="" id="" cols="30" rows="30" v-model="content"></textarea>
          <div class="clearfix">
            <div class="flex justify-between" style="margin-top: 12px;">
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
              <q-btn class="write-button" label="Write" no-caps v-show="mode=='add'" @click="writePost"></q-btn>
            </div>
            <!-- <q-btn label="edit post" v-show="mode=='edit'" @click="writePost"></q-btn>
            <q-btn label="delete post" v-show="mode=='edit'" @click="deletePost"></q-btn> -->
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
import { getDatabase, ref, set, child, get } from 'firebase/database';
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import { uid } from 'quasar';
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      category:"",
      dealOpenEnd:"all",
      title: '',
      content: '',
      dateRange: '',
      fromDate: '',
      toDate: '',
      regularPrice: '',
      discountedPrice: '',
      currentPost: null,
      mode:'add',
      previewVisible: false,
      previewImage: '',
      postCategory:"",
      fileList: [
      ],
    }
  },
  watch:{
    dateRange(value){
this.fromDate = value.from
this.toDate = value.to
    },
    category(value){
      if(!window.isFirstChangecategory){
        this.$router.push(`/forums?category=${value}`)
      }else{
        delete window.isFirstChangecategory
      }
    }
  },
  async mounted() {
    const postUid = this.$route.query.postUid;
    window.isFirstChangecategory = true
    this.category = this.$route.query.category;
    this.postCategory = this.$route.query.postCategory;
    if(postUid){
      this.mode = 'edit'
      await this.getPostDetails()
      console.log(this.currentPost.filePaths)
      this.title = this.currentPost.title;
      this.content = this.currentPost.content;
      if(this.currentPost.filePaths){
        this.fileList = this.currentPost.filePaths.map((i,index)=>{return {
            uid: index,
            fileName:i.fileName,
            status: 'done',
            url: i.url,
        }})
      }
    }
  },
  methods:{
    deletePost(){
      const db = getDatabase();
      const postCategory = this.postCategory == 'forums'?'forumsPosts':'hotFocusPosts'
      const postUid = this.$route.query.postUid
      set(ref(db, postCategory+'/' + postUid),null)
    },
    getPostDetails(){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.$route.query.postUid
          const dbRef = ref(getDatabase());
          const thisObj = this;
          console.log(postUid)
          const postCategory = this.postCategory == 'forums'?'forumsPosts':'hotFocusPosts'
          get(child(dbRef, `${postCategory}/${postUid}`))
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
    },
    async writePost(){// Create the file metadata
      const thisObj =this;
      const postCategory = this.postCategory == 'forums'?'forumsPosts':'hotFocusPosts'
      const queryPostUid = this.$route.query.postUid
      const storage = getStorage();
      let filePaths = [];
      if(!this.loginUser){
        this.errorMessage("로그인한 사용자만 작성할 수 있습니다.");
        console.log("error")
        return false;
      }
      if(this.title==""){
        this.errorMessage("타이틀을 작성해주세요");
        console.log("error")
        return false;
      }
      if(this.content==""){
        this.errorMessage("내용을 작성해주세요");
        console.log("error")
        return false;
      }
      this.showLoading()
      const postUid = queryPostUid?queryPostUid:uid().replace("-","").slice(0,12)
      for (const currentFile of this.fileList) {
          await new Promise(resolve2 => {
            const file = currentFile.originFileObj
            if(file){
              const storageRef = fileRef(storage, 'images/'+postUid+'/' + file.name);
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
                    filePaths.push({
                      fileName:file.name,
                      url:downloadURL
                    })
                    resolve2();
                  });
                }
              );
            }else{
              //no file 
              filePaths.push({
                fileName:currentFile.fileName,
                url:currentFile.url
              })
              resolve2();
            }
          });
      };
      const db = getDatabase();
      if(this.postCategory == 'deal'){
        set(ref(db, 'dealPosts/' + postUid), {
          postUid:postUid,
          title: thisObj.title,
          content: thisObj.content,
          writer: thisObj.loginUser.uid,
          createdAt: thisObj.createNowTime(),
          fromDate: thisObj.fromDate,
          toDate: thisObj.toDate,
          regularPrice: thisObj.regularPrice,
          discountedPrice: thisObj.discountedPrice,
          filePaths,
        })
        .then(async (snapshot) => {
          thisObj.hideLoading()
          thisObj.$router.go(-1)
        })
        .catch((error) => {
          thisObj.hideLoading()
          thisObj.errorMessage(error);
        });
      }else{
        set(ref(db, postCategory+'/' + postUid), {
          postUid:postUid,
          title: thisObj.title,
          content: thisObj.content,
          writer: thisObj.loginUser.uid,
          lastCommentWriter: null,
          views: 0,
          replies: 0,
          createdAt: thisObj.createNowTime(),
          updatedAt: thisObj.createNowTime(),
          filePaths,
          category:thisObj.category?thisObj.category:''
        })
        .then(async (snapshot) => {
          thisObj.hideLoading()
          thisObj.$router.go(-1)
        })
        .catch((error) => {
          thisObj.hideLoading()
          thisObj.errorMessage(error);
        });
      }

      
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
      this.fileList = fileList.filter(i=>i.type === 'image/jpg'||i.type === 'image/jpeg'||i.type === 'image/png' ||i.url);
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.errorMessage('You can only upload JPG file or PNG file!');
      }
      return isJpgOrPng ;
    },
  }
};


</script>


<style lang="scss">
.write-post-page{
  padding: 20px;
  display: flex; 
  justify-content: center;
  align-items: flex-start;
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
      height: auto;
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
        &:not(.write-post-page__left__menu__title):hover{
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
    &__title{
      display: flex;
      align-items: center;
      height: 40px;
      margin-bottom: 4px;
    }
    .write-post-page__title{
      margin-right: 5px;
    }
    .write-post-page__see-all{
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

  .write-post-page__bg{
    background: white;
    padding: 28px;
  }
  
  textarea{
    padding: 12px;
    border: 1px solid #999;
    border-radius: 6px;
    width: 100%;
    height: 100%;
    resize: none;
    height: 300px;
    background: white;
    &:focus,
    &:active{
      border:1px solid #366EB5;
      outline: auto;  
      outline-color: #366EB5 !important;
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

  .write-button{
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

@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .write-post-page {
    padding: 0;
    .contianer{
      padding: 0;
    }
    .write-post-page__right__title{
      margin-left: 20px;
      margin-top: 10px;
    }
    .write-post-page__right{
      width: 100%;
    }
    .write-post-page__right__content-wrapper__content{
      padding: 0;
    }
    .write-post-page__right__content-wrapper.comment{
      padding: 0 0 12px 0;
    }
    .write-post-page__right__conmment-wrapper{
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
    
    .write-post-page__bg{
      background: white;
      padding: 16px;
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