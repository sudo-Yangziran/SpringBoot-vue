//美化一下这个界面
<template>
  <div>
    <div style="border: 3px dashed #ccc;" @dragover.prevent @drop="handleDrop">
      <label for="file-input" class="drop-container">
        <p>点击或者拖转到当前位置进行文件上传</p>
      </label>
      <input type="file" id="file-input" @change="handleFileChange" style="display: none;" />
    </div>

    <div style="text-align: center;">
      <button style="width: 20%; height: 2%; background-color: #3498db; color: #fff; border: none; border-radius: 5px; cursor: pointer;" @click="uploadFile">上传文件</button>
    </div>
    
    <div v-if="selectedFile" style="text-align: center; margin-top: 20px;">
      <p style="font-size: 16px;">已选择的文件：{{ selectedFile.name }}</p>
      <p style="font-size: 16px;">上传状态：{{ uploadStatus }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
const selectedFile = ref(null);
const uploadStatus = ref('');

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadFile = () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    // 使用 axios 发送文件上传请求
    proxy.$http
      .post('/api/v1/Article/upload', formData)
      .then((response) => {
        uploadStatus.value = '文件上传成功';
        console.log('文件上传成功', response);
      })
      .catch((error) => {
        uploadStatus.value = '文件上传失败';
        console.error('文件上传失败', error);
      });
  } else {
    console.error('请选择一个文件');
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  selectedFile.value = event.dataTransfer.files[0];
};
</script>

<style>
.drop-container {
  /* border: 3px dashed #ccc; */
  /* padding: 60px; */
  text-align: center;
  /* cursor: pointer; */
}
</style>
