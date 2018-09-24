<template>
  <div class="tipWindow">
    <transition name="bounce">
      <div v-if="Show" class="tipBox">
        <!--默认提示窗口-->
        <transition name="bounce">
            <div class="defaultWin" v-if="!window">
              <img class="winBg" src="../assets/image/components/tipWindow/tipWinBg.png"/>
              <p class="title" v-html="Title"></p>
              <p class="content" v-if="Content" v-html="Content"></p>
              <p class="btnBox" v-if="Button" :style="{justifyContent:Button[0].align==='left'?'flex-start':Button[0].align==='right'?'flex-end':'center'}">
                <span v-for="(item,index) in Button" :class="Button.length>1 && index===0?'cancelBtn':'defaultBtn'" @click="done(item.callback)" v-html="item.name"></span>
              </p>
            </div>
        </transition>
        <!--有关闭按钮提示窗口-->
        <transition name="bounce">
          <div class="withCloseBtnWin" v-if="window?window.type==='withCloseTip':window">
            <img class="winBg" src="../assets/image/components/tipWindow/tipWinBgWithClose.png" height="auto"/>
            <p class="title" v-html="Title"></p>
            <img @click="done(callBack)" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
            <ul class="content">
              <li v-if="window.data">
                <p class="noticeTitle"><b v-html="window.data.title"></b><b v-html="changeTime(window.data.createTime)"></b></p>
                <p class="noticeContent" v-html="window.data.content"></p>
              </li>
              <li v-if="Content" v-html="Content" style="text-align:center"></li>
            </ul>
            <p class="btnBox" v-if="Button" :style="{justifyContent:Button[0].align==='left'?'flex-start':Button[0].align==='right'?'flex-end':'center'}">
              <span v-for="(item,index) in Button" :class="Button.length>1 && index===0?'defaultBtn':'cancelBtn'" @click="done(item.callback)" v-html="item.name"></span>
            </p>
          </div>
        </transition>
          <!--有关闭按钮支付宝微信转银行卡提示窗口-->
          <transition name="bounce">
              <div class="withCloseBtnWin" v-if="window?window.type==='ChangeTip':window">
                  <img class="winBg" src="../assets/image/components/tipWindow/tipWinBgWithClose.png" height="auto"/>
                  <p class="title" v-html="Title"></p>
                  <img @click="done(callBack)" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
                  <ul class="content">
                      <li class="list"><span>提案号</span><span v-text="window.data.id"></span></li>
                      <li class="list"><span>支付金额</span><span><i v-text="window.data.amount"></i>元</span></li>
                      <li class="tick"><img src="../assets/image/components/tipWindow/tick.png"/><span>我已明白本次需要转账 <i v-text="window.data.amount"></i>元 <br>（含正确小数点），否则将无法自动到账！</span></li>
                  </ul>
                  <p class="btnBox" v-if="Button" :style="{justifyContent:Button[0].align==='left'?'flex-start':Button[0].align==='right'?'flex-end':'center'}">
                      <span v-for="(item,index) in Button" :class="Button.length>1 && index===0?'defaultBtn':'cancelBtn'" @click="done(item.callback)" v-html="item.name"></span>
                  </p>
              </div>
          </transition>
        <!--红包代码详情提示窗口-->
        <transition name="bounce">
            <div class="promobagWin" v-if="window?window.type==='promobagTip':window">
                <p class="title" v-html="Title"></p>
                <img @click="done" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
                <div class="introDetail">
                    <img class="detail" src="../assets/image/pages/promobag/introDetail.png"/>
                    <p class="titleS">1.什么是红包代码？</p>
                    <p class="text">答：红包代码是系统随机生成赠送给会员的优惠。会员在获得红包后，可以查看该红包的条件，自行选择领取所喜欢的红包。</p>
                    <p class="titleS">2.三种不同红包代码有什么区别？</p>
                    <img class="typeintro" src="../assets/image/pages/promobag/typeintro.png"/>
                    <p class="titleS">3.如何获得红包代码？</p>
                    <p class="text">答：红包代码是每天由系统随机发送的，只要您持续在易游存款游戏，肯定会获得红包代码赠送！</p>
                </div>
            </div>
        </transition>
        <!--最新公告提示窗口-->
        <transition name="bounce">
            <div class="noticeWin" v-if="window?window.type==='noticeTip':window">
              <img class="noticeBg" src="../assets/image/components/tipWindow/tipWinNoticeBg.png"/>
              <p class="title" v-html="Title"></p>
              <img @click="done" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
              <ul class="content">
                <li v-for="item in window.data">
                  <p class="noticeTitle"><b v-html="item.title"></b><b v-html="changeTime(item.date)"></b></p>
                  <p class="noticeContent" v-html="item.content"></p>
                </li>
              </ul>
            </div>
        </transition>
          <!--不懂请点教程窗口-->
          <transition name="bounce">
              <div class="teachWin" v-if="window?window.type==='teachTip':window">
                  <p class="title" v-html="Title"></p>
                  <img @click="done" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
                  <div class="content">
                      <div class="aliBox">
                          <img class="teachBtn" @click="stepless" v-if="step===1" src="../assets/image/components/tipWindow/btnleftF.png"/>
                          <img class="teachBtn" @click="stepless" v-if="step!==1" src="../assets/image/components/tipWindow/btnleft.png"/>
                          <div class="teachImg" v-if="window.depositMethod===4">
                              <p><img src="../assets/image/components/tipWindow/aliStep1.jpg"/><i>步骤一</i></p>
                              <p><img src="../assets/image/components/tipWindow/aliStep2.jpg"/><i>步骤二</i></p>
                              <p><img src="../assets/image/components/tipWindow/aliStep3.jpg"/><i>步骤三</i></p>
                          </div>
                          <div class="teachImg" v-if="window.depositMethod===5">
                              <p><img src="../assets/image/components/tipWindow/wechatStep1.jpg"/><i>步骤一</i></p>
                              <p><img src="../assets/image/components/tipWindow/wechatStep2.jpg"/><i>步骤二</i></p>
                              <p><img src="../assets/image/components/tipWindow/wechatStep3.jpg"/><i>步骤三</i></p>
                              <p><img src="../assets/image/components/tipWindow/wechatStep4.jpg"/><i>步骤四</i></p>
                          </div>
                          <div class="teachImg" v-if="window.depositMethod===6">
                              <p><img src="../assets/image/components/tipWindow/flashPayStep1.gif"/><i>步骤一</i></p>
                              <p><img src="../assets/image/components/tipWindow/flashPayStep2.gif"/><i>步骤二</i></p>
                              <p><img src="../assets/image/components/tipWindow/flashPayStep3.gif"/><i>步骤三</i></p>
                              <p><img src="../assets/image/components/tipWindow/flashPayStep4.gif"/><i>步骤四</i></p>
                          </div>
                          <img class="teachBtn" @click="stepplus(window.depositMethod===6?window.depositMethod-2:window.depositMethod-1)" v-if="window.depositMethod===6?step===window.depositMethod-2:step===window.depositMethod-1" src="../assets/image/components/tipWindow/btnrightF.png"/>
                          <img class="teachBtn" @click="stepplus(window.depositMethod===6?window.depositMethod-2:window.depositMethod-1)" v-if="window.depositMethod===6?step!==window.depositMethod-2:step!==window.depositMethod-1" src="../assets/image/components/tipWindow/btnright.png"/>
                      </div>
                  </div>
              </div>
          </transition>
      <!-- 复活之星弹窗 -->
        <transition name="bounce">
          <div class="withCloseBtnWin" id="resurrection" v-if="window?window.type==='resurrection':window">
            <img class="winBg" src="../assets/image/components/tipWindow/tipWinBgWithClose.png" height="auto"/>
            <p class="title" v-html="Title"></p>
            <img @click="done(callBack)" class="closeBtn" src="../assets/image/components/tipWindow/tipWinCloseBtn.png"/>
            <ul class="content">
              <div class="alertBox">
                <img width="30%" style="margin-bottom:0.2rem;" src="../assets/image/pages/resurrection/start2.png" />
            </div>
            <p>恭喜您获得<span style="color:#f39800; font-weight:700;" v-text="window.data.resurrectionAmount"></span>复活之星奖励！</p>
            </ul>
            <p class="btnBox" v-if="Button" :style="{justifyContent:Button[0].align==='left'?'flex-start':Button[0].align==='right'?'flex-end':'center'}">
              <span v-for="(item,index) in Button" :class="Button.length>1 && index===0?'defaultBtn':'cancelBtn'" @click="done(item.callback)" v-html="item.name"></span>
            </p>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      Show:false,
      autoClose:null,
      step:1,
      autoPlay:null
    }
  },
  props:['Content','Title','Button','closeTime','callBack','window'],
  methods:{
    done(callBack){
      if(this.autoPlay){
        clearInterval(this.autoPlay);
        this.autoPlay=null
      }
      all.tool.TipWinClose();
      (typeof(callBack)==="function") && callBack();
      if(this.closeTime){
        clearTimeout(this.autoClose);
        this.autoClose=null
      }
    },
    changeTime(time){
      return all.tool.formatTime(time,true)
    },
    stepless(){
        if(this.autoPlay){
          clearInterval(this.autoPlay);
          this.autoPlay=null
        }
        if(this.step>1){
          this.step--;
          all.$('.teachImg p').css('margin',0);
          all.$('.teachImg').prepend(all.$('.teachImg p:last-child'));
          all.$('.teachImg p:first-child').css('marginLeft','-'+(parseInt(all.$('.teachImg p:first-child').css('width'))+1)+'px').animate({marginLeft:'0'},500);
        }
    },
    stepplus(steps,clear){
      if(this.autoPlay && !clear){
        clearInterval(this.autoPlay);
        this.autoPlay=null
      }
        if(this.step<steps){
          this.step++;
          all.$('.teachImg p').css('margin',0);
          all.$('.teachImg p:first-child').animate({marginLeft:'-'+(parseInt(all.$('.teachImg p:first-child').css('width'))+1)+'px'},500);
          setTimeout(()=>{all.$('.teachImg').append(all.$('.teachImg p:first-child'))},500);
        }
    }
  },
  mounted(){
    if(this.window && this.window.type==='teachTip'){
        if(!this.autoPlay){
          this.autoPlay=setInterval(()=>{
            this.stepplus(this.window.depositMethod===6?this.window.depositMethod-2:this.window.depositMethod-1,true);
          },4000)
        }
      }
  },
  created(){
      setTimeout(()=>{this.Show=true},50);
      if(this.closeTime){
        this.autoClose=setTimeout(()=>{
          (typeof(this.callBack)==="function") && this.callBack();
          all.tool.TipWinClose();
          clearTimeout(this.autoClose);
          this.autoClose=null
        },this.closeTime)}
    }
}
</script>

