<template>
	<view class="container">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="text" active-color="#1571e5"></uni-segmented-control>
		<view class="content">
			<view v-if="current === 0">
				<Quankuan ref="qk" :money="price"></Quankuan>
			</view>
			<view v-if="current === 1">
				<DaiKuan ref="dk" :dk="true" :money="price"></DaiKuan>
			</view>
			<view v-if="current === 2">
			    <Insurance ref="bx" :bx="true" :money="price"></Insurance>
			</view>
		</view>
	</view>
</template>

<script>
	import Quankuan from './quankuan.vue'
	import DaiKuan from './quankuan.vue'
	import Insurance from './quankuan.vue'
	
	export default {
		onLoad(options) {
			this.price = parseInt(options.price);
		},
		mounted() {
			if (this.price && this.current == 0) {
				this.$refs.qk.quankuan();
			}
		},
		components: {
		   Quankuan,
		   DaiKuan,
		   Insurance
		},
		data() {
			return {
				price: 0,
				items: ['全款计算', '贷款计算', '保险计算'],
				current: 0,
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if(this.current == 0){
					this.$nextTick(function() {
						this.$refs.qk.quankuan();
					})
				}else if(this.current == 1){
					this.$nextTick(function() {
						this.$refs.dk.quankuan();
					})
				}else if(this.current == 2){
					this.$nextTick(function() {
						this.$refs.bx.quankuan();
					})
				}
			},
		},
		created() {

		}
	}
</script>

<style lang="less" scoped>
	.container {
		.content {
			padding: 1px 0;

			/deep/em {
				font-style: normal;
			}
		}

		padding-top: 10px;

		/deep/ul {
			li {
				list-style: none;
			}
		}

		/deep/var {
			font-style: normal;
		}

		/deep/i {
			font-style: normal;
		}
	}
</style>
