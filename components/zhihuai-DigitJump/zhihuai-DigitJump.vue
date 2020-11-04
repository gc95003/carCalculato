<template>
	<div :class="[textColor]">{{digit}}</div>
</template>

<script>
	export default {
		data() {
			return {
				speed: 10,
				digit: 0,
			};
		},
		props: {
			digitTo: {
				type: Number,
				default: 1000,
			},
			digitFrom: {
				type: Number,
				default: 0,
			},
			runTime: {
				type: Number,
				default: 1000,
			},
			digitFiex: {
				type: Number,
				default: 0,
			},
			digitDelay: {
				type: Number,
				default: 1000,
			},
			modeType: {
				type: String,
				default: 'RANDOM'
			},textColor:{
				type:String,
				default:'zh_text_black'
			}
		},
		methods: {
			start() {
				let that = this;
				that.digit = that.digitFrom
				if (that.modeType == "RANDOM") {
					var times = that.runTime / that.speed;
					let i = 0;
					let time = setInterval(function() {

						var addVal = 0;
						if (times == 0) {
							clearInterval(time);
						} else if (times == 1) {
							var dVal = (that.digitTo - that.digit) / times;
							addVal = dVal;
						} else {
							var dVal = (that.digitTo - that.digit) / times;
							addVal = parseFloat(Math.random() * dVal).toFixed(that.digitFiex);
						}

						that.digit = (parseFloat(that.digit) + parseFloat(addVal)).toFixed(that.digitFiex);
						times--;
					}, that.speed)
				} else if (that.modeType == "AVERAGE") {
					var times = that.runTime / that.speed;
					var dValue = (that.digitTo - that.digitFrom) / times;
					let i = 0;
					let time = setInterval(function() {
						that.digit = parseFloat((that.digitFrom + dValue * i)).toFixed(that.digitFiex);
						if (times == i) {
							clearInterval(time);
						}
						i++;
					}, that.speed)
				}


			}
		},
		created() {
			let that = this;
			setTimeout(function() {
				that.start();
			}, that.digitDelay);
		},
		watch: {
			digitTo(newVal, oldVal) {
				this.digitFrom = oldVal;
				this.start();
			}
		}
	}
</script>

<style>
	.zh_text_white{
		color: #FFFFFF;
	}
	
	.zh_text_black{
		color: #000000;
	}
</style>
