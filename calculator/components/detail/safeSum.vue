<template lang="html">
  <div class="safe" >
    <header class="type-title">
      <h4>{{text}}</h4>
      <span class="price">{{money}}</span>
      <em>元</em>
    </header>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="第三者责任险" :extra="carInsurance.thirdInsuranceDesc" :money="carInsurance.thirdInsurance" options="compensate"  more="true" v-on:clickSafeItem="clickSafeItem"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="车辆损失险" :money="carInsurance.damageInsurance"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="全车抢盗险" :money="carInsurance.stolenInsurance"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="玻璃破碎险" :extra="carInsurance.glassInsuranceDesc" :money="carInsurance.glassInsurance" options="glassType"  more="true" v-on:clickSafeItem="clickSafeItem"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="自燃损失险" :money="carInsurance.combustInsurance"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="不计免赔特约险" :money="carInsurance.noDeductibleInsurance"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="无过责任险" :money="carInsurance.noLiabilityInsurance"></Safe>
    <Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" edit="true" type="车上人员责任险" :money="carInsurance.passengerInsurance"></Safe>
	<Safe radio="true" v-on:changeNumer="changeNumer" v-on:checked="safeChecked" type="车身划痕险" :extra="carInsurance.carBodyInsuranceDesc" :money="carInsurance.carBodyInsurance" options="compensate"  more="true" v-on:clickSafeItem="clickSafeItem"></Safe>
  </div>
</template>

<script>
import Safe from'./safe'
export default {
  props:['text','money','carInsurance'],
  data() {
  	return {
  	}
  },
  methods:{
    clickSafeItem(options){
      this.$emit('sidebarShow',options.type)
    },
	changeNumer(options){
	  this.$emit('changeNumer',options)
	},
	safeChecked(options){
		this.$emit('checked',options)
	}
  },
  components:{Safe},
  created() {
	  
  }
}
</script>

<style lang="less">
</style>
