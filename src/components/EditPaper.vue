<template>
  <el-button type="primary" @click="submitEdit()">提交修改</el-button>
  <el-table class="drow_table" :data="tableData" style="width: 100%" row-key="id">
    <el-table-column label="题号" property="digit" width="140px">
      <template v-slot="scope">
        <el-text label="描述文字">{{scope.$index+1}}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="题目" property="maxVal" width="140px">
      <template v-slot="scope">
        <el-input v-model="scope.row.equation"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="正确答案" property="minVal" width="140px">
      <template v-slot="scope">
        <el-input v-model="scope.row.rightAnswer"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script >
import {ref, toRefs} from "vue";
import axios from "axios";

export default {
  name: 'editPaper',
  props:{
     data:{}
  },
  setup(props){
    const tableData=ref([])
    let editPaper=toRefs(props.data)
    let paperId=editPaper.paperId.value
    let content=JSON.parse(editPaper.content.value)
    console.log(content)
    let equations=[]
    for(let i=0;i<content.length;i++){
      equations[i]=JSON.parse(content[i])
    }
    tableData.value=equations
    console.log(tableData)
    return {tableData,equations,paperId}
  },
   methods:{
     submitEdit(){
       if(confirm("确认修改？")){
         let that=this
         let equations=[]
         for(let i=0;i<this.tableData.length;i++){
           equations[i]=JSON.stringify(this.tableData[i])
         }
         axios.post(
             "http://127.0.0.1:5001/editPaper",
             {content:JSON.stringify(equations),paperId:that.paperId},
             {headers:{"Content-Type":"application/json;charset=UTF-8"}}
         ).then(function (){
           alert("修改成功")
         })
       }
     },
   }
 }
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>