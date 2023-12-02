<template>
  <div class="skeleton">
    <div class="glass">
		 <nav class="navbar">
		     <div class="navbar-content">
		       <ul class="navbar-menu">
		         <li><a @click="showComponent(user)">用户管理</a></li>
		         <li><a @click="showComponent(article)">文章管理</a></li>
		         <li><a href="#">主页管理</a></li>
		         <li><a href="#">服务管理</a></li>
		         <li><a href="#">日志管理</a></li>
		       </ul>
		     </div>
		   </nav>
		   <div class="component-container">
		         <component :is="selectedComponent"></component>
		       </div>
	</div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getCurrentInstance,onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
import user from '../components/admin/User.vue'
import article from './Article/index.vue'
const {proxy} = getCurrentInstance()
const selectedComponent = ref(null);

const showComponent = (componentName) => {
  selectedComponent.value = componentName;
  }
// onBeforeMount(() => {
//         list();
// })
// async function list(){
// 	// console.log(proxy.$store)
// 	proxy.$http
// 	    .get("/api/v1/User/users",{
// 	    })
// 	    .then(function(res) {
// 			console.log(res)
// 			// // console.log(proxy)
// 			// proxy.$store.commit('LOGIN', res.data.token);
// 	  //     // console.log(res.data)
// 		 //  console.log(res)
// 	    })
// 	    .catch(function(error) {
// 	      // proxy.$store.commit('LOGIN', null);
// 	    });
	
// }
</script>

<style scoped lang="scss">
.skeleton {
  margin: -10px;
  width: 100%; /* 设置宽度为100%以填充整个界面 */
  height: 100vh; /* 设置高度为100vh以填充整个界面 */
  background-image: linear-gradient(to bottom right, #3651d9, #ffffff);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.glass {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically and horizontally */
  width: 90%;
  height: 90%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5%;
  animation: pulse 1s infinite;
}

.title {
  width: 200px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 20px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  // 0% {
  //   opacity: 0.7;
  // }
  // 50% {
  //   opacity: 1;
  // }
  // 100% {
  //   opacity: 0.7;
  // }
}
.navbar {
  background: rgba(255, 255, 255, 0.1); /* 设置导航栏背景为毛坯玻璃效果 */
  backdrop-filter: blur(10px); /* 模糊效果，可以根据需要调整 */
  position: fixed;
  top: 0;
  left: 0;
  height: 100%; /* 让导航栏高度占满整个屏幕 */
  width: 200px; /* 设置导航栏的宽度，可以根据需要调整 */
  z-index: 1000;
  display: flex;
  flex-direction: column; /* 设置垂直布局 */
}

.navbar-content {
  display: flex;
  flex-direction: column; /* 设置垂直布局 */
  align-items: center;
  padding: 20px;
  height: 100%; /* 让内容高度占满导航栏 */
}


.navbar-menu {
  list-style: none;
  margin: 10px;
  padding: 0;
}
.navbar-menu li{
	margin: 100px;
	padding-left: 100px;
}
.navbar-menu li a {
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px; /* 调整菜单项之间的间距 */
  // transition: color 0.3s;
}

.navbar-menu li a:hover {
  color: #ffc107; /* 鼠标悬停时的颜色 */
}
</style>
