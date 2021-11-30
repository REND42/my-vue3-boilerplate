<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="activeIndex"
      background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened
      @select="handleSelect"
    >
      <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children">
          <el-menu-item :index="item.meta?.index + ''" @click="handleRoute(item)">
            <template #title>
              <el-icon>
                <component :is="item.meta?.icon"></component>
              </el-icon>
              <span> {{ item.meta?.title }} </span>
            </template>
          </el-menu-item>
        </template>
        <template v-else>
          <el-sub-menu :index="item.meta?.index + ''">
            <template #title>
              <el-icon>
                <component :is="item.meta?.icon"></component>
              </el-icon>
              <span>{{ item.meta?.title }}</span>
            </template>
            <el-menu-item v-for="(subItem, idx) in item.children" :index="subItem.meta?.index + ''" :key="subItem.path" @click="handleRoute(subItem)">
              <template #title>
                <el-icon>
                  <component :is="subItem.meta?.icon"></component>
                </el-icon>
                <span>{{ subItem.meta?.title }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useStore } from "@/store"
import { RouteRecordRaw, useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const menuList = router.options.routes[0].children
const activeIndex = store.getters.getCurrentMenu || ref<string>('1')
// const activeIndex = computed(mapState(['currentMenu']).currentMenu.bind({ $store: store })) || ref<string>('1')

const handleSelect = (key: string, keyPath: string[]) => {
  store.commit('SET_CURRENT_MENU', key)
}
const handleRoute = (item: RouteRecordRaw) => {
  router.push(item.path)
}

</script>

<style lang="scss" scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;

    &:not(.el-menu--collapse) {
      width: 250px;
    }

    &::-webkit-scrollbar {
      width: 0;
    }

    .sidebar-el-menu {
      height: 100%;
    }
  }
</style>