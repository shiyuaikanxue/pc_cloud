import { createStore } from 'vuex'

export default createStore({
  state: {
    viewStack:0,  //路由栈
    view:'cloud',  //默认路由
    active:'select', //云音乐精选默认子路由
  },
  getters: {
  },
  mutations: {
    switchView(state,value){
      state.view = value
    },
    ViewStackIncrease(state,value){
      state.viewStack++
    },
    ViewStacDecrease(state,value){
      state.viewStack--
    },
    updateActive(state,value){
      state.active = value
    }
  },
  actions: {
  },
  modules: {
  }
})
