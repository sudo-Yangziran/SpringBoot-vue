import { createStore } from 'vuex'

export default createStore({
  state: {
	  Authorization:window.sessionStorage.getItem('Authorization')
  },
  getters: {
  },
  mutations: {
	  LOGIN: (state, data) => {
	  			//更改token的值
				// console.log("没走这边吗？")
	  			state.Authorization = data;
	  			// console.log(data)
	  			window.sessionStorage.setItem('Authorization', data);
			// console.log(state.Authorization)
	  		},
  },
  actions: {
  },
  modules: {
  }
})
