/*
 * @Author: Reynold Yang 
 * @Date: 2018-07-16 11:42:31 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-07 13:06:13
 */

<template>
    <div class='downloadAPP'>
        <PageTop :title="PageTopTitle"/>
        <div class="main">
            <img src="../assets/image/pages/downloadAPP/activityInfo.png" class="activityInfo" @click="showActivity">
            <ul class="btns">
                <li @click="downloadIos"></li>
                <li @click="downloadAD"></li>
            </ul>
            <div class="redPackage_box">
                <div class="rp_cont" :class="{translate: showAnimated}">
                    <p>
                        <span v-text="amount"></span>
                        <span class="amountText">元</span>
                    </p>
                </div>
                <div class="rp_Up">
                    <div class="submit_btn" @click="submit"></div>
                </div>
                <div class="rp_top" :class="{rotate: showAnimated}">
                    <div class="rp_top_btn"></div>
                </div>
            </div>
        </div>
        <transition name="bounce">
            <div class="firstRegister" v-if="isShowAppAcitvity">
                <div class="win_box">
                    <img src="../assets/image/pages/downloadAPP/alertClose.png" class="closeBtn" @click="closeAppAlert">
                    <ul>
                        <li>1）此活动仅限 易游 手机APP才可享受（含IOS/ 安卓）</li>
                        <li>2）每位会员/ 每日（存款成功）后 均可拆红包（一次）</li>
                        <li>3）每日累积时间：凌晨 00:00:00 至 23:59:59</li>
                        <li>4）红包金额随机赠送 5元 - 888元。</li>
                        <li>5）领取优惠后，只需达到优惠金额的（10）倍流水即可提款。</li>
                        <li>6）如经系统检测以任何方式、行为骗取此优惠奖金将无条件取消参与资格。</li>
                    </ul>
                </div>
            </div>
      </transition>
    </div>
</template>

