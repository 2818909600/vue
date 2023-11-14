<template>
  <el-table class="drow_table" :data="tableData" style="width: 100%" row-key="id">
    <el-table-column label="题号" property="digit" width="140px">
      <template v-slot="scope">
        <el-text>{{scope.$index+1}}</el-text>
      </template>
    </el-table-column>
    <el-table-column label="题目" property="maxVal" width="140px">
      <template v-slot="scope">
        <el-input v-model="scope.row.equation"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="你的答案" property="maxVal" width="140px">
      <template v-slot="scope">
        <el-input v-model="scope.row.studentAnswer"></el-input>
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

export default {
  name: 'editPaper',
  props:{
    data:{type:Object}
  },
  setup(props){
    const tableData=ref([])
    let answeredSheetDetails=toRefs(props.data)
    let content=JSON.parse(answeredSheetDetails.content.value)
    let equations=[]
    for(let i=0;i<content.length;i++){
      equations[i]=content[i]
    }
    tableData.value=equations
    return {tableData}
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