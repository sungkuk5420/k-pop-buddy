<template>
  <q-page class="flex items-start justify-center">
    <span>SpecialOffer</span>
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