<script>
import PageTop from '../components/PageTop';
import {iosAppUrla, iosAppUrlb, domainList} from '../assets/js/config/domain.config.js';
export default {
    data () {
        return {
            PageTopTitle: '抢 红 包',
            amount: '',
            showAnimated: false,
            flag: true,
            isShowAppAcitvity: false,
            isApp: all.tool.isApp(),
            appUrl:'http://td99.neweb.me/neweu/m/download.html'
        };
    },

    components: {
        PageTop
    },

    computed: {},

    methods: {
        downloadAD () {
            let theUrl = window.location.host.slice(4,window.location.host.length);
            if(theUrl==='eu001.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu001/download.html';
            if(theUrl==='eu005.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu005/download.html';
            if(theUrl==='eu065.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu065/download.html';
            if(theUrl==='eu066.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu066/download.html';
            if(theUrl==='eu615.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu615/download.html';
            if(theUrl==='eu1866.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu1866/download.html';
            if(theUrl==='eu1899.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu1899/download.html';
            if(theUrl==='eu8282.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8282/download.html';
            if(theUrl==='eu8383.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8383/download.html';
            if(theUrl==='eu8855.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8855/download.html';
            if(theUrl==='eu981.com') this.appUrl='http://td99.neweb.me/eu981/m/download.html';
            if(theUrl==='eu242.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu242/download.html';
            if(theUrl==='eu357.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu357/download.html';
            if(theUrl==='eu577.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu577/download.html';
            if(theUrl==='eu663.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu663/download.html';
            if(theUrl==='eu887.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu887/download.html';
            if(theUrl==='eu3939.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3939/download.html';
            if(theUrl==='eu3322.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3322/download.html';
            if(theUrl==='eu866.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu866/download.html';
            if(theUrl==='eu2019.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu2019/download.html';
            if(theUrl==='eu3030.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3030/download.html';
            if(theUrl==='eu775.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu775/download.html';
            if(theUrl==='eu7979.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu7979/download.html';
            if(theUrl==='eu3399.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3399/download.html';
            if(theUrl==='eu7799.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu7799/download.html';
            if(theUrl==='eu8088.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8088/download.html';
            if(theUrl==='eu3838.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu3838/download.html';
            if(theUrl==='eu6655.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu6655/download.html';
            if(theUrl==='eu8181.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8181/download.html';
            if(theUrl==='eu9663.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu9663/download.html';
            if(theUrl==='eu9775.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu9775/download.html';
            if(theUrl==='eu9886.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu9886/download.html';
            if(theUrl==='eu812.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu812/download.html';
            if(theUrl==='eu8001.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu8001/download.html';
            if(theUrl==='eu33999.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu33999/download.html';
            if(theUrl==='eu66888.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu66888/download.html';
            if(theUrl==='eu77888.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu77888/download.html';
            if(theUrl==='eu88999.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu88999/download.html';
            if(theUrl==='eu99989.com') this.appUrl='http://td99.neweb.me/eu_telemarketing/m/eu99989/download.html';
            window.open(this.appUrl);
        },
        downloadIos () {
            let theUrl = window.location.host.slice(4,window.location.host.length);
            let openUrl = '';
            if (domainList.includes(theUrl)) {
                openUrl = iosAppUrla
            } else {
                openUrl = iosAppUrlb
            }

            window.open(openUrl);
        },

        showActivity () {
            this.isShowAppAcitvity = true;
        },
        closeAppAlert () {
            this.isShowAppAcitvity = false;
        },
        submit () {
            if (this.isApp) {
                
                // if (!this.$store.state.isLogin) {
                //     all.tool.TipWinShow('请您先登录', [{name: '前往登陆', callback: () => {
                //         this.$router.push('/login');
                //     }}]);
                //     return;
                // }

                if (this.flag) {

                    this.flag = false;
                    // all.tool.send('getValidTopUpReturnRecordList', {
                    //     requestCount: 10,
                    //     sort: false,
                    //     startIndex: 0
                    // }).then(result => {
                        //  if(result.data.records.length===0){
                        //     this.flag = true;
                        //     all.tool.TipWinShow('需有最新一笔存款才可申请，请马上存款即可领取！',[{name:'取消'},{name:'去存款',callback:()=>{
                        //         this.$router.push('/deposit');
                        //     }}]);
                        // } else {
                        all.tool.send('applyRewardEvent', {
                            code: 'downloadAPP',
                            // data: {
                            //     topUpRecordId: result.data.records[0]._id
                            // }
                        }).then(result => {
                            this.amount = result.data.rewardAmount + '.0';
                            this.flag = true;
                            this.showAnimated = true;
                        }).catch(err => {
                            this.flag = true;
                            let message = err.errorMessage;
                            if (err.status == 423) {
                                if (message) {
                                    if (message.indexOf('已被使用') !== -1 || message.indexOf('无法找到') !== -1 || message.indexOf('您需要有') !== -1 || message.indexOf('未达到') !== -1) {
                                        all.tool.TipWinShow('您需有最新一笔存款才能拆红包哦！', [{name: '取消'}, {name: '去存款', callback: () => {
                                            this.$router.push('/deposit');
                                        }}]);
                                    } else if (message.indexOf('此电话已经达到了该优惠周期内的申请上限') !== -1) {
                                        all.tool.TipWinShow('相同电话号码仅限领取一次', [{name:'确定'}]);
                                    } else if (message.indexOf('上限') !== -1) {
                                        all.tool.TipWinShow('您已经领取过了呦！', [{name:'确定'}]);
                                    } else {
                                        all.tool.TipWinShow(message, [{name:'确定'}]);
                                    }
                                }
                            } else {
                                all.tool.TipWinShow(message, [{name:'确定'}]);
                            }
                        });
                        // }
                    // })
                }
            } else {
                all.tool.TipWinShow('此活动仅限APP内领取！',[{name:'确定'}]);
            }
            
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';

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

.downloadAPP {
    width: 100%;
    height: 100%;
}

.main {
    width: 100%;
    // height: 92.5%;
    .height(1250);
    position: relative;
    background: url(../assets/image/pages/downloadAPP/bg.jpg) no-repeat top left/100% 100%;
}

.redPackage_box {
    position: absolute;
    .width(400);
    .height(490);
    .right(40);
    .bottom(46);
    background: url(../assets/image/pages/downloadAPP/redBg.png) no-repeat top left/100% 100%;
    text-align: cneter;
    z-index: 1;
}

.btns {
    position: absolute;
    .top(400);
    left: 0;
    width: 100%;
    .height(60);
    font-size: 0;
    .pl(280);
    li {
        display: inline-block;
        .width(165);
        .height(60);
        background-color: pink;
        .ml(20);
    }

    li:nth-child(1) {
        background: url(../assets/image/pages/downloadAPP/IOSBtn.png) no-repeat top left/100% 100%;
    }

    li:nth-child(2) {
        background: url(../assets/image/pages/downloadAPP/AndBtn.png) no-repeat top left/100% 100%;
    }
}

.rp_cont {
    color: #e51218;
    .pt(30);
    .width(308);
    .height(300);
    left: 50%;
    .ml(-154);
    position: absolute;
    background-color: #ffe0ab;
    border: 1px solid #d97b62;
    transform: translateY(10%);
    z-index: 2;

    p {
        font-size: 0;
        position: relative;
        span {
            .font-size(100);
        }
        .amountText {
            .font-size(30);
            font-weight: 700;
        }
    }

}

.rp_Up {
    position: absolute;
    left: 0;
    .bottom(15);
    z-index: 3;
    width: 100%;
    height: 97%;
    background: url(../assets/image/pages/downloadAPP/redUp.png) no-repeat top left/100% 100%;
}

.submit_btn {
    .width(300);
    .height(80);
    position: absolute;
    left: 50%;
    .ml(-150);
    .bottom(152);
    background: url(../assets/image/pages/downloadAPP/redSubmit.png) no-repeat top left/100% 100%;
}

.rp_top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .height(168);
    z-index: 4;
    background: url(../assets/image/pages/downloadAPP/redTop.png) no-repeat top left/100% 100%;
    transform-origin: 0% 0%;
}

.rp_top_btn {
    .width(120);
    .height(120);
    position: absolute;
    .bottom(-40);
    left: 50%;
    .ml(-60);
    z-index: 5;
    background: url(../assets/image/pages/downloadAPP/redBtn.png) no-repeat top left/100% 100%;
}

.rotate {
    animation: rotate 1s linear forwards;
}

.translate {
    animation: tsY 1s 1s linear forwards;
}

.activityInfo {
    position: absolute;
    .right(50);
    .top(600);
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

.win_box {
    .width(700);
    .height(500);
    background: url(../assets/image/pages/downloadAPP/activityAlert.png) no-repeat top left/100% 100%;
    position: relative;
    .rem(padding, 50);
    .pt(70);
    .line-height(50);
    .font-size(24);
    color: #2b0a0a;
    text-align: left;

    .closeBtn {
        position: absolute;
        .right(20);
        .top(40);
        .width(50);
    }
}

@keyframes rotate {
    from {
        transform: rotateX(0deg);
    }

    to {
        transform: rotateX(180deg);
        z-index: 1;
    }
}

@keyframes tsY {
    from {
        transform: translateY(10%);
    }

    to {
        transform: translateY(-22%);
    }
}

</style>