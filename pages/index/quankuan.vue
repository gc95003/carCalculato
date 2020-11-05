<template>
	<view class="quankuan">
		<SumPrice :needFul="needFul" :months="months" :prepayment="prepayment" :monthPay="monthPay" :interest="interest" :totalPrice="totalPrice" :dk="dk" :baoxian="baoxian" :totalTax="totalTax"></SumPrice>
		<Choose @setPrice="handlePrice"></Choose>
		<LoanCount v-on:changeLoanOp="changeLoanOp" :option="LoanOp" v-if="dk"></LoanCount>
		<Necessary :insurance="bx" v-on:changeNumer="changeNumer" v-on:sidebarShow="sidebarShow" :carPurchaseTax="carPurchaseTax" :trafficInsurance="trafficInsurance"
		 :totalTax="totalTax"></Necessary>
		<SafeSum v-on:changeNumer="changeNumer" v-on:sidebarShow="sidebarShow" v-on:checked="safeChecked" text="商业保险" :carInsurance="carInsurance" :money="baoxian"></SafeSum>
		<Total name="全款总价" :money="totalPrice"></Total>
		<Traveltax class='sidebar' v-model="traveltax" v-show="traveltaxFlod" :class="{visible:traveltaxFlod,'sidebar-tab':traveltaxFlod}"
		 v-on:close='clickSidebar'></Traveltax>
		<Jqx class='sidebar' v-model="JqxOp" v-show="jqxFlod" :class="{visible:jqxFlod,'sidebar-tab':jqxFlod}" v-on:close='clickSidebar'></Jqx>
		<Dsz class='sidebar' v-model="DszOp" v-show="dszFlod" :class="{visible:dszFlod,'sidebar-tab':dszFlod}" v-on:close='clickSidebar'></Dsz>
		<Glass class='sidebar' v-model="GlassOp" v-show="glassFlod" :class="{visible:glassFlod,'sidebar-tab':glassFlod}"
		 v-on:close='clickSidebar'></Glass>
		<Scratches class='sidebar' v-model="ScratchesOp" v-show="scratchesFlod" :class="{visible:scratchesFlod,'sidebar-tab':scratchesFlod}"
		 v-on:close='clickSidebar'></Scratches>
	</view>
</template>

