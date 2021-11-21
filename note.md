
## setup 语法糖

### setup前身组合式api

> 注意：在setup()中不能用this

在`setup()`中要避免使用`this`, 它不会找到组件实例。`setup`的调用发生在`data` property、`computed` property 或者`methods` 被解析之前，所有它们无法在`setup`中被获取。这也是为了避免setup()和其他选项式API相混淆。

```js
<!-- 
  参数说明：
  props 是响应式的，当传入新的 props 时，它将被更新。
  context 是一个普通的上下文 JS 对象，它暴漏组件的三个 property（属性、插槽、方法）
 -->
<script>
  export default {
    setup(props, context) {
      // attributes (非响应式对象)
      console.log(context.attrs)

      // 插槽（非响应式对象）
      console.log(context.slots)

      // 触发事件（方法）
      console.log(context.emit)
    }
  }
</script>
```

### setup 语法糖，高级用法

> 注意：defineProps不需要引入，vue单文件内部自动暴露的API

```
<script setup lang="ts"><script>
是在单文件组件（SFC）中使用组合式API编译时的语法糖，相比普通语法具有更多优势：
- 更少的样板内容，更简洁的代码： 如省略了组件的注册声明，对象暴露return，methods...。
- 能使用纯Typescript声明props和发出事件。
- 更好的运行时性能（其模板会被编译成与其同一作用域下的渲染函数，没有任何的中间代理）。
- 更好的IDE类型推断性能。
```

示例对比：
```js
// 基础用法
<script lang="ts">
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
</script>

// 高级用法
<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      default: () => {return '测试'}
    }
  })

  console.log(props.title)
</script>
```

## defineProps 和 defineEmits

> 注意：`definePorps`和 `defineEmits` 都是只在 setup语法糖中才能使用的编译器宏


为了声明`props`和`emits`选项且具备完整的类型推断，可以使用`defineProps`和`defineEmits`API，它们在`<script setup>`中都是自动可用的。

+ `defineProps`接收与`props`选项相同的值，`defineEmits`也接收`emits`选项相同的值。
+ 传入到`defineProps`和`defineEmits`的选项会从**setup**中提升到模块的范围。因此，传入的选项不能引用在**setup**范围中声明的局部变量，这样做会引起编译错误。但是它可以引用导入的绑定，因为它们在模块范围内。

父组件
```vue
<template>
  <Test :msg="msg" @on-change="handleChange"></Test>
</template>

<script setup lang="ts">
  import { ref } from "@vue/reactivity";
  import Test from "./components/testcom/Test.vue";

  const msg = ref('父组件的值')
  const handleChange = (params: string) => {
    console.log(params)
  }
</script>
```

子组件
```vue
<template>
  <p>{{ props.msg }}</p>
  <button @click="handleClick">点击</button>
</template>

<script setup lang="ts">
  const props = defineProps({
    msg: {
      type: String,
      default: () => '默认值'
    }
  })

  const emit = defineEmits(['on-change'])
  const handleClick = () =>  {
    emit('on-change', '父组件方法被调用')
  }

</script>
```

## defineExpose属性

使用`script setup`的组件是默认关闭的，即通过模板ref或者`$parent`链获取到的组件的公开实例，不会暴露任何在`script setup`中声明的绑定。
为了在`<script setup>`组件中明确要暴露出去的属性，使用`defineExpose`编译器宏。

子组件暴露属性和方法，给父组件引用

```vue
<script setup lang="ts">
  const childNode = () => {
    console.log('子组件方法被调用了')
  }
  defineExpose({
    child: '暴露的子组件',
    childNode
  })

</script>
```

父组件调用子组件方法和属性

```vue
<script setup lang="ts">
  import { ref } from "@vue/reactivity";
  import { onMounted } from "@vue/runtime-core";
  import Test from "./components/testcom/Test.vue";

  const testRef = ref()
  onMounted(() => {
    console.log(testRef.value.child)
    testRef.value.childNode()
  })
</script>

<template>
  <Test ref="testRef"></Test>
</template>
```

### 在`setup`中定义基础变量

```vue
<template>
  <p>{{ originData.count }}  --- {{ originData.user.name }}</p>

  <p v-for="(item, index) in originData.arr" >{{ item }}</p>
  <button @click="increment">点此增加</button>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'

  const count = ref(0)
  const user = reactive({
    name: 'Kelly'
  })
  const arr = reactive([1, 2, 3, 55, 4])

  // 综合定义方案
  const originData = reactive({
    count: 0,
    user: {
      name: 'Jack'
    },
    arr: [44, 55, 66, 77]
  })

  const increment = () => {
    value.count++
    user.name = 'Kitty'
  }
</script>
```

