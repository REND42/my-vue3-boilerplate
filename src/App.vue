<script setup lang="ts">
  import { useStore } from "./store";
  const store = useStore()


</script>

<template>
  <router-view></router-view>
  <!-- <Sample  @on-update="onUpdate" @on-delete="onDelete"></Sample> -->
</template>

<style>
</style>