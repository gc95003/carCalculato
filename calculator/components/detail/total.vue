<template>
	<div class="total">
		{{name}}
		<span>{{getMoney}}</span>
	</div>
</template>

<script>
	export default {
		props:['name','money'],
		data () {
			return {
				
			}
		},
		computed:{
			getMoney(){
				return this.formatNum(this.money);
			}
		},
		methods:{
		  formatNum:function(num, n) {
		  	num = String(parseFloat(num).toFixed(n));
		  	for (var re = /(-?\d+)(\d{3})/; re.test(num);)
		  		num = num.replace(re, "$1,$2");
		  	return num
		  }
		}
	}
</script>

<style lang="less">
	.total{
		height: 48px;
		line-height: 48px;
		background: rgba(250,251,252,0.95);
		box-shadow: 0 -1px 1px 0 rgba(0,0,0,0.10);
		font-size: 16px;
		color: #333;
		padding: 0 15px;
		overflow: hidden;
		margin-top: 20px;
		span{
			float: right;
			font-size: 20px;
			color: #f60;
			&:after{
				content:'元';
				font-size: 14px;
				margin-left: 5px;
			}
		}
	}
</style>
