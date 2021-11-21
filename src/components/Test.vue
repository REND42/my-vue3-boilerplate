<template>
</template>

<!-- <script lang="ts">
  export default {
    props: {
      title: {
        type: String,
        default: () => {return '测试'}
      }
    },
    setup(props: any) {
      console.log(props.title)
    }
  }
</script> -->

<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: () => {return '测试'}
    }
  })

  console.log(props.title)
</script>