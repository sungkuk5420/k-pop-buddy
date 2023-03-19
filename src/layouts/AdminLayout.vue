<template>
  <a-layout id="components-layout-demo-top" class="layout" style="height: 100%;">
    <a-layout-header>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          Users
        </a-menu-item>
        <a-menu-item key="2">
          Posts
        </a-menu-item>
        <a-menu-item key="3">
          Comments
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    
        <router-view />
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {
    // EssentialLink 
  },
  data () {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
  },
  methods: {
  }

};
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>