

<template>
  <div class="message">
    <PageTop
      :title="title"
      :useDefaultCloseFn="false"
      @closeCallBackFn="goToHome"
    >
    </PageTop>


    <main class="main">
      <!-- <img src="../assets/image/pages/download/downLoadBg.jpg" height="auto" width="100%"/> -->
      <div class="AppBox" v-if="!isApp">
        <!-- <img class="title" src="../assets/image/pages/download/title.png"/> -->
        <p class="btn">
          <img @click="iosLoad" src="../assets/image/pages/download/IOSBtn.png"/>
          <a :href="appUrl" target="view_frame"><img @click="androidLoad" src="../assets/image/pages/download/AndBtn.png"/></a>
          <img v-if="isIos" class="finger" src="../assets/image/pages/account/finger.png">
          <img v-if="isAndroid" class="adfinger" src="../assets/image/pages/account/finger.png">
        </p>
      </div>
      <div class="menu">
        <p>
          <span class="rq2" :class="{active:gameType==2}" @click="changeRQ(2)"></span>
          <span  class="rq0" :class="{active:gameType==0}" @click="changeRQ(0)"></span>
          <span  class="rq1" :class="{active:gameType==1}" @click="changeRQ(1)"></span>
        </p>
        <!--<img v-show="gameType==2" src="../assets/image/pages/download/downloadMenuR.jpg" height="auto" width="100%"/>-->
        <!--<img v-show="gameType==0" src="../assets/image/pages/download/downloadMenu.jpg" height="auto" width="100%"/>-->
        <!--<img v-show="gameType==1" src="../assets/image/pages/download/downloadMenuR.jpg" height="auto" width="100%"/>-->
      </div>

      <!--DT-->
      <div v-show="gameType==0" class="qr">
        <span><img src="../assets/image/pages/download/dtIosQR.jpg"/><i>苹果（IOS）</i><a href="http://down.dreamtech.asia/EU/ios.html ">点击下载</a></span>
        <span><img src="../assets/image/pages/download/dtAndroidQR.jpg"/><i>安卓（Android）</i><a href=" http://down.dreamtech.asia/EU/android.html">点击下载</a></span>
      </div>
      <!--PT-->
      <div v-show="gameType==1" class="qr">
        <span><img src="../assets/image/pages/download/ptAndroidQR.jpg"/><i>安卓（Android）</i><a href="https://td99.neweb.me/eu8/m/download.html?res=ptApp ">点击下载</a></span>
      </div>
      <div v-show="gameType==2" class="qr">
        <span><img src="../assets/image/pages/download/ebetAndroidQR.png"/><i>安卓（Android）</i><a href="//www.ebetapp.com/eu">点击下载</a></span>
      </div>
      <div class="textBox" v-show="gameType!=2">
        <p class="titleTip">温馨提示</p>
        <p class="text">请在登录游戏的账号前加<i>eu8</i>(如账号是 <i>e123456</i>，手机版则为 <i>eu8e123456</i>)。<br>首次登录请务必在设置中修改<i>初始密码</i>。</p>
        <p><img @click="gotoChange" src="../assets/image/pages/download/goChange.png"/></p>
      </div>
    </main>


  </div>
</template>

