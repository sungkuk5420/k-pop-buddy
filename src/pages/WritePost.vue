<template>
  <q-page class="flex items-center justify-center write-post-page">
    <q-input
      v-model="title"
      filled
      placeholder="Write your title..."
      type="text"
      style="width:100%; margin-bottom: 10px;"
    />
    <q-input
      v-model="content"
      filled
      placeholder="Write your post..."
      cols="30"
      rows="14"
      type="textarea"
    />
    <div class="clearfix">
      <a-upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        :file-list="fileList"
        :before-upload="beforeUpload"
        @preview="handlePreview"
        @change="handleChange"
      >
        <div v-if="fileList.length < 8">
          <a-icon type="plus" />
          <div class="ant-upload-text">
            Upload
          </div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
      <q-btn label="write post" v-show="mode=='add'" @click="writePost"></q-btn>
      <q-btn label="edit post" v-show="mode=='edit'" @click="writePost"></q-btn>
      <q-btn label="delete post" v-show="mode=='edit'" @click="deletePost"></q-btn>
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
      title: '',
      content: '',
      currentPost: null,
      mode:'add',
      previewVisible: false,
      previewImage: '',
      fileList: [
      ],
    }
  },
  async mounted() {
    const postUid = this.$route.query.postUid;
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
      const category = this.$route.query.category == 'forums'?'forumsPosts':'hotFocusPosts'
      const postUid = this.$route.query.postUid
      set(ref(db, category+'/' + postUid),null)
    },
    getPostDetails(){
      return new Promise(resolve=>{
        setTimeout(async() => {
          const postUid = this.$route.query.postUid
          const dbRef = ref(getDatabase());
          const thisObj = this;
          console.log(postUid)
          const category = this.$route.query.category == 'forums'?'forumsPosts':'hotFocusPosts'
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
    },
    async writePost(){// Create the file metadata
      const thisObj =this;
      const category = this.$route.query.category == 'forums'?'forumsPosts':'hotFocusPosts'
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
      set(ref(db, category+'/' + postUid), {
        postUid:postUid,
        title: thisObj.title,
        content: thisObj.content,
        writer: thisObj.loginUser.uid,
        lastCommentWriter: null,
        views: 0,
        replies: 0,
        createdAt: thisObj.createNowTime(),
        updatedAt: thisObj.createNowTime(),
        filePaths
      })
      thisObj.hideLoading()
      if(queryPostUid){
        thisObj.$router.go(-1)
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
  flex-direction: column;
  .q-textarea{
    width: 100%;
    height: 300px;
    textarea{
      height: 100%;
                resize: none;
    }
  }
}
</style>