<template>
  <el-table class="drow_table" :data="tableData" style="width: 100%" row-key="id">
    <el-table-column label="题号" property="digit" width="140px">
      <template v-slot="scope">
        <el-text>{{scope.$index+1}}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="题目" property="maxVal" width="140px">
      <template v-slot="scope">
        <el-text>{{scope.row.equation}}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="结果" property="minVal" width="140px">
      <template v-slot="scope">
        <el-input v-model="scope.row.studentAnswer"></el-input>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="submitAnswerSheet()">提交答卷</el-button>
</template>

<script >

import {ref,  toRefs} from "vue";
import axios from "axios";

export default {
  name: 'editPaper',
  props:{data:{type:Object}},
  setup(props){
    const tableData=ref([])
    let onlineAnswer=toRefs(props.data)
    let content=JSON.parse(onlineAnswer.content.value)
    let answerSheetId=onlineAnswer.answerSheetId.value
    let equations=[]
    for(let i=0;i<content.length;i++) {
      equations[i] = JSON.parse(content[i])
    }
    tableData.value=equations
    return {tableData,onlineAnswer,answerSheetId,equations}
  },
  methods:{
    submitAnswerSheet(){
      if(confirm("确认提交试卷？")){
        let that=this
        let equations=[]
        for(let i=0;i<this.tableData.length;i++){
          equations[i]=JSON.stringify(this.tableData[i])
        }
        let score=0
        let s=100/this.tableData.length
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].studentAnswer==this.tableData[i].rightAnswer){
            score+=s
          }
        }
        axios.post(
            "http://127.0.0.1:5001/submitAnswerSheet",
            {score:score,content:JSON.stringify(that.tableData),answerSheetId:that.answerSheetId},
            {headers:{"Content-Type":"application/json;charset=UTF-8"}}
        ).then(function (){
          alert("提交成功")
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