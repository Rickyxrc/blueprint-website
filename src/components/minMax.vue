<template>
  &nbsp;&nbsp;最少&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="minNum_inner" :min="0" :max="maxNum" @input="updmin" />
  &nbsp;&nbsp;最多&nbsp;&nbsp;&nbsp;
  <el-input-number v-model="maxNum_inner" :min="minNum" :max="settingMax" @input="updmax" />
</template>

<script>
export default {
  props: {
    minNum: Number,
    maxNum: Number,
    settingMax: Number
  },
  data: () => {
    return {
      minNum_inner: 0,
      maxNum_inner: 0
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
  },
  mounted () {
    this.maxNum_inner = this.$props.settingMax
    this.$emit('update:minNum', 0)
    this.$emit('update:maxNum', this.$props.settingMax)
  }

}
</script>
