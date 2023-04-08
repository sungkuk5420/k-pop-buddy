<template>
  <q-page class="flex flex-center">
    
      <q-tabs align="left" class="top-header-tabs">
        <q-route-tab to="/forums" label="Forums" />
        <q-route-tab to="/hot-focus" label="HOT focus" />
        <q-route-tab to="/deal" label="Buddies Deal" />
        <q-route-tab to="/premium-service" label="Premium Service" />
      </q-tabs>
      <span>HotFocus</span>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  mounted() {
    // this.showLoading();
  },
};
</script>

<style>
.page-name{
  
}
</style>
