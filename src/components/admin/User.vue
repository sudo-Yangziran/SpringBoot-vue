<template>
  <div class="user-skills">
    <el-table :data="userData" style="width: 100%" class="table">
      <el-table-column prop="username" label="用户名" width="200" min-width="200" />
      <el-table-column prop="email" label="用户邮箱" width="200" min-width="200"/>
      <el-table-column prop="password" label="密码" width="200" min-width="200"/>
      <el-table-column prop="authority" label="权限" width="100" min-width="200"/>
      <el-table-column prop="createTime" label="创建时间" width="200" min-width="200"/>
      <el-table-column prop="lastOnline" label="最后一次上线时间" width="200" min-width="200"/>
      <el-table-column prop="status" label="状态" width="150">
              <template #default="scope">
				<el-image  v-if="scope.row.status==1" src="http://localhost:9191/img/valid.png" alt="Status 1"/>
				<el-image  v-else-if="scope.row.status==0" src="http://localhost:9191/img/invalid.png" alt="Status 0"/>
              </template>
            </el-table-column>
    </el-table>
    <el-pagination class="page" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup>
const userData = ref([]);
import { ref, getCurrentInstance, onBeforeMount } from 'vue';
const { proxy } = getCurrentInstance();
onBeforeMount(() => {
  list();
});
async function list() {
  proxy.$http
    .get("/api/v1/User/users", {})
    .then((res) => {
      userData.value = res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
async function rowlist(list){
	console.log(list)
}
</script>

<style scoped lang="scss">
.user-skills {
  // margin: 100;
  margin-left: 200px;
  // text-align: center;
}

.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}

.el-table tr {
  background-color: transparent !important;
}

.el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.table ::v-deep .el-table th.el-table_cell,
::v-deep .el-table th,
::v-deep .el-table tr{
	background-color: rgba(255, 255, 255, 0.5);
}
.el-pagination.is-background .btn-prev{
    background: transparent;
    border-radius: 2px;
    border: 1px solid #295a85;
    color: #fff;
  }

</style>
