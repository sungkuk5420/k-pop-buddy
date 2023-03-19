<template>
  <q-page class="flex items-center justify-center column">
    <q-avatar v-show="loginUser"  @click="$router.push('/change-info')" square color="red" text-color="white" class="q-mr-md">{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
    

    <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">
        Upload
      </div>
    </div>
  </a-upload>

    <div>{{ loginUser.nickname }}</div>
    <div>{{ loginUser.email }}</div>
    <div v-if="loginUser">{{ convertedDateFormat(loginUser.createdAt) }}</div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      loading: false,
      imageUrl: '',
    }
  },
  mounted() {
  },
  methods:{
    handleChange(info) {
        debugger
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        console.log(info.file.originFileObj)
        debugger
        getBase64(info.file.originFileObj, imageUrl => {
          debugger
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
  }
};


</script>

<style>
.page-name{
  
}
</style>
