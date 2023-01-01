<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height:10vh;">
        <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
          <el-menu-item index="0">戴森球计划 蓝图分享仓库</el-menu-item>
          <div class="flex-grow"></div>
        </el-menu>
      </el-header>
      <el-main style="height:90vh;overflow:hidden">
        <el-input v-model="inputdata" placeholder="搜索蓝图名称..."></el-input>
        <el-divider content-position="left">
          <span @click="updateFilterStatus()">
            高级过滤条件(点击{{ showFilter == true ? '隐藏' : '显示' }})
          </span>
        </el-divider>
        <template v-if="showFilter">
          <el-form :model="form" label-width="120px">
            <el-form-item label="作者名称">
              <el-input v-model="form.Authorname" />
            </el-form-item>
            <el-form-item label="蓝图建筑个数">
              <min-max v-model:minNum="form.buildingNum.min" v-model:maxNum="form.buildingNum.max" />
            </el-form-item>
            <!-- <el-form-item label="蓝图建筑过滤">
              <building-filter />
            </el-form-item> -->
          </el-form>
          <el-divider />
        </template>
        <el-auto-resizer>
          <el-table :data="blueprint" fixed>
            <el-table-column prop="蓝图名称" label="蓝图名称" width="180" />
            <el-table-column prop="蓝图作者" label="蓝图作者" width="180" />
            <el-table-column prop="蓝图摆放方式" label="蓝图摆放方式" width="180" />
            <el-table-column prop="蓝图建筑个数" label="蓝图建筑个数" width="180" />
            <el-table-column prop="蓝图用电量" label="蓝图用电量" width="180" />
            <el-table-column prop="蓝图发电量" label="蓝图发电量" width="180" />
            <el-table-column prop="蓝图产物" label="蓝图产物" width="180" />
            <el-table-column prop="蓝图原料" label="蓝图原料" width="180" />
            <el-table-column prop="蓝图需求建筑" label="蓝图需求建筑" width="180" />
          </el-table>
        </el-auto-resizer>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
// import buildingFilter from './components/buildingFilter.vue'
import minMax from './components/minMax.vue'

export default {
  components: {
    // buildingFilter,
    minMax
  },
  data: () => {
    return {
      blueprintraw: [],
      blueprint: [],
      inputdata: '',
      showFilter: true,
      form: {
        buildingNum: { min: 0, max: 100000 }
      }
    }
  },
  methods: {
    getData () {
      axios({
        url: 'https://datadsp.rickyxrc.top/list.csv',
        method: 'get'
      })
        .then((data) => {
          const dat = data.data.split('\n')
          const res = []
          dat.shift()
          console.log(dat)
          for (let i = 0; i < dat.length; i++) {
            dat[i] = dat[i].split(',')
            console.log(i, dat[i])
            res.push({
              蓝图名称: dat[i][0],
              蓝图作者: dat[i][1],
              蓝图摆放方式: dat[i][2],
              蓝图建筑个数: dat[i][3],
              蓝图用电量: dat[i][4],
              蓝图发电量: dat[i][5],
              蓝图产物: dat[i][6],
              蓝图原料: dat[i][7],
              蓝图需求建筑: dat[i][8]
            })
          }
          this.blueprintraw = res
          this.updateData()
        })
    },
    updateData () {
      this.blueprint = this.blueprintraw // 暂时不做过滤处理
    },
    updateFilterStatus () {
      this.showFilter = !this.showFilter
    }
  },
  watch: {
    inputdata () {
      this.updateData()
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
