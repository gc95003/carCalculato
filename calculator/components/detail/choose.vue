<template lang="html">
  <ul class="choose">
<!--    <li>
      <span class="optionName">车型</span>
      <span class="model" @click="sidebarShow">请选择</span>
    </li> -->
<!--    <li class="price">
      <span class="optionName">价格</span>
      <label>
		   <input class="uni-input" type="number" v-model="price"  @input="setPrice" placeholder="请输入价格" />
      </label>
    </li> -->
	<h4>购车价格</h4>
	<input class="uni-input"  pattern="[0-9]*"  type="digit" v-model="price"  @input="setPrice" placeholder="请输入价格" />
  </ul>
</template>

<script>
  export default {
    data(){
      return {
        price:'226000'
      }
    },
    methods: {
    　setPrice () {
    　　　this.$emit('setPrice',this.price)
      },
      sidebarShow(){
        this.$emit('sidebarShow')
      }
    }
  }
</script>

<style lang="less">
.choose{
  padding-left: 15px;
  overflow: hidden;
  background: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  
  .uni-input{
	  text-align:right;
	  padding-right: 10px;
	  // font-size: 18px;
  }
  // li{
  //   position: relative;
  //   height: 50px;
  //   line-height: 49px;
  //   font-size: 16px;
  //   color: #333;
  //   padding-left:47px;
  //   text-align: right;
  //   overflow: hidden;
  //   &:after{
  //     content: "";
  //     position: absolute;
  //     left: 0;
  //     bottom: 0;
  //     width: 100%;
  //     height: 1px;
  //     border-top: 1px solid #d9d9d9;
  //     color: #d9d9d9;
  //     -webkit-transform-origin: 0 0;
  //     transform-origin: 0 0;
  //     -webkit-transform: scaleY(.5);
  //     transform: scaleY(.5);
  //   }
  //   &:last-of-type{
  //     &:after{
  //       display: none;
  //     }
  //   }
  //   .optionName{
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //   }
  //   .model{
  //     display: block;
  //     padding-right:33px;
  //     color: #999;
  //   }
  // }
  // .price{
  //   label{
  //     display: block;
  //     padding-right: 33px;
  //   }
  //   input{
  //     width: 100%;
  //     height: 50upx;
  //     line-height: 50upx;
  //     font-size: 26upx;
  //     text-align: right;
  //     outline: none;
  //   }
  //   em{
  //     position: absolute;
  //     right: 12px;
  //     top: 0;
  //     font-size: 12px;
  //     color: #999;
  //   }
  // }
}
</style>
