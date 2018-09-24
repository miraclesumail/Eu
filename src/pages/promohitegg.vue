<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div class="promobag">
    <PageTop
      :title="PageTopTitle"
      :useDefaultCloseFn="false"
      @closeCallBackFn="callBack"
    />
    <div class="main">
        <img class="bgImg" src="../assets/image/pages/promohitegg/bg.jpg"/>
        <p v-show="!tipshow" class="prizeTime"><span>恭喜您获得<i v-text="prizeTime.length"></i>次砸蛋机会</span><span @click="detailsWin"><img
            src="../assets/image/pages/promohitegg/what.png" height="100%" width="100%"/></span></p>
        <img v-if="tipshow" class="tipshow"  src="../assets/image/pages/promohitegg/tip_.png"/>
        <div class="eggBox">
            <img v-if="!left" class="egg left" @click="hitegg(0,prizeTime.length>0?prizeTime[0].bonusCode:null)" src="../assets/image/pages/promohitegg/egg.png"/>
            <img v-if="left && !blackEggleft" class="hitegg left" src="../assets/image/pages/promohitegg/egg_anima_left.gif"/>
            <img v-if="!mid" class="egg" @click="hitegg(1,prizeTime.length>0?prizeTime[0].bonusCode:null)" src="../assets/image/pages/promohitegg/egg.png"/>
            <img v-if="mid && !blackEgg" class="hitegg" src="../assets/image/pages/promohitegg/egg_anima_mid.gif"/>
            <img v-if="!right" class="egg right" @click="hitegg(2,prizeTime.length>0?prizeTime[0].bonusCode:null)" src="../assets/image/pages/promohitegg/egg.png"/>
            <img v-if="right && !blackEggright" class="hitegg right" src="../assets/image/pages/promohitegg/egg_anima_right.gif"/>
            <img v-if="donehit" class="anima" src="../assets/image/pages/home/sendAnima.png"/>
            <img v-if="donehit" class="prize"  :src="prizeImg[prizeIndex]"/>
            <img v-if="!donehit && canhit" class="tool" src="../assets/image/pages/promohitegg/tool.png"/>
            <span v-if="donehit" class="prize_title" v-text="prizeTitle"></span>
        </div>
        <div class="eggBox">
            <img v-if="blackEggleft" class="egg_black left" src="../assets/image/pages/promohitegg/egg_black.png"/>
            <img v-if="blackEgg" class="egg_black" src="../assets/image/pages/promohitegg/egg_black.png"/>
            <img v-if="blackEggright" class="egg_black right" src="../assets/image/pages/promohitegg/egg_black.png"/>
            <span v-if="blackEggleft"  class="prize_title_no left" v-text="prizeImgNo[Indexleft].name"></span>
            <span v-if="blackEgg" class="prize_title_no" v-text="prizeImgNo[Indexmid].name"></span>
            <span v-if="blackEggright" class="prize_title_no right" v-text="prizeImgNo[Indexright].name"></span>
            <img v-if="blackEggleft" class="prize_no left"  :src="prizeImgNo[Indexleft].img"/>
            <img v-if="blackEgg" class="prize_no"  :src="prizeImgNo[Indexmid].img"/>
            <img v-if="blackEggright" class="prize_no right"  :src="prizeImgNo[Indexright].img"/>
        </div>

        <div class="itemBtnBox">
            <span @click="showType" class="itembtn active">
                <img src="../assets/image/pages/promohitegg/icon_a.png"/>
                <img class="choosed" src="../assets/image/pages/promohitegg/icon_a_a.png"/>
                免费彩金
            </span>
            <span @click="showType" class="itembtn">
                <img src="../assets/image/pages/promohitegg/icon_b.png"/>
                <img class="choosed" src="../assets/image/pages/promohitegg/icon_b_a.png"/>
                返利奖励
            </span>
            <span @click="showType" class="itembtn">
                <img src="../assets/image/pages/promohitegg/icon_c.png"/>
                <img class="choosed" src="../assets/image/pages/promohitegg/icon_c_a.png"/>
                存送礼劵
            </span>
            <span @click="showType" class="itembtn">
                <img src="../assets/image/pages/promohitegg/icon_d.png"/>
                <img class="choosed" src="../assets/image/pages/promohitegg/icon_d_a.png"/>
                实物精品
            </span>
        </div>
        <div class="itemContentBox">
            <div class="itembar" v-for="(itemBox,index) in promoType">
                <div class="item" v-for="(item,type) in itemBox">
                    <p class="item_title" @click="showDetail">
                        <img v-if="index===0" class="bg_title" src="../assets/image/pages/promohitegg/bg_item_title.png"/>
                        <img v-if="index!==0" class="bg_title" src="../assets/image/pages/promohitegg/bg_item_title_b.png"/>
                        <img v-if="promoType===promoType1 && index===0" class="icon" src="../assets/image/pages/promohitegg/bg_item_icon1.png"/>
                        <img v-if="promoType===promoType1 && index!==0" class="icon" src="../assets/image/pages/promohitegg/bg_item_icon1_b.png"/>
                        <img v-if="promoType===promoType2 && index===0" class="icon" src="../assets/image/pages/promohitegg/bg_item_icon2.png"/>
                        <img v-if="promoType===promoType2 && index!==0" class="icon" src="../assets/image/pages/promohitegg/bg_item_icon2_b.png"/>
                        <img v-if="promoType===promoType3 && index===0" class="icon" src="../assets/image/pages/promohitegg/bg_item_icon3.png"/>
                        <img v-if="promoType===promoType3 && index!==0" class="icon" src="../assets/image/pages/promohitegg/bg_item_icon3_b.png"/>
                        <img v-if="index===0" class="btn_item" @click="getPrize(item.bonusCode)" src="../assets/image/pages/promohitegg/btn_getnow.png"/>
                        <img v-if="index===1" class="btn_item" src="../assets/image/pages/promohitegg/btn_used.png"/>
                        <img v-if="index===2" class="btn_item" src="../assets/image/pages/promohitegg/btn_expired.png"/>
                        <span :class="{changeColor:index!==0}">
                            <b v-html="promoType===promoType1?item.title+'<em style=\'font-size:20px\'>(免费)</em>':promoType===promoType2?'<em style=\'font-size:20px\'>返利奖金</em>'+item.title:'<em style=\'font-size:20px\'>存送</em>'+item.title"></b>
                            <i v-text="'金蛋编号/'+item.bonusCode"></i>
                        </span>
                    </p>
                    <ul class="item_content" :class="{changeColor:index!==0}" v-show="index===0 && type===0">
                        <li><span><i v-text="promoType===promoType1?'免费赠送：':promoType===promoType2?'固定赠送：':'最高赠送：'"></i><b v-text="promoType===promoType1?item.title:promoType===promoType2?item.title:item.bonusLimit+'元'"></b></span><span><i>指定游戏：</i><b v-text="item.groupName?item.groupName:'全部游戏'"></b></span></li>
                        <li><span><i>提款流水：</i><b v-text="(promoType===promoType3?'（存款+优惠）':'')+item.validBet+(promoType===promoType3?'倍水':'')"></b></span><span><i>有效日期：</i><marquee behavior="scroll" direction="left" scrollamount="2" v-text="changeTime(item.expireTime,true)"></marquee></span></li>
                        <li><span :style="{width:item.tag?'55%':'100%'}"><i>领取条件：</i><b v-html="add(item.condition)"></b></span><span v-if="item.tag"><i>敬请留意：</i><b v-text="item.tag"></b></span></li>
                    </ul>
                </div>
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
            PageTopTitle:'砸金蛋',
            flag: false,
            prizeTime:[],
            promoType:[[],[],[]],
            promoType1:[[],[],[]],
            promoType2:[[],[],[]],
            promoType3:[[],[],[]],
            promoType4:[[],[],[]],
            left:false,
            mid:false,
            right:false,
            donehit:false,
            canhit:true,
            blackEggleft:false,
            blackEgg:false,
            blackEggright:false,
            prizeImg:[
              require("../assets/image/pages/promohitegg/prize_icon1.png"),
              require("../assets/image/pages/promohitegg/prize_icon2.png"),
              require("../assets/image/pages/promohitegg/prize_icon3.png"),
            ],
            prizeImgIndex:0,
            prizeImgNo:[
              {img:require("../assets/image/pages/promohitegg/prize1.png"),name:'代步机'},
              {img:require("../assets/image/pages/promohitegg/prize2.png"),name:'蓝牙音响'},
              {img:require("../assets/image/pages/promohitegg/prize3.png"),name:'平板电脑'},
              {img:require("../assets/image/pages/promohitegg/prize4.png"),name:'55寸电视机'},
              {img:require("../assets/image/pages/promohitegg/prize5.png"),name:'扫地机器人'},
              {img:require("../assets/image/pages/promohitegg/prize6.png"),name:'行车记录仪'},
              {img:require("../assets/image/pages/promohitegg/prize7.png"),name:'无线鼠标'},
              {img:require("../assets/image/pages/promohitegg/prize8.png"),name:'笔记本'},
              {img:require("../assets/image/pages/promohitegg/prize9.png"),name:'电动牙刷'},
              {img:require("../assets/image/pages/promohitegg/prize10.png"),name:'IphoneX'},
              {img:require("../assets/image/pages/promohitegg/prize11.png"),name:'Iwatch'},
              {img:require("../assets/image/pages/promohitegg/prize12.png"),name:'Apple TV'},
              {img:require("../assets/image/pages/promohitegg/prize13.png"),name:'PS4 PRO'},
              {img:require("../assets/image/pages/promohitegg/prize14.png"),name:'小米手表'},
              {img:require("../assets/image/pages/promohitegg/prize15.png"),name:'拍立得'},
              {img:require("../assets/image/pages/promohitegg/prize16.png"),name:'运动相机'},
              {img:require("../assets/image/pages/promohitegg/prize17.png"),name:'蓝牙耳机'},
            ],
          Indexleft:0,
          Indexmid:0,
          Indexright:0,
          prizeTitle:null,
          prizeIndex:0,
          tipshow:true
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
        add(string){
          if (string === "无") return "免费赠送";
          let amount = string && string.replace(/[^0-9]/ig, '');
          return '有新存款('+ amount +'元)或以上，且尚未投注前';

        //   if(string.slice(string.length-1,string.length)==="注")return string.replace("以上","元").replace("且","或以上，且").replace("注","注前才可领取");
        //   return string.replace("以上)","元)或以上即可")
        },
        detailsWin(){
          all.tool.clickCount({page:'砸金蛋',btn:'详情条款'});
          let Dom='<div class="scroll" style="height:160px;overflow-y:scroll;text-align:left;padding-right:15px;padding-top:10px"><p style="padding-left:1.5em;text-indent:-1.5em">1、持续在网站存款游戏，系统会随机赠送（砸金蛋）次数。</p><p style="padding-left:1.5em;text-indent:-1.5em">2、金蛋奖金/ 精品领取步骤不同，详情可如下：</p><p style="padding-left:3em;text-indent:-1.5em">A、免费彩金 = 无需存款，点击立即领取，奖金自动添加。</p><p style="padding-left:3em;text-indent:-1.5em">B、返利奖金 = 存款成功后，且在提款前，随时可领取指定赠送返利奖金。* 需留意指定最低存款。</p><p style="padding-left:3em;text-indent:-1.5em">C、存送礼卷 = 存款成功后，且未投注前，才可领取。* 优惠金额将根据赠送比率及存款金额而定。</p><p style="padding-left:3em;text-indent:-1.5em">D、实物精品 = 无需存款，直接赠送精品。幸运砸中3C精品，请在48小时内，主动联系客服登记（含会员账号、金蛋编号、收货地址等）</p><p style="padding-left:1.5em;text-indent:-1.5em">3、由于每个优惠金额赠送都会详细说明：需在（指定大厅）累积达到（指定）流水才可提款。</p><p style="padding-left:1.5em;text-indent:-1.5em">4、请在领取优惠前，详细查看条款，优惠添加后将无法取消。</p></div>';
          all.tool.TipWinShow(Dom,{type:'withCloseTip'},'活动规则');
        },
        refresh(index){
          if(this.prizeTime[0].typeIndex===0)all.$('.itembtn:first-child').addClass('active').siblings().removeClass('active');
          if(this.prizeTime[0].typeIndex===1)all.$('.itembtn:nth-child(2)').addClass('active').siblings().removeClass('active');
          if(this.prizeTime[0].typeIndex===2)all.$('.itembtn:nth-child(3)').addClass('active').siblings().removeClass('active');
          this.getDate();
          setTimeout(()=>{
            if(index===0)all.$('.anima,.prize_title,.prize,.prize_no').removeClass('left');
            if(index===2)all.$('.anima,.prize_title,.prize,.prize_no').removeClass('right');
            this.canhit=true;
            this.donehit=false;
            this.left=false;
            this.mid=false;
            this.right=false;
            this.blackEggleft=false;
            this.blackEgg=false;
            this.blackEggright=false;
          },10000);
        },
        hitegg(index,code){
          if(this.prizeTime.length===0)return;
          this.prizeIndex=this.prizeTime[0].typeIndex;
          this.prizeTitle=this.prizeTime[0].title;
          if(!this.canhit)return;
          this.canhit=false;
          all.tool.send('markPromoCodeAsViewed',{promoCode:code}).then(result=>{
            // this.Indexleft=Math.floor(Math.random()*17);
            // this.Indexmid=Math.floor(Math.random()*17);
            // while (this.Indexleft===this.Indexmid){console.log(this.Indexmid,this.Indexleft);
            //   this.Indexmid=Math.floor(Math.random()*17);
            // }
            // this.Indexright=Math.floor(Math.random()*17);
            // while (this.Indexright===this.Indexmid || this.Indexright===this.Indexleft){
            //   this.Indexmid=Math.floor(Math.random()*17);
            // }

            let arr=[];
            while(arr.length < 3) {
              let num = Math.floor(Math.random() * 17)
              if (!arr.includes(num)) {
                arr.push(num);
              }
            }
            this.Indexmid = arr[0]
            this.Indexright = arr[1]
            this.Indexleft = arr[2]
            // 修改死循环BUG


            if(index===0){
              this.left=true;
              setTimeout(()=>{this.donehit=true;setTimeout(()=>{all.$('.anima,.prize_title,.prize,.prize_no').addClass('left')},1)},500);
              setTimeout(()=>{this.mid=true;setTimeout(()=>{this.right=true;},1500)},1500);
              setTimeout(()=>{this.blackEgg=true;setTimeout(()=>{this.blackEggright=true;},1500)},2500);
            }
            if(index===1){
              this.mid=true;
              setTimeout(()=>{this.donehit=true},500);
              setTimeout(()=>{this.left=true;setTimeout(()=>{this.right=true},1500)},1500);
              setTimeout(()=>{this.blackEggleft=true;setTimeout(()=>{this.blackEggright=true;},1500)},2500);
            }
            if(index===2){
              this.right=true;
              setTimeout(()=>{this.donehit=true;setTimeout(()=>{all.$('.anima,.prize_title,.prize,.prize_no').addClass('right')},1)},500);
              setTimeout(()=>{this.left=true;setTimeout(()=>{this.mid=true},1500)},1500);
              setTimeout(()=>{this.blackEggleft=true;setTimeout(()=>{this.blackEgg=true;},1500)},2500);
            }
            setTimeout(()=>{this.refresh(index)},6000)
          }).catch(err=>{all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);this.canhit=true});
        },
        getDate(){
          all.tool.send('getPromoCode',{playerId:all.tool.getStore('playerID')}).then(result=>{
            this.prizeTime=[];
            this.promoType1=[[],[],[]];
            this.promoType2=[[],[],[]];
            this.promoType3=[[],[],[]];
            result.data.noUseList.map(item=>{
              !item.isViewed && this.toEach(item,3);
              item.isViewed && this.toEach(item,0);
            });
            result.data.usedList.map(item=>this.toEach(item,1));
            result.data.expiredList.map(item=>this.toEach(item,2));
            all.store.commit('setPromoCount',this.prizeTime.length);
            if(all.$('.itembtn.active').index()===0)this.promoType=this.promoType1;
            if(all.$('.itembtn.active').index()===1)this.promoType=this.promoType2;
            if(all.$('.itembtn.active').index()===2)this.promoType=this.promoType3;
            if(all.$('.itembtn.active').index()===3)this.promoType=this.promoType4;
            if(all.$('.itembtn.active').index()!==3)all.$('.itemContentBox div:first-child div:first-child .item_title').trigger('click');
          }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
        },
        toEach(item,index){
          if(index===3){
            if(item.condition==='无')item.typeIndex=0;
            if(item.title.slice(item.title.length-1,item.title.length)!=='%' && item.condition!=='无')item.typeIndex=1;
            if(item.title.slice(item.title.length-1,item.title.length)==='%')item.typeIndex=2;
            this.prizeTime.push(item);
            return
          }
          item.condition==='无' && this.promoType1[index].unshift(item);
          (item.title.slice(item.title.length-1,item.title.length)!=='%' && item.condition!=='无') && this.promoType2[index].unshift(item);
          item.title.slice(item.title.length-1,item.title.length)==='%' && this.promoType3[index].unshift(item);
        },
        changeTime(time,bl){
          return all.tool.formatTime(time,bl)
        },
        getPrize(code){
          all.tool.send('applyPromoCode',{promoCode:code}).then(result=>all.tool.TipWinShow('领取成功',[{name:'确定',callback:()=>{this.getDate();all.tool.setBalance()}}])).catch(err=>{
              all.tool.TipWinShow(err.errorMessage,[{name:'取消'},{name:'去存款',callback:()=>{
                all.router.push({name:'deposit',params:{code:code}})
              }}])
          });
        },
        showDetail(e){
          if(all.$(e.target)[0].className==='btn_item')return;
          all.$('.item_content').hide();
          let elem=all.$('.itemContentBox div:first-child div:first-child .item_title');
          if(all.$(e.target)[0].nodeName==='IMG' || all.$(e.target)[0].nodeName==='SPAN')elem=all.$(e.target).parent();
          if(all.$(e.target)[0].nodeName==='B' || all.$(e.target)[0].nodeName==='I')elem=all.$(e.target).parent().parent();
          elem.next().slideDown()
        },
        showType(e){
          let elem;
          if(all.$(e.target)[0].nodeName==='IMG')elem=all.$(e.target).parent();
          if(all.$(e.target)[0].nodeName==='SPAN')elem=all.$(e.target);
          elem.addClass('active').siblings().removeClass('active');
          if(elem.index()===0){
            this.promoType=this.promoType1;
            all.tool.clickCount({page:'砸金蛋',btn:'免费彩金'});
          }
          if(elem.index()===1){
            this.promoType=this.promoType2;
            all.tool.clickCount({page:'砸金蛋',btn:'返利奖励'});
          }
          if(elem.index()===2){
            this.promoType=this.promoType3;
            all.tool.clickCount({page:'砸金蛋',btn:'存送礼劵'});
          }
          if(elem.index()===3){
            this.promoType=this.promoType4;
            all.tool.clickCount({page:'砸金蛋',btn:'实物精品'});
          }
          if(elem.index()!==3)all.$('.itemContentBox div:first-child div:first-child .item_title').trigger('click')
        },
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
        this.getDate();
        setTimeout(()=>{this.tipshow=false},4500)
      }
  }
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .promobag{
    height:100%;
     background:#110804;
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
    .prizeTime{
        position:absolute;
        .top(265);
        width:100%;
    }
    .prizeTime span:first-child{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background:#9f0d0f;
        .width(380);
        .height(70);
        .border-radius(35);
        .font-size(30);
        color:#fff;
        line-height: 100%;
        font-weight: bold;
    }
     .prizeTime span:first-child i{
         .font-size(50);
         .ml(5);
         .mr(5);
         color:#fcdc00;
     }
    .prizeTime span:last-child{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        .width(70);
        .height(70);
        .border-radius(35);
        .ml(20);
        .font-size(50);
        color:#fcdc00;
        line-height: 100%;
        font-weight: bold;

    }
     .tipshow{
         .width(600);
         height:auto;
         position:absolute;
         .top(256);
         left:50%;
         transform: translateX(-50%);
         animation:showhide 1s infinite linear;
     }
    .eggBox{
        position: absolute;
        width:100%;
        .top(456);
        .pl(20);
        .pr(20);
    }
    .eggBox .tool{
        .width(117);
        .height(116);
        position: absolute;
        .top(-115);
        left:50%;
        animation:gameHover 5s infinite linear;
    }
    .eggBox .prize_title_no,.eggBox .prize_title{
        .width(120);
        .height(30);
        .border-radius(15);
        background:#424242;
        .font-size(24);
        .line-height(30);
        font-weight: bold;
        position:absolute;
        .top(135);
        z-index:4;
        left:50%;
        transform:translateX(-50%);
    }
    .eggBox .prize_title{
        background:#a40000;
        animation:delayShow 0.5s 1 linear;
    }
    .eggBox .prize_title_no.left,.eggBox .prize_title.left{
        transform:translateX(-242%);
    }
    .eggBox .prize_title_no.right,.eggBox .prize_title.right{
        transform:translateX(141%);
    }
    .eggBox .anima{
        .width(245);
        .height(245);
        position:absolute;
        animation:rotate 5s infinite linear;
        left:50%;
    }
    .eggBox .anima.left{
        animation:rotateleft 5s infinite linear;
    }
     .eggBox .anima.right{
         animation:rotateright 5s infinite linear;
     }
     .eggBox .prize,.eggBox .prize_no{
         .width(110);
         height:auto;
         position:absolute;
         .top(40);
         left:50%;
         transform: translateX(-50%);
     }
    .eggBox .prize_no{
        .top(0);
    }
    .eggBox .prize{
        animation:delayShow 0.5s 1 linear;
    }
    .eggBox .prize.left,.eggBox .prize_no.left{
        transform:translateX(-260%);
    }
    .eggBox .prize.right,.eggBox .prize_no.right{
        transform:translateX(160%);
    }
    .eggBox .egg{
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        .width(153);
        .height(208)
    }
    .eggBox .egg.left{
        transform:translateX(-200%);
    }
     .eggBox .egg.right{
         transform:translateX(100%);
     }
     .eggBox .egg_black{
         .width(153);
         .height(106);
         position:absolute;
         .top(103);
         left:50%;
         transform: translateX(-50%);
         z-index:3;
     }
    .eggBox .egg_black.left{
        transform: translateX(-202%);
    }
     .eggBox .egg_black.right{
         transform: translateX(100%);
     }
    .hitegg{
        position:absolute;
        .width(300);
        .height(350);
        .top(-105);
        left:50%;
        transform: translateX(-50%);
        z-index: 2;
    }
    .hitegg.left{
        transform: translateX(-127%);
    }
     .hitegg.right{
         transform: translateX(26%);
     }
    .itemBtnBox{
        .height(80);
        background:#3b1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
    }
 .itemBtnBox .itembtn{
     display:inline-flex;
     .font-size(24);
     color:#eb6100;
     font-weight:bold;
     flex:1;
     height:100%;
     align-items: center;
     justify-content: center;
 }
 .itemBtnBox .itembtn .choosed{
     display:none;
 }
 .itemBtnBox .itembtn:first-child img{
     .width(32);
     height: auto;
     .mr(15)
 }
 .itemBtnBox .itembtn:nth-child(2) img{
     .width(28);
     height: auto;
     .mr(15)
 }
 .itemBtnBox .itembtn:nth-child(3) img{
     .width(36);
     height: auto;
     .mr(15)
 }
 .itemBtnBox .itembtn:nth-child(4) img{
     .width(30);
     height: auto;
     .mr(15)
 }
 .itemBtnBox .itembtn.active img{
     display: none;
 }
 .itemBtnBox .itembtn.active .choosed{
     display:inline-block;
 }

 .itemBtnBox .itembtn.active{
     background:linear-gradient(#3b1a1a,#6e3131);
     color:#fff;
     border:2px solid #facf00;
 }
.itemContentBox{
    overflow-y: scroll;
    .pr(20);
    .pl(20);
    .pt(40);
}
 .itemContentBox .item{
     .mb(20)
 }
 .itemContentBox .item .item_content{
     .font-size(24);
     color:#b28c77;
     background:#261111;
     .min-height(160);
     .pt(20);
     text-align: left;
 }
 .itemContentBox .item .item_content li{
    .line-height(45)
 }
 .itemContentBox .item .item_content li span{
     display: inline-block;
     width:55%;
     text-align: left;
     .pl(40)
 }
 .itemContentBox .item .item_content li span marquee{
     color:#d47647;
     font-weight:bold;
     .width(160)
 }
 .itemContentBox .item .item_content li span b{
     color:#d47647
 }
 .itemContentBox .item .item_content li span:nth-child(2){
     width: 45%;
     .pl(20)
 }
 .itemContentBox .item .item_content.changeColor{
     color:#919191;
     background:#222222
 }
 .itemContentBox .item .item_title{
     position:relative;
 }
 .itemContentBox .item .item_title span{
     display:flex;
     flex-direction: column;
     align-items: flex-start;
     .height(104);
     position: absolute;
     .left(140);
     .top(8);
     color:#fcdc00;
 }
 .itemContentBox .item .item_title span.changeColor{
     color:#919191
 }
 .itemContentBox .item .item_title span b{
     .font-size(60);
     font-weight: bold;
     display:flex;
     align-items: baseline;
     .mb(80)
 }
 .itemContentBox .item .item_title span i{
     .font-size(24);
     font-weight: bold;
 }
 .itemContentBox .item .bg_title{
     width: 100%;
     height:auto;
 }
 .itemContentBox .item .icon{
     .width(104);
     height:auto;
     position:absolute;
     .left(18);
     .top(18)
 }
 .itemContentBox .item .btn_item{
     .width(166);
     height:auto;
     position:absolute;
     .right(18);
     .top(37)
 }
 @keyframes showhide{
     0%{opacity: 1}
     100%{opacity: 0.5}
 }
 @keyframes rotate{
     0%{transform:translateX(-50%) rotateZ(0)}
     100%{transform:translateX(-50%) rotateZ(180deg)}
 }
 @keyframes rotateleft{
     0%{transform:translateX(-145%) rotateZ(0)}
     100%{transform:translateX(-145%) rotateZ(180deg)}
 }
 @keyframes rotateright{
     0%{transform:translateX(45%) rotateZ(0)}
     100%{transform:translateX(45%) rotateZ(180deg)}
 }
 @keyframes delayShow{
     0%{opacity:0}
     100%{opacity:1}
 }
 @keyframes gameHover{
     0%,30%{transform:translateY(-5px) translateX(-200%) scale(1) rotate(5deg)}
     15%{transform:translateY(5px) translateX(-200%) scale(1.1) rotate(-15deg)}
     35%,65%{transform:translateY(-5px) translateX(-20%) scale(1) rotate(5deg)}
     50%{transform:translateY(5px) translateX(-20%) scale(1.1) rotate(-15deg)}
     70%,100%{transform:translateY(-5px) translateX(180%) scale(1) rotate(5deg)}
     75%{transform:translateY(5px) translateX(180%) scale(1.1) rotate(-15deg)}
 }
 .scroll::-webkit-scrollbar {.width(10);height:100%;background:#000;border:2px solid #0e3d5a;.border-radius(5)}
 .scroll::-webkit-scrollbar-thumb {.border-radius(5);-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);background: #2da3e2}
 @media (orientation:landscape){
     .prizeTime,.tipshow{
         .top(365);
     }
     .eggBox{
         .top(656);
     }
     .hitegg{
         .top(-105);
     }
 }
</style>