<script>
  import PageTop from '../components/PageTop';
  import {iosAppUrla, iosAppUrlb, domainList} from '../assets/js/config/domain.config.js';
  export default {
    data() {
      return {
        title: 'APP下载',
        gameType:2,
        isApp:all.tool.isApp(),
        isIos: all.tool.clientDevice().ios,
        isAndroid: all.tool.clientDevice().android,
        appUrl:'http://td99.neweb.me/neweu/m/download.html'
      }
    },
    components: {
      PageTop,
    },
    methods: {
      goToHome () {
        this.$router.push('/');
      },
      gotoChange(){
        if(this.gameType==0){
          all.router.push({name:'changePassword',params:{type:"DT"}});
        }
        else if(this.gameType==1){
          all.router.push({name:'changePassword',params:{type:"PT"}});
        }
      },
      androidLoad(){
        all.tool.clickCount({page:'APP下载',btn:'androidApp下载'})
      },
      iosLoad(){
        all.tool.clickCount({page:'APP下载',btn:'iosApp下载'});
        let theUrl = window.location.host.slice(4,window.location.host.length);
        let openUrl = '';
        if (domainList.includes(theUrl)) {
          openUrl = iosAppUrla
        } else {
          openUrl = iosAppUrlb
        }

        window.open(openUrl);
      },
      changeRQ(number){
        this.gameType=number;

        if(this.gameType===0){
          all.tool.clickCount({page:'APP下载',btn:'DT下载'})
        }
        else if(this.gameType===1){
          all.tool.clickCount({page:'APP下载',btn:'PT下载'})
        }
        else if(this.gameType===2){
          all.tool.clickCount({page:'APP下载',btn:'eBET下载'})
        }
      }
    },
    mounted(){
      let theUrl=window.location.host.slice(4,window.location.host.length);
      if(theUrl==='eu001.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu001/download.html';
      if(theUrl==='eu005.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu005/download.html';
      if(theUrl==='eu065.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu065/download.html';
      if(theUrl==='eu066.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu066/download.html';
      if(theUrl==='eu615.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu615/download.html';
      if(theUrl==='eu1866.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu1866/download.html';
      if(theUrl==='eu1899.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu1899/download.html';
      if(theUrl==='eu8282.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8282/download.html';
      if(theUrl==='eu8383.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8383/download.html';
      if(theUrl==='eu8855.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8855/download.html';
      if(theUrl==='eu981.com')this.appUrl='http://td99.neweb.me/eu981/m/download.html';
      if(theUrl==='eu242.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu242/download.html';
      if(theUrl==='eu357.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu357/download.html';
      if(theUrl==='eu577.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu577/download.html';
      if(theUrl==='eu663.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu663/download.html';
      if(theUrl==='eu887.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu887/download.html';
      if(theUrl==='eu3939.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3939/download.html';
      if(theUrl==='eu3322.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3322/download.html';
      if(theUrl==='eu866.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu866/download.html';
      if(theUrl==='eu2019.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu2019/download.html';
      if(theUrl==='eu3030.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3030/download.html';
      if(theUrl==='eu775.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu775/download.html';
      if(theUrl==='eu7979.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu7979/download.html';
      if(theUrl==='eu3399.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3399/download.html';
      if(theUrl==='eu7799.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu7799/download.html';
      if(theUrl==='eu8088.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8088/download.html';
      if(theUrl==='eu3838.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3838/download.html';
      if(theUrl==='eu6655.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu6655/download.html';
      if(theUrl==='eu8181.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8181/download.html';
      if(theUrl==='eu9663.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu9663/download.html';
      if(theUrl==='eu9775.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu9775/download.html';
      if(theUrl==='eu9886.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu9886/download.html';
      if(theUrl==='eu812.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu812/download.html';
      if(theUrl==='eu8001.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8001/download.html';
      if(theUrl==='eu33999.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu33999/download.html';
      if(theUrl==='eu66888.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu66888/download.html';
      if(theUrl==='eu77888.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu77888/download.html';
      if(theUrl==='eu88999.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu88999/download.html';
      if(theUrl==='eu99989.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu99989/download.html';
    }
  }
</script>



<style scoped lang="less">
  @import (reference) '../assets/css/variable.less';
  .message {
    height: 100%;
  }
  .main{
    // .height(1300);
    overflow-y:scroll;
    // background:#0c2b42;
    // background: url('../assets/image/pages/download/downloadBg2.jpg') no-repeat center center/100% 100%;
    background-size:100% 100%;
    position:relative;
  }
  .AppBox{
    // position:absolute;
    // top:0;
    // width:100%;
    // display:flex;
    // justify-content: center;
    // flex-direction: column;
    // align-items: center;
    width: 100%;
    .height(420);
    position: relative;
    background: url('../assets/image/pages/download/download-page-mobile.jpg') no-repeat center center/100% 100%;
  }
  .menu{
    width:100%;
    position:relative;
    .height(126)
  }
  .menu p{
    position:absolute;
    width:100%;
    height:100%;
    display:flex;
    border-bottom: 1px solid #040c11;
    .rq2{
      background-image: url("../assets/image/pages/download/ebet.jpg");
      background-size: 100% 100%;
      &.active{
        background-image: url("../assets/image/pages/download/ebetb.jpg");
      }
    }
    .rq0{
      background-image: url("../assets/image/pages/download/dt.jpg");
      background-size: 100% 100%;
      &.active{
        background-image: url("../assets/image/pages/download/dtb.jpg");
      }
    }
    .rq1{
      background-image: url("../assets/image/pages/download/pt.jpg");
      background-size: 100% 100%;
      &.active{
        background-image: url("../assets/image/pages/download/ptb.jpg");
      }
    }
  }
  .menu span{
    flex:1;
    height:100%;
    cursor: pointer;
  }
  .qr{
    display:flex;
    .mt(45);
    justify-content: center;
  }
  .qr span{
    width:50%;
    display:flex;
    flex-direction: column;
    align-items: center;
  }
  .qr span a{
    .font-size(24);
    background:#de8209;
    .mt(10);
    .pl(25);
    .pr(25);
    .pt(10);
    .pb(10);
    .border-radius(5);
    text-decoration: none;
    color:#fff;
  }
  .qr span i{
    .font-size(24);
    .mt(30);
    font-weight: bold;
  }
  .qr span img{
    .width(300);
    height:auto;
  }
  .textBox{
    background:#00101a;
    border:1px solid #064f73;
    .font-size(24);
    text-align: left;
    margin:20px;
    margin-bottom:40px;
    padding:10px;
    .line-height(38)
  }
  .textBox .titleTip{
    .font-size(28);
    .line-height(48);
    font-weight: bold;
    color:#f39700
  }
  .textBox img{
    margin:5px 0;
    .width(150);
    height:auto
  }
  .textBox i{
    color:#f39700
  }
  .title{
    .mt(40);
    .width(470);
    height:auto
  }
  .btn{
    position: absolute;
    left: 0;
    .top(330);
    .pl(230);
    text-align: center;
    width: 100%;
  }
  .btn img{
    .width(180);
    height:auto;
    z-index: 9;
  }

  .finger {
    width: 10% !important;
    position: absolute;
    .right(200);
    .bottom(-60);
    animation: moveFinger 1s linear infinite;
  }

  .adfinger {
    width: 10% !important;
    position: absolute;
    .right(20);
    .bottom(-60);
    animation: moveFinger 1s linear infinite;
  }

  @keyframes moveFinger {
    from {
      transform: translateY(0) translateX(0);
    }
    to {
      transform: translateY(-5px) translateX(-5px);
    }
  }
</style>
















