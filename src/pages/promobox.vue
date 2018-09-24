<template>
  <div class="promobox">
    <PageTop
      :title="PageTopTitle"
      :useDefaultCloseFn="false"
      @closeCallBackFn="callBack"
    />
    <div class="main">
        <img class="bgImg" src="../assets/image/pages/promobox/promoboxBg.jpg"/>
       <div class="itembar1">
           <div class="item">
               <p class="title"><i v-text="this.$store.state.savesend38 && this.$store.state.savesend38[this.$store.state.level].value[0].rewardPercentage*100"></i>%</p>
               <p class="times">不限</p>
               <p class="prize"><i v-text="this.$store.state.savesend38 && this.$store.state.savesend38[this.$store.state.level].value[0].maxRewardInSingleTopUp"></i>元</p>
               <p class="lowsave"><i v-text="this.$store.state.savesend38 && this.$store.state.savesend38[this.$store.state.level].value[0].minTopUpAmount"></i>元</p>
               <p class="ls"><i v-text="this.$store.state.savesend38 && this.$store.state.savesend38[this.$store.state.level].value[0].spendingTimes"></i>倍</p>
               <p class="btn" @click="getIt(code38)">前往领取</p>
               <img src="../assets/image/pages/promobox/getpromoBg.png"/>
               <img @click="detailWin(true)" class="detailBtn" src="../assets/image/pages/promobag/detail.png"/>
           </div>
       </div>
       <div class="itembar2">
           <div class="item">
               <p class="title"><i v-text="this.$store.state.savesend20 && this.$store.state.savesend20[this.$store.state.level].value[0].rewardPercentage*100"></i>%</p>
               <p class="times">不限</p>
               <p class="prize"><i v-text="this.$store.state.savesend20 && this.$store.state.savesend20[this.$store.state.level].value[0].maxRewardInSingleTopUp"></i>元</p>
               <p class="lowsave"><i v-text="this.$store.state.savesend20 && this.$store.state.savesend20[this.$store.state.level].value[0].minTopUpAmount"></i>元</p>
               <p class="ls"><i v-text="this.$store.state.savesend20 && this.$store.state.savesend20[this.$store.state.level].value[0].spendingTimes"></i>倍</p>
               <p class="btn" @click="getIt(code20)">前往领取</p>
               <img src="../assets/image/pages/promobox/getpromoBg1.png"/>
               <img @click="detailWin" class="detailBtn" src="../assets/image/pages/promobag/detail.png"/>
           </div>
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
            PageTopTitle:'超值礼盒',
            flag: false,
            code20:'depositbonus20',
            code38:'depositbonus38',
          detail20:[[],[],[],[],[]],
          detail38:[[],[],[],[],[]]
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
        detailWin(type){
          let data=this.detail20;
          if(type===true)data=this.detail38;
          if(type===true){all.tool.clickCount({page:'超值礼盒',btn:'优惠详情38%'})}else {all.tool.clickCount({page:'超值礼盒',btn:'优惠详情20%'})}
          let Dom='<ul style="margin-top:10px;border:1px solid #20679f"><li style="background:#20679f;display:flex;justify-content:space-between"><span style="flex:1;text-align: center">会员等级</span><span style="flex:1;text-align: center">最低充值</span><span style="flex:1;text-align: center">优惠比率</span><span style="flex:1;text-align: center">最高赠送</span><span style="flex:1;text-align: center">提款要求</span></li><li style="background:#083457;display:flex;justify-content:space-between"><span style="flex:1;text-align:center;border:1px solid #12202f">LV.1小兵</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[0][1]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+(data[0][2]*100+'%')+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[0][0]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[0][3]+'</span></li><li style="background:#083457;display:flex;justify-content:space-between"><span style="flex:1;text-align:center;border:1px solid #12202f">LV.2张飞</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[1][1]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+(data[1][2]*100+'%')+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[1][0]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[1][3]+'</span></li><li style="background:#083457;display:flex;justify-content:space-between"><span style="flex:1;text-align:center;border:1px solid #12202f">LV.3关羽</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[2][1]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+(data[2][2]*100+'%')+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[2][0]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[2][3]+'</span></li><li style="background:#083457;display:flex;justify-content:space-between"><span style="flex:1;text-align:center;border:1px solid #12202f">LV.4孔明</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[3][1]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+(data[3][2]*100+'%')+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[3][0]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[3][3]+'</span></li><li style="background:#083457;display:flex;justify-content:space-between"><span style="flex:1;text-align:center;border:1px solid #12202f">LV.5刘备</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[4][1]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+(data[4][2]*100+'%')+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[4][0]+'</span><span style="flex:1;text-align:center;border:1px solid #12202f">'+data[4][3]+'</span></li></ul><p style="margin-top:5px;color:#f6ad35;text-align: left;font-size:10px;line-height:12px">注：<span style="color: red;">存送金仅限【老虎机游戏】参与</span>，需在存款成功后（投注前）申请有效，如存款后已经参与投注，需有（新一笔存款）才能申请！</p>';
          all.tool.TipWinShow(Dom,{type:'withCloseTip'},'优惠详情')
        },
          getIt(code){
            let self=this;
            let mount=0;
            if(code===this.code38){
              all.tool.clickCount({page:'超值礼盒',btn:'存送38%'});
              mount=this.$store.state.savesend38[this.$store.state.level].value[0].minTopUpAmount
            }
            if(code===this.code20){
              all.tool.clickCount({page:'超值礼盒',btn:'存送20%'});
              mount=this.$store.state.savesend20[this.$store.state.level].value[0].minTopUpAmount
            }
            all.tool.send('getValidTopUpReturnRecordList',{requestCount:100,sort:false,startIndex:0}).then(result=>{
                console.log(result);
                if(result.data.records.length===0){
                    all.tool.TipWinShow('需有最新一笔存款才可申请，请马上存款即可领取！',[{name:'取消'},{name:'去存款',callback:()=>{
                      all.router.push({name:'deposit',params:{code:code,promoSend:true}})
                    }}])
                }
                if(result.data.records.length>0){
                    all.tool.send('applyRewardEvent',{code:code,data:{topUpRecordId:result.data.records[0]._id}}).then(result=>{
                        all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:()=>{
                          self.$router.push({path:'/game', query: {
                            page: 11
                          }})
                        }}])
                    }).catch(err=>{
                      if(err.status===423){
                        let messageTip=err.errorMessage;
                        if(err.errorMessage==='无法找到此存款记录，详情请联系客服')messageTip='需有最新一笔存款才可申请，请马上存款即可领取！';
                        if(err.errorMessage==='您需要有新存款（100）元才能领取此优惠，千万别错过了！')messageTip='需有新存款（100）元起，才能申请此优惠，请马上存款即可领取！';
                        if(err.errorMessage==='该充值记录已被使用')messageTip='需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';
                        all.tool.TipWinShow(messageTip,[{name:'取消'},{name:'去存款',callback:()=>{
                          all.router.push({name:'deposit',params:{code:code,promoSend:true}})
                        }}])
                      }else{
                        all.tool.TipWinShow(err.errorMessage,[{name:'确定'}])
                      }
                    });
                }
            }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
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
      created(){
          all.tool.send('getRewardList').then(result=>{
              result.data.map(item=>{
                  if(item.code==='depositbonus38'){
                      all.tool.setSavesend38(item.param.rewardParam);
                      this.code38=item.code;
                    item.param.rewardParam.map((level,index)=>{
                      this.detail38[index].push(level.value[0].maxRewardInSingleTopUp);
                      this.detail38[index].push(level.value[0].minTopUpAmount);
                      this.detail38[index].push(level.value[0].rewardPercentage);
                      this.detail38[index].push(level.value[0].spendingTimes);
                    })
                  }
                  if(item.code==='depositbonus20'){
                      all.tool.setSavesend20(item.param.rewardParam);
                      this.code20=item.code;
                    item.param.rewardParam.map((level,index)=>{
                      this.detail20[index].push(level.value[0].maxRewardInSingleTopUp);
                      this.detail20[index].push(level.value[0].minTopUpAmount);
                      this.detail20[index].push(level.value[0].rewardPercentage);
                      this.detail20[index].push(level.value[0].spendingTimes);
                    })
                  }
              })
          }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      }
  };
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .promobox{
    height:100%;
  }
    .main{
        height:92.503748%;
        overflow-y: scroll;
        padding:0 2.666667%;
        position:relative;
    }
    .bgImg{
        position:absolute;
        left:0;
        top:0;
        width:100%;
        height:auto
    }
    .itembar1{
        display: flex;
        justify-content: flex-end;
        .mt(210)
    }
    .itembar2{
        display: flex;
        justify-content: flex-start;
        margin-top:-20px;
    }
    .item{
        .width(464);
        height:fit-content;
        position:relative;
        display:flex;
        justify-content: center;
    }
    .item img{
         .width(464);
         .height(468)
    }
 .item .detailBtn{
     position:absolute;
     .width(50);
     height:auto;
     bottom:10%;
     right:5%;
 }
    .item .title{
        position:absolute;
        left:40%;
        .font-size(48);
        .top(115);
        .line-height(48);
        .ml(65);
        font-weight:bold;
        font-style:italic;
    }
    .item .times{
        position:absolute;
        left:45%;
        .font-size(24);
        .bottom(231);
        .ml(40)
    }
 .item .prize{
     position:absolute;
     left:45%;
     .font-size(24);
     .bottom(186);
     .ml(40)
 }
 .item .lowsave{
     position:absolute;
     left:45%;
     .font-size(24);
     .bottom(140);
     .ml(40)
 }
 .item p{
     .line-height(28)
 }
 .item .ls{
     position:absolute;
     left:45%;
     .font-size(24);
     .bottom(94);
     .ml(40)
 }
 .item .btn{
     position:absolute;
     left:50%;
     transform:translateX(-50%);
     .font-size(24);
     .bottom(6);
     .width(200);
     .height(60);
     .line-height(60);
     .border-radius(30)
 }
 @media (orientation:landscape){
     .itembar1{
         .mt(550)
     }
 }
</style>
