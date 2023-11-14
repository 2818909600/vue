<template>
  <el-table :data="paperList">
    <el-table-column prop="paperId"  label="试卷id" width="140" />
    <el-table-column prop="teacherId"  label="教师id" width="140" />
    <el-table-column prop="equationNum"  label="算式数量" width="120" />
    <el-table-column>
      <template #default="scope">
        <el-button size="small" type="primary" @click="editPaper(scope.row)"
        >编辑</el-button>
        <el-button size="small" type="primary" @click="publishPaper(scope.row)"
        >发布</el-button>
        <el-button
            size="small"
            type="danger"
            @click="deletePaper(scope.row)"
        >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script >
import axios from "axios";
import router from "@/router";
import {ref, toRef} from "vue";

export default {
  props: {data:{type:Object}},
  setup(props){
    console.log(props.data)
    let id=toRef(props.data)
    let paperList=ref([])
    return {paperList,id}
  },
  watch: {
    data: function(newVal) {
      this.id = newVal; //这样就能在method使用props
      console.log('Watch：', this.id)
    }
  },
  mounted() {
    this.showPaperList()
  },
  methods:{
    editPaper(row){
      console.log(row)
      //localStorage.setItem("currentEditPaper",JSON.stringify(row))
      this.$emit("handler", {componentName:'EditPaper',data:row})
    },
    publishPaper(row){
      if(confirm("确认发布？")){
        console.log(row)
        axios.get(
            "http://127.0.0.1:5001/publishPaper",
            {params:{paperId:row.paperId,teacherId:row.teacherId,operandNum:row.operandNum}})
            .then(function (){
              alert("发布成功！")
            })
      }
    },
    deletePaper(row){
      if(confirm("确认删除？")){
        axios.get("http://127.0.0.1:5001/deletePaper",
            {params:{paperId:row.paperId}}).
        then(function (){
          alert("删除成功")
          router.go(0)
        })
      }
    },
    showPaperList(){
      let that=this
      axios.get(
          "http://127.0.0.1:5001/paperList",
          {params:{teacherId:that.id}}
      ).then(function (response){
        let result=response.data.result
        for(let i=0;i<result.length;i++){
          result[i].equationNum=JSON.parse(result[i].content).length
        }
        if(response.data.code==="200"){
          that.paperList=result
        }else {
          alert("")
        }
      })
    }
  }
}

</script>