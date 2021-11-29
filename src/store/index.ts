import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store } from "vuex";

interface State {
  currentMenu: string,    //当前菜单
  token: string | null
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state: {
    currentMenu: localStorage.getItem('currentMenu') || '1',
    token: localStorage.getItem('token')
  },
  getters: {
    getCurrentMenu: (state: State) => {
      return state.currentMenu
    },
    getToken: (state: State) => {
      return state.token
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
    }
  },
  actions: {}
})

export function useStore() {
  return baseUseStore(key)
}