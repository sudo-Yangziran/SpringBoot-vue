<template>
	<div>
		<div class="navbar">
		<div class="navbar-container">
		  <div class="logo">Youkill</div>
		  <ul class="nav-links">
		    <li>
				<a @click="gotowhere('/')">主页</a>
			</li>
			<li>
				<a @click="gotowhere('/about')">关于</a>
			</li>
			<li>
				<a @click="gotowhere('/list')">全文章列表</a>
			</li>
		  </ul>
		</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router=useRouter();
async function gotowhere(route){
	document.startViewTransition(()=>{
		router.push(route);
	});
}

</script>

<style>
.navbar {
  background-color: rgba(111, 166, 166, 0.5); 
  backdrop-filter: blur(100px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.navbar-container {
  font-family: 'alibab';
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  color: white;
  font-size: 36px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links li:last-child {
  margin-right: 0;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.4s;
}

.nav-links a:hover {
  color: #00bcd4;
}	
</style>