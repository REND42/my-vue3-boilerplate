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
          icon: '',
          index: '1'
        }
      },
      {
        path: '/program',
        name: 'program',
        hidden: false,
        component: () => import('@/pages/program/index.vue'),
        meta: {
          title: '编程',
          icon: '',
          index: '2'
        },
        children: [
          {
            path: '/program/frontend',
            name: 'program-frontend',
            component: () => import('@/pages/program/frontend/index.vue'),
            meta: {
              title: '前端',
              icon: '',
              index: '2-1'
            }
          },
          {
            path: '/program/backend',
            name: 'program-backend',
            component: () => import('@/pages/program/backend/index.vue'),
            meta: {
              title: '后端',
              icon: '',
              index: '2-2'
            }
          }
        ]
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/about/index.vue'),
        meta: {
          title: '关于',
          icon: '',
          index: '3'
        }
      }
    ]
  }
]

const router = createRouter(
  {
    history: createWebHashHistory(),
    routes: routes
  }
)

export default router