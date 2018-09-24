<template>
  <div class="tree">
    <PageTop
      :title="PageTopTitle"
    />
    <div class="main">
        <img class="bgPic" src="../assets/image/pages/tree/Bg.png"/>
        <p class="time" v-text="startTime+'至'+endTime"></p>
        <img v-show="index" class="treePic" :src="img[0]"/>
        <img v-if="!index" class="treePic" :src="img[1]"/>
        <img v-if="canGet" @click="getIt" class="btn" src="../assets/image/pages/tree/btn.png"/>
        <img v-if="!canGet" @click="getIt" class="btn" src="../assets/image/pages/tree/btnB.png"/>
        <p class="line"><span><b :style="{width:num/all*100+'%'}"></b><i v-text="num+'/'+all"></i></span></p>
        <div class="text">
            <p class="title">活动说明</p>
            <p class="content">1.活动期间，单日在（任意）游戏厅，累积 <span v-text="all"></span>有效投注额即可参与。</p>
            <p class="content">2.单日有效投注额累计时间：每日<span>凌晨 00:00:00 - 晚间 23:59:59</span>。</p>
            <p class="content">3.每人/每日在达到优惠条件后即可（摇一次）。</p>
            <p class="content">4.本优惠需要会员自行在（当日）完成（摇一摇）摇奖动作，并且该优惠（无法）累计至次日。</p>
            <p class="content">5.摇钱树将随机赠送高达<span>8888元</span>优惠金额。</p>
            <p class="content">6.领取优惠后，可在（任意厅）达到优惠金额 <span v-text="'（'+X+'倍）'"></span>流水即可提款。</p>
        </div>
    </div>
      <transition name="bounce">
          <div class="firstRegister" v-if="getAmount">
              <div class="sendAmountWin">
                  <img class="prizeGot" src="../assets/image/pages/tree/getAmount.png" height="auto" width="100%"/>
                  <img class="bgAnima" src="../assets/image/pages/home/sendAnima.png" height="auto" width="100%"/>
                  <p class="textT"><span v-text="registerAmount+'元彩金！'"></span></p>
                  <span class="closeBtn" @click="closeSure"></span>
              </div>
          </div>
      </transition>
  </div>
</template>

<script>
  import PageTop from '@/components/PageTop';
  import {routerGuard} from '@/assets/js/config/config';
  export default {
      data() {
        return {
          PageTopTitle:'摇钱树',
          num:0,
          all:3000,
          canGet:false,
          start:true,
          getAmount:false,
          registerAmount:0,
          img:[
            require('../assets/image/pages/tree/tree1.png'),
            require('../assets/image/pages/tree/tree.gif'),
          ],
          index:true,
          startTime:'7月2日0点',
          endTime:'7月2日0点',
          X:null
        }
      },
      components: {
        PageTop
      },
      methods: {
        callBack(){
          if (this.flag) {
              this.$router.go(-2);
            } else {
              this.$router.go(-1);
            }
        },
        getIt(){
          if(!this.start)return;
          this.start=false;
          let self=this;
//          this.index=false;
          all.$('.treePic').addClass('treeRock');
          setTimeout(()=>{
            all.tool.send('applyRewardEvent',{code:'fcs'}).then(result=>{console.log(result);
              this.registerAmount=result.data.amount;
              self.start=true;
//              self.index=true;
              all.$('.treePic').removeClass('treeRock');
              self.getAmount=true;
              all.tool.setBalance()
              }).catch(err=>{
                this.start=true;
              if(err.errorMessage==='玩家没有足够的投注额'){
                this.cannot();
              }else {
                all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);
              }
//                this.index=true;
              all.$('.treePic').removeClass('treeRock');
              })
          },1500)
        },
        cannot(){
          all.tool.TipWinShow('您本日的投注额不足！',[{name:'前往游戏',callback:()=>{
            this.$router.push({path:'/game', query: {page:11}})
          }}])
        },
        closeSure(){
          this.getAmount=false;
          this.$router.push('/')
        }
      },
    mounted(){
          all.tool.send('getRewardList').then(result=>{
            result.data.map(item=>{
              if(item.code==='fcs'){
                this.startTime=all.tool.formatTime(item.validStartTime);
                this.endTime=all.tool.formatTime(item.validEndTime);
                this.all=item.param.rewardParam[0].value[0].requiredConsumptionAmount;
                this.X=item.param.rewardParam[0].value[0].spendingTimesOnReward;
              }
            });
            all.tool.send('getPlayerDayStatus',{ playerId: all.tool.getStore('playerId')}).then(result=>{
              this.num=result.data.consumptionAmount.toFixed(0);
              if((result.data.consumptionAmount/this.all)<1){
                this.canGet=false;
              }else {
                this.canGet=true
              }
            }).catch(error=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]))
          }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));

    }
  };
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .tree{
    height:100%;
  }
 .main {
   height:92.503748%;
   overflow-y:scroll;
   background:#0c2b42;
   position:relative;display:flex;
 }
