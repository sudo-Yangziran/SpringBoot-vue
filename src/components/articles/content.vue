<template>
  <div class="blog-post">
    <!-- <Na></Na> -->
    <div class="markdown-container">
      <v-md-preview v-infinite-scroll="load" :text="markdown"></v-md-preview>
    </div>
  </div>
</template>

<style scoped>
  .markdown-container {
    margin: 0;
    position: absolute;
    width: 60%;
    left: 10%;
    background-color: rgba(213, 213, 213, 0.5);
    border-radius: 25px;
    margin: 150px;
    overflow: auto;
    max-height: 700px; /* 设置最大高度，超出部分会出现滚动条 */
    padding: 20px; /* 添加内边距以确保内容不会紧贴容器边缘 */
  }

  .app {
    text-align: center;
    font-family: Arial, sans-serif;
    background: linear-gradient(to bottom, #3494E6, #EC6EAD);
    color: #fff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<script setup>
  import { ref, getCurrentInstance, onBeforeMount } from 'vue';
  // 导入Na组件
  import Na from '../Navigation.vue';

  const { proxy } = getCurrentInstance();
  const markdown = ref("");
  const FormData = {
    articlename: localStorage.getItem("title")
  };
	const load=()=>{
		
	}
  const getarticle = () => {
    proxy.$http.post("/api/v1/index/article", FormData).then(response => {
      markdown.value = response.data.context;
    });
  }

  onBeforeMount(() => {
    getarticle();
  });
</script>
