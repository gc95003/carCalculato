<template>
    <div class="safe-item" @click="more && clickSafeItem()" >
      <view v-if="radio" class="icon" @click.stop @click="checkedToggle">
		<uni-icons v-if="!isChecked" type="checkbox" class="checkbox" size="20" color="#000"></uni-icons>
		<uni-icons v-if="isChecked" type="checkbox-filled" class="checkbox" size="20" color="#0082F4"></uni-icons>
	  </view>
	  <view v-if="more" class="more">
		<uni-icons type="forward"  size="20" color="#999"></uni-icons>
	  </view>
      <div class="type">{{type}}</div>
	  <div v-if="extra" class="extra">{{extra}}</div>
	  <div v-if="!edit" class="money">{{money}}</div>
	  <div v-if="edit" :class="{'money':true,'edit':edit}"><input class="uni-input" @input="changeNumer" type="number" :value="money" placeholder="" /></div>
    </div>
</template>

<script>

  export default{
    props:['radio','more','type','money','extra','options','edit'],
    data(){
      return {
        isChecked: true
      }
    },
    methods:{
	  clickSafeItem(event){
	  	this.$emit('clickSafeItem',{
	  		type:this.type
	  	})
	  },
	  changeNumer(event){
	  	var name = this.type;
	  	var val = parseInt(event.target.value);
	  	var data = {name,val};
	  	this.$emit('changeNumer', data);
	  },
      checkedToggle(event){
		//删除勾选
		// if(!this.isChecked){
			
		// }
		//勾选
		// else if(this.isChecked){
			
		// }
		this.$emit('checked',{
			type:this.type,
			isChecked:!this.isChecked,
		})
		this.isChecked = !this.isChecked;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .safe{
    margin-top:10px;
    background-color: #fff;
	// .click_div{
	// 	width: auto;
	// }
    .safe-item{
      display: flex;
      position: relative;
      height:50px;
      line-height: 50px;
      padding: 0 31px 0 5px;
      margin-left: 15px;
	  .more{
		  position: absolute;
		  right: 7px;
		  top: 0;
	  }
      &:after{
        content: "";
        position: absolute;
        left: 0;
        top: 100%;
        width: 100%;
        height: 1px;
        border-top: 1px solid #e5e5e5;
        color: #e5e5e5;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
      .icon{
        width: 28px;
        height: 50px;
      }
      .type{
        flex: 1;
        display: inline-blcok;
        font-size: 16px;
        color: #333333;
		margin-left: 5px;
      }
      .extra{
        margin-right: 10px;
        font-size: 14px;
        color: #999;
      }
      .money{
        display: inline-block;
        font-size: 16px;
		
		&.edit{
			position: relative;
			&:after{
				content: "可自定义";
				color: #70b764;
				font-size: 12px;
				right: 70upx;
				top: 0;
				position: absolute;
				display: block;
				height: 100%;
				overflow: auto;
				width: 100px;
			}
		}
		
		.uni-input{
			height: 100%;
			text-align: right;
			padding: 0;
			width: 100upx;
		}
      }
    }
  }
</style>
