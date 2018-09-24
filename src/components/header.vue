<template>
    <div>
        <div v-show="isShow && !isApp" class="downApp" @click="goToDownload">
            <img class="appTile" src="../assets/image/components/header/downApp.png"/>
            <a href="javascript:;"><img @click="clickC" class="downnow" src="../assets/image/components/header/downAppnow.jpg"/></a>
            <img class="downClose" src="../assets/image/components/header/downAppclose.png"/>
        </div>
        <div class="header">
            <div class="leftbar">
                <p class="itembox">
                    <img @click="customerShow" src="../assets/image/components/header/btnCustomer.png"/>
                    <img @click="Tomessage" class="btnMessage" src="../assets/image/components/header/btnMessage.png"/>
                    <span v-if="this.$store.state.unReadMessageCount>0" class="newMessage" v-text="this.$store.state.unReadMessageCount"></span>
                </p>
            </div>
            <img @click="allScreen" class="logo" src="../assets/image/components/header/logo.png" height="100%" width="auto"/>
            <div class="rightbar">
                <div class="itembox">
                    <img v-if="!this.$store.state.isLogin" @click="login" class="btnLogin" src="../assets/image/components/header/btnLogin.png"/>
                    <img v-if="this.$store.state.isLogin" @click="logout" src="../assets/image/components/header/btnLogout.png"/>
                    <img class="btnRegister" @click="toRegister" v-if="!this.$store.state.isLogin" src="../assets/image/components/header/btnRegister.png"/>
                    <!-- <img class="firstCharge" @click="showFirstCharge" v-if="false && this.$store.state.isLogin && this.$store.state.firstDeposit.isShowIcon" src="../assets/image/components/header/firstCharge.png" height="57%" width="auto"/> -->
                    <div class="integral_box" v-if="this.$store.state.isLogin" @click="toTask">
                      <img class="iocnPromoBg" src="../assets/image/components/header/iocnPromoBg.png" />
                      <img class="integral" src="../assets/image/components/header/integral_icon.png"/>
                      <div class="text_box">
                        <img class="integral_text" src="../assets/image/components/header/integral_text.png"/>
                      </div>
                    </div>
                    <span @click="showElsePromo" v-if="false && this.$store.state.isLogin && !this.$store.state.firstDeposit.isShowIcon">
                        <img src="../assets/image/components/header/iocnPromoBg.png"/>
                        <img src="../assets/image/components/header/iocnPromo.png"/>
                        <i><img src="../assets/image/components/header/iocnPromoText.png"/></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isShow:false,
      isApp:all.tool.isApp(),
      appUrl:'http://td99.neweb.me/neweu/m/download.html',
    }
  },
  methods:{
    showElsePromo(){
      all.tool.send('getSlotInfo',{code:'dailydeposit'}).then(result=>{console.log(result);
        this.$parent.$children.map(item=>{
          if(all.$(item.$el).hasClass('home')){
            if(result.data.list[0].status===1)item.promoStatus=true;
            if(result.data.list[0].status===0)item.promoStatus=true;
            if(result.data.list[0].status===2)item.promoStatus=false;
            item.minDeposit=result.data.list[0].minDeposit;
            item.betTimes=result.data.list[0].betTimes;
            item.promoLimit=result.data.list[0].promoLimit;
            item.promoRate=result.data.list[0].promoRate;
            item.elsePromo=true;
          }
        })
      }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
    },
    customerShow(type){
      all.tool.isCustomerShow(true);
     // all.tool.clickCount({page:'首页',btn:'客服'});
    },
    clickC(){
      all.tool.clickCount({page:'首页',btn:'立即下载'})
    },
    toRegister(){
      all.router.push('/register');
      all.tool.clickCount({page:'首页',btn:'开户'})
    },
    login(){
      all.router.push('/login');
    },
    Tomessage(){
      all.router.push('/message');
      all.tool.clickCount({page:'首页',btn:'信息'});
    },
    logout(){
      all.tool.TipWinShow('确定要退出登录',[{name:'取消'},{name:'确定',callback:()=>{
        all.tool.send('logout',{playerId:all.store.state.playerId},'player').then(()=>{
          all.tool.setLogoutInfo()
        })
      }}]);
    },
    showFirstCharge(){
      all.tool.clickCount({page:'首页',btn:'首充'});
      all.tool.isFirstSaveShow();
      all.tool.setStore('once',true);
    },
    allScreen(){
      all.tool.fullScreen(document.documentElement)
    },

    goToDownload () {
      this.$router.push('/downLoad');
    },

    toTask() {
      this.$router.push('/task');
    }
  },
  mounted(){
    if(all.tool.getStore('downApp')){
      setTimeout(()=>{
        if(!all.tool.isApp()){
          all.$('.downApp').slideDown();
        }
      },1000);
      setTimeout(()=>{
        let autoCloseTop=setInterval(()=>{
          if(!this.$store.state.firstDeposit.isShow){
            setTimeout(()=>{
              all.$('.downApp').slideUp();
              all.tool.setStore('downApp',false);
            },10000);
            clearInterval(autoCloseTop);
            autoCloseTop=null;
          }
        },1000);
      },2000);
    }
    all.$('.downApp .downClose').on('click',function(){
      all.$('.downApp').slideUp();
      all.tool.setStore('downApp',false);
      return false;
    });
    let isIos = all.tool.clientDevice().ios;
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
    if(theUrl==='eu3030.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3030/download.html';
    if(theUrl==='eu775.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu775/download.html';
    if(theUrl==='eu7979.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu7979/download.html';
    if(theUrl==='eu3399.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3399/download.html';
    if(theUrl==='eu7799.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu7799/download.html';
    if(theUrl==='eu8088.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8088/download.html';
    if(theUrl==='eu3838.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3838/download.html';
    if(theUrl==='eu6565.com')this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu6565/download.html';
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

<style scoped lang='less'>
    @import (reference) "../assets/css/variable";
  .downApp{
      .height(120);
      position:relative;
      display:flex;
      align-items: center;
      background-color: #fff;
      // background: #fff url('../assets/image/components/header/appDownLoadBanner_02.jpg') no-repeat center center/100% 100%;
  }
    .appTile{
        .width(372);
        height:auto;
        .ml(20)
    }
    .downnow{
        .width(160);
        height:auto;
        position:absolute;
        .right(110);
        top:50%;
        transform:translateY(-70%);
    }
    .downClose{
        .width(60);
        height:auto;
        position:absolute;
        .right(20);
        top:0;
    }

    // .downClose {
    //   .width(50);
    //   .height(50);
    //   right: 0;
    //   .bottom(5);
    //   position: absolute;
    //   transform: rotateZ(90deg);
    // }
  .header{
    display:flex;
    align-items:center;
    .height(100);
    background:linear-gradient(to bottom,#1c212f,#1b1513);
    padding:0 2.666667%;
    justify-content:space-between;
    position:relative;
  }
  .logo{
      position:absolute;
      left:50%;
      transform:translateX(-50%) ;
  }
  .leftbar{
    display:flex;
    align-items:center;
    height:100%;
  }
  .leftbar .itembox{
    display:flex;
    align-items:center;
    height:100%;
    position:relative;
  }
  .leftbar .itembox .newMessage{
    .font-size(22);
    display:inline-flex;
    .width(30);
    .height(30);
    border-radius:50%;
    background:#dc1a23;
    position:absolute;
    align-items: center;
    justify-content: center;
    left:68%;
    .translateY(-18)
  }
  .btnMessage{
    .height(52) !important;
    margin-left:5.633803%;
  }
  .rightbar{
    display:flex;
    align-items:center;
    height:100%;
  }
  .rightbar .itembox{
    display:flex;
    align-items:center;
    flex-direction:row-reverse;
    height:100%;
  }
  .btnRegister{
    margin-right:5.633803%;
      .height(52) !important;
  }
  .btnLogin{
      .height(70) !important;
  }
  .firstCharge{
      margin-right:5.633803%;
      animation:mymove 5s infinite;
  }
    .itembox img{
        .height(58);
        width:auto;
    }
    .itembox span{
        .height(82);
        width:auto;
        margin-right:5.633803%;
        position:relative;
    }
    .itembox span>img:first-child{
        position:absolute;
        left:0;
        top:0;
        .height(82);
        width:auto;
        animation:rotateZ 20s infinite
    }
    .itembox span>img:nth-child(2){
        position:absolute;
        .left(10);
        .top(10);
        .height(63);
        width:auto;
        animation:rotate 5s infinite
    }
    .itembox span i{
        display:inline-block;
        .height(39);
        .width(50);
        .ml(70);
        .mt(21);
        overflow: hidden;
    }
    .itembox span i img{
        .height(39);
        width:auto;
        animation:move 5s infinite
    }

    .integral_box {
      text-align: left;
      .width(120);
      .height(60);
      position: relative;
      .pl(70);
    }

    .iocnPromoBg {
      position: absolute;
      height: 200% !important;
      top: -50%;
      left: -22%;
      animation: rotateZ 10s linear infinite;
    }

    .integral {
      position: absolute;
      right: 0;
      left: 0;
      .width(50);
      animation: zoom 4s linear infinite;
    }

    .text_box {
      .height(60);
      position: relative;
      .width(55);
      overflow: hidden;

      .integral_text {
        .height(30);
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        animation: toRight 3s linear infinite;
      }
    }


    @keyframes move{
        0%{transform:translateX(0)}
        25%{transform:translateX(0)}
        50%{transform:translateX(-50%)}
        75%{transform:translateX(-50%)}
        100%{transform:translateX(-100%)}
    }
    @keyframes rotate{
        0%,100%{opacity:1;transform:scale(1) rotateY(0)}
        25%,75%{opacity:1;transform:scale(1) rotateY(360deg)}
        50%{opacity:1;transform:scale(1) rotateY(180deg)}
    }
    @keyframes rotateZ{
        0%,100%{transform:rotateZ(0)}
        25%,75%{transform:rotateZ(360deg)}
        50%{transform:rotateZ(180deg)}
    }
    @keyframes mymove{
        0%,100%{opacity:0.3;transform:scale(0.9)}
        25%,75%{opacity:1;transform:scale(1.1)}
        50%{opacity:0.6;transform:scale(1)}
    }

    @keyframes toRight {

      0% {
        transform: translateY(-50%);
      }

      50% {
        transform: translateY(-50%) translateX(-50%);
      }

      100% {
        transform: translateY(-50%) translateX(0%);
      }
    }

    @keyframes zoom {
      0% {
        transform: scaleX(1) scaley(1);
      }

      25% {
        transform: scaleX(0.8) scaley(0.8);
      }

      50% {
        transform: scaleX(1.1) scaley(1.1);
      }

      75% {
        transform: scaleX(0.9) scaley(0.9);
      }

      100% {
        transform: scaleX(1) scaley(1);
      }

    }


  @media screen and (max-width: 375px) {
    .logo{
      width:auto;
      height:80%;
    }
    .itembox{
      height:80% !important;
    }
  }
</style>
