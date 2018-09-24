<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div class="promobag">
    <PageTop
      :title="PageTopTitle"
      :useDefaultCloseFn="false"
      @closeCallBackFn="callBack"
    />
    <div class="main">
        <img class="bgImg" src="../assets/image/pages/promobag/bagBg1.jpg"/>
        <div class="itemBtnBox">
            <span class="dropdown" @click="showType"><b>全部</b><img src="../assets/image/pages/promobag/dropdown.png"/><span v-if="typeIndex"><i @click="chooseTypeVal" value="0" v-if="typeNum!==0">全部</i><i @click="chooseTypeVal" value="1" v-if="typeNum!==1">免费</i><i @click="chooseTypeVal" value="2" v-if="typeNum!==2">存送</i><i @click="chooseTypeVal" value="3" v-if="typeNum!==3">返利</i></span></span>
            <span @click="useOrnoOrex" class="itembtn active" value="0">可享用</span>
            <span @click="useOrnoOrex" class="itembtn" value="1">已享用</span>
            <span @click="useOrnoOrex" class="itembtn" value="2">已过期</span>
            <img @click="detailsWin" class="detailBtn" src="../assets/image/pages/promobag/detail.png"/>
        </div>
        <div class="itemBox" v-touch:left="nextPromo" v-touch:right="prevPromo">
            <img class="itemBg" src="../assets/image/pages/promobag/itemBg.jpg"/>
            <img @click="prevPromo" class="prevPromo" src="../assets/image/pages/promobag/prevPromo.png"/>
            <img @click="nextPromo" class="nextPromo" src="../assets/image/pages/promobag/nextPromo.png"/>
            <img class="leftOver" v-if="false" src="../assets/image/pages/promobag/leftOver.png"/>
            <img class="rightOver" v-if="false" src="../assets/image/pages/promobag/rightOver.png"/>
            <ul class="itembar">
                <li v-for="item in promoList[typeNum][type]">
                    <p class="title">红包代码</p>
                    <p class="code"><i v-text="String(item.bonusCode).slice(0,1)"></i><i v-text="String(item.bonusCode).slice(1,2)"></i><i v-text="String(item.bonusCode).slice(2,3)"></i><i v-text="String(item.bonusCode).slice(3,4)"></i></p>
                    <p class="amount" v-text="item.title"></p>
                    <p class="limitDate" v-if="false"><span v-text="type===0?time(item):type===1?'已享用':'已过期'">剩下三天</span></p>
                    <p class="getit" v-if="type===0"><img @click="getPrize(item.bonusCode)" src="../assets/image/pages/promobag/getitBtn.png"/></p>
                    <img class="bg" :src="itemImg[item.title.slice(item.title.length-1,item.title.length)==='%'?1:item.condition==='无'?2:0]"/>
                </li>
                <li v-if="ishasData && this.promoList[this.typeNum][this.type].length===0">暂无数据</li>
            </ul>
        </div>
        <div class="info">
            <img src="../assets/image/pages/promobag/itemInfo.png"/>
            <div class="content" v-if="ishasData && this.promoList[this.typeNum][this.type].length>0">
                <p><span><b v-text="promoList[typeNum][type][itemIndex].sendType"></b><i v-text="promoList[typeNum][type][itemIndex].bonusLimit !== undefined?promoList[typeNum][type][itemIndex].bonusLimit+'元':promoList[typeNum][type][itemIndex].title">8888元</i></span><span><b>指定游戏：</b><i v-text="promoList[typeNum][type][itemIndex].groupName?promoList[typeNum][type][itemIndex].groupName:'所有游戏'">所有游戏</i></span></p>
                <p><span><b>提款流水：</b><i v-text="promoList[typeNum][type][itemIndex].validBet+(promoList[typeNum][type][itemIndex].sendType==='最高赠送：'?'倍':'流水')"></i></span><span><b>有效日期：</b><i v-text="changeTime(promoList[typeNum][type][itemIndex].expireTime)">2017-10-13 24:59</i></span></p>
                <p><span><b>领取条件：</b><i v-html="promoList[typeNum][type][itemIndex].condition"></i></span><span><b v-show="promoList[typeNum][type][itemIndex].tag">敬请留意：</b><i v-text="promoList[typeNum][type][itemIndex].tag">更多福袋敬请关注</i></span></p>
            </div>
            <p class="content" v-if="ishasData && this.promoList[this.typeNum][this.type].length===0">暂无数据</p>
        </div>
    </div>
  </div>
