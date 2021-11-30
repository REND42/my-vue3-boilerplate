<template>
  <Header></Header>
  <Sidebar></Sidebar>
  <div class="content-container">
    <Tags></Tags>
    <div class="content">
      <router-view v-slot="{ Component }">
      </router-view>
      <!-- <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
              <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Header from "../header/index.vue";
  import Sidebar from "../sidebar/index.vue";
  import Tags from "../tags/index.vue";
</script>
<style scoped>

</style>