<script>
	// import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	
	import SumPrice from '../../calculator/components/detail/sumPrice.vue';
	import Necessary from '../../calculator/components/detail/necessary.vue';
	import SafeSum from '../../calculator/components/detail/safeSum.vue';
	import Total from '../../calculator/components/detail/total.vue';
	import Choose from '../../calculator/components/detail/choose.vue';
	// import Sidebar from '../../calculator/components/detail/sidebar.vue';
	
	import Traveltax from '../../calculator/components/detail/traveltax.vue'
	import Jqx from '../../calculator/components/detail/jqx.vue'
	import Dsz from '../../calculator/components/detail/dsz.vue'
	import Glass from '../../calculator/components/detail/glass.vue'
	import Scratches from '../../calculator/components/detail/scratches.vue'
	import LoanCount from '../../calculator/components/detail/loanCount.vue'
	
	import quankuan from '../../calculator/js/quankuan.js'
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	
	export default {
		components: {
			uniSegmentedControl,
			SumPrice,
			Necessary,
			SafeSum,
			Total,
			// Sidebar,
			Traveltax,
			Jqx,
			Dsz,
			Glass,
			Scratches,
			LoanCount,
			Choose
		},
		watch: {
			
		},
		props:{
			money:{
				type:Number,
				default:0,
			},
			dk:{
				type:Boolean,
				default:false,
			},
			bx:{
				type:Boolean,
				default:false,
			}
		},
		data() {
			return {
				price: this.money,//这里是传进来的输入的金额
	
				totalPrice: 0,//这是显示的总价金额
				totalTax: "0",
				baoxian: "0",
				carPurchaseTax: {},
				trafficInsurance: "0",
				commerceInsurance: "0",
				carInsurance: {},
	
	
				traveltaxFlod: false,
				jqxFlod: false,
				dszFlod: false,
				glassFlod: false,
				scratchesFlod: false,
	
				needFul:this.bx ? false:true,
				traveltax: {
					value: 1.6,
					name: "1.0-1.6L（含）"
				},
				JqxOp: {
					value: 5,
					name: "家用6座以下",
				},
				DszOp: {
					value: 100000,
					name: "赔付10万"
				},
				GlassOp: {
					value: 0,
					name: "国产"
				},
				ScratchesOp: {
					value: 5000,
					name: "5千"
				},
				LoanOp:{
					LoanYears:1,
					PrepaymentPercent:0.3,
					BankLoan:"0",
					TotalPrepayment:"0"
				},
				checkList: [
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true,
					true
				],
				licenseTax:500,
				csPersonRisk:50,
				
				//贷款信息
				months:0,
				prepayment:"0",
				monthPay:"0",
				interest:"0",
			}
		},
		methods: {
			//输入价格
			handlePrice(price) {
				if (price !== '') {
					this.price = parseInt(price);
				} else {
					this.price = 0;
				}
				if(this.price > 0){
					this.quankuan();
				}
			},
			changeLoanOp(options){
				if(options.key == 0){
					this.LoanOp.PrepaymentPercent = options.val;
				}else if(options.key == 1){
					this.LoanOp.LoanYears = options.val;
				}
				if (this.price) {
					this.quankuan();
				}
			},
			changeNumer(options){
				if(options.name == "上牌费用"){
					this.licenseTax = options.val;
				}else if(options.name == "车上人员责任险"){
					this.csPersonRisk = options.val;
				}
				if (this.price) {
					this.quankuan();
				}
			},
			safeChecked(options) {
				var name = options.type;
				var index = 0;
				switch (name) {
					case "第三者责任险":
						index = 0;
						break;
					case "车辆损失险":
						index = 1;
						break;
					case "全车抢盗险":
						index = 2;
						break;
					case "玻璃破碎险":
						index = 3;
						break;
					case "自燃损失险":
						index = 4;
						break;
					case "不计免赔特约险":
						index = 5;
						break;
					case "无过责任险":
						index = 6;
						break;
					case "车上人员责任险":
						index = 7;
						break;
					case "车身划痕险":
						index = 8;
						break;
					default:
						index = -1;
				}
				if(index>=0){
					this.checkList[index] = options.isChecked;
				}
				if (this.price) {
					this.quankuan();
				}
			},
			clickSidebar(type) {
				// if (target.tagName == 'ASIDE' || target.classList.contains('close')) {
				// 	this.fold = false;
				// }
				// this.fold = false;
				if (type == "traveltax") {
					this.traveltaxFlod = false;
				} else if (type == "jqx") {
					this.jqxFlod = false;
				} else if (type == "dsz") {
					this.dszFlod = false;
				} else if (type == "glass") {
					this.glassFlod = false;
				} else if (type == "scratches") {
					this.scratchesFlod = false;
				}
				if (this.price) {
					this.quankuan();
				}
			},
			sidebarShow(options) {
				//是否是车船税
				if (options == 'usageTax') {
					this.traveltaxFlod = true;
				} else {
					this.traveltaxFlod = false;
				}
				//是否交强险
				if (options == "jqx") {
					this.jqxFlod = true;
				} else {
					this.jqxFlod = false;
				}
	
				//第三者责任险
				if (options == "第三者责任险") {
					this.dszFlod = true;
				} else {
					this.dszFlod = false;
				}
	
				//玻璃破碎险
				if (options == "玻璃破碎险") {
					this.glassFlod = true;
				} else {
					this.glassFlod = false;
				}
	
				//车身划痕险
				if (options == "车身划痕险") {
					this.scratchesFlod = true;
				} else {
					this.scratchesFlod = false;
				}
			},
			quankuan() {
	
				var info = quankuan.calculator(this.dk,this.price, this.traveltax, this.JqxOp, this.DszOp, this.ScratchesOp,this.GlassOp,this.licenseTax,this.csPersonRisk, this.checkList,this.LoanOp);
				console.log(info, quankuan.formatNum(info.getLoanMoreCost()), this.price);
				this.totalTax = quankuan.formatNum(info.getTotalTax()) //显示必要花费
	
				if(this.dk){
					this.LoanOp.TotalPrepayment =quankuan.formatNum(info.getTotalPrepayment());
					this.LoanOp.BankLoan =  quankuan.formatNum(info.carLoanFee.bankLoan);
					this.months = info.carLoanFee.months;
					this.prepayment = quankuan.formatNum(info.carLoanFee.prepayment);
					this.monthPay = quankuan.formatNum(info.carLoanFee.monthPay);
					this.interest = quankuan.formatNum(info.getLoanMoreCost());
					
					this.totalPrice = info.getTotalLoan(); //显示贷款购车总花费
				}else if(this.bx){
					this.LoanOp.TotalPrepayment = "0";//首期付款额
					this.LoanOp.BankLoan = "0";//贷款额
					this.months = 0;//贷款总月数
					this.prepayment = "0";//首付
					this.monthPay = "0";//月供
					this.interest = "0";//利息
					
					this.totalPrice = info.getTotalInsurance(); //显示总需花费
					this.totalTax = quankuan.formatNum(info.carInsurance.trafficInsurance) //显示必要花费
				}else{
					this.LoanOp.TotalPrepayment = "0";//首期付款额
					this.LoanOp.BankLoan = "0";//贷款额
					this.months = 0;//贷款总月数
					this.prepayment = "0";//首付
					this.monthPay = "0";//月供
					this.interest = "0";//利息
					
					this.totalPrice = info.getTotal(); //显示总需花费
				}
	
				this.baoxian = quankuan.formatNum(info.getCommerceInsurance()); //显示商业保险花费
				for (let i in info.carPurchaseTax) {
					if (typeof(info.carPurchaseTax[i]) != "function" &&  i != "licenseTax") {
						info.carPurchaseTax[i] = quankuan.formatNum(info.carPurchaseTax[i]);
					}
				}
				this.carPurchaseTax = info.carPurchaseTax; //显示必要花费内详细费用
				this.trafficInsurance = quankuan.formatNum(info.carInsurance.trafficInsurance); //显示交强险费用
	
				for (let i in info.carInsurance) {
					if (typeof(info.carInsurance[i]) != "function" && i != "passengerInsurance") {
						info.carInsurance[i] = quankuan.formatNum(info.carInsurance[i]);
					}
				}
				this.carInsurance = info.carInsurance; //显示商业保险详细费用
	
				this.carPurchaseTax.usageTaxDesc = this.traveltax.name;
				this.carPurchaseTax.trafficInsuranceDesc = this.JqxOp.name;
	
				this.carInsurance.thirdInsuranceDesc = this.DszOp.name;
				this.carInsurance.glassInsuranceDesc = this.GlassOp.name;
				this.carInsurance.carBodyInsuranceDesc = this.ScratchesOp.name;
			}
		},
		created() {
		},
		mounted() {
		}
	}
