<template>
  <el-table :data="generateEquationParameter">
    <el-table-column label="操作数数目（只支持2、3位）" width="240">
      <template v-slot="scope">
        <el-select v-model="scope.row.operandNum"  placeholder="Select">
          <el-option
              v-for="item in [{label:'2位',value:2},{label:'3位',value:3}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="算式最小值" width="140">
      <template v-slot="scope">
        <el-input v-model="scope.row.min"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="算式最大值" width="140">
      <template v-slot="scope">
        <el-input v-model="scope.row.max"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="算式数量" width="140">
      <template v-slot="scope">
        <el-input v-model="scope.row.num"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="算式难度等级" width="140">
      <template v-slot="scope">
        <el-select v-model="scope.row.difficultyLevel"  placeholder="Select">
          <el-option
              v-for="item in [{label:'加减法',value:1},{label:'乘除法',value:2}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template v-slot="scope">
        <el-button type="primary" @click="generateEquation(scope.row)"
        >生成试卷</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {ref} from "vue";
import axios from "axios";

export default {
  props:{
    data:{
      type: String,
      required: true
    }
  },
  setup(){
    let generateEquationParameter=ref([{
      operandNum:2,
      min:1,
      max:100,
      num:10,
      difficultyLevel:1
    }])
    return {generateEquationParameter}
  },
  methods:{
    generateEquation(row){
      let that=this
      let equationParameter=that.generateEquationParameter[0]
      if(confirm("确认生成试卷？")){
        axios.get("http://127.0.0.1:5001/generateEquation",
            {params: {operandNum:equationParameter.operandNum,
                min:equationParameter.min,
                max:equationParameter.max,
                num:equationParameter.num,
                difficultyLevel:equationParameter.difficultyLevel,
                teacherId:that.data}}).
        then(function(){
          console.log(row.num)
          alert("生成成功,请前往试卷列表页查看！")
        })
      }

    }
  }
}

</script>