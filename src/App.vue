<script setup lang="ts">
  import { useStore } from "./store";
  import Sample from "./components/sample/index.vue";

  const store = useStore()


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