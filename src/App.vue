<template>
  <nav>
 <!--   <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </nav>
  <router-view/>
</template>
<script>
	const debounce = (fn, delay) => {
	  let timer = null;
	  return function () {
	    let context = this;
	    let args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  }
	}
	
	const _ResizeObserver = window.ResizeObserver;
	window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
	  constructor(callback) {
	    callback = debounce(callback, 16);
	    super(callback);
	  }
	}
	
</script>
<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
