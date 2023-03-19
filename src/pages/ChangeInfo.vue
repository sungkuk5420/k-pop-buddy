<template>
  <q-page class="flex items-center justify-center column">
    <q-avatar v-show="loginUser"  @click="$router.push('/change-info')" square color="red" text-color="white" class="q-mr-md">{{ loginUser?loginUser.nickname.slice(0, 1).toUpperCase():''}}</q-avatar>
    <div>{{ loginUser.nickname }}</div>
    <div>{{ loginUser.email }}</div>
    <div v-if="loginUser">{{ convertedDateFormat(loginUser.createdAt) }}</div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
    }
  },
  mounted() {
  },
  methods:{
  }
};


</script>

<style>
.page-name{
  
}
</style>
