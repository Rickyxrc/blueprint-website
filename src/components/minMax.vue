<template>
  &nbsp;&nbsp;最少&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="minNum_inner" :min="0" :max="maxNum" @input="updmin" />
  &nbsp;&nbsp;最多&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="maxNum_inner" :min="minNum" :max="100000" @input="updmax" />
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
  emits: ['update:minNum', 'update:maxNum', 'change'],
  methods: {
    updmin (val) {
      this.$emit('update:minNum', val)
      this.$emit('change')
    },
    updmax (val) {
      this.$emit('update:maxNum', val)
      this.$emit('change')
    }
  }
}
</script>
