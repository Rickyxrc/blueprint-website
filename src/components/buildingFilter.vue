<template>
  <el-col>
    <div style="color:#6f6f6f;" v-if="buildingsSelect.length == 0">
      (还没有给定过滤条件，请在下方选择)
    </div>
    <div v-else>
      <el-col v-for="i in buildingsSelect" v-bind:key="i">
        {{ i.name }}&nbsp;的数量在&nbsp;{{ i.min }}&nbsp;到&nbsp;{{ i.max }}&nbsp;之间 <el-button size="small" type="danger"
          @click="deleteBuilding(i)">删除</el-button>
      </el-col>
    </div>
  </el-col>

  <el-col>添加过滤条件</el-col>

  <br />
  <el-select v-model="buildingNowSelected" class="m-2" filterable placeholder="Select">
    <el-option v-for="item in buildingsExist" :key="item" :label="item" :value="item" />
  </el-select>
  <min-max v-model:minNum="buildingNowMin" v-model:maxNum="buildingNowMax" :settingMax="100000" />
  <el-button @click="addFilter()">添加</el-button>
</template>
<script>
import minMax from './minMax.vue'

export default {
  props: {
    resArray: Array
  },
  components: {
    minMax
  },
  emits: ['update:resArray', 'change'],
  data: () => {
    return {
      buildingsExist: ['电力感应塔', '无线输电塔', '卫星配电站', '风力涡轮机', '火力发电厂', '太阳能板', '地热发电站', '微型聚变发电站', '蓄电器', '采矿机', '大型采矿机', '抽水站', '原油萃取站', '高速传送带', '传送带', '高速传送带', '极速传送带', '分拣器', '高速分拣器', '极速分拣器', '四向分流器', '自动集装机', '流速监测器', '喷涂机', '小型储物仓', '大型储物仓', '储液罐', '电弧熔炉', '位面熔炉', '制造台Mk.I', '制造台Mk.II', '制造台Mk.III', '原油精炼厂', '分馏塔', '化工厂', '量子化工厂', '微型粒子对撞机', '物流配送器', '行星内物流运输站', '星际物流运输站', '轨道采集器', '能量枢纽', '矩阵研究站', '电磁轨道弹射器', '射线接收站', '垂直发射井', '人造恒星'],
      buildingNowSelected: '',
      buildingNowMin: 0,
      buildingNowMax: 100000,
      buildingsSelect: []
    }
  },
  methods: {
    addFilter () {
      if (this.buildingNowSelected === '') {
        // eslint-disable-next-line no-undef
        ElMessage('建筑名不能为空')
        return
      }

      for (let i = 0; i < this.buildingsSelect.length; i++)
        if (this.buildingsSelect[i].name === this.buildingNowSelected) {
          // eslint-disable-next-line no-undef
          ElMessage('过滤建筑已存在')
          return
        }
      this.buildingsSelect.push({
        min: this.buildingNowMin,
        max: this.buildingNowMax,
        name: this.buildingNowSelected
      })
      this.updateVal()

      this.buildingNowMin = 0
      this.buildingNowMax = 100000
      this.buildingNowSelected = ''
    },
    deleteBuilding (building) {
      const ind = this.buildingsSelect.indexOf(building)
      if (ind !== -1)
        this.buildingsSelect.splice(ind, 1)
      this.updateVal()
    },
    updateVal () {
      this.$emit('update:resArray', this.buildingsSelect)
      this.$emit('change')
    }
  }
}
</script>
