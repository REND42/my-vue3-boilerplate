<template>
  <h1>{{ msg }}</h1>
  <input v-model="username" @blur="handleUpdate($event)" type="text">
</template>

<script setup lang="ts">

import { ref } from 'vue';

  // interface Props {
  //   msg?: (string | number | boolean),
  //   title?: string[]
  // }

  // withDefaults(defineProps<Props>(), {
  //   msg: 'hello',
  //   title: () => ['one', 'two']
  // })

  withDefaults(defineProps<{
    msg?: (string | number | boolean),
    title?: string
  }>(), {
    msg: 333,
    title: '默认'
  })
  
  // defineProps<{
  //   msg?: (string | number | boolean)
  //   title?: string
  // }>()

  
  // ts 限制单个变量类型
  const username = ref<string>('')
  // const emit = defineEmits(['on-update'])
  const emit = defineEmits<{
    (event: 'on-update', data: string): void,
    (event: 'on-delete', id: string): void
  
  }>()

  const handleUpdate = (event: any) => {
    const { target } = event
    // console.log(target.value)
    emit('on-update', target.value)
    emit('on-delete', target.value)
  }
</script>