</template>

<script>
  import PageTop from '@/components/PageTop';
  import {routerGuard} from '@/assets/js/config/config';
  export default {
      data() {
        return {
            PageTopTitle:'红包代码',
            flag: false,
            expiredListall:[],
            expiredListtype1:[],
            expiredListtype2:[],
            expiredListtype3:[],
            noUseListall:[],
            noUseListtype1:[],
            noUseListtype2:[],
            noUseListtype3:[],
            usedListall:[],
            usedListtype1:[],
            usedListtype2:[],
            usedListtype3:[],
            promoList:[[],[],[],[]],
            typeIndex:false,
            typeNum:0,
            type:0,
            ishasData:false,
            itemIndex:0,
            itemImg:[
              require("../assets/image/pages/promobag/promoCodeBg.png"),
              require("../assets/image/pages/promobag/promoCodeBg1.png"),
              require("../assets/image/pages/promobag/promoCodeBg2.png"),
            ]
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
        detailsWin(){
          all.tool.TipWinShow(null,{type:'promobagTip'},'详情条款');
          all.tool.clickCount({page:'红包代码',btn:'详情条款'})
        },
        getDate(){
           this.expiredListtype1=[];
           this.expiredListtype2=[];
           this.expiredListtype3=[];
           this.noUseListtype1=[];
           this.noUseListtype2=[];
           this.noUseListtype3=[];
           this.usedListtype1=[];
           this.usedListtype2=[];
           this.usedListtype3=[];
          this.promoList[1]=[[],[],[]];
          this.promoList[2]=[[],[],[]];
          this.promoList[3]=[[],[],[]];
          this.ishasData=false;
          all.tool.send('getPromoCode',{playerId:all.tool.getStore('playerID')}).then(result=>{
            this.noUseListall=result.data.noUseList;
            this.promoList[0][0]=this.noUseListall;
            this.ishasData=true;
            result.data.noUseList.map(item=>{
              if(item.title.slice(item.title.length-1,item.title.length)==='%'){item.sendType='最高赠送：';this.noUseListtype1.push(item)}
              this.promoList[3][0]=this.noUseListtype1;
              if(item.condition==='无'){item.sendType='免费赠送：';this.noUseListtype2.push(item)}
              this.promoList[1][0]=this.noUseListtype2;
              if(item.title.slice(item.title.length-1,item.title.length)!=='%' && item.condition!=='无'){
                item.sendType='赠送金额：';
                this.noUseListtype3.push(item);
                this.promoList[2][0]=this.noUseListtype3;
              }
            });
            this.usedListall=result.data.usedList;
            this.promoList[0][1]=this.usedListall;
            result.data.usedList.map(item=>{
              if(item.title.slice(item.title.length-1,item.title.length)==='%'){item.sendType='最高赠送：';this.usedListtype1.push(item)}
              this.promoList[3][1]=this.usedListtype1;
              if(item.condition==='无'){item.sendType='免费赠送：';this.usedListtype2.push(item)}
              this.promoList[1][1]=this.usedListtype2;
              if(item.title.slice(item.title.length-1,item.title.length)!=='%' && item.condition!=='无'){
                item.sendType='赠送金额：';
                this.usedListtype3.push(item);
                this.promoList[2][1]=this.usedListtype3;
              }
            });
            this.expiredListall=result.data.expiredList;
            this.promoList[0][2]=this.expiredListall;
            result.data.expiredList.map(item=>{
              if(item.title.slice(item.title.length-1,item.title.length)==='%'){item.sendType='最高赠送：';this.expiredListtype1.push(item)}
              this.promoList[3][2]=this.expiredListtype1;
              if(item.condition==='无'){item.sendType='免费赠送：';this.expiredListtype2.push(item)}
              this.promoList[1][2]=this.expiredListtype2;
              if(item.title.slice(item.title.length-1,item.title.length)!=='%' && item.condition!=='无'){
                item.sendType='赠送金额：';
                this.expiredListtype3.push(item);
                this.promoList[2][2]=this.expiredListtype3;
              }
            });console.log(this.promoList);
            all.$('.itembar li:first-child').animate({marginLeft:'0'},300);
            this.itemIndex=0;
          }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
        },
        changeTime(time){
          return all.tool.formatTime(time)
        },
        getPrize(code){
          all.tool.send('applyPromoCode',{promoCode:code}).then(result=>all.tool.TipWinShow('领取成功',[{name:'确定',callback:()=>this.getDate()}])).catch(err=>{
              all.tool.TipWinShow(err.errorMessage,[{name:'取消'},{name:'去存款',callback:()=>{
                all.router.push({name:'deposit',params:{code:code}})
              }}])
          });
        },
        time(item){
          if(item.title.slice(item.title.length-1,item.title.length)==='%'){
            return '返利';
          }else if(item.condition==='无'){
            return '免费';
          }else {
            return '存送';
          }
        },
        prevPromo(){
          if(this.itemIndex>0){
            this.itemIndex--;
            all.$('.itembar li:first-child').animate({marginLeft:'-'+(this.itemIndex*50)+'%'},300);
          }
        },
        nextPromo(){
          if(this.itemIndex<this.promoList[this.typeNum][this.type].length-1){
            this.itemIndex++;
            all.$('.itembar li:first-child').animate({marginLeft:'-'+(this.itemIndex*50)+'%'},300);
          }
        },
        showType(){
          this.typeIndex=!this.typeIndex
        },
        chooseTypeVal(e){
          if(all.$(e.target).text()==='全部')all.tool.clickCount({page:'红包代码',btn:'全部'});
          if(all.$(e.target).text()==='免费')all.tool.clickCount({page:'红包代码',btn:'免费'});
          if(all.$(e.target).text()==='存送')all.tool.clickCount({page:'红包代码',btn:'存送'});
          if(all.$(e.target).text()==='返利')all.tool.clickCount({page:'红包代码',btn:'返利'});
          all.$('.dropdown b').text(all.$(e.target).text());
          this.typeNum=Number(all.$(e.target).attr('value'));
          all.$('.itembar li:first-child').animate({marginLeft:'0'},300);
          this.itemIndex=0;
        },
        useOrnoOrex(e){
          if(all.$(e.target).index()===1)all.tool.clickCount({page:'红包代码',btn:'可享用'});
          if(all.$(e.target).index()===2)all.tool.clickCount({page:'红包代码',btn:'已享用'});
          if(all.$(e.target).index()===3)all.tool.clickCount({page:'红包代码',btn:'已过期'});
          all.$('.itembtn').removeClass('active');
          all.$(e.target).addClass('active');
          this.type=Number(all.$(e.target).attr('value'));
          all.$('.itembar li:first-child').animate({marginLeft:'0'},300);
          this.itemIndex=0;
        }
      },
      beforeRouteEnter (to, from, next) {
        next( vm => {
          if (!vm.$store.state.isLogin) {
              routerGuard.map(item => {
              if (from.path === item.path) {
                vm.flag = true;
              }
                });
          }
        })
      },
      mounted(){
        this.getDate()
      }
  }
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .promobag{
    height:100%;
  }
    .main{
        height:92.503748%;
        overflow-y: scroll;
        position:relative;
    }
    .bgImg{
        width:100%;
        height:auto
    }
    .itemBtnBox{
        .height(66);
        border:2px solid #c28e2f;
        border-left:none;
        border-right:none;
        background:#67121a;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
 .itemBtnBox .detailBtn{
     .width(50);
     height:auto;
     position:absolute;
     right:2%;
     .mt(2);
     z-index:10;
 }
 .itemBtnBox .dropdown{
     display:flex;
     .width(188);
     .height(92);
     position:relative;
     z-index: 100;
 }
 .itemBtnBox .dropdown img{
     width:100%;
     height:auto;
 }
 .itemBtnBox .dropdown span{
     position:absolute;
     .width(155);
     .line-height(90);
     background:#040303;
     color:#f6c254;
     .font-size(30);
     font-weight:bold;
     top:100%;
     left:0;
     display:flex;
     flex-direction: column;
 }
 .itemBtnBox .dropdown b{
     position:absolute;
     display:flex;
     justify-content: center;
     align-items: center;
     .pr(20);
     width:100%;
     .font-size(32);
     color:#67121a;
     font-weight:bold;
     height:100%;
 }
 .itemBtnBox .itembtn{
     display:inline-flex;
     .font-size(30);
     color:#be535d;
     font-weight:bold;
     .width(175);
     .height(100);
     align-items: center;
     justify-content: center;
 }
 .itemBtnBox .itembtn.active{
     background:url("../assets/image/pages/promobag/itemBtn.png") no-repeat center center;
     background-size:100% 100%;
     color:#f6c254;
     position:relative;
     z-index:10;
 }
 .itemBox{
     position:relative;
 }
 .itemBox .itemBg{
      width:100%;
      height:auto;
 }
 .itemBox .prevPromo{
     .width(61);
     height:auto;
     position:absolute;
     top:50%;
     .translateY(-50%);
     .left(20);
     z-index: 100;
 }
 .itemBox .nextPromo{
     .width(61);
     height:auto;
     position:absolute;
     top:50%;
     .translateY(-50%);
     .right(20);
     z-index: 100;
 }
  .itembar{
      position:absolute;
      width:100%;
      overflow:hidden;
      height:100%;
      top:0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
 .itembar li{
     position:relative;
     margin:0 2.666667%;
     width:44.666667%;
     min-width:44.666667%;
     transform:translateX(61%);
 }
 .itembar li:first-child{
     margin-left:0
 }
 .itembar li .title{
     position:absolute;
     .font-size(24);
     .line-height(50);
     color:#0b1d2b;
     width:100%;
     text-align:center;
     top:0;
     font-weight:bold;
     margin:0
 }
 .itembar li .code{
     position:absolute;
     width:100%;
     .top(50);
     .font-size(48)
 }
 .itembar li .code i{
     display:inline-flex;
     justify-content: center;
     align-items: center;
     .width(52);
     .height(72);
     .ml(2);
     .mr(2);
     background:url("../assets/image/pages/promobag/codeBg.png") no-repeat;
     background-size:100% 100%
 }
 .itembar li .amount{
     position:absolute;
     width:100%;
     top:58%;
     .font-size(64);
     font-weight:bold;
 }
 .itembar li .limitDate{
     position:absolute;
     width:100%;
     .height(50);
     .font-size(24);
     font-weight:bold;
     .line-height(50);
     top:68%;
     display:flex;
     justify-content: center;
 }
 .itembar li .limitDate span{
     display:flex;
     width:38.208955%;
     .height(50);
     background:#8a0619;
     color:#f6c254;
     border:2px solid #f6c254;
     justify-content: center;
 }
 .itembar li .getit{
     position:absolute;
     width:100%;
     top:81%
 }
 .itembar li .getit img{
     width:64.788732%;
     height:auto
 }
  .itembar img.bg{
      width:100%;
      height:auto
  }
    .leftOver{
        position:absolute;
        top:0;
        .width(160);
        height:100%;
        z-index: 50;
        left:0
    }
    .rightOver{
        position:absolute;
        top:0;
        .width(160);
        height:100%;
        z-index: 50;
        right:0
    }
    .info{
        position:relative;
        .mt(-35);
    }
    .info .content{
        position:absolute;
        width:100%;
        .font-size(24);
        color:#0b1d2b;
        .line-height(42);
        top:0;
        height:100%;
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top:5%;
    }
 .info .content p{
     width:100%;
     display:flex;
     justify-content: space-between;
     padding:0 4%
 }
 .info .content p span{
     flex:1;
     text-align: left;
     display:inline-flex;
     justify-content: space-between;
     font-weight:bold;
     padding-left:2%;
 }
 .info .content p span i{
    flex:1;
     font-weight:normal;
 }
    .info img{
        width:98.666667%;
        height:auto
    }
    .detail{
        width:90.666667%;
        height:auto;
        margin:65px 0 0
    }
    .title{
        .font-size(24);
        font-weight:bold;
        color:#f39700;
        text-align: left;
        .line-height(48);
        .mt(40)
    }
    .text{
        .font-size(24);
        text-align: left;
        .line-height(48)
    }
    .introDetail{
        padding:0 2.666667%;
        .mb(65)
    }
    .typeintro{
        width:100%;
        height:auto;
        .mt(20)
    }
</style>
