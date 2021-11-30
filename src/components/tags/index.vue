<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tag" v-for="(item,index) in tagList" :class="{active: isActive(item.path) }" :key="index">
        <router-link class="tag-title" :to="item?.path">{{ item?.title }}</router-link>
        <el-icon :size="12" @click="closeTag(index)">
          <close />
        </el-icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

const store = useStore()
const route = useRoute()
const router = useRouter()
const isActive = (path: string) => {
  return path === route.fullPath
}

const tagList = computed(() => store.state.tagList)
const showTags = computed(() => tagList.value.length > 0)


const setTags = (route: any) => {
  let isExist = tagList.value.some(item => {
    return item.path === route.fullPath
  })
  if(!isExist) {
    if(tagList.value.length >= 7) {
      store.commit('DELETE_TAG_ITEM', { index: 0 })
    }
    store.commit('SET_TAG_ITEM', {
      name: route.name,
      title: route.meta.title,
      path: route.fullPath
    })
  }
}

const closeTag = (index: number) => {
  const delItem = tagList.value[index]
  store.commit('DELETE_TAG_ITEM', { index })
  let item = tagList.value[index] ? tagList.value[index] : tagList.value[index - 1]
  if(item) {
    delItem.path === route.fullPath && router.push(item.path)
  } else {
    router.push('/')
  }
}

setTags(route)
onBeforeRouteUpdate((to) => {
  setTags(to)
})

</script>

<style lang="scss" scoped>
  .tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background-color: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;

    ul {
      box-sizing: border-box;
      width: 100%;
      height: 100%;

      li.tag {
        float: left;
        margin: 3px 5px 3px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 22px;
        line-height: 22px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
        -webkit-transition: all 0.3s ease-in;
        -moz-transition: all 0.3s ease-in;
        transition: all 0.3s ease-in;

        &.active {
          border: 1px solid #409eff;
          background-color: #409eff;
          color: #fff;

          .tag-title {
            color: #fff;
          }
        }

        .tag-title {
          float: left;
          max-width: 80px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-right: 5px;
          color: #666;
        }
      }
    }
  }
</style>