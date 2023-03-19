<template>
  <q-page class="flex items-center justify-center column">
    <q-avatar v-if="loginUser&&!loginUser.avatar"   square color="red" text-color="white" class="q-mr-md">{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
    <q-avatar v-if="loginUser&&loginUser.avatar"   square color="red" text-color="white" class="q-mr-md">
    <img :src="loginUser.avatar" alt="" srcset="">  
    </q-avatar>
    
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-file outlined v-model="model">
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
        <q-btn label="Submit" type="submit" color="primary"/>
    </q-form>

    <div>{{ loginUser}}</div>
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
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      model: null
    }
  },
  mounted() {
  },
  methods:{
    onSubmit (evt) {
      console.log(this.model)
      const imageType = this.model.type.indexOf('png')!=-1? 'png':'jpg';
      const storage = getStorage();
      const storageRef = ref(storage, this.loginUser.uid+'/avatar.'+imageType );
      const thisObj = this;
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

<style>
.page-name{
  
}
</style>
