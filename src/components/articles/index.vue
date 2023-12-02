<template>
  <div class="app">
    <Na></Na>
    <el-main>
      <div class="background-image">
        <Content></Content>
      </div>
    </el-main>
    <div class="is-bottom">
		<div class="comment-section">
		    <div class="comment-container">
		      <div v-for="comment in comments" :key="comment.fileid" class="comment">
		        <div class="comment-header">
		          <div class="user-info">
		            <span class="user-name">用户名</span>
		            <span class="comment-date">{{ comment.username }}</span>
		          </div>
				  <span class="comment-date">{{ comment.createTime }}</span>
		        </div>
		        <p class="comment-text">{{ comment.txt }}</p>
		      </div>
		    </div>
		<!-- 	<div class="example-pagination-block">
			    <el-pagination layout="prev, pager, next" :total="1000" />
			  </div> -->
		  </div>
      <div class="comments">
        <textarea class="comment-textarea" v-model="newMessage" placeholder="在这里添加评论..."></textarea>
		        <button @click="sendMessage">发送</button>
	  </div>
    </div>
  </div>
</template>

<script setup>
import { ref,getCurrentInstance,onBeforeMount } from 'vue';
import Na from "../Navigation.vue";
import Content from "../articles/content.vue";
const { proxy } = getCurrentInstance();
const title = ref('Hello, Vue 3');
const textarea = ref("")
const newMessage = ref('');
const totalPages=5
const comments =ref(null)

const info={
	title:localStorage.getItem("title"),
	txt:"",
	flag:0,
	ids:"",
}
const listinfo={
	title:localStorage.getItem("title"),
	page:10,
	num:1
}
const props = defineProps({
	    title: String,
})
const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
	info.txt=newMessage.value
	proxy.$http
	  .post('/api/v1/Comments/insert', info)
	  .then((response) => {
		MessageList();
	  })
	  .catch((error) => {
	   
	  });
    
    newMessage.value = ''; // 清空评论文本域
  }
};
onBeforeMount(() => {
  MessageList();
});
const MessageList=()=>{
	proxy.$http
	  .post('/api/v1/Comments/list', listinfo)
	  .then((response) => {
		// comments=response
	  console.log(response)
	  comments.value=response.data
	  })
	  .catch((error) => {
	   console.log(error)
	  });
}
</script>

<style scoped>
	.comment-section {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	
	.comments {
	  margin: 20px;
	}
	
	.comment {
	  margin: 10px;
	  padding: 10px;
	  background-color: rgba(255, 223, 186, 0.8);
	  border-radius: 5px;
	}
	
	.pagination {
	  display: flex;
	  margin-top: 20px;
	}
	
	button {
	  margin: 5px;
	  padding: 5px 10px;
	  background-color: #ffdfba;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	  transition: background-color 0.3s;
	}
	
	button.active {
	  background-color: #ffa726;
	}
	.example-pagination-block{
	  margin-bottom: 16px;
	}
	.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.comment-section {
  text-align: center;
  /* max-width: 800px; */
  margin: 0 auto;
  padding: 20px;
}

.comment-container {
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  width: 1200px;
}

.comment {
  background-color: rgba(250, 250, 250, 0.2); /* 使用黄色背景并设置透明度 */
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.comment-header {
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

comment-date {
  color: #777;
}

comment-text {
  margin-top: 10px;
}
.app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 280%;
  background-image: url("../../assets/back.jpg");
  background-size: cover;
  opacity: 0.9;
  z-index: -1;
}

.is-bottom {
  /* position: fixed; */
  padding-top: 900px;
  bottom: 0;
  padding-left:25% ;
  width: 50%;
  justify-content: center;
  align-items: center;
  left: 25%;
  
}

.comments {
  margin: 20px;
  /* padding: 10px; */
  background-color: rgba(255, 223, 186, 0.8); /* 使用黄色背景并设置透明度 */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 800px;
}

.comment-textarea {
  width: 100%;
  margin-top: 10px;
  padding: 10px; /* 增加一些内边距，使文本域更好看 */
  background-color: transparent; /* 使文本域背景透明 */
  border: none;
  outline: none;
  resize: none; /* 禁止文本域的调整大小 */
  font-size: 16px;
  color: #333; /* 文本颜色 */
}
</style>