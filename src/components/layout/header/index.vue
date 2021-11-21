<template>
  <div class="set-common-head-fixed-container">
    <el-row class="common-head-fixed-container">
      <el-col :span="24" class="show-pc">
        <menu-bar></menu-bar>
        <bread-crumb></bread-crumb>
      </el-col>
      <el-col :span="24" class="show-mobile">
        <el-icon class="same-cell" size="30">
          <expand @click="handleOpenMenu"/>
        </el-icon>
      </el-col>
    </el-row>
  </div>

  <el-drawer
    v-model="drawer"
    :direction="'rtl'"
    :before-close="handleClose"
    :with-header="false"
    :size="290"
  >
    <menu-bar :direction-type="'vertical'" :show-logo="false" :show-search="false"></menu-bar>
  </el-drawer>
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
</style>