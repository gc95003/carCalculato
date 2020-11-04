<template>
	<div class="necessary">
		<header class='type-title'>
			<h4>必要花费</h4>
			<span class="price">{{totalTax}}</span>
			<em>元</em>
		</header>
		<ul>
			<li v-if="!insurance">
				<span>购置税<uni-icons @click="open('购置税＝购车款/(1+17%)×购置税率(10%)')" type="help" class="ico" color="#999" size="18"></uni-icons></span>
				<em>{{carPurchaseTax.purchaseTax}}</em>
			</li>
			<li @click="sidebarShow('usageTax')" v-if="!insurance">
				<span>车船使用税</span>
				<em>{{carPurchaseTax.usageTax}}</em>
				<var>{{carPurchaseTax.usageTaxDesc}}</var>
				<uni-icons type="arrowright" class="ico" color="#999" size="20"></uni-icons>
			</li>
			<li class="inputElem" v-if="!insurance">
				<span>上牌费用</span>
				<input class="uni-input" pattern="[0-9]*" type="number" data-name="上牌费用" @input="changeNumer"  :value="carPurchaseTax.licenseTax" />
				<!-- <em>{{carPurchaseTax.licenseTax}}</em> -->
			</li>
			<li @click="sidebarShow('jqx')">
				<span>交通事故责任强制保险</span>
				<em>{{trafficInsurance}}</em>
				<var>{{carPurchaseTax.trafficInsuranceDesc}}</var>
				<uni-icons type="arrowright" class="ico" color="#999" size="20"></uni-icons>
			</li>
		</ul>
		<uni-popup ref="popup" type="center">{{helpMsg}}</uni-popup>
	</div>
</template>

<script>
	// import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		data() {
			return {
				helpMsg:"",
			}
		},
		methods: {
			open(msg){
				this.helpMsg = msg;
			    this.$refs.popup.open();
			},
			sidebarShow(options) {
				this.$emit('sidebarShow', options)
			},
			changeNumer(event){
				var name = event.currentTarget.dataset.name;
				var val = parseInt(event.target.value);
				var data = {name,val};
				this.$emit('changeNumer', data);
			}
		},
		props: ['totalTax', 'carPurchaseTax', 'trafficInsurance','insurance'],
		components: {
		},
		created() {
		}
	}
</script>

<style lang="less">
	.necessary {
		margin-top: 10px;
		background: #fff;
		overflow: hidden;

		ul {
			padding-left: 20px;
			overflow: hidden;

			li {
				position: relative;
				height: 50px;
				line-height: 50px;
				color: #333;
				padding: 0 30px 0 5px;
				&.inputElem{
					position: relative;
					input{
						float: right;
						text-align: right;
					}
					&:after{
						content: "可自定义";
						color: #70b764;
						font-size: 12px;
						right: 120upx;
						top: 0;
						position: absolute;
						display: block;
						height: 100%;
						overflow: auto;
						width: 100px;
					}
					.uni-input{
						padding: 0;
						height: 100%;
						width: 100upx;
					}
				}
				&:before {
					content: "";
					position: absolute;
					left: 0;
					top: 100%;
					width: 100%;
					height: 1px;
					border-top: 1px solid #e5e5e5;
					color: #e5e5e5;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(.5);
					transform: scaleY(.5);
				}

				span {
					float: left;
					position: relative;
					.ico{
						position: absolute;
						top: 0;
						left: 100upx;
					}
				}

				em {
					float: right;
				}

				var {
					float: right;
					font-size: 14px;
					color: #999;
					margin-right: 10px;
				}

				.ico {
					position: absolute;
					right: 10px;
					// top: 10upx;
					height: 100%;
					align-items: center;
					display: flex;
					// width: 33px;
					// height: 49px;
					// line-height: 55px;
					// color: #999;
					text-align: center;
					// font-family: 'calculator';
				}
			}
		}
	}
</style>
