import { InjectionKey } from "vue";
import { useStore as baseUseStore, createStore, Store } from "vuex";

interface State {
  username: string,
  currentMenu: string,    //当前菜单
}

// 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state: {
    username: 'Mike',
    currentMenu: localStorage.getItem('currentMenu') || '1'
  },
  getters: {
    getName: (state) => {
      return state.username
    },
    getCurrentMenu: (state: State) => {
      return state.currentMenu
    }
  },
  mutations: {
    SET_USERNAME(state, username: string) {
      state.username = username
    },
    SET_CURRENT_MENU(state: State, currentMenu: string) {
      localStorage.setItem('currentMenu', currentMenu)
      state.currentMenu = currentMenu
    }
  },
  actions: {}
})

export function useStore() {
  return baseUseStore(key)
}