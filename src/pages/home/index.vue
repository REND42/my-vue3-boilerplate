<template>
  <h2 class="home">home 页面</h2>

</template>

<script setup lang="ts">
  import { getAllDoodles, getDoodleNum } from '@/script/api';
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
    getAllDoodles(params).then(res => {
      console.log(433, res)
    })
    // getDoodleNum().then(res => {
    //   console.log(888, res)
    // })
  })

</script>

<style lang="scss" scoped>
// .home {
//   color: $color-primary;
// }
</style>