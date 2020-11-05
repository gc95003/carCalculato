<template>
	<div class="sumPrice">
		<div class="price">
			<h4 v-if="!needFul">新车保险指导价（以实际到店为准）</h4>
			<h4 v-if="!dk && needFul">全款总价（以实际到店为准）</h4>
			<h4 v-if="dk">贷款购车总价（以实际到店为准）</h4>
			<!-- <p>{{totalPrice}}</p> -->
			<digitJump :digitTo="totalPrice" :digitFrom="0" :digitFiex='2' :digitDelay='400'></digitJump>
		</div>
		<ul v-if="dk" class="insurance-stages">
			<li>
				<span>首付</span>
				<em>{{prepayment}}</em>
			</li>
			<li>
				<span>月供({{months}}个月)</span>
				<em>{{monthPay}}</em>
			</li>
			<li>
				<span>总利息</span>
				<em>{{interest}}</em>
			</li>
		</ul>
		<NeedFul :totalTax="totalTax" :commerceInsurance="baoxian" v-if="needFul"></NeedFul>
	</div>
</template>

<script>
	import digitJump from '../../../components/zhihuai-DigitJump/zhihuai-DigitJump.vue'
    import NeedFul from './needful'
	export default {
		data () {
			return {
			}
		},
		props:{
			dk:{
				type:Boolean,
				default:false,
			},
			needFul:{
				type:Boolean,
				default:true,
			},
			totalPrice:{
				type:Number,
				default:0,
			},
			totalTax:{
				type:String,
				default:"0",
			},
			baoxian:{
				type:String,
				default:"0"
			},
			prepayment:{
				type:String,
				default:"",
			},
			months:{
				type:Number,
				default:0
			},
			monthPay:{
				type:String,
				default:"0",
			},
			interest:{
				type:String,
				default:"0",
			}
		},
		components:{NeedFul,digitJump},
		created() {
			
		},
		mounted() {
	
		},
		methods:{

		}
	}
</script>

<style lang="less">
	.sumPrice{
		background-image: linear-gradient(0deg, #0059E6 0%, #008DF8 100%);
		overflow: hidden;
		.price{
			padding:20px 0 0 20px;
			h4{
				line-height: 22px;
				font-size: 14px;
				color: #fff;
			}
			.zh_text_black{
				line-height: 60px;
				height:60px;
				color: #fff;
				font-size: 42px;
				letter-spacing: 2px;
				&:after{
					content:'元';
					color: #fff;
					font-size: 14px;
				}
			}
		}
		.insurance-stages{
			padding:0 20px 15px;
			overflow: hidden;
			display: -webkit-box;
			display: -ms-flexbox;
			display:flex;
			justify-content: space-between;
			li{
				float: left;

				span{
					display: inline-block;
					font-size: 12px;
					color: #fff;
					opacity: 0.5;
				}
				em{
					display: inline-block;
					margin-left: 3px;
					font-size: 12px;
					color: #fff;
				}
			}
		}
	}
</style>
