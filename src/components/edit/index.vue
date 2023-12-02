<template>
	<div>
		<component :is="selectedComponent"></component>
	<v-md-editor v-model="formdata.content" height="400px"  @upload-image="handleUploadImage" @save="writerFile"   :disabled-menus="[]"></v-md-editor>
	</div>
</template>

<script setup>
	import {getCurrentInstance,ref} from 'vue'
	import { ElNotification } from 'element-plus'
	import upload from './Upload.vue'

	const selectedComponent = ref(upload);
	const { proxy } = getCurrentInstance();
	const formdata={
		content:props.Txt,
		filename:props.Text
	}
	const props = defineProps({
	    Text: String,
		Txt:String,
	  })
	 const  handleUploadImage=(event,insertImage,files)=>{
	                const FormData1=new FormData()
	                FormData1.append("file",files[0])
	               proxy.$http.post("/api/v1/Article/uploadImg",FormData1,{
	                   'Content-Type': 'multipart/form-data'
	               }).then(response=>{
	                   console.log(response.data)
	                    insertImage({
	                    url:
	                    response.data
	               });
	            })
				}
	const writerFile=(text,html)=>{
		formdata.content=text
		proxy.$http.post("/api/v1/Article/writefile",formdata,{
		}).then(response=>{
			ElNotification({
			    title: 'Success',
			    message: '保存成功',
			    type: 'success',
			  })
		}) .catch(function(error) {
			 ElNotification({
			    title: 'Warning',
			    message: '保存失败，遇见不知名错误，请复制下来本地暂保存',
			    type: 'warning',
			  })
	    });
	}
</script>

<style>
</style>