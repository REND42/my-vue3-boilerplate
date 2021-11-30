import { createMemoryHistory, createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        hidden: false,
        component: () => import('@/pages/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'Edit',
          index: '1',
          auth: true
        }
      },
      {
        path: '/post',
        name: 'post',
        hidden: false,
        component: () => import('@/pages/posts/index.vue'),
        meta: {
          title: '文章管理',
          icon: 'Document',
          index: '2'
        },
        children: [
          {
            path: '/posts/create',
            name: 'posts-create',
            component: () => import('@/pages/posts/create/index.vue'),
            meta: {
              title: '创建文章',
              icon: 'Edit',
              index: '2-1'
            }
          },
          {
            path: '/posts/manage',
            name: 'posts-manage',
            component: () => import('@/pages/posts/manage/index.vue'),
            meta: {
              title: '文章管理',
              icon: 'Management',
              index: '2-2'
            }
          }
        ]
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('@/pages/users/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'Avatar',
          index: '3'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: false,
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
      icon: '',
      index: '2'
    }
  }, {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404/index.vue'),
    meta: {
      title: '404',
      index: '3'
    }
  }
]

const router = createRouter(
  {
    history: createWebHashHistory(),
    routes: routes
  }
)

export default router