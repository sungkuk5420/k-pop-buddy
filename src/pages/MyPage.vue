<template>
  <q-page class="my-page">
    <div class="contianer">
      <div class="my-page__left is-desktop-show">
        <div class="my-page__title">Mypage</div>
        <div class="my-page__left__menu" v-if="loginUser">
          <div class="my-page__left__menu__button" clickable :class="tab == 'noteManagement'?'is-active':''" @click="tab ='noteManagement'">
            <span>Note management</span>
          </div>
          <div class="my-page__left__menu__button" clickable :class="tab == 'logout'?'is-active':''" @click="tab ='logout';">
            <span>Logout</span>
          </div>
        </div>
        <div style="margin-top: 16px; cursor: pointer;">
          <!-- <img src="~assets/banner-pc.png" alt="" @click="$router.push('/premium-service')"> -->
        </div>
      </div>
      <div class="my-page__right" v-if="loginUser">
        <div class="tab-scroll is-mobile-show">
          <q-tabs
            v-model="tab"
            active-class="is-active"
            class=" mobile-tab"
          >
            <q-tab name="noteManagement" label="Note management" no-caps />
            <q-tab name="logout"  label="Logout" no-caps />
          </q-tabs>
        </div>
        <!-- <img src="~assets/banner-mobile.png" alt="" class="is-mobile-show" style="width: 100%; cursor:pointer;" @click="$router.push('/premium-service')"> -->
        <div class="my-infomation-wrapper">
          <div class="flex column" style="width: 100%;">
            <div class="flex" style="width: 100%;">
              <div class="my-infomation-wrapper__avatar">
                <q-avatar v-if="loginUser&&!loginUser.avatar"  color="red" text-color="white" >{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
              <q-avatar v-if="loginUser&&loginUser.avatar"  color="red" text-color="white" >
                <img :src="loginUser.avatar" alt="" srcset="">  
              </q-avatar>

              </div>
              <div class="my-infomation-wrapper__nickname-wrapper">
                <div class="my-infomation-wrapper__nickname">
                  {{ loginUser.nickname}}
                </div>
                <div class="my-infomation-wrapper__post-and-comment">
                  <div class="my-infomation-wrapper__created-at q-mr-sm">{{loginUser.email }}</div>
                  <div class="my-infomation-wrapper__created-at q-mr-sm"> |</div>
                  <div class="my-infomation-wrapper__created-at">{{ convertedDateFormatEnglish(loginUser.createdAt) }}</div>
                  <!-- <div class="my-infomation-wrapper__spliter"></div>
                  <div class="my-infomation-wrapper__post">
                    <div class="my-infomation-wrapper__label">Post</div>
                    <div class="my-infomation-wrapper__value">{{ postCount }}</div>
                  </div>
                  <div class="my-infomation-wrapper__spliter"></div>
                  <div class="my-infomation-wrapper__comment">
                    <div class="my-infomation-wrapper__label">Comment</div>
                    <div class="my-infomation-wrapper__value">{{ commentCount }}</div>
                  </div> -->
                </div>
                <div class="my-infomation-wrapper__reset-password" @click="changeEmailLogin">
                  Reset Email
                </div>
                <div class="my-infomation-wrapper__reset-password" @click="prompt">
                  Reset Password
                </div>

              </div>
              <div class="my-infomation-wrapper__edit is-desktop-show" style="margin-left:auto;">
                <q-btn outline label="Edit" no-caps @click="editModal=true"/>
              </div>
            </div>
            <div class="my-infomation-wrapper__edit is-mobile-show" style="width: 100%;padding:20px 0px 0 0px">
              <q-btn outline label="Edit" no-caps @click="editModal=true" style="width: 100%;" />
            </div>
          </div>
        </div><!--  my-infomation-wrapper -->


      </div> <!-- my-page-right-->
      <q-dialog v-model="editModal" >
      <q-card class="edit-modal">
        <q-card-section class="row items-center q-pb-none">
          <div class="edit-modal__title">Account details</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="flex column items-center">
            <q-avatar class="edit-modal__avatar" v-show="!imageFile" v-if="loginUser&&!loginUser.avatar&&!imageUrl"  color="red" text-color="white" >{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
            <q-avatar class="edit-modal__avatar" v-show="!imageFile" v-if="loginUser&&loginUser.avatar&&!imageUrl"  color="red" text-color="white" >
              <img :src="loginUser.avatar" alt="" srcset="">  
            </q-avatar>
            <q-avatar class="edit-modal__avatar" v-show="imageFile">
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            </q-avatar>
            
            <q-btn class="ant-upload-text" @click="fileFormOpen" outline label="Photo Upload" no-caps color="primary">
                
            </q-btn>
            <div class="flex column" style="width:100%;">
              <div class="edit-modal__label" @click="fileFormOpen">
                  Nickname
              </div>
              <q-input type="text" outlined v-model="nickname" maxlength="20"></q-input>
              <q-form @submit="changeUserInfo">
                <q-file style="display:none;" outlined v-model="imageFile" @input="previewFile" class="photo-upload-button" ref="fileButton">
                </q-file>
                <q-btn label="Edit" type="submit"  class="edit-modal__button" no-caps/>
              </q-form>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getAuth, updatePassword,updateEmail,signInWithEmailAndPassword,    } from "firebase/auth";
import { T } from '../store/module-example/types';
import { getStorage, ref as fileRef, uploadBytes ,getDownloadURL } from "firebase/storage";
import { getDatabase, ref , set, child, get,query, orderByChild,equalTo } from 'firebase/database';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = error => reject(error);
  });
}

