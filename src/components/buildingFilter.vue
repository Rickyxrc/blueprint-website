<template>
  <el-col>蓝图<strong>必须包含</strong>以下建筑:</el-col><br />

  添加过滤条件<br />
  <el-select v-model="tmpChanwu" class="m-2" placeholder="Select">
    <el-option v-for="item in buildings" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script>
export default {
  data: () => {
    return {
      buildingNumMin: 0,
      buildingNumMax: 100000,
      buildings: ['风力发电机', '电力感应塔', '传送带'],
      tmpChanwu: ''
    }
  }
}
</script>
