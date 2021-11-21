<template>
  <el-row>
    <el-col :span="24" class="bread-list">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadList" :to="item.path">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { Ref, ref, watch } from "vue";
  import { RouteLocationMatched, useRoute } from "vue-router";

  const route = useRoute()
  const breadList: Ref<RouteLocationMatched[]> = ref([])

  const getBreadList = () => {
    let list = route.matched.filter(e => e.meta && e.meta.title)
    const first = list[0]
    if(first.path !== '/home') {
      let newArr = [{ path: '/home', meta: {title: '首页'} } as any]
      list = [...newArr, ...list]
    }
    breadList.value = list
  }

  getBreadList()
  watch(() => route.path, () => {
    getBreadList()
  })

</script>

<style lang="scss" scoped>
.bread-list {
  display: flex;
  align-items: center;
  padding: 4px;
}
</style>