export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data(){
    return{
      tab:"noteManagement",
      postCount:0,
      commentCount:0,
      editModal:false,
      imageFile: null,
      imageUrl: '',
      nickname:"",
    }
  },
  mounted() {
    // this.showLoading();
      // this.getPosts();
  },
  watch:{
    tab(value){
      if(value == 'logout'){
        this.logoutFirebase()
      }
    },
    editModal(value){
      if(value){
        this.nickname = this.loginUser.nickname;
      }
    }
  },
  methods:{
    fileFormOpen(){
      console.log(this.$refs.fileButton)
      this.$refs.fileButton.pickFiles()
    },
    async previewFile(){
        const result= await getBase64(this.imageFile);
        console.log(result)
        this.imageUrl = result;
    },
    async changeUserInfo (evt) {
      console.log(this.imageFile)
      const storage = getStorage();
      const storageRef = fileRef(storage, this.loginUser.uid+'/avatar' );
      const thisObj = this;

      let allUserNicknames  = []
      await thisObj.getAllUserNicknames().then(result=>{
        allUserNicknames = result
      })


      let nickname = thisObj.nickname;
      if(allUserNicknames.indexOf(nickname) != -1){
        thisObj.errorMessage("Please enter other nickname")
        return false
      }
      if(thisObj.nickname.indexOf(" ") != -1){
        thisObj.errorMessage("disable space in nickname")
        return false
      }
      if(nickname == ""){
        thisObj.errorMessage("Please enter your nickname.")
        return false
      }
      if(nickname == "admin"){
        thisObj.errorMessage("Please enter other nickname.")
        return false
      }
      if(nickname == "mygangnaminsider"){
        thisObj.errorMessage("Please enter other nickname.")
        return false
      }
      thisObj.showLoading()
      // 'file' comes from the Blob or File API
      if(this.imageFile){
        uploadBytes(storageRef, this.imageFile).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          const storage = getStorage();
          getDownloadURL(fileRef(storage, this.loginUser.uid+'/avatar'))
            .then((url) => {
              // `url` is the download URL for 'images/stars.jpg'
              console.log(url)
              const db = getDatabase();
              if(window.users){
                window.users = window.users.filter(i=>i.uid !==thisObj.loginUser.uid);
              }
              set(ref(db, 'users/' + thisObj.loginUser.uid), {
                ...thisObj.loginUser,
                email: thisObj.loginUser.email,
                nickname: thisObj.nickname,
                avatar:url,
                createdAt: thisObj.loginUser.createdAt,
              }).then(()=>{
                thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                  ...thisObj.loginUser,
                  avatar:url,
                  nickname: thisObj.nickname,
                });
                thisObj.editModal = false
                thisObj.hideLoading()
              })
            })
            .catch((error) => {
              // Handle any errors
            });
        });
      }else{
        const db = getDatabase();
        if(window.users){
          window.users = window.users.filter(i=>i.uid !==thisObj.loginUser.uid);
        }
        if(thisObj.loginUser.avatar){
          set(ref(db, 'users/' + thisObj.loginUser.uid), {
            ...thisObj.loginUser,
            email: thisObj.loginUser.email,
            nickname: thisObj.nickname,
            avatar:thisObj.loginUser.avatar,
            createdAt: thisObj.loginUser.createdAt,
          }).then(()=>{
            thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
              ...thisObj.loginUser,
              nickname: thisObj.nickname,
            });
            thisObj.editModal = false
            thisObj.hideLoading()
          })
        }else{
          set(ref(db, 'users/' + thisObj.loginUser.uid), {
            ...thisObj.loginUser,
            email: thisObj.loginUser.email,
            nickname: thisObj.nickname,
            createdAt: thisObj.loginUser.createdAt,
          }).then(()=>{
            thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
              ...thisObj.loginUser,
              nickname: thisObj.nickname,
            });
            thisObj.editModal = false
            thisObj.hideLoading()
          })
        }
      }

      
    }, 
    prompt () {
      this.$q.dialog({
        title: 'Reset Password',
        message: 'input new password',
        prompt: {
          model: '',

          type: 'password' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        console.log(data)
        this.resetPassword(data)
        // console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    changeEmailLogin () {
      const thisObj = this;
      this.$q.dialog({
        title: 'Reset Email',
        message: 'input your password',
        prompt: {
          model: '',
          type: 'password' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.loginUser.email, data)
        .then((userCredential) => {
          this.changeEmail()
        })
        .catch((error) => {
          const errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode)
          console.log(errorMessage)
          
          if (error.message.indexOf('(auth/user-not-found)') != -1) {
              errorMessage = "The requested user '"+ this.localEmail+ "' could not be found.";
          }
          if (error.message.indexOf('(auth/wrong-password)') != -1) {
              errorMessage = "Incorrect password. Please try again.";
          }
          if (error.message.indexOf('(auth/weak-password)') != -1) {
            errorMessage = "Password should be at least 6 characters.";
          }
          if (error.message.indexOf('(auth/invalid-email)') != -1) {
            errorMessage = "Please enter a valid email address.";
          }
          thisObj.localErrorMessage = errorMessage
        });
        // console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    changeEmail () {
      this.$q.dialog({
        title: 'Reset Email',
        message: 'input your new E-mail',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(newEmail => {
        console.log(newEmail)
        this.resetEmail(newEmail)
        // console.log('>>>> OK, received', data)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    resetEmail(newEmail){
      const auth = getAuth();
      const thisObj = this;

      updateEmail(auth.currentUser, newEmail).then(() => {
        // Email updated!
        thisObj.successMessage("Email updated!")
        const db = getDatabase();
        if(window.users){
          window.users = window.users.filter(i=>i.uid !==thisObj.loginUser.uid);
        }
        set(ref(db, 'users/' + thisObj.loginUser.uid), {
          ...thisObj.loginUser,
          email: newEmail,
          nickname: thisObj.loginUser.nickname,
          avatar:thisObj.loginUser.avatar,
          createdAt: thisObj.loginUser.createdAt,
        }).then(()=>{
          thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
            ...thisObj.loginUser,
            email:newEmail
          });
          thisObj.hideLoading()
        })
        // ...
      }).catch((error) => {
        // An error occurred
        thisObj.errorMessage("Fail to update email")
      });
    },
    resetPassword(newPassword){
      const auth = getAuth();

      const user = auth.currentUser;

      updatePassword(user, newPassword).then(() => {
        this.successMessage("Update successful")
        
      }).catch((error) => {
          let errorMessage = error.message
          if(error.message.indexOf('auth/email-already-in-use')!=-1){
            errorMessage = "Email already in use";
          }
          if(error.message.indexOf('(auth/weak-password)')!=-1){
            errorMessage = "Password should be at least 6 characters ";
          }
          if(error.message.indexOf('(auth/invalid-email)')!=-1){
            errorMessage = "Please enter a valid email address";
          }
          this.errorMessage(errorMessage)
      });
    }
    // getPosts(){
    //   const thisObj = this;
    //   // get(child(dbRef, `forumsPosts/`))
    //   const db = getDatabase();
    //   console.log(this.loginUser.uid)
    //   const mostViewedPosts = query(ref(db, 'forumsPosts'), orderByChild('writer'));
      
    //   get(mostViewedPosts).then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   }).catch((error) => {
    //     console.error(error);
    //   });
    //   console.log(mostViewedPosts)
    // },
  },
};
</script>

<style lang="scss">
.my-page{
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
        &:not(.my-page__left__menu__title):hover{
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
    .my-page__title{
      margin-right: 5px;
    }
    .my-page__see-all{
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
  .my-infomation-wrapper{
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 32px 24px ;
    &__avatar{
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      .q-avatar,
      img{
        width: 80px;
        height: 80px;
      }
    }
    &__nickname-wrapper{
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    &__nickname{
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: 0em;
      text-align: left;
      color: #333;
      margin-bottom: 8px;
    }
    &__post-and-comment{
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    &__spliter{
      width: 1px;
      height: 12px;
      background: #999;
      margin: 0 12px;
    }
    &__post{
      display: flex;
      align-items: center;
    }
    &__comment{
      display: flex;
      align-items: center;
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
    &__label{
      font-family: Spoqa Han Sans Neo;
      font-size: 10px;
      font-weight: 700;
      line-height: 12px;
      letter-spacing: 0em;
      text-align: left;
      color: #999;
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
    }
    &__reset-password{
      font-family: Spoqa Han Sans Neo;
      font-size: 10px;
      font-weight: 700;
      line-height: 12px;
      letter-spacing: 0em;
      text-align: left;
      color: #366EB5;
      cursor: pointer;
    }
    &__edit{
      display: flex;
      align-items: center;
      .q-btn{
        border-radius: 6px;
        font-family: Spoqa Han Sans Neo;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        color: #366EB5;

      }
    }
  }

}


.edit-modal{
  width: 100%;
  max-width: 520px;
  &__title{
    font-family: Pretendard;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: left;
    color: #333;
    margin-bottom: 24px;
  }
  &__avatar{
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
  }

  .ant-upload-text{
    border: 1px solid #366EB5 !important;
    color: #366EB5;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 24px;
  }

  &__label{
    margin-bottom: 4px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #000;
  }

  &__button{
    margin-top: 24px;
    width: 100%;
    background: $primary;
    color: white;
    font-family: Spoqa Han Sans Neo;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
    height: 48px;
  }
}


@media only screen and (max-width: 1079px) {
  /* For mobile: */
  .my-page {
    .contianer{
      padding: 0;
    }
    .my-page__right{
      width: 100%;
    }
    .my-page__title{
      margin-left: 24px;
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

    .my-infomation-wrapper__avatar{
      width: 60px;
      height: 60px;
      .q-avatar{
        width: 60px;
        height: 60px;
      }
    }
  }
}

@media only screen and (min-width: 1080px) {
  /* For desktop: */
}
</style>
