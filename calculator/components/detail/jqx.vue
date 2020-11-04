<template lang="html">
  <div class="jqx">
    <header class="header-gobal">
		<span class='close' @click="close">
			<uni-icons type="closeempty" size="35" color="#0083E6"></uni-icons>
		</span>
			交通事故责任强制保险
		</header>
    <ul>
		<li :class="{'selected':index == item.value}" v-for="(item,i) in data" v-on:click="change(item.value)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
	data () {
	    return {
		  data:[{
			  value:5,
			  name:"家用6座以下"
		  },{
			  value:6,
			  name:"家用6座及以上"
		  }],
	      index: this.value.value,  //定义一下
	    }
	},
	methods:{
		//点击sidebar
		close(event){
		  this.$emit('close',"jqx")
		},
		change(val){
			this.index = val;
			var data =  this.data.find(x=>x.value == val);
			this.$emit('input', data);
			this.close();
		}
	},
	props:["value"]
}
</script>

<style lang="less">
 .jqx{
     height: 100%;
	 overflow: hidden;
     ul{
	   padding: 0;
       height: 100%;
       background-color: #F7F9FA;
       li{
         position: relative;
         height: 50px;
         padding-left:15px;
         color: #333;
         line-height: 50px;
         background-color:#fff;
         &:after{
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
         &:last-of-type{
           &:after{
             display: none;
           }
         }
         &.selected{
           color:#0083e6;
           &:before{
             position: absolute;
             right: 16px;
             top: 0;
             content: "√";
             font-size: 14px;
           }
         }
       }
     }
	 
	  
   }
</style>
