<!-- <template>
  &nbsp;&nbsp;最少&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="buildingNumMin" :min="0" :max="form.buildingNumMax" @change="$emit('updmax')" />
  &nbsp;&nbsp;最多&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="buildingNumMax" :min="buildingNumMin" :max="100000" />
</template>
<script>
export default {
  props:{
    value:
  },
  data: () => {
    return {
      buildingNumMin: 0,
      buildingNumMax: 100000
    }
  }
}
</script> -->
<template>
  &nbsp;&nbsp;最少&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="minNum_inner" :min="0" :max="maxNum" @input="updmin" />
  &nbsp;&nbsp;最多&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="maxNum_inner" :min="minNum" :max="100000" @input="updmax" />

  <!-- <input type="text" :value="firstName" @input="$emit('update:firstName', $event.target.value)" />
  <input type="text" :value="lastName" @input="$emit('update:lastName', $event.target.value)" /> -->
</template>

<script>
export default {
  props: {
    minNum: Number,
    maxNum: Number
  },
  data: () => {
    return {
      minNum_inner: 0,
      maxNum_inner: 100000
    }
  },
  emits: ['update:minNum', 'update:maxNum'],
  methods: {
    updmin (val) {
      this.$emit('update:minNum', val)
    },
    updmax (val) {
      this.$emit('update:maxNum', val)
    }
  }
}
</script>
