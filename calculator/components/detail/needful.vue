<template>
	<ul class="needful">
		<li>
			<span>必要花费</span>
			<span>{{totalTax}}</span>
			<!-- <uni-icons type="arrowright" class="ico" color="#fff" size="28"></uni-icons> -->
		</li>
		<li>
			<span>商业保险</span>
			<span>{{commerceInsurance}}</span>
			<!-- <uni-icons type="arrowright" class="ico" color="#fff" size="28"></uni-icons> -->
		</li>
	</ul>
</template>

<script>

	export default {
		data() {
			return {

			}
		},
		components: {
		},
		props:["totalTax",'commerceInsurance']
	}
</script>

<style lang="less">
	.needful {
		overflow: hidden;
		background: #026fee;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		margin-left: -80upx;

		li {
			position: relative;
			// float: left;
			// height: 85upx;
			// line-height: 85upx;
			-webkit-box-flex: 1;
			-moz-box-flex: 1;
			-ms-flex: 1;
			flex: 1;
			text-align: center;
			flex-direction: column;
			justify-content: center;
			// padding: 6px 0;
			color: #fff;
			// align-items: center;/

			// &:last-child:before{
			// 	position: absolute;
			// 	top: 0;
			// 	left: 0;
			// 	content: "";
			// 	width: 1px;
			// 	height: 55px;
			// 	background: rgba(255,255,255,0.10);
			// }
			// &:after{
			// 	position: absolute;
			// 	right: 25px;
			// 	top: 0;
			// 	content: "\8f6c";
			// 	font-family: 'calculator';
			// 	color: #fff;
			// 	font-size: 16px;
			// }
			.ico {
				position: absolute;
				right: 35px;
				top: 8px;
			}

			span {
				display: flex;
				line-height: 22px;
				font-size: 14px;
				opacity: 0.6;
				justify-content: center;
				// align-items: center;
			}

			var {
				display: flex;
				line-height: 25px;
				font-size: 16px;
				justify-content: center;
				// align-items: center;
			}
		}
	}
</style>