.bgPic{
    width:100%;
    height:auto;
    position:absolute;
    top:0;
    left:0
}
 .time{
     color:#b0271a;
     .font-size(16);
     font-weight:800;
     position:absolute;
     .top(230);
     .left(300)
 }
    .treePic{
        .width(620);
        height:auto;
        position:absolute;
        left:9.5%;
        .top(294);
    }
    .btn{
        .width(269);
        height:auto;
        position:absolute;
        .top(776);
        left:50%;
        transform:translateX(-50%);
    }
    .text{
        position:absolute;
        text-align:left;
        .font-size(26);
        color:#f39700;
        .top(1043);
        .pl(20);
        .pr(20);
        .line-height(42);
        background:#ab2216
    }
    .title{
        .font-size(30);
        font-weight: bold;
        color:#fff100;
    }
    .text span{
        font-weight: bold;
        color:#fff100;
    }
    .line{
        .width(560);
        .height(30);
        .border-radius(15);
        background:#bb9369;
        position:absolute;
        .top(938);
        .left(152);
        overflow: hidden;
    }
    .line span{
        display:block;
        height:100%;
        width:100%;
        position:relative;
        text-align: center;
    }
 .line span i{
     .font-size(24);
     color:#ab2216;
     font-weight: bold;
     position: absolute;
     display:inline-flex;
     align-items: center;
     height:100%;
     left:50%;
     transform:translateX(-50%);
 }
 .line span b{
     position:absolute;
     background:#f39800;
     height:100%;
     left:0;
 }
 .treeRock{
     animation:roll 2s infinite ease-in-out;
 }
 .firstRegister{
     height:100%;
     position:absolute;
     top:0;
     left:0;
     width:100%;
     background:rgba(0,0,0,0.8);
     display:flex;
     align-items: center;
     justify-content: center;
     z-index: 100;
 }
 .sendAmountWin{
     position:relative;
 }
 .sendAmountWin .prizeGot{
     position:relative;
     z-index:1;
     .width(750);
     height:auto
 }
 .sendAmountWin .bgAnima{
     position:absolute;
     top:0;
     left:0;
     animation:rotate 5s infinite linear;
 }
 .sendAmountWin .textT{
     .pl(40);
     width:100%;
     .font-size(24);
     .line-height(40);
     position:absolute;
     bottom:30%;
     left:50%;
     transform: translateX(-50%);
     font-weight: bold;
     z-index:2;
 }
 .sendAmountWin .textT span{
     .font-size(40);
     color:#fff;
     text-shadow:2px 3px 2px rgba(172,7,57,0.5);
     margin:0 10px;
 }
 .sendAmountWin .closeBtn{
     position:absolute;
     .width(270);
     .height(80);
     top:76%;
     left:38.5%;
     .translateX(-50%);
     z-index: 5;
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
 @keyframes rotate{
     0%{transform:rotateZ(0)}
     100%{transform:rotateZ(180deg)}
 }
 @keyframes roll {
     from {transform: scale3d(1, 1, 1);}
     10%, 20% {transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -20deg);}
     30%, 50%, 70%, 90% {transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 20deg);}
     40%, 60%, 80% {transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -20deg);}
     to {transform: scale3d(1, 1, 1);}
 }
 @keyframes smallroll {
     from {transform: scale3d(1, 1, 1);}
     10%, 20% {transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -3deg);}
     30%, 50%, 70%, 90% {transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, 3deg);}
     40%, 60%, 80% {transform: scale3d(1, 1, 1) rotate3d(0, 0, 1, -3deg);}
     to {transform: scale3d(1, 1, 1);}
 }
 @keyframes draw{
     0%{opacity:0.5;transform:translate(0px,-50px)}
     30%{transform:rotate(12deg) translate(-30px,150px)}
     45%{opacity:1}
     60%{transform:rotate(-12deg) translate(30px,300px)}
     100%{opacity:0;transform:rotate(0deg) translate(0px,620px)}
 }
 @keyframes draw1{
     0%{opacity:0.5;transform:translate(0px,-50px)}
     30%{transform:rotate(-8deg) translate(20px,100px)}
     45%{opacity:1}
     60%{transform:rotate(8deg) translate(-20px,350px)}
     100%{opacity:0;transform:rotate(0deg) translate(0px,600px)}
 }
 @keyframes draw2{
     0%{opacity:0.3;transform:translate(0px,-50px)}
     30%{transform:rotate(4deg) translate(10px,180px)}
     45%{opacity:1}
     60%{transform:rotate(-4deg) translate(-10px,250px)}
     100%{opacity:0;transform:rotate(0deg) translate(0px,600px)}
 }
 @keyframes draw3{
     0%{opacity:0.7;transform:translate(0px,-50px)}
     30%{transform:rotate(-4deg) translate(40px,300px)}
     45%{opacity:1}
     60%{transform:rotate(4deg) translate(-40px,400px)}
     100%{opacity:0;transform:rotate(0deg) translate(0px,580px)}
 }
 @media screen and (orientation: landscape){
     .treePic{
         width:620px;
         .top(300)
     }
     .btn{
         width:269px;
         .top(1050)
     }
     .text{
         top:1043px;
         padding:0 20px
     }
     .line{
         .top(1305);
         left:145px;
         .width(760);
         height:30px;
         border-radius:15px;
     }
     .time{
         .font-size(32);
         .top(320);
         .left(430);
         font-weight:800
     }
 }
</style>
