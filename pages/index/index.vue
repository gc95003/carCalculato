<template>
	<view class='container'>
		<view class="title">
			请选择车型或输入价格
		</view>
		<Choose @setPrice="handlePrice" @sidebarShow="sidebarShow"></Choose>
		<span class="count" :class="active" @click="skip">计算</span>
		<!-- <Sidebar :class="sidebarClassName" id="sidebar" @clickSidebar="clickSidebar"></Sidebar> -->
	</view>
</template>

<script>
	import Choose from './choose';
	// import Sidebar from './sidebar'
	// import router from '../router'
	export default {
		name: "index",
		data() {
			return {
				isSkip: true,
				count: 'count',
				price: 226000,
				active: 'active',
				sidebarClassName: 'sidebar',
			}
		},
		components: {
			Choose,
			// Sidebar
		},
		methods: {
			//输入价格
			handlePrice(price) {
				if (price !== '') {
					this.active = 'active';
					this.isSkip = true;
					this.price = price;
				} else {
					this.count = 'count';
					this.isSkip = false;
					this.price = 0;
				}
			},
			//显示sidebar
			sidebarShow() {
				this.sidebarClassName = 'sidebar visible';
			},
			clickSidebar(target) {
				if (target.tagName == 'ASIDE' || target.classList.contains('close')) {
					this.sidebarClassName = 'sidebar'
				}
			},
			//进入sum页
			skip() {
				if (this.isSkip) {
					 var url = './calculator?price='+this.price;
					 console.log(url);
					 uni.navigateTo({
					    url:url ,
					 });
				}
			}
		},
		created() {
			// var uuid = plus.device.uuid;
			// uni.showToast({
			// 	title: uuid,
			// 	duration: 2000
			// });
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		height: 100%;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
		z-index: 1;
		
		.title {
			height: 80upx;
			line-height: 80upx;
			background: #c5c3c5;
			font-size: 30upx;
			color: #fff;
			text-align: center;
		}

		.count {
			display: block;
			height: 80upx;
			margin: 20upx 15upx;
			text-align: center;
			color: #fff;
			line-height: 80upx;
			background-color: #93ebcd;
			border-radius: 10upx;
		}

		.count.active {
			background: #007AFF;
			box-shadow: 0 2px 6px 0 rgba(98,162,226, 0.80);
			border-radius: 10upx;
		}
	}
</style>
