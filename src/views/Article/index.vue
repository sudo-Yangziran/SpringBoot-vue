<template>
  <div class="table-container">
	<div style="height: 60px;">
  <el-button type="success" class="add-button"  @click="dialogVisible = true">
          新增文章
  </el-button>
</div>
  <el-dialog
    v-model="dialogVisible"
    title="创建文章"
    width="30%"
    :before-close="handleClose"
  >
    <label for="name">文件名:</label>
    <input type="text" id="name" v-model="formData.filename">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sumbit()">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="user-skills">
      <el-table :data="userData" style="width: 100%" class="table">
           <el-table-column prop="title" label="文章名" width="200" min-width="200">
              <template #default="scope">
                <template v-if="scope.row.editing">
                  <el-input v-model="scope.row.title" @change="save(scope.row, scope.row.title, scope.row.titleBeforeEdit)" @blur="scope.row.editing = false"></el-input>
                </template>
                <template v-else>
                  <div @click="startEditing(scope.row)">{{ scope.row.title }}</div>
                </template>
              </template>
            </el-table-column>
        <el-table-column prop="createownerId" label="创建人" width="200" min-width="200"/>
        <el-table-column prop="createTime" label="创建时间" width="200" min-width="200"/>
        <el-table-column prop="lastSaveTime" label="上一次修改时间" width="100" min-width="200"/>
        <el-table-column prop="status" label="是否发布" width="200" min-width="200">
          <template #default="scope">
            <el-button v-if="scope.row.status === 1" type="danger" @click="notstatus(scope.row.title)">禁止发布</el-button>
            <el-button v-else type="success" @click="notstatus(scope.row.title)">可以发布</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="lastOnline" label="" width="200" min-width="200"/> -->
        <el-table-column prop="status" label="操作" width="150">
                <template #default="scope">
					<el-button @click="openEditDialog(scope.row.title)">编辑</el-button>
                </template>
              </el-table-column>
      </el-table>
      <el-pagination class="page" @current-change="current" :current-page="pages.currentpage" :page-size="pages.page" :pager-count="5" layout="prev, pager, next" :total="pages.total" />
    </div>
	<el-dialog v-if="editDialogVisible" v-model="editDialogVisible" title="编辑文章">
	  <component :is="eidtindex" :Text="text" :Txt="txt"></component>
	  <template #footer>
	    <span class="dialog-footer">
	      <el-button @click="closeEditDialog">取消</el-button>
	    </span>
	  </template>
	</el-dialog>
  </div>
</template>

<script  setup>
import { ref,getCurrentInstance,onBeforeMount} from 'vue'
import { ElMessageBox,ElNotification } from 'element-plus'
import edit from '../../components/edit/index.vue'
const {proxy} = getCurrentInstance()
const eidtindex = ref(edit)
const dialogVisible = ref(false)
const text=ref(null)
const txt=ref("")
const pages={
	page:5,
	total:0,
	currentpage:1
}
const formData={
	filename:"",
}

const handleClose = () => {
  ElMessageBox.confirm('确定要关闭创建吗？')
    .then(() => {
      dialogVisible.value=false
    })
    .catch(() => {
      
    })
}
const sumbit=()=>{
	proxy.$http
	    .post("/api/v1/Article/newfile", {
			filename:formData.filename
		},{
	    })
	    .then(function(res) {
			ElNotification({
			   title: 'Success',
			   message: '新建文章成功!',
			   type: 'success',
			 })
		  list()
	    })
	    .catch(function(error) {

	    });
	dialogVisible.value = false
	
}
//下面是关于文章的获取
const userData = ref([]);
onBeforeMount(() => {
  list();
});
async function list() {
	proxy.$http
	    .post("/api/v1/Article/count", {
		},{
	    })
	    .then(function(res) {
			pages.total=res.data
			listinfo()
	    })
	    .catch(function(error) {
	
	    });
};
async function listinfo(){
	proxy.$http
	    .post("/api/v1/Article/list", {
			page:pages.page,
			currentpage:pages.currentpage
		},{
	    })
	    .then(function(res) {
			userData.value = res.data;
	    })
	    .catch(function(error) {
	
	    });
}
async function rowlist(list){
	console.log(list)
}
//对其进行操作的
userData.value.forEach(row => {
  row.editing = false;
  row.titleBeforeEdit = ''; // 用于保存修改前的值
});

// 启动编辑模式
const startEditing = (row) => {
  // 关闭其他正在编辑的行
  userData.value.forEach(otherRow => otherRow.editing = false);
  // 启用当前行的编辑模式
  row.editing = true;
  // 保存修改前的值
  row.titleBeforeEdit = row.title;
};

// 保存编辑内容
const save = (row, newValue, oldValue) => {
  // 在这里可以使用 newValue 和 oldValue 进行需要的操作
  //对其进行后端的编写对应的接口
  // 关闭编辑模式
  row.editing = false;
};


const editDialogVisible = ref(false);
  const editingRow =ref("")

async function openEditDialog(row){
	  proxy.$http
	      .post("/api/v1/Article/article", {
	  		title:row
	  	},{
	      })
	      .then(function(res) {
			txt.value=res.data.context
			text.value=row
			open();
	      })
	      .catch(function(error) {
	  
	      });
  };
async function open(){
	editDialogVisible.value = true;
}
  const closeEditDialog = () => {
    
    editDialogVisible.value = false;
  };
  
  const saveEditedRow = () => {
      // Send the updated data to the server and update the table
      // ...
  
      // Close the edit dialog
      closeEditDialog();
    };
	
async function notstatus(row){
	proxy.$http
	    .post("/api/v1/Article/state", {
			title:row
		},{
	    })
	    .then(function(res) {
			ElNotification({
			   title: 'Success',
			   message: '状态修改成功',
			   type: 'success',
			 })
			 list()
	    })
	    .catch(function(error) {
	
	    });
}
const current=(number)=>{
	pages.currentpage=number
	proxy.$http
	    .post("/api/v1/Article/list", {
			page:pages.page,
			currentpage:pages.currentpage
		},{
	    })
	    .then(function(res) {
			userData.value = res.data;
	    })
	    .catch(function(error) {
	
	    });
}
</script>

<style scoped>
.table-container {
	  position: relative;
}
	
.add-button {
	  position: absolute;
	  bottom: 100;
	  right: 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.user-skills {
  margin-left: 200px;
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
