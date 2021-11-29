<template>
  <div class="header-container">
    <div class="logo">内容管理系统后台</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import MenuBar from "@/components/layout/menu/MenuBar.vue";
import BreadCrumb from "@/components/layout/bread-crumb/index.vue";
import { ref } from "vue";

const router = useRouter()

const drawer = ref<boolean>(false)
const handleOpenMenu = () => {
  drawer.value = !drawer.value
}

const handleClose = (done: any) => {
  done()
}

</script>

<style lang="scss" scoped>
  .header-container {
    position: relative;
    height: 70px;
    display: flex;
    flex-direction: row;
    background-color: #242f42;

    .logo {
      float: left;
      width: 250px;
      line-height: 70px;
    }
  }
</style>