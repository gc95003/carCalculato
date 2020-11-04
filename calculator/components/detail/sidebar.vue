<template lang="html">
  <aside>
	  <Traveltax v-on:close="clickSidebar"></Traveltax>
    <!-- <NecessaryCost v-if="necessaryCost"></NecessaryCost> -->
<!--    <GlassType v-if="glassType"></GlassType>
    <Compensate v-if="compensate"></Compensate> -->
    <!-- <SelectBrand v-else></SelectBrand> -->
  </aside>
</template>

<script>
	import Traveltax from './traveltax.vue'
// import NecessaryCost from './necessaryCost'
// import GlassType from './glassType'
// import Compensate from './compensate'
export default {
  methods:{
    //点击sidebar
    clickSidebar(type){
      this.$emit('close',type)
    },
  },
  props:['necessaryCost','compensate','glassType'],
  components:{Traveltax}
}
</script>

<style lang="less">
</style>