<style lang='less' scoped>
  @import (reference) "../assets/css/variable";
  .tipWindow{
    position:absolute;
    top:0;
    left:0;
    z-index:1000;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.8);
    overflow-y: scroll;
  }
  .tipBox{
    position:relative;
    height:100%;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .3s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
  .defaultWin,.withCloseBtnWin{
    position:relative;
      .width(618);
  }
  .defaultWin .winBg,.withCloseBtnWin .winBg{
       .width(618);
       height:auto;
     }
  .defaultWin .title,.withCloseBtnWin .title{
    position:absolute;
    top:0;
    left:50%;
    transform:translateX(-50%) ;
     .width(618);
    .height(100);
    .line-height(100);
    .font-size(36);
    .margin-top(10);
    font-weight: 700;
  }
  .defaultWin .content,.withCloseBtnWin .content{
    position:absolute;
      top:0;
      left:50%;
      transform:translateX(-50%) ;
      .font-size(28);
    .min-height(250);
      height:auto;
    .line-height(42);
    .margin-top(110);
    .width(540);
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    overflow-y:scroll;
  }


  .withCloseBtnWin .content .list{
      display:flex;
      justify-content: space-between;
      align-items: center;
      .height(60);
      border:1px solid #20679f;
  }
  .withCloseBtnWin .content .tick{
      display:flex;
      justify-content:flex-start;
      align-items: center;
      .mt(20)
  }
  .withCloseBtnWin .content .tick i{
      color:#f9e506;
      .font-size(32)
  }
  .withCloseBtnWin .content .tick img{
      align-self: flex-start;
      .mr(10)
  }
  .withCloseBtnWin .content .list:first-child{
      border-bottom:1px solid #0b1d2b;
  }
  .withCloseBtnWin .content .list span:first-child{
      display:inline-flex;
      height:100%;
      justify-content: center;
      align-items: center;
      width:40%;
      background:#20679f;
      border-right:1px solid #0b1d2b;
  }
  .withCloseBtnWin .content .list span i{
      color:#f9e506;
      .font-size(40);
      font-weight:bold;
  }
  .withCloseBtnWin .content .list span:last-child{
      display:inline-flex;
      height:100%;
      justify-content: center;
      align-items: center;
      width:60%;
      background:#083457
  }
  .defaultWin .btnBox,.withCloseBtnWin .btnBox{
    display:flex;
    .margin-top(360);
    .width(560);
    position:absolute;
      top:0;
      left:50%;
      transform:translateX(-50%);
      z-index:98;
  }
  .defaultWin .defaultBtn,.withCloseBtnWin .defaultBtn{
    .height(60);
    .pl(15);
    .pr(15);
    .min-width(160);
    background:url('../assets/image/components/tipWindow/tipWinDefaultBtn.png');
    background-size:100% 100%;
    .font-size(28);
    .line-height(60);
    .ml(10);
    .mr(10)
  }
  .defaultWin .cancelBtn,.withCloseBtnWin .cancelBtn{
      .height(60);
      .pl(15);
      .pr(15);
      .min-width(160);
      background:url('../assets/image/components/tipWindow/tipWinCancelBtn.png');
    background-size:100% 100%;
    .font-size(28);
    .line-height(60);
    .ml(10);
    .mr(10)
  }
  .withCloseBtnWin .closeBtn{
    .height(103);
    .width(193);
    position:absolute;
    .right(10);
    .top(10)
  }
  .withCloseBtnWin .content li{
    width:100%;
    .font-size(24);
    text-align:left;
    .line-height(36)
  }
  .promobagWin{
      position:relative;
      width: 100%;
      height:100%;
      background:#0b1d2b;
  }
  .promobagWin .title{
      background:url("../assets/image/components/pageTop/pageTopBg.jpg") no-repeat;
      background-size:100% 100%;
      .font-size(36);
      font-weight: 700;
      .height(100);
      .line-height(100)
  }
  .promobagWin .closeBtn{
      position:absolute;
      right:0;
      top:0;
      .height(103);
      width:auto
  }
  .promobagWin .detail{
      width:90.666667%;
      height:auto;
      margin:65px 0 0
  }
  .promobagWin .titleS{
      .font-size(24);
      font-weight:bold;
      color:#f39700;
      text-align: left;
      .line-height(48);
      .mt(40)
  }
  .promobagWin .text{
      .font-size(24);
      text-align: left;
      .line-height(48)
  }
  .promobagWin .introDetail{
      padding:0 2.666667%;
      .mb(65)
  }
  .promobagWin .typeintro{
      width:100%;
      height:auto;
      .mt(20)
  }
  .noticeWin{
    position:relative;
    .width(580);
  }
  .noticeWin .noticeBg{
    height:auto;
    .width(580);
  }
  .noticeWin .title{
    position:absolute;
    .line-height(90);
    .height(90);
    width:100%;
    margin:0 auto;
    .font-size(36);
    font-weight: 700;
    .top(210)
  }
  .noticeWin .closeBtn{
    .height(93);
    width:auto;
    position:absolute;
    .right(30);
    .top(210)
  }
  .noticeWin .content{
    position:absolute;
    .height(330);
    .width(540);
      left:50%;
      transform:translateX(-50%);
    .top(300);
    .pl(20);
    .pr(20);
    overflow-y:scroll;
  }
  .noticeWin .content li{
    background:#03101a;
    .font-size(24);
    .pb(15);
    .pl(15);
    .pr(15);
    .pt(15);
    .mt(20);
    .line-height(36)
  }
  .noticeWin .content .noticeTitle,.withCloseBtnWin .content .noticeTitle{
    color:#188ac8;
    font-weight:bold;
    display:flex;
    justify-content:space-between;
    .line-height(40)
  }
  .noticeWin .content .noticeContent{
    text-align: left;
  }
    .teachWin{
        position:relative;
        height:100%;
        width:100%;
    }
    .teachWin .title{
        background:url("../assets/image/components/pageTop/pageTopBg.jpg") no-repeat;
        background-size:100% 100%;
         .font-size(36);
        font-weight: 700;
        .height(100);
        .line-height(100)
    }
  .teachWin .closeBtn{
      position:absolute;
      right:0;
      top:0;
      .height(103);
      width:auto
    }
  .teachWin .content{
      background:#0b1d2b;
      min-height:92.503748%;
      .pt(42);
      .pl(20);
      .pr(20);
      .pb(42);
      display:flex;
      align-items: center;
  }
  .teachWin .content .aliBox{
      display:flex;
      align-items: center;
      justify-content: space-between;
  }
  .teachWin .content .teachImg{
      .width(500);
      height:auto;
      .min-height(926);
      display:flex;
      overflow: hidden;
  }
  .teachWin .content .teachImg p{
      width:100%;
      height:100%;
      flex-shrink:0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  .teachWin .content .teachImg p i{
      .font-size(36);
      color:#fff;
      font-weight: bold;
      margin-top:10px
  }
  .teachWin .content .teachImg img{
      .width(499);
  }
  .teachWin .content .teachBtn{
      .width(100);
      height:auto;
      max-width:100px;
  }
  #resurrection {
    .content {
      overflow: visible;
      .mt(90);
      .pt(200);
    }
    .alertBox {
      width:6rem;
      height:4rem;
      background:url('../assets/image/pages/resurrection/startAlertBg.png') no-repeat center center;
      background-size: 100% auto;
      position:absolute;
      .top(-10);
    }
  }
</style>
