<template lang="html">
  <div class="scratches">
    <header class="header-gobal">
		<span class='close' @click="close">
			<uni-icons type="closeempty" size="35" color="#0083E6"></uni-icons>
		</span>
			车身划痕险
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
			  value:2000,
			  name:"2千"
		  },{
			  value:5000,
			  name:"5千"
		  },{
			  value:10000,
			  name:"1万"
		  },{
			  value:20000,
			  name:"2万"
		  }],
	      index: this.value.value,  //定义一下
	    }
	},
	methods:{
		//点击sidebar
		close(event){
		  this.$emit('close',"scratches")
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
 .scratches{
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
