<template>
  <q-page class="flex items-center justify-center column">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-file outlined v-model="model" @input="previewFile">
        <q-avatar v-if="loginUser&&!loginUser.avatar&&!imageUrl"   square color="red" text-color="white" >{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
        <q-avatar v-if="loginUser&&loginUser.avatar&&!imageUrl"   square color="red" text-color="white" >
          <img :src="loginUser.avatar" alt="" srcset="">  
        </q-avatar>
        
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      </q-file>
      <q-btn label="Submit" type="submit" color="primary"/>
    </q-form>
    <div>{{ loginUser.nickname }}</div>
    <div>{{ loginUser.email }}</div>
    <div v-if="loginUser">{{ convertedDateFormat(loginUser.createdAt) }}</div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { T } from '../store/module-example/types';

import { getStorage, ref, uploadBytes ,getDownloadURL } from "firebase/storage";
import { getDatabase, ref as databaseRef, set, child, get } from 'firebase/database';

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
  data () {
    return {
      model: null,
      imageUrl: '',
    }
  },
  mounted() {
  },
  methods:{
    async previewFile(){
        const result= await getBase64(this.model);
        console.log(result)
        this.imageUrl = result;
    },
    onSubmit (evt) {
      console.log(this.model)
      const imageType = this.model.type.indexOf('png')!=-1? 'png':'jpg';
      const storage = getStorage();
      const storageRef = ref(storage, this.loginUser.uid+'/avatar.'+imageType );
      const thisObj = this;
      thisObj.showLoading()
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, this.model).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        const storage = getStorage();
        getDownloadURL(ref(storage, this.loginUser.uid+'/avatar.'+imageType))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url)
            const db = getDatabase();
            set(databaseRef(db, 'users/' + thisObj.loginUser.uid), {
              email: thisObj.loginUser.email,
              nickname: thisObj.loginUser.nickname,
              avatar:url,
              createdAt: thisObj.loginUser.createdAt,
            }).then(()=>{
              thisObj.$store.dispatch(T.SET_LOGIN_USER_INFO, {
                ...thisObj.loginUser,
                avatar:url
              });
              thisObj.hideLoading()
            })
          })
          .catch((error) => {
            // Handle any errors
          });
      });

      
    }
  }
};


</script>

<style lang="scss">
.page-name{
  
}

.q-file{
  display: inline-block;
  margin-top:  0!important;
  margin-left: 0!important;
  max-width: 100px;
  border:1px solid #ddd;
  img{
    max-width: 100px;

  }

  .q-field__native{
    display: none;
  }

  & .q-field__control{
    padding: 0;
  }
  & .q-field__control:before,
  & .q-field__control:after{
    display: none;
  }
    .q-field{
      margin-top:  0;
      margin-left:0;
    }
}
</style>
