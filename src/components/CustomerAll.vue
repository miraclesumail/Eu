<template>
  <div class="CustomerAll">
    <transition name="bounce">
      <div v-if="Show" class="showBox">
        <div class="customerBox">
          <img class="winBg" :src="bgImg"/>
          <img @click="customerHide" class="close" src="../assets/image/components/CustomerAll/close.png"/>
          <img @click="specialCustomer" class="specialCustomer" :src="btnImg"/>
          <img @click="qqCustomer" class="qqCustomer" src="../assets/image/components/CustomerAll/qqCustomer.png"/>
          <img @click="phoneCustomer" class="phoneCustomer" src="../assets/image/components/CustomerAll/phoneCustomer.png"/>
          <img class="onlineCustomer" @click="customerService" src="../assets/image/components/CustomerAll/onlineCustomer.png"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      Show:false,
      bgImg:require('../assets/image/components/CustomerAll/customerBgDefault.png'),
      btnImg:require('../assets/image/components/CustomerAll/BtnChangeToVip.png'),
      isVip:false
    }
  },
  props:['Content','callBack','Title','Button'],
  methods:{
    customerHide(){
      all.tool.isCustomerShow(false)
    },
    customerService(){
      all.tool.openOnlineCustomer(all.store.state.live800,this.isVip);
      all.tool.clickCount({page:'客服页面',btn:'在线客服'})
    },
    phoneCustomer(){
      all.tool.clickCount({page:'客服页面',btn:'电话客服'});
      all.router.push('/phonecustomer');
      all.tool.isCustomerShow(false);
    },
    qqCustomer(){
      all.tool.openQQService(all.store.state.qqService,this.isVip);
      all.tool.clickCount({page:'客服页面',btn:'QQ客服'})
    },
    specialCustomer(){
      if(!all.store.state.isLogin){
        all.tool.isCustomerShow(false);
        all.router.push('/login');
        return
      }
      if(all.store.state.isLogin && all.store.state.level!==4){
        all.tool.TipWinShow("只有LV.5刘备等级的会员才可享用VIP客服（大乔）服务哦！",[{name:'确定'}]);
        return
      }
      if(all.store.state.isLogin && all.store.state.level===4 && !this.isVip){
        this.bgImg=require('../assets/image/components/CustomerAll/customerBgVip.png');
        this.btnImg=require('../assets/image/components/CustomerAll/BtnChangeToDefault.png');
        this.isVip=true;
        all.tool.clickCount({page:'客服页面',btn:'刘备专用'});
        return
      }
      if(all.store.state.isLogin && all.store.state.level===4 && this.isVip){
        this.bgImg=require('../assets/image/components/CustomerAll/customerBgDefault.png');
        this.btnImg=require('../assets/image/components/CustomerAll/BtnChangeToVip.png');
        this.isVip=false
      }
    }
  },
  created(){
    setTimeout(()=>{this.Show=true},50);
      if(all.store.state.isLogin && all.store.state.level===4 && !this.isVip){
          this.bgImg=require('../assets/image/components/CustomerAll/customerBgVip.png');
          this.btnImg=require('../assets/image/components/CustomerAll/BtnChangeToDefault.png');
          this.isVip=true;
      }
  }
}
</script>

<style lang='less' scoped>
  @import (reference) "../assets/css/variable";
  .CustomerAll{
    position:absolute;
    top:0;
    left:0;
    z-index:999;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.8);
    overflow-y: scroll;
  }
  .showBox{
    position:relative;
    /*height:88.28125%;*/
    height:100%;
    display:flex;
    align-items:center;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .customerBox{
    position:relative;
      display:flex;
      justify-content:center;
      width:100%;
      height:100%;
      align-items: center;
  }
  .winBg{
    .width(750);
    .height(557);
  }
  .close{
    position:absolute;
    top:50%;
    left:43%;
    .translate(250,-250);
    .width(66);
    .height(66);
  }
  .specialCustomer{
    position:absolute;
      top:50%;
      left:43%;
      .translate(200,-80%);
    .width(160);
    .height(130);
  }
  .qqCustomer{
    position:absolute;
      top:50%;
      left:43%;
    .translate(-170,150);
    .width(116);
    .height(118);
  }
  .phoneCustomer{
    position:absolute;
      top:50%;
      left:43%;
    .translate(-250,-50%);
    .width(116);
    .height(116);
  }
  .onlineCustomer{
    position:absolute;
      top:50%;
      left:43%;
    .translate(-170,-250);
    .width(116);
    .height(116);
  }
</style>
