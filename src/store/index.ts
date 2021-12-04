import { InjectionKey } from "vue";
import { RouteLocationNormalized } from "vue-router";
import { useStore as baseUseStore, createStore, Store } from "vuex";

interface Tag {
  title?: string,
  name: string,
  path: string
}

interface State {
  currentMenu: string,    //当前菜单
  tagList: Array<Tag>,
  token: string | null,
  userInfo: object
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state: {
    currentMenu: localStorage.getItem('currentMenu') || '1',
    tagList: [],
    token: localStorage.getItem('token'),
    userInfo: {}
  },
  getters: {
    getCurrentMenu: (state: State) => {
      return state.currentMenu
    },
    getToken: (state: State) => {
      return state.token
    },
    getUserInfo: (state: State) => {
      return state.userInfo
    }
  },
  mutations: {
    SET_CURRENT_MENU(state: State, currentMenu: string) {
      localStorage.setItem('currentMenu', currentMenu)
      state.currentMenu = currentMenu
    },
    LOGIN(state: State, token: string) {
      localStorage.setItem('token', token)
      state.token = token
    },
    LOGOUT(state: State, token: string) {
      localStorage.setItem('token', '')
      state.token = token
    },
    SET_TOKEN(state: State, token: string) {
      localStorage.setItem('token', 'Bearer '+ token)
      state.token = token
    },
    SET_TAG_ITEM(state: State, item: any) {
      state.tagList.push(item)
    },
    DELETE_TAG_ITEM(state: State, item: any) {
      state.tagList.splice(item.index, 1)
    },
    CLEAR_TAGLIST(state: State) {
      state.tagList = []
    },
    SET_USERINFO(state: State, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {}
})

export function useStore() {
  return baseUseStore(key)
}