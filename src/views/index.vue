<template>
  <div class="centered-container">
    <div class="box">
		<Na></Na>
      <h2 class="login-title">User Login</h2>
      <el-form :model="form" label-width="120px">
        <el-form-item label="Username">
          <el-input v-model="form.email" placeholder="Enter your email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="form.password" placeholder="Enter your password"></el-input>
        </el-form-item>
        <el-form-item label="Verification Code" class="captcha-input">
          <div class="captcha-input-container">
            <el-input v-model="form.captcha" placeholder="Enter the code"></el-input>
            <el-image class="captcha-image" src=""></el-image>
          </div>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" @click="login">Login</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance,reactive } from 'vue';
import Na from '../components/Navigation.vue';
import { ElMessageBox,ElNotification } from 'element-plus'
const {proxy} = getCurrentInstance()
const form = reactive({
  email: '',
  password: '',
  captcha: '12345',
})
async function login(){
	// console.log(proxy.$store)
	proxy.$http
	    .post("/api/v1/auth/authenticate", form,{
	    })
	    .then(function(res) {
			// console.log(proxy)
			proxy.$store.commit('LOGIN', res.data.token);
			if(res.data.token!=null){
				ElNotification({
				   title: '登录成功',
				   message: '登录成功',
				   type: 'success',
				 })
				proxy.$router.push("/Admin")
			}else{
				ElNotification({
				   title: '登录失败',
				   message: '账户或者密码错误',
				   type: 'Error',
				 })
				 proxy.$store.commit('LOGIN', null);
			}
	    })
	    .catch(function(error) {
	      proxy.$store.commit('LOGIN', null);
		  
	    });
	
}
</script>

<style scoped lang="scss">
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.box {
  position: relative;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.captcha-input {
  display: flex;
  align-items: center;
}

.captcha-input-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.captcha-input el-input {
  flex: 1;
  margin-right: 10px;
}

.captcha-image {
  width: 120px; 
  height: 40px; 
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
