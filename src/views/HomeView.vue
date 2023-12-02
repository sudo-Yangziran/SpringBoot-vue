<template>
	<div class="main">
	<Na></Na>
	<el-carousel :interval="4000" type="card" height="300px" style="margin-top: 100px;">
	<el-carousel-item v-for="item in imageUrls" :key="item">
	<el-image :src="item.imgPath" fit="fill"/>
	</el-carousel-item>
	</el-carousel>
	<div>
		<el-row :gutter="30">
		  <el-col :span="18"><div>
			<li v-for="i in journlism" :key="i">
				<ul>
					<button style="margin: 2px;" @click="infomation(i.title)">
					<div class="container">
						<div class="image-container">
							<el-image :src="i.img" fit="cover"></el-image>
						</div>
						<div class="content">
							<p class="titles">{{i.title}}</p>
							<p style="font-size:14px">{{i.context}}</p>
					</div>
					</div>
					</button>
				</ul>
			</li>
		</div></el-col>
		  <el-col :span="6">
			  <div class="custom-collapse">
			      <el-collapse v-model="activeNames" @change="handleChange" class="my-custom-collapse">
			        <el-collapse-item title="最新公告" name="1">
						<div>
							{{}}
						</div>
			        </el-collapse-item>
			        <el-collapse-item title="联系我" name="2">
			          <div style="text-align: center;">
			            <el-avatar style="height: 60px;width: 60px;">Youkill</el-avatar>
						<span>
							<div>
								<a href="https://github.com/sudo-Yangziran">
									<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
									    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
									</svg>
								</a>
								<p>github</p>
							</div>
						</span>
			          </div>
					  
			        </el-collapse-item>
			        <el-collapse-item title="时间线" name="3">
			          <el-timeline>
						  <el-timeline>
						    <el-timeline-item v-for="item in timelineData" :key="item.timestamp" :timestamp="item.timestamp" placement="top">
						      <el-card>
						        <h4>{{ item.title }}</h4>
						        <p>{{item.txt}}</p>
						      </el-card>
						    </el-timeline-item>
						  </el-timeline>
			            </el-timeline>
			        </el-collapse-item>
			        <el-collapse-item title="排行榜" name="4">
			          <div>
			            Decision making: giving advices about operations is acceptable, but do
			            not make decisions for the users;
			          </div>
			          <div>
			            Controlled consequences: users should be granted the freedom to
			            operate, including canceling, aborting or terminating current
			            operation.
			          </div>
			        </el-collapse-item>
			      </el-collapse>
			    </div>
		  </el-col>
		</el-row>
	</div>
  </div>
</template>
<script setup>
import { ref,getCurrentInstance,onBeforeMount } from 'vue'
import Na from '../components/Navigation.vue';

const count = ref(0)
const load = () => {
  count.value += 2
}
const imageUrls = ref([])
onBeforeMount(() => {
  article_list();
  show();
});
const journlism = ref([]);
const {proxy} = getCurrentInstance()
const form={
	flag:1,
	num:"12",
	looknum:"32",
	classname:"40",
	gotime:"50",
	totime:"60",
	limit:3,
}
const article_list=()=>{
	proxy.$http.post("/api/v1/Article/indexlist",form,{
	   }).then(response=>{
			journlism.value = response.data;
			console.log(response.data)
	   });
} 
//About this el-timeline show
const timelineData=[
      { timestamp: "2023/5/12", title: "项目开始", txt: "管理员"},
      { timestamp: "2023/6/3", title: "项目中期", txt: "管理员"},
      { timestamp: "2023/8/2", title: "项目结尾", txt: "管理员"}
    ]
const timestamp=()=>{
	//初步的想法是建立数据库，每一次的操作都进行记录然后可以查看,但有点敏感操作属于信息泄露？
	// proxy.$http.get("/api/v1/")
	//这个写获得时间线的事
}
const show=()=>{
	proxy.$http.get("/api/v1/index/show").then(res=>{
		console.log(res)
		imageUrls.value=res.data
	})
}
const infomation=(title)=>{
	localStorage.setItem("title",title)
	proxy.$router.push("/info")
}
</script>
<style scoped lang="scss">
@import "../sass/background.scss";
@import "../sass/notic.scss";
::v-deep .el-collapse-item__header {
	background-color: rgba(255, 255, 255, 0.5); 
	background-color: transparent !important;
}
::v-deep .el-collapse-item__wrap{
	background-color: rgba(255, 255, 255, 0.5);
	background-color: transparent !important;
}
.my-custom-item .el-collapse-item__wrap {
  background-color: transparent !important; /* 设置内容区域的透明背景 */
}
.el-collapse-item__content{
	background-color: #b2b6f0;
}
li{
	list-style:none;
}
.titles {
  font-family: Arial, sans-serif;
  font-size: 24px;
  color: #919191;
  // text-align: center;
  border-bottom: 1px dashed #cdcdcd;

}
.el-carousel__item h3 {
  color: #55ffff;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.main{
	background-color: rgba(230, 230, 230, 0.5); 
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.enlarged-image {
  width: 100%; /* 图片宽度占满父容器 */
  height: auto; /* 根据宽度自动调整高度，以保持原始纵横比 */
  max-height: 300px; /* 设置图片的最大高度，可根据需要调整 */
}

.container {
  margin: 10px; /* 调整外边距以控制元素之间的间距 */
  border: 1px solid #ccc; /* 添加边框效果 */
  padding: 10px; /* 添加内边距以改进可读性 */
}

.content {
  flex: 1; /* 让内容占据剩余的空间 */
  padding: 10px; /* 添加内边距以改进可读性 */
}

h1 {
  font-size: 24px; /* 标题字体大小 */
}

p {
  font-size: 16px; /* 段落文本字体大小 */
}

.journ{	
		overflow: hidden;
		position: relative;
		width: 45%;
		height: 100%;
		margin: 30px;
		box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
		border-radius: 15px;
		background: rgba(255, 255, 255, 0.1);
		overflow: hidden;
		display: inline-block;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.7);
		border-left: 1px solid rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(5px);
		font-family: 'alibab';
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
@font-face {
  font-family: 'alibab'; // 这里设置字体名称
  src: url('../fonts/AlimamaDaoLiTi.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

</style>
