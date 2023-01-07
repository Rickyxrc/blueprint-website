<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: 10vh">
        <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
          <el-menu-item index="0">戴森球计划 蓝图分享仓库</el-menu-item>
          <div class="flex-grow"></div>
        </el-menu>
      </el-header>
      <el-main style="height: 90vh; overflow: hidden">
        <el-input v-model="inputdata" placeholder="搜索蓝图名称..."></el-input>
        <el-divider content-position="left">
          <span @click="updateFilterStatus()">
            高级过滤条件(点击{{ showFilter == true ? "隐藏" : "显示" }})
          </span>
        </el-divider>
        <template v-if="showFilter">
          <el-form :model="form" label-width="120px">
            <el-form-item label="作者名称">
              <el-input v-model="form.author" @input="updateData()" />
            </el-form-item>
            <el-form-item label="蓝图建筑个数">
              <min-max v-model:minNum="form.buildingNum.min" v-model:maxNum="form.buildingNum.max" :settingMax="100000"
                @change="updateData()" />
            </el-form-item>
            <el-form-item label="蓝图用电量">
              <min-max v-model:minNum="form.yongdianliang.min" v-model:maxNum="form.yongdianliang.max"
                :settingMax="100000000" @change="updateData()" />
              &nbsp;&nbsp;( {{ solveUsage(form.yongdianliang.min * 1000) }} ~ {{
                solveUsage(form.yongdianliang.max *
                  1000)
              }} )
            </el-form-item>
            <el-form-item label="蓝图发电量">
              <min-max v-model:minNum="form.yongdianliang.min" v-model:maxNum="form.yongdianliang.max"
                :settingMax="100000000" @change="updateData()" />
              &nbsp;&nbsp;( {{ solveUsage(form.yongdianliang.min * 1000) }} ~
              {{ solveUsage(form.yongdianliang.max * 1000) }} )
            </el-form-item>
            <el-form-item label="蓝图发电量">
              <min-max v-model:minNum="form.fadianliang.min" v-model:maxNum="form.fadianliang.max"
                :settingMax="100000000" @change="updateData()" />
              &nbsp;&nbsp;( {{ solveUsage(form.fadianliang.min * 1000) }} ~
              {{ solveUsage(form.fadianliang.max * 1000) }} )
            </el-form-item>
            <!-- <el-form-item label="蓝图建筑过滤">
              <building-filter />
            </el-form-item> -->
          </el-form>
          <el-divider />
        </template>
        <el-auto-resizer>
          <el-table :data="blueprint" @cell-click="handleCellClick">
            <el-table-column prop="蓝图名称" label="蓝图名称" width="180" />
            <el-table-column prop="蓝图作者" label="蓝图作者" width="180" />
            <el-table-column prop="蓝图摆放方式" label="蓝图摆放方式" width="180" />
            <el-table-column prop="蓝图建筑个数" label="蓝图建筑个数" width="180" />
            <el-table-column prop="蓝图用电量" label="蓝图用电量" width="180">
              <template #default="scope">
                {{ solveUsage(scope.row.蓝图用电量) }}
              </template>
            </el-table-column>
            <el-table-column prop="蓝图发电量" label="蓝图发电量" width="180">
              <template #default="scope">
                {{ solveUsage(scope.row.蓝图发电量) }}
              </template>
            </el-table-column>
            <el-table-column prop="蓝图产物" label="蓝图产物" width="180" />
            <el-table-column label="蓝图原料" width="180">
              <template #default="scope">
                <div v-if="scope.row.蓝图原料.length < 3">
                  <span v-for="i in scope.row.蓝图原料" v-bind:key="i">{{ i }}/min&nbsp;</span>
                </div>
                <div v-else>内容过长，点击查看</div>
              </template>
            </el-table-column>
            <el-table-column label="蓝图需求建筑" width="180">
              <template #default="scope">

                <div v-if="scope.row.蓝图需求建筑.length < 3">
                  <span v-for="i in scope.row.蓝图需求建筑" v-bind:key="i">{{ i }}&nbsp;</span>

                </div>
                <div v-else>内容过长，点击查看</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
              <template #default="scope">
                <el-button size="small" @click="copy(scope.row.蓝图作者, scope.row.蓝图名称)">复制到剪贴板</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-auto-resizer>
      </el-main>
    </el-container>
  </div>

  <el-drawer v-model="showBuildings" title="该蓝图需要的建筑">
    <div v-for="i in reqBuildings" v-bind:key="i">
      <span style="display: inline-block; width: 10rem">{{
        i.split(":")[0]
      }}</span>
      {{ i.split(":")[1] }}
    </div>
  </el-drawer>

  <el-drawer v-model="showSources" title="该蓝图需要的原料">
    <div v-for="i in reqSources" v-bind:key="i">
      <span style="display: inline-block; width: 10rem">{{ i.split(":")[0] }}</span>
      {{ i.split(":")[1] }} / min
    </div>
  </el-drawer>
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
      showBuildings: false,
      showSources: false,
      showFilter: true,
      form: {
        author: '',
        buildingNum: { min: 0, max: 100000 },
        yongdianliang: { min: 0, max: 100000 },
        fadianliang: { min: 0, max: 100000 }
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
          for (let i = 0; i < dat.length; i++) {
            dat[i] = dat[i].split(',')
            res.push({
              蓝图名称: dat[i][0],
              蓝图作者: dat[i][1],
              蓝图摆放方式: dat[i][2],
              蓝图建筑个数: dat[i][3],
              蓝图用电量: dat[i][4],
              蓝图发电量: dat[i][5],
              蓝图产物: dat[i][6].split(';'),
              蓝图原料: dat[i][7].split(';'),
              蓝图需求建筑: dat[i][8].split(';')
            })
          }
          this.blueprintraw = res
          this.updateData()
        })
    },
    updateData () {
      this.blueprint = []
      let i
      for (i = 0; i < this.blueprintraw.length; i++) {
        if (this.blueprintraw[i].蓝图名称.toLowerCase().indexOf(this.inputdata.toLowerCase()) === -1) // 名称不包含
          continue

        if (this.showFilter) {
          // 建筑数量
          if (this.blueprintraw[i].蓝图建筑个数 > this.form.buildingNum.max || this.blueprintraw[i].蓝图建筑个数 < this.form.buildingNum.min)
            continue
          // 作者名称
          if (this.blueprintraw[i].蓝图作者.toLowerCase().indexOf(this.form.author.toLowerCase()) === -1)
            continue
          // 用电量
          if (this.blueprintraw[i].蓝图用电量 > this.form.yongdianliang.max * 1000 || this.blueprintraw[i].蓝图用电量 < this.form.yongdianliang.min * 1000)
            continue
          // 发电量
          if (this.blueprintraw[i].蓝图发电量 > this.form.fadianliang.max * 1000 || this.blueprintraw[i].蓝图发电量 < this.form.fadianliang.min * 1000)
            continue
        }

        this.blueprint.push(this.blueprintraw[i])
      }
    },
    updateFilterStatus () {
      this.showFilter = !this.showFilter
      this.updateData()
    },
    handleCellClick (row, column, cell) {
      if (column.label === '蓝图需求建筑') {
        this.reqBuildings = row.蓝图需求建筑
        this.showBuildings = true
        return
      }
      if (column.label === '蓝图原料') {
        this.reqSources = row.蓝图原料
        this.showSources = true
      }
    },
    solveUsage (val) {
      if (val >= 0 && val < 1000)
        return val + 'W'
      if (val >= 1000 && val < 1000000)
        return (val / 1000).toFixed(2) + 'KW'
      if (val >= 1000000 && val < 1000000000)
        return (val / 1000000).toFixed(2) + 'MW'
      if (val >= 1000000000 && val < 1000000000000)
        return (val / 1000000000).toFixed(2) + 'GW'
      if (val >= 1000000000000 && val < 1000000000000000)
        return (val / 1000000000000).toFixed(2) + 'TW'
    },
    copy (author, name) {
      axios({
        url: 'https://datadsp.rickyxrc.top/blueprints/' + author + '/' + name + '.txt',
        method: 'get'
      })
        .then((dat) => {
          this.$copyText(dat.data).then(function (e) {
            ElMessage('复制成功')
          }, function (e) {
            ElMessage('复制失败')
          })
        })
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
