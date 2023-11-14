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
              <el-menu-item index="1-1" @click="showPaperListComponent(result.id)">试卷列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><setting /></el-icon>答卷管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="showAllAnsweredSheetComponent(result.id)">答卷列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>题库管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="showEquationGenerationComponent()">题库生成</el-menu-item>
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
import {ref} from "vue";
import EquationGeneration from "@/components/EquationGeneration.vue";
import EditPaper from "@/components/EditPaper.vue";
import PaperList from "@/components/PaperList.vue";
import AllAnsweredSheet from "@/components/AllAnsweredSheet.vue";
import AllAnsweredSheetDetails from "@/components/AllAnsweredSheetDetails.vue";
import router from "@/router";
export default {
  name: 'UserIndex',
  components:{
    Setting,
    EquationGeneration,
    EditPaper,
    PaperList,
    AllAnsweredSheet,
    AllAnsweredSheetDetails
  },
  setup(){
    let currentComponent=ref('')
    let componentData=ref()
    const result=JSON.parse(localStorage.getItem("userinfo"))
    return {result,currentComponent,componentData}
  },
  methods:{
    handlerEmit(res){
      if(res.componentName==="EditPaper"){
        this.showEditPaperComponent(res.data)
      }else if(res.componentName==="AllAnsweredSheetDetails"){
        this.showAllAnsweredSheetDetailsComponent(res.data)
      }
    },
    showPaperListComponent(){
      this.componentData=this.result.id
      this.currentComponent='PaperList'
    },
    showEquationGenerationComponent(){
      this.componentData=this.result.id
      this.currentComponent='EquationGeneration'
    },
    showEditPaperComponent(res){
      this.componentData=res
      this.currentComponent='EditPaper'
    },
    showAllAnsweredSheetComponent(id){
      this.componentData=id
      this.currentComponent='AllAnsweredSheet'
    },
    showAllAnsweredSheetDetailsComponent(res){
      this.componentData=res
      this.currentComponent="AllAnsweredSheetDetails"
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
