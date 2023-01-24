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
      buildingsExist: ['风力发电机', '电力感应塔', '传送带'],
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
