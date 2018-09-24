<template>
  <div class="footer">
    <span v-for="item in menuItem" @click="open(item.path)" class="menu"><img :src="item.src" height="100%" width="auto"/></span>
  </div>
</template>

<script>
  import home from '../assets/image/components/footer/menuHome.png'
  import deposit from '../assets/image/components/footer/menuDeposit.png'
  import withdraw from '../assets/image/components/footer/menuWithdraw.png'
  import account from '../assets/image/components/footer/menuAccount.png'
export default {
  data(){
    return {
      menuItem:[
        {path:'/',src:home},
        {path:'/deposit',src:deposit},
        {path:'/withdraw',src:withdraw},
        {path:'/account',src:account},
      ]
    }
  },
  methods:{
    open(path){
      all.router.push(path)
    }
  }
}
</script>

<style scoped lang='less'>
    @import (reference) "../assets/css/variable";
  .footer{
    .height(120);
    background:linear-gradient(#1c212f,#1b1513);
    position:fixed;
    width:100%;
    bottom:0;
    display:flex;
    align-items:center;
    z-index:99;
  }
    .footer .menu{
    flex:1;
    background:url("../assets/image/components/footer/itemLine.png") no-repeat right center;
    background-size:2px 100%;
    height:100%;
    width:25%;
  }
  .menu:last-child{
    background:none
  }

</style>
