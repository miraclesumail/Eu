<template>
  <div>
    <transition name="bounce">
      <div class="firstSave">
        <img class="ImgPic" src="../assets/image/pages/home/firstSave-b.png"/>
        <img @click="selectCloseFn" class="closeFirst" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>
        <div class="content" >
          <p>
            <span class="title"><b v-text="this.$store.state.firstDeposit.depositA.name"></b></span>
            <span class="text">最低存款<i v-text="this.$store.state.firstDeposit.depositA.minTopUpAmount"></i>元</span>
            <span class="text">最高赠送<i v-text="this.$store.state.firstDeposit.depositA.maxRewardInSingleTopUp"></i>元</span>
            <span><img @click="depisitDetail('A')" src="../assets/image/pages/home/detail.png"/></span>
          </p>
          <p>
            <span class="title"><b v-text="this.$store.state.firstDeposit.depositB.name"></b></span>
            <span class="text">最低存款<i v-text="this.$store.state.firstDeposit.depositB.minTopUpAmount"></i>元</span>
            <span class="text">最高赠送<i v-text="this.$store.state.firstDeposit.depositB.maxRewardInSingleTopUp"></i>元</span>
            <span><img @click="depisitDetail('B')" src="../assets/image/pages/home/detail.png"/></span>
          </p>
        </div>
        <p class="btnBar">
          <img @click="getFirstDeposit('A')" src="../assets/image/pages/home/firstBtn.png"/>
          <img @click="getFirstDeposit('B')" src="../assets/image/pages/home/firstBtn.png"/>
        </p>
        <p class="tip">
                    <span>限时优惠时间：2018/ 08/ 20 （周一）中午 12:00 ~ 2018/ 08/ 25 （周六）中午 12:00
                    </span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name:"renrenIn",
    data(){
      return {
        depositA:{},
        depositB:{}
      }
    },
    mounted() {
      let data = {}
      data.isShow = true;
        all.tool.send('getRewardList').then(result=>{
          result.data.map(item => {


            // if(item.code === 'firstdepositA'){
            //     data.depositA=item.param.rewardParam[0].value[0];
            //     data.depositA.code=item.code;
            //     data.depositA.largeSned=item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock;
            //     data.depositA.name=item.name;
            // }
            // if (item.code === 'firstdepositB') {
            //     data.depositB = item.param.rewardParam[0].value[0];
            //     data.depositB.code = item.code;
            //     data.depositB.name = item.name;
            // }
            // 电子首存活动
            if(item.code === 'eBETslot'){
              // A电子
              data.depositA=item.param.rewardParam[0].value[0];
              data.depositA.code=item.code;
              data.depositA.largeSned=item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock;
              data.depositA.name=item.name;
            }
            if (item.code === 'eBETlive') {
              // B真人
              data.depositB = item.param.rewardParam[0].value[0];
              data.depositB.code = item.code;
              data.depositB.name = item.name;
            }

          });
          this.depositA=data.depositA
          this.depositB=data.depositB
          all.store.commit('isFirstSaveShow', data);

        }).catch(err => {
            console.log(err,9999)
          all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }])

        });
    },
    methods:{
      defaultCloseFn(){
        this.$router.go(-1);
      },
      closeFn() {
        this.$emit('closeCallBackFn');
      },
      selectCloseFn() {
        this.defaultCloseFn();
      },

      depisitDetail(type){
        let str=""
        if(type==='A'){
          all.tool.clickCount({page:'首存A',btn:'优惠详情'});
          str=`<ul class="dielog_bon" style='text-align: left;font-size: 12px'>
          <li>1. 此优惠仅限在（存款成功）后，（尚未投注]）前，申请才为有效。</li>
          <li>2. 优惠名额： 限每日前100位会员申请 ； 每人/每日仅限一次。 </li>
          <li>3. 此优惠仅需完成（存款 + 优惠金额）的 ${this.depositA.spendingTimes} 倍流水方可提款。如：存款 ${this.depositA.minTopUpAmount}元，领取优惠 ${this.depositA.spendingTimes}元，需完成（${this.depositA.minTopUpAmount} +${this.depositA.maxRewardInSingleTopUp}）* ${this.depositA.spendingTimes} = ${(this.depositA.minTopUpAmount+this.depositA.maxRewardInSingleTopUp)*this.depositA.spendingTimes} 流水才可提款。</li>
          <li>4. 领取优惠后需在（${this.depositA.name}）达到指定流水才可提款。</li>
          <li>5. 严禁在本网站进行对投，系统检测后将自动禁用会员账号。</li>
          </ul>`
        }else{
          all.tool.clickCount({page:'首存B',btn:'优惠详情'});
          str=`<ul class="dielog_bon" style='text-align: left;font-size: 12px'>
          <li>1. 此优惠仅限在（存款成功）后，（尚未投注]）前，申请才为有效。</li>
          <li>2. 优惠名额： 限每日前100位会员申请 ； 每人/每日仅限一次。   </li>
          <li>3. 此优惠仅需完成（存款 + 优惠金额）的 ${this.depositB.spendingTimes} 倍流水方可提款。如：存款 ${this.depositB.minTopUpAmount}，领取优惠 ${this.depositB.spendingTimes}元，需完成（${this.depositB.minTopUpAmount} +${this.depositB.maxRewardInSingleTopUp}）* ${this.depositB.spendingTimes} = ${(this.depositB.minTopUpAmount+this.depositB.maxRewardInSingleTopUp)*this.depositB.spendingTimes} 流水才可提款。</li>
          <li>4. 领取优惠后需在（${this.depositB.name}）达到指定流水才可提款。</li>
          <li>5. 严禁在本网站进行对投，系统检测后将自动禁用会员账号。</li>
          </ul>`
        }
        all.alert.confirm(str, [{name: '确定'}]);
      },
      closeFirst(){
        all.tool.isFirstSaveShow('close');
        all.tool.setStore('once',false);
      },
      getFirstDeposit(code){
        if (!this.$store.state.isLogin) {
          this.closeFirst();
          all.alert.confirm('是否为真钱会员', [{name: '是，去登陆', callback: () => {
              this.$router.push('/login');
            }}, {name: '否，去注册', callback: () => {
              this.$router.push('/register');
            }}]);
          return;
        }
        let self=this;
        if(code==='A')all.tool.clickCount({page:'首页',btn:'优惠易博电子'});
        if(code==='B')all.tool.clickCount({page:'首页',btn:'优惠易博真人'});
        let type=code==='A'?all.store.state.firstDeposit.depositA.code:all.store.state.firstDeposit.depositB.code;
        all.tool.send('applyRewardEvent',{code:type,data:{topUpRecordId:all.store.state.firstDeposit.recordsId}}).then(result=>{console.log(result);
          all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:()=>{
              self.goToGame(11);
            }}])
        }).catch(err=>{
          if(err.status===423){
            let messageTip=err.errorMessage;
            if(err.errorMessage==='无法找到此存款记录，详情请联系客服')messageTip='需有最新一笔存款才可申请，请马上存款即可领取！';
            if(err.errorMessage==='您需要有新存款（100）元才能领取此优惠，千万别错过了！')messageTip='需有新存款（100）元起，才能申请此优惠，请马上存款即可领取！';
            if(err.errorMessage==='该充值记录已被使用')messageTip='需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';
            all.tool.TipWinShow(messageTip,[{name:'取消'},{name:'去充值',callback:()=>{all.store.commit('isFirstSaveShow',{isShow:false,isShowIcon:true});all.router.push({name:'deposit',params:{code:type,promoSend:true}})}}])
          }else {
            all.tool.TipWinShow(err.errorMessage,[{name:'确定'}])
          }
        });
      },


    },
    computed: {
      news () {
        return this.$store.state.news;
      },
      defaultProShow(){
        return all.tool.getStore('registerPromo');
      },
      firstPromoShow(){
        return all.tool.getStore('once');
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) "../assets/css/variable";

  .firstSave{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background:rgba(0,0,0,0.8);
    z-index: 100;
    display:flex;
    align-items: flex-start;
    justify-content: center;
    .pb(200);
    overflow-y: scroll;
  }
  .firstSave .ImgPic{
    .width(750);
    height:auto;
    .mt(100)
  }
  .firstSave .content{
    position:absolute;
    width:100%;
    .top(590);
    left:0;
    .font-size(28);
    display:flex;
    justify-content: center;
    .height(200)
  }
  .firstSave .content p{
    .width(280);
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    .line-height(40);
  }
  .firstSave .content .tip{
    color:yellow;
  }
  .firstSave .content p span{
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .firstSave .content p span img{
    .width(40);
    height:auto
  }
  .firstSave .content p b{
    color:#0e8ec2;
    .font-size(32);
    margin:0 2%;
    .line-height(50);
  }
  .firstSave .content p i{
    color:#feef04;
    font-weight:bold;
  }
  .firstSave .closeFirst{
    position:absolute;
    left:80%;
    top:8%;
    .width(50);
    height:auto;
  }
  .firstSave .btnBar{
    position:absolute;
    left:0;
    .top(785);
    width:100%;
    height:fit-content;
  }
  @keyframes marquee {
    0%{
      transform: translateX(100%);
    }
    100%{
      transform: translateX(-140%);
    }
  }
  .firstSave .tip{
    position:absolute;
    color:yellow;
    .font-size(24);
    .top(870);
    left:50%;
    transform: translateX(-50%);
    width: 100%;

    &>span{
      display: block;
      white-space:nowrap;
      animation:marquee 23s infinite linear;

      &:hover{
        animation-play-state: paused;
      }
    }
  }
  .firstSave .btnBar img{
    .width(160);
    height:auto;
    .ml(48);
    .mr(48)
  }
</style>
