<template>
  <h2 class="home">home 页面</h2>

</template>

<script setup lang="ts">
  import { getAllDoodles, getDoodleNum, register } from '@/script/api';
  import { onMounted, reactive } from 'vue';

  const mode = import.meta.env
  console.log(2222, mode.VITE_APP_PORT)

  const params = reactive({
    "size": 10,
    "page": 1,
    "full": "1",
    "order": "desc"
  })

  onMounted(() => {
    // let params = {
    //   "email": "111@xx.com",
    //   "username": "11xxx",
    //   "password": "123",
    // }
    // register(params).then(res => {
    //   console.log(res)
    // })
  })

</script>

<style lang="scss" scoped>
// .home {
//   color: $color-primary;
// }
</style>