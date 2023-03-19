<template>
    <q-page class="flex items-start justify-center">
    
    <q-tabs align="left" class="top-header-tabs">
      <q-route-tab to="/forumns" label="Forumns" />
      <q-route-tab to="/hot-focus" label="HOT focus" />
      <q-route-tab to="/buddies-deal" label="Buddies Deal" />
      <q-route-tab to="/special-offer" label="Special Offer" />
    </q-tabs>
    <div class="flex column">
      <span>Forumns</span>
      
    </div>
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
