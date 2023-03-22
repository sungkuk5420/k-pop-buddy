<template>
  <q-page class="flex items-center justify-center write-post-page">
    <q-input
      v-model="text"
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
      <q-btn label="write post" @click="writePost"></q-btn>
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
      previewVisible: false,
      text: '',
      previewImage: '',
      fileList: [
      ],
    }
  },
  mounted() {
  },
  methods:{
    async writePost(){// Create the file metadata
      const thisObj =this;
      const storage = getStorage();
      // Upload file and metadata to the object 'images/mountains.jpg'
      let filePaths = [];
      const postUid = uid().replace("-","").slice(0,12)
      for (const currentFile of this.fileList) {
          await new Promise(resolve2 => {
            const file = currentFile.originFileObj
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
                  filePaths.push(downloadURL)
                  resolve2();
                });
              }
            );
          });
      };
      const db = getDatabase();
      set(ref(db, 'posts/' + postUid), {
        postUid:postUid,
        content: thisObj.text,
        writer: thisObj.loginUser.uid,
        createdAt: thisObj.createNowTime(),
        filePaths
      })
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