</script>

<style lang="less">
	//公共小标题
	/deep/.type-title {
		position: relative;
		height: 45px;
		padding-left: 15px;
		line-height: 45px;
		text-align: right;
	
		h4 {
			float: left;
			color: #111;
			font-weight: 600;
		}
	
		.price {
			color: #F60;
			font-size: 18px;
		}
	
		em {
			float: right;
			width: 33px;
			color: #999;
			font-size: 12px;
			text-align: center;
		}
	
		&:after {
			content: " ";
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
	}
	.sidebar-tab {
		position: fixed;
		top: 0;
		right: -100%;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .6);
		padding-left: 75px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		overflow: hidden;
		z-index: 99999;
		-webkit-transition: transform .3s ease-out;
		transition: transform .3s ease-out;
	
		&.visible {
			-webkit-transform: translate3d(-100%, 0, 0);
			transform: translate3d(-100%, 0, 0);
		}
	
		/deep/.header-gobal {
			position: relative;
			height: 44px;
			line-height: 44px;
			text-align: center;
			background-color: rgba(250, 251, 252, 1);
	
			&:after {
				content: "";
				position: absolute;
				left: 0;
				top: 100%;
				width: 100%;
				height: 1px;
				border-top: 1px solid #d9d9d9;
				color: #d9d9d9;
				transform-origin: 0 0;
				transform: scaleY(0.5)
			}
	
			.close {
				position: absolute;
				width: 44px;
				top: 0;
				left: 0;
			}
	
			.back {
				position: absolute;
				top: 50%;
				right: 10px;
				transform: translateY(-50%);
				font-size: 16px;
				color: #0083E6;
				line-height: 28px;
			}
		}
	
	
		.sidebar-menu {
			height: 100%;
			overflow: auto;
			-webkit-overflow-scrolling: touch;
			background: #f7f9fa;
	
			.sidebar-content {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				height: auto;
				min-height: ~'calc(100vh - 44px)';
	
				.genre {
					-webkit-box-flex: 1;
					-moz-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
	
					li {
						padding-left: 15px;
						height: 50px;
						line-height: 50px;
						font-size: 16px;
						color: #333;
	
						&.active {
							color: #0083e6;
							background: #fff;
						}
					}
				}
	
				.number {
					padding-left: 15px;
					background: #fff;
					-webkit-box-flex: 1;
					-moz-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
	
					li {
						position: relative;
						height: 50px;
						line-height: 50px;
						font-size: 16px;
						color: #333;
	
						&:before {
							content: " ";
							position: absolute;
							left: 0;
							bottom: 0;
							width: 100%;
							height: 1px;
							border-top: 1px solid #e5e5e5;
							color: #e5e5e5;
							-webkit-transform-origin: 0 0;
							transform-origin: 0 0;
							-webkit-transform: scaleY(.5);
							transform: scaleY(.5);
						}
	
						&:last-child:before {
							border: none;
						}
	
						&.selected {
							color: #0083e6;
	
							&:after {
								position: absolute;
								right: 16px;
								top: 0;
								content: "\5bf9";
								font-size: 14px;
								font-family: 'calculator';
							}
						}
					}
				}
			}
		}
	}
</style>
