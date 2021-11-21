<script setup lang="ts">
  import { useStore } from "./store";
  import Sample from "./components/sample/index.vue";

  const store = useStore()
  console.log(store.getters.getName)
  store.commit('SET_USERNAME', 'Jack')
  console.log(store.getters.getName)




  const onUpdate = (data: any) => {
    console.log(data)
  }
  const onDelete = (id: any) => {
    console.log(id)
  }



</script>

<template>
  <router-view></router-view>
  <!-- <Sample  @on-update="onUpdate" @on-delete="onDelete"></Sample> -->
</template>