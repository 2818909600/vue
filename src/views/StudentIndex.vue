<template>
  <el-container class="layout-container-demo" style="height: 700px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds=openeds>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><setting /></el-icon>试卷管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="showStudentPaperListComponent()">在线练习</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><setting /></el-icon>答卷管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="showStudentAnsweredSheetComponent(result.id)">答题记录</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{result.name}}</span>
        </div>
      </el-header>
      <el-main>
       <el-scrollbar>
         <component :is="currentComponent" :data="componentData" @handler="handlerEmit"></component>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import {Setting} from '@element-plus/icons'
import { ref} from "vue";
import StudentPaperList from "@/components/StudentPaperList.vue";
import OnlineAnswer from "@/components/OnlineAnswer.vue";
import StudentAnsweredSheet from "@/components/StudentAnsweredSheet.vue";
import StudentAnsweredSheetDetails from "@/components/StudentAnsweredSheetDetails.vue";
import router from "@/router";
import {loginUser} from "@/utils/loginValidators";
export default {
  name: 'StudentIndex',
  computed: {
    loginUser() {
      return loginUser
    }
  },
  components:{
    Setting,
    StudentPaperList,
    OnlineAnswer,
    StudentAnsweredSheet,
    StudentAnsweredSheetDetails
  },
  setup(){
    const result=JSON.parse(localStorage.getItem("userinfo"))
    let currentComponent=ref('')
    let componentData=ref()
    return {result,currentComponent,componentData}
  },
  methods:{
    handlerEmit(res){
      if(res.componentName==="StudentAnsweredSheetDetails"){
        this.showStudentAnsweredSheetDetailsComponent(res.data)
      }else if(res.componentName==="OnlineAnswer"){
        this.showOnlineAnswerComponent(res.data)
      }
    },
    showStudentPaperListComponent(){
      this.componentData=this.result.id
      this.currentComponent="StudentPaperList"
    },
    showOnlineAnswerComponent(res){
      console.log(res)
      this.componentData=res
      this.currentComponent="OnlineAnswer"
    },
    showStudentAnsweredSheetComponent(id){
      this.componentData=id
      this.currentComponent="StudentAnsweredSheet"
    },
    showStudentAnsweredSheetDetailsComponent(res){
      this.componentData=res
      this.currentComponent="StudentAnsweredSheetDetails"
    },
    logout(){
      localStorage.removeItem("userinfo")
      router.push('/login')
    }
  }
}
</script>
<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: #C6E2FF;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #C6E2FF;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