## Watch和WatchEffect

`watch` 与 `watchEffect`比较，推荐watch监听

1. watch和watchEffect都懒执行副作用，不过watchEffect比较频繁，在vue组件更新之前执行
2. watch更具体地说明什么状态应该触发侦听器重新运行，watchEffect没这么友好
3. watch访问侦听状态变化前后地值
4. watch 页面更新后不会立即执行，而watchEffect会。watch如果要是实现，需要增加立即执行的属性：`immediate: true`


```vue
<script setup lang="ts">
  import { reactive, ref, watch, watchEffect } from 'vue'

  const count = ref(0)
  const user = reactive({
    name: 'Kelly'
  })
  const arr = reactive([1, 2, 3, 55, 4])

  // 默认页面更新之前立即执行监听，懒执行开始
  watchEffect(() => { console.log(count.value) })

  // 默认监听数据变化后的值，页面更新后不会立即执行
  watch(count, (n , o) => console.log(n, o))

  // 监听多个值
  watch([count, user], (n, o) => {
    console.log(n[0], n[1].name)
  })

  // 页面加载完成就执行监听
  watch([count, user], (n, o) => {
    console.log(n[0], n[1].name)
  }, {
    deep: true,
    immediate: true
  })
</script>
```

## 在setup中的生命周期钩子

因为`setup`是围绕`beforeCreate`和`Created`生命周期钩子运行的，所以不需要显式地定义它们。即在这些钩子中编写的任何代码都应直接在`setup`函数中编写。

|**选项式API**| **Hook inside setup** |
| -- | -- |
| `before` | 不需要 |
| `created` | 不需要 |
| `beforeMounted` | `onBeforeMount` |
| `mounted` | `onMounted` |
| `beforeUpdate` | `onBeforeUpdate` |
| `updated` | `onUpdated` |
| `beforeUnmount` | `onBeforeUnmount` |
| `unmounted` | `onUnmounted` |
| `errorCaptured` | `onErrorCaptured` |
| `renderTracked` | `onRenderTracked` |
| `renderTriggered` | `onRenderTriggered` |
| `activated` | `onActivated` |
| `deactivated` | `onDeactivated` |

```js
<script setup lang="ts">
  import { onMounted, reactive, ref, watch, watchEffect } from 'vue'
  onMounted(() => {
    console.log('onMounted')
  })

  // 在页面加载完成之前调用的方式，相当于created钩子
  function createds() {
    console.log('created')
  }
  createds()
</script>
```

## 用ts限制define(Emits|Props)参数类型

注意：
+ 在setup语法糖中引入组件不需要声明就可以直接用了
+ ts限制组件传参类型，默认是必须传值的，否则控制台出现警告，引入组件的地方会出现红色提醒，不想必传在绑定参数后加？即可
+ ts传参支持多种类型校验，一个参数可以传字符串，数组，Boolean等
+ 用ts方式限制defineEmits和defineProps参数类型

子组件
```vue
<template>
  <h1>{{ msg }}</h1>
  <input v-model="username" @blur="handleUpdate($event)" type="text">
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // defineProps<{
  //   msg?: (string | number | boolean)
  //   title?: string
  // }>()

  // 提供默认值的方式一：
  // interface Props {
  //   msg?: (string | number | boolean),
  //   title?: string[]
  // }

  // withDefaults(defineProps<Props>(), {
  //   msg: 'hello',
  //   title: () => ['one', 'two']
  // })

  // 设置默认值方式二：
  withDefaults(defineProps<{
    msg?:(string | number | boolean),
    title?: string
  }>(), {
    msg: 333,
    title: '默认'
  })


  
  // ts 限制单个变量类型
  const username = ref<string>('')
  // const emit = defineEmits(['on-update'])
  const emit = defineEmits<{
    (event: 'on-update', data: string): void,
    (event: 'on-delete', id: string): void
  
  }>()

  const handleUpdate = (event: any) => {
    const { target } = event
    emit('on-update', target.value)
    emit('on-delete', target.value)
  }
</script>
```

