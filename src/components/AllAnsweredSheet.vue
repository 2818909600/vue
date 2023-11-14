<template>
  <el-table :data="paperList">
    <el-table-column prop="paperId"  label="试卷id" width="140" />
    <el-table-column prop="studentId"  label="学生id" width="140" />
    <el-table-column prop="equationNum"  label="算式数量" width="120" />
    <el-table-column prop="score"  label="得分" width="120" />
    <el-table-column>
      <template #default="scope">
        <el-button size="small" @click="viewAnswerSheet(scope.row)">查看答卷</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import axios from "axios";
import {ref, toRef} from "vue";

export default {
  props: {data:{type:Object}},
  setup(props){
    console.log(props.data)
    let id=toRef(props.data)
    let paperList=ref([])
    return {paperList,id}
  },
  mounted() {
    this.showAnsweredSheetList()
  },
  methods:{
    showAnsweredSheetList(){
      let that=this
      axios.get(
          "http://127.0.0.1:5001/allAnsweredSheet",
          {params:{teacherId:that.id}}
      ).then(function (response){
        if(response.data.code==="200"){
          let result=response.data.result
          for(let i=0;i<result.length;i++){
            result[i].equationNum=JSON.parse(result[i].content).length
          }
          that.paperList=result
        }else {
          alert(response.data.result)
        }
      })
    },
    viewAnswerSheet(row){
      console.log(row)
      this.$emit("handler",{componentName:"AllAnsweredSheetDetails",data:row})
    }
  }
}
</script>