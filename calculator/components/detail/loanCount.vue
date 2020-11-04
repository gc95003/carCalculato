<template>
	<div class="loanCount">
		<div class="item">
			<span class="text">首付比例</span>
			<span v-for="(item,index) in ratioList" @click="changeVal(0,item.val)" :class="{'option':true,'checked':item.val == option.PrepaymentPercent}">{{item.name}}</span>
		</div>
		<div class="item">
			<span class="text">货款年限</span>
			<span v-for="(item,index) in yearsList" @click="changeVal(1,item.val)" :class="{'option':true,'checked':item.val == option.LoanYears}">{{item.name}}</span>
		</div>
		<div class="item">
			<span class="type">贷款额<uni-icons @click="open('贷款额=购车价格-首付款')" type="help" class="ico" color="#999" size="18"></uni-icons></span>
			<span class="money">{{option.BankLoan}}</span>
			<span class="unit">元</span>
		</div>
		<div class="item">
			<span class="type">首期付款额<uni-icons @click="open('首期付款总额=首付款+必要花费+商业保险')" type="help" class="ico" color="#999" size="18"></uni-icons></span>
			<span class="money">{{option.TotalPrepayment}}</span>
			<span class="unit">元</span>
		</div>
		<uni-popup ref="popup" type="center">{{helpMsg}}</uni-popup>
	</div>
</template>

<script>
	export default {
		props: ['option'],
		data() {
			return {
				ratio: 0.3,
				year: 3,

				ratioList: [{
						val: 0.3,
						name: "30%"
					},
					{
						val: 0.4,
						name: "40%"
					},
					{
						val: 0.5,
						name: "50%"
					},
					{
						val: 0.6,
						name: "60%"
					},
				],

				yearsList: [{
						val: 1,
						name: "1年"
					},
					{
						val: 2,
						name: "2年"
					},
					{
						val: 3,
						name: "3年"
					},
					{
						val: 5,
						name: "5年"
					},
				],
				
				helpMsg:"",
			}
		},
		methods: {
			open(msg){
				this.helpMsg = msg;
			    this.$refs.popup.open();
			},
			changeVal(type, val) {
				if (type == 0) {
					this.ratio = val;
				} else if (type == 1) {
					this.year = val;
				}
				this.$emit("changeLoanOp", {
					key: type,
					val: val
				})
			}
		},
		created() {
		}
	}
</script>

<style lang="less">
	.loanCount {
		position: relative;
		background: #fff;

		&:before {
			content: "";
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 1px;
			border-top: 1px solid #d9d9d9;
			color: #d9d9d9;
			transform-origin: 0 0;
			transform: scaleY(0.5);
		}

		.item {
			display: flex;
			justify-content: space-between;
			position: relative;
			padding: 13px 31px 13px 15px;
			line-height: 24px;
			font-size: 16px;
			letter-spacing: 0;
			overflow: hidden;
			
			.unit{
				color: #999;
				font-size: 12px;
				width: 23px;
				margin-left: 5px;
				position: absolute;
				right: 0px;
				font-style: normal;
			}
			&:after {
				content: "";
				position: absolute;
				left: 15px;
				bottom: 0;
				width: 100%;
				height: 1px;
				border-top: 1px solid #d9d9d9;
				color: #d9d9d9;
				transform-origin: 0 0;
				transform: scaleY(0.5);
			}

			&:last-child:after {
				display: none;
			}

			.type {
				flex: 1;
				position: relative;
				.ico{
					position: absolute;
				}
			}

			.option {
				display: inline-block;
				width: 16vw;
				height: 24px;
				line-height: 24px;
				text-align: center;
				color: #999;
				border: 1px solid #999;
				border-radius: 100px;
				box-sizing: border-box;

				&.checked {
					color: #0078F0;
					border: 1px solid #0078F0;
				}
			}

			.extra {
				margin-right: 10px;
				font-size: 14px;
				color: #999;
			}

			.money {}

			.check-more {
				position: absolute;
				right: 10px;
				width: 16px;
				height: 16px;

				&:before {
					position: relative;
					font-size: 15px;
					color: #999;
					content: "\8f6c";
					font-family: "iconfont";
				}
			}
		}
	}
</style>