父组件
```vue
<script setup lang="ts">
  import Sample from "./components/sample/index.vue";

  const onUpdate = (data: any) => {
    console.log(data)
  }
  const onDelete = (id: any) => {
    console.log(id)
  }
</script>

<template>
  <Sample :msg="'222334'" @on-update="onUpdate" @on-delete="onDelete"></Sample>
</template>
```

## VUEX的配置和使用

* 安装vuex4.0版本

```bash
yarn add vuex@next --save
```

* 在src目录下创建store文件夹，新建index.ts文件
```ts
import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store } from "vuex";

interface State {
  username: string
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state: {
    username: 'Mike'
  },
  getters: {
    getName: (state) => {
      return state.username
    }
  },
  mutations: {
    SET_USERNAME(state, username: string) {
      state.username = username
    }
  },
  actions: {}
})
// 定义自己的`userStore`组合式函数
export function useStore() {
  return baseUseStore(key)
}
```

* 在根目录下新建`vue-d.ts`文件，内容如下：
```ts
import {} from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // 声明自己的store state
  interface State {
    username: string
  }
  // 为`this.$store`提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
```

* 在main.ts中注入store模块

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './store'

const app = createApp(App)
app.use(store, key)
app.mount('#app')
```

* 测试vuex

```vue
<script setup lang="ts">
  import { useStore } from "./store";

  const store = useStore()
  console.log(store.getters.getName)
  store.commit('SET_USERNAME', 'Jack')
  console.log(store.getters.getName)
</script>
```

## router配置及使用

* 安装

```bash
yarn add vue-router@next --save
```

* 页面准备

page/home/index.vue
```vue
<template>
  <h2>home 页面</h2>
</template>
```

page/about/index.vue
```vue
<template>
  <h2>about 页面</h2>
</template>
```

component/layout/index.vue
```vue
<template>
  <Header></Header>
  <router-view></router-view>
</template>
<script lang="ts" setup>
  import Header from "./header/index.vue";
</script>
```

component/layout/header/index.vue
```vue
<template>
  <div class="action">
    <h2 @click="handleClick(1)">首页</h2>
    <h2 @click="handleClick(0)">关于</h2>
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from "vue-router";
  const router = useRouter()

  const handleClick = (num: number) => {
    if(num === 1) {
      router.push({name: 'home'})
    } else router.push({name: 'about'})
  }
</script>

<style>
  .action {
    display: flex;
  }
  h2 {
    padding: 0px 10px;
    cursor: pointer;
  }
  h2:hover {
    color: red;
  }
</style>
```

App.vue
```vue
<template>
  <router-view></router-view>
</template>
```

* 在src目录下创建router/index.ts文件

```ts
import { createMemoryHistory, createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "../layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../pages/home/index.vue'),
        meta: {
          title: '首页',
          icon: ''
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../pages/about/index.vue'),
        meta: {
          title: '关于',
          icon: ''
        }
      }
    ]
  }
]

const router = createRouter(
  {
    history: createMemoryHistory(),
    routes: routes
  }
)
export default router
```

* 在main.ts中引入
```ts
import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './store'
import router from './router'

const app = createApp(App)
app.use(store, key)
app.use(router)
app.mount('#app')
```

## 配置vite.config.ts

主要配置vite服务器的打包保存地址，打包分解，端口号，是否自动打开浏览器，远程请求地址代理目标，目录别名，全局样式配置等

```ts
```

## 安装scss并配置全局样式文件


```bash
yarn add node-sass sass-loader sass -D
```
在src/assets/styles目录下新增一个全局`global.scss`文件，其他样式文件导入到该文件即可全局使用和修改

在`vite.config.ts`中增加配置
```ts
  css: {
    // css预处理器
    preprocessorOptions: {
      // 引入var.scss
      scss: {
        additionalData: '@import "@/assets/styles/global.scss";'
      }
    }
  }
```

## .env环境变量配置和读取

环境变量建议放到项目根目录，方便`vite.config.ts`文件读取和使用
```
.env.production  // 生产环境配置文件
.env.development  // 开发环境配置文件
```

配置内容如下：
变量名一定要以`VITE`开头，才能暴露给外部读取

```env

```

```vue
<script setup lang="ts">
  const mode = import.meta.env
  console.log(2222, mode)
</script>
```

``` ts
// env.d.ts文件内进行 环境变量智能提示配置
interface ImportMetaEnv {
  VITE_APP_TITLE: string,
  VITE_APP_PORT: number,
  VITE_APP_BASE_URL: string
}
```


