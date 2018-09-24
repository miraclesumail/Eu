/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-21 17:52:21 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-04-30 12:04:13
 */


<!-- 用户升级页面 -->
<template>
    <div class="updateLevel">
        <PageTop
            :title="PageTopTitle"
        />
        <div class="main">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide>
                    <div class="box_userInfo">
                        <div class="userInfo_left">
                            <img v-if="showLevelImgBgList[0]" class="nowLevelActive2" src="../../assets/image/pages/account/nowLevelActive2.png" alt="">
                            <img :class="{nowLevelAnimate: showLevelImgBgList[0]}" src="../../assets/image/pages/account/grade1.png" alt="">
                            <p v-text="leveNameList[0]"></p>
                        </div>
                        <img src="../../assets/image/pages/account/updateArrRight.png" alt="" class="arrRight">
                        <div class="userInfo_right">
                            <img src="../../assets/image/pages/account/grade2.png" alt="">
                            <p v-text="leveNameList[1]"></p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="box_userInfo">
                        <div class="userInfo_left">
                            <img v-if="showLevelImgBgList[1]" class="nowLevelActive2" src="../../assets/image/pages/account/nowLevelActive2.png" alt="">
                            <img :class="{nowLevelAnimate: showLevelImgBgList[1]}" src="../../assets/image/pages/account/grade2.png" alt="">
                            <p v-text="leveNameList[1]"></p>
                        </div>
                        <img src="../../assets/image/pages/account/updateArrRight.png" alt="" class="arrRight">
                        <div class="userInfo_right">
                            <img src="../../assets/image/pages/account/grade3.png" alt="">
                            <p v-text="leveNameList[2]"></p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="box_userInfo">
                        <div class="userInfo_left">
                            <img v-if="showLevelImgBgList[2]" class="nowLevelActive2" src="../../assets/image/pages/account/nowLevelActive2.png" alt="">
                            <img :class="{nowLevelAnimate: showLevelImgBgList[2]}" src="../../assets/image/pages/account/grade3.png" alt="">
                            <p v-text="leveNameList[2]"></p>
                        </div>
                        <img src="../../assets/image/pages/account/updateArrRight.png" alt="" class="arrRight">
                        <div class="userInfo_right" >
                            <img src="../../assets/image/pages/account/grade4.png" alt="">
                            <p v-text="leveNameList[3]"></p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="box_userInfo">
                        <div class="userInfo_left">
                            <img v-if="showLevelImgBgList[3]" class="nowLevelActive2" src="../../assets/image/pages/account/nowLevelActive2.png" alt="">
                            <img :class="{nowLevelAnimate: showLevelImgBgList[3]}" src="../../assets/image/pages/account/grade4.png" alt="">
                            <p v-text="leveNameList[3]"></p>
                        </div>
                        <img src="../../assets/image/pages/account/updateArrRight.png" alt="" class="arrRight">
                        <div class="userInfo_right">
                            <img src="../../assets/image/pages/account/grade5.png" alt="">
                            <p v-text="leveNameList[4]"></p>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="box_userInfo">
                        <div class="userInfo_left" v-if="false">
                            <img :class="{nowLevelAnimate: showLevelImgBgList[4]}" src="../../assets/image/pages/account/grade4.png" alt="">
                            <p v-text="leveNameList[3]"></p>
                        </div>
                        <img src="../../assets/image/pages/account/updateArrRight.png" alt="" class="arrRight" v-if="false">
                        <div class="userInfo_right maxLevel"  v-if="true">
                            <img v-if="showLevelImgBgList[4]" class="nowLevelActive2" src="../../assets/image/pages/account/nowLevelActive2.png" alt="">
                            <img src="../../assets/image/pages/account/grade5.png" alt="">
                            <p v-text="leveNameList[4]"></p>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <!-- <div class="box_userInfo">
                <div class="userInfo_left" :class="{maxLevel: nowLevel == 4}">
                    <img :src="nowLevelImg" alt="">
                    <p v-text="nowLevelName"></p>
                </div>
                <img src="../../assets/image/pages/account/updateArrRight.png" alt="" class="arrRight" v-if="nowLevel != 4">
                <div class="userInfo_right" v-if="nowLevel != 4">
                    <img :src="nextLevelImg" alt="">
                    <p v-text="nextLevelName"></p>
                </div>
            </div> -->
            <h5 class="updateTitle" @click="showUpdateInfo"><span>升级条件</span></h5>
            <div class="bar_box">
                <div class="bar_top">
                    <span class="title">周存款</span>
                    <div class="bar_box_in">
                        <span v-text="topUpAmount"></span><span v-text="depositAnchors"></span>
                        <div class="bar" :style="{width: toUpAmountWidth}"></div>
                    </div>
                </div>
                <div class="bar_bottom">
                    <span class="title">周流水</span>
                    <div class="bar_box_in">
                        <span v-text="consumptionAmount"></span><span v-text="bettingAnchors"></span>
                        <div class="bar" :style="{width: consumptionAmountWidth}"></div>
                    </div>
                </div>
            </div>
            <BaseBtn :value="value" @callBackFn="submit" style="margin-bottom: 30px;" v-if="nowLevel != 4" />
            <div class="levelPrivilege" :class="{lpActive: showlpInfo}">
                <h5><span>等级特权</span></h5>
                <ul class="serchTitle">
                    <li v-for="(item, index) in allLevelList"  :class="{active:  num === index}"  :key="item._id" @click="tab(index, true) ">{{item.name | filterName}}</li>
                </ul>
                <table class="levelInfoTable" cellspacing="0" cellpadding="0">
                    <tr>
                        <th v-text="beforeLevel"></th>
                        <th v-text="afterLevel" v-show="num != 4"></th>
                    </tr>
                    <tr>
                        <td>洗码比例<span v-text="beforeCode"></span></td>
                        <td class="updateStyle" v-show="num != 4">洗码比例<span v-text="afterCode"></span></td>
                    </tr>
                    <tr v-show="num != 4">
                        <td :class="{nomarl: isNomarl}">
                            <p>晋级礼金<span v-text="beforeAmount"></span>元</p>
                            <!-- <p>解锁流水(优)<span>10</span>倍</p> -->
                        </td>
                        <td class="updateStyle" v-show="num != 4">
                            <p>晋级礼金<span v-text="afterAmount"></span>元</p>
                            <!-- <p>解锁流水(优)<span>10</span>倍</p> -->
                        </td>
                    </tr>
                    <tr v-show="showCode">
                        <td :class="{nomarl: isCodeNomarl}">提前申请洗码</td>
                        <td :class="{updateStyle: isCodeUpdate}" v-show="num != 4">提前申请洗码</td>
                    </tr>
                    <tr>
                        <td>签到单日最高<span v-text="beforeSignIn"></span>元</td>
                        <td class="updateStyle" v-show="num != 4">签到单日最高<span v-text="afterSignIn"></span>元</td>
                    </tr>
                    <tr>
                        <td class="lineHeight">
                            <p>存送38%</p>
                            <p>提款流水 = <span v-text="beforeDepositbonus38"></span>倍</p>
                        </td>
                        <td class="lineHeight" v-show="num != 4">
                            <p>存送38%</p>
                            <p>提款流水 = <span v-text="afterDepositbonus38"></span>倍</p>
                        </td>
                    </tr>
                    <tr>
                        <td class="lineHeight">
                            <p>存送20%</p>
                            <p>提款流水 = <span v-text="beforeDepositbonus20"></span>倍</p>
                        </td>
                        <td class="lineHeight" v-show="num != 4">
                            <p>存送20%</p>
                            <p>提款流水 = <span v-text="afterDepositbonus20"></span>倍</p>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td>自主定制短信通知设置</td>
                        <td v-show="num != 4">自主定制短信通知设置</td>
                    </tr>
                    <tr>
                        <td>7*24小时客服 随传随到</td>
                        <td v-show="num != 4">7*24小时客服 随传随到</td>
                    </tr> -->
                </table>
            </div>
            
        </div>
        
        <div class="pageWindow" v-if="visible">
            <transition name="slide-fade">
                <div class="window_in" v-if="visibleIn">
                    <div class="header">
                        <div class="window_closeBtn" @click="hideUpdateInfo"></div>
                    </div>
                    <div class="content">
                        <p style="color: #f39800; margin-bottom:0.2rem;">每人/每级均可享受一次晋级礼金</p>
                        <table id="updateInfo" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>等级</th>
                                <th>时间</th>
                                <th>条件</th>
                                <th>存款</th>
                                <th>流水</th>
                            </tr>
                            <tr v-for="item in levelInfo" :key="item.name">
                                <td>{{item.name}}</td>
                                <td>周</td>
                                <td>
                                    <p>升级</p>
                                    <p>保级</p>
                                </td>
                                <td>
                                    <p>{{item.up.topupLimit}}</p>
                                    <p>{{item.down.topupLimit}}</p>
                                </td>
                                <td>
                                    <p>{{item.up.consumptionLimit}}</p>
                                    <p>{{item.down.consumptionLimit}}</p>
                                </td>
                            </tr>
                        </table>
                        <div class="bottom_info">
                           <p>注: 完成晋级礼金10倍流水即可提款</p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import PageTop from '../../components/PageTop';
import BaseBtn from '../../components/BaseBtn';
    export default {
        data () {
            return {
                PageTopTitle: '晋级之路',
                value: '晋级',
                allLevelList: [],                        // 等级数组
                leveNameList: [],                        // 等级名称数组
                proportion: [],                          // 不同等级洗码优惠数组
                topUpAmount: 0,                          // 当前周存款
                nextDeposit: 0,                          // 升级条件
                consumptionAmount: 0,                    // 当前周投注
                nextBetting: 0,                          // 升级周投注
                num: 0,
                showCode: false,                         // 是否展示优惠代码栏
                amountList: [0, 18, 58, 128, 288],       // 升级礼包奖金
                isNomarl: true,
                isCodeNomarl: true,
                isCodeUpdate: true,
                levelInfo: [],                           // 弹出框等级信息
                visible: false,
                visibleIn: false,
                showlpInfo: false,                       // 滑动时等级特权信息框上浮
                isLvFour: false,                         // 是否是第四个等级
                timer: null,                             // 等级特权向下滑动定时器
                myLevel: 0,                              // 局部操作等级
                swiperOption: {
                    // notNextTick: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    // autoplay: {
                    //     disableOnInteraction: false,   // 触摸后不停止自动播放
                    // },
                    // loop: true,
                    // effect : 'cube',
                    // slidesPerView: 2,
                    // centeredSlides: true,
                    on: {
                        slideChangeTransitionStart: () => {
                            this.uplpInfo();
                        },

                        slideChangeTransitionEnd: () => {
                            this.downlpInfo();
                        }
                    }
                },
                showLevelImgBgList: [false, false, false, false, false],
                depositbonus20: [],
                depositbonus38: [],
                signIn: []
        };
    },

    components: {
        PageTop,
        BaseBtn
    },

    computed: {
        swiper () {
            return this.$refs.mySwiper.swiper
        },
        // 玩家现在等级
        nowLevel () {
            return this.$store.state.level;
        },

        // 玩家现在等级对应的名称
        nowLevelName () {
            let This = this;
            if( This.allLevelList.length === 0)
                return 'LV.0 游客';
            return This.allLevelList[This.$store.state.level]['name'];
        },

        // 玩家下一个等级的名称
        nextLevelName () {
            let This = this;
            if( This.allLevelList.length === 0)
                return 'LV.0 游客';
            return This.allLevelList[This.$store.state.level + 1]['name'];
        },

        // 现在等级图片
        nowLevelImg () {
            let This = this;
            let nowLevel = This.$store.state.level;
            let str = require(`../../assets/image/pages/account/grade${nowLevel + 1}.png`);
            return str;
        },

        // 下一个等级图片
        nextLevelImg () {
            let This = this;
            let nowLevel = This.$store.state.level;
            let str = require(`../../assets/image/pages/account/grade${nowLevel + 2}.png`);
            return str;
        },

        // 周存款升级所需达到(进度条内文字)
        depositAnchors () {
            let This = this;
            if( This.allLevelList.length === 0)
                return '0';
            // let nowLevel = This.$store.state.level;
            let nowLevel = This.myLevel;
            if (nowLevel != 4) {
                This.nextDeposit = This.allLevelList[nowLevel + 1].levelUpConfig[0].topupLimit;
            } else {
                This.nextDeposit = This.allLevelList[nowLevel].levelUpConfig[0].topupLimit;
            }
            return '/' + This.nextDeposit;
        },
        
        // 周流水升级所需达到(进度条内文字)
        bettingAnchors () {
            let This = this;
            if( This.allLevelList.length === 0)
                return '0';
            // let nowLevel = This.$store.state.level;
            let nowLevel = This.myLevel;
            if (nowLevel != 4) {
                This.nextBetting = This.allLevelList[nowLevel + 1].levelUpConfig[0].consumptionLimit
            } else {
                This.nextBetting = This.allLevelList[nowLevel].levelUpConfig[0].consumptionLimit
            }
            return '/' + This.nextBetting;
        },

        // 周存款进度条长度
        toUpAmountWidth () {
            return this.topUpAmount/this.nextDeposit * 100 + '%';
        },

        // 周流水进度条长度
        consumptionAmountWidth () {
            return this.consumptionAmount/this.nextBetting * 100 + '%';
        },

        beforeLevel () {
            let This = this;
            if( This.allLevelList.length === 0)
                return 'LV.0 游客';
            return This.allLevelList[This.num]['name'];
        },

        afterLevel () {
            let This = this;
            if( This.allLevelList.length === 0)
                return 'LV.0 游客';
            if (This.num === 4)
                return '';
            return This.allLevelList[This.num + 1]['name'];
        },

        beforeCode () {
            if( this.proportion.length === 0)
                return '0'; 
            return this.proportion[this.num]['14'] * 100 + '%'
        },

        afterCode () {
            if( this.proportion.length === 0)
                return '0';
            if (this.num === 4)
                return '0';
            return this.proportion[this.num + 1]['14'] * 100 + '%'
        },

        beforeAmount () {
           return this.amountList[this.num];
        },

        afterAmount () {
            return this.amountList[this.num + 1];
        },

        beforeSignIn () {
            return this.signIn[this.num]
        },

        afterSignIn () {
            return this.signIn[this.num + 1];
        },

        beforeDepositbonus38 () {
            return this.depositbonus38[this.num]
        },

        afterDepositbonus38 () {
            return this.depositbonus38[this.num + 1];
        },

        beforeDepositbonus20 () {
            return this.depositbonus20[this.num]
        },

        afterDepositbonus20 () {
            return this.depositbonus20[this.num + 1];
        }
    },

    methods: {

        goToAccount () {
            this.$router.push('/account/information');
        },

        /* 提交 */
        submit () {
            let This = this;
            let playerId = this.$store.state.playerId;
            all.tool.send('manualPlayerLevelUp', {
                playerId: playerId
            }).then(result => {
                all.tool.TipWinShow(result.data.message, [{name: '确定'}]);
                // This.$store.state.level = This.nowLevel + 1; 
                This.$store.commit('setlevelName', {levelName: This.nextLevelName});
                This.$store.commit('setLevel', this.nowLevel + 1);
                This.myLevel = This.nowLevel;
                This.showLevelImgBgList[This.nowLevel] = true;
                This.swiper.slideTo(This.nowLevel, 1000, false);
                This.tab(This.nowLevel);
                // This.init();
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                if (error.status == 453) {
                    errorMessage = '存款以及投注额尚未达到晋级要求!';
                }
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        tab (index, startSlide) {

            if (startSlide)
                this.swiper.slideTo(index, 1000, false);

            this.num = index;
            this.myLevel = this.num;
            if (index >= 3) 
                this.showCode = true;
            else
                this.showCode = false;

            if (index === 0)
                this.isNomarl = true;
            else    
                this.isNomarl = false;

            if (index <=3 )
                this.isCodeNomarl = true;
            else
                this.isCodeNomarl = false;

            if (index === 3) 
                this.isCodeUpdate = true;
            else
                this.isCodeUpdate = false;
                
        },

        // 展示升级降级等级详情
        showUpdateInfo () {
            all.tool.clickCount({
                page: '晋级之路',
                btn: '晋级之路详情'
            });
            this.visible = true;
            setTimeout(() => {
                this.visibleIn = true;
            }, 0);
        },

        hideUpdateInfo () {
            this.visibleIn = false;
            setTimeout(() => {
                this.visible = false;
            }, 500);
        },

        uplpInfo () {
            this.myLevel = this.swiper.activeIndex;
            this.showlpInfo = true;
            this.tab(this.swiper.activeIndex, false);
            clearTimeout(this.timer);
        },

        downlpInfo () {
            this.timer = setTimeout(() => {
                this.showlpInfo = false;
                this.isLvFour = false;
            }, 3000);
        },

        init() {
            let This = this;
            This.swiper.slideTo(This.nowLevel, 1000, false);
            This.myLevel = This.nowLevel;
            This.tab(This.nowLevel);
            This.showLevelImgBgList[This.nowLevel] = true;
            let playerId = This.$store.state.playerId;

            all.tool.send('getAllLevel', {
                playerId: playerId
            }).then(result => {
                This.allLevelList = result.data;
                This.allLevelList.map((item, index) => {
                    // This.amountList[index] = item.reward.bonusCredit;
                    This.$set(This.amountList, index, item.reward.bonusCredit);
                    This.leveNameList.push(item.name);
                    if (index != 0) {
                        let tempData = {};
                        tempData.name = item.name;
                        tempData.up = {};
                        tempData.up.topupLimit = item.levelUpConfig[0].topupLimit;
                        tempData.up.consumptionLimit = item.levelUpConfig[0].consumptionLimit;
                        tempData.down = {}
                        tempData.down.topupLimit = item.levelDownConfig[0].topupMinimum;
                        tempData.down.consumptionLimit = item.levelDownConfig[0].consumptionMinimum;
                        This.levelInfo.push(tempData);
                    }
                })
            });

            // 获取活动信息
            all.tool.send('getRewardList').then(result => {
                result.data.map(item => {
                    if (item.code === 'xima') {
                        let ratio = item.param.ratio;
                        for (let item in ratio) {
                            This.proportion.push(ratio[item]);
                        }
                    } else if (item.code === 'depositbonus38') {
                        let rewardParam = item.param.rewardParam;
                        rewardParam.map(item => {
                            this.depositbonus38.push(item.value[0].spendingTimes)
                        });
                    } else if (item.code === 'depositbonus20') {
                        let rewardParam = item.param.rewardParam;
                        rewardParam.map(item => {
                            this.depositbonus20.push(item.value[0].spendingTimes)
                        });
                    } else if (item.code === 'attnbonus') {
                        let rewardParam = item.param.rewardParam;
                        rewardParam.map(item => {
                            this.signIn.push(item.value[6].rewardAmount)
                        });
                    }
                })
            });
            
            // 获取周记录
            all.tool.send('getPlayerWeekStatus', {
                playerId: playerId
            }).then(result => {
            This.topUpAmount = parseInt(result.data.topUpAmount);
            This.consumptionAmount = parseInt(result.data.consumptionAmount);
            });

        }
    },

    mounted () {
        this.init();
    },

    filters: {
        format (value) {
            return value == '' ? '0' : value*100 + '%';
        },

        filterName (value) {
            return value.split(' ')[1];
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.slide-fade-enter-active {
    animation: bounce-in .3s;
}
.slide-fade-leave-active {
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

.swiper-container {
    position: relative;
    background: url('../../assets/image/pages/account/userInfoBg.jpg') no-repeat center center;
    background-size: 100% 100%;
    .mb(10);
}

.swiper-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
    .height(20);
}

.updateLevel {
    .main {
        .height(1750);
        position: relative;
    }
    // .slide-fade-enter-active {
    //     transition: all .3s ease;
    // }
    // .slide-fade-leave-active {
    //     transition: all .8s ease;
    // }
    // .slide-fade-enter, .slide-fade-leave-to
    // /* .slide-fade-leave-active for below version 2.1.8 */ {
    //     transform: translateY(50%);
    //     opacity: 0;
    // }
    width: 100%;
    height: 100%;
    // .height(1500);
    font-family: 'Microsoft YaHei';
    .pb(140);
    position: relative;
    // overflow-y: auto;
    
    .active {
        background:url('../../assets/image/pages/account/activeBg.jpg') center center;
        background-size: 100% 100%;
    }

    .nomarl {
        font-size: 0 !important;
        background:url('../../assets/image/pages/account/updateArrError.png') no-repeat center center;
        background-size: auto 50%;
    }

    .updateStyle {
        color: #f39800;
        background:url('../../assets/image/pages/account/updateArrUp.png') no-repeat 10% 50%;
        background-size: auto 50%;
    }

    .box_userInfo {
        font-size: 0;
        .height(360);
        // background: url('../../assets/image/pages/account/userInfoBg.png') no-repeat center center;
        // background-size: 100% 100%;
        text-align: left;
        font-weight: 700;
        position: relative;
        overflow: hidden;
        .pt(20);
        .mb(40);
        .arrRight {
            .width(90);
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            animation: move 1s infinite linear;
        }
        .userInfo_left,.userInfo_right {
            text-align: center;
            display: inline-block;
            position: relative;
            z-index: 2;
            width: 40%;
            .height(360);
            .font-size(24);
            img {
                height: 95%;
            }
            p {
                .width(260);
                .height(42);
                .line-height(42);
                position: absolute;
                background: url('../../assets/image/pages/account/textBg.png') no-repeat center center;
                background-size: 100% 100%;
            }
        }
        .userInfo_left {
            position: relative;
            p {
                .bottom(60);
                .right(-120%);
            }
        }
        .userInfo_right {
            float: right;

            p {
                .top(66);
                .left(-80%);
            }
        }
    }

    h5 {
        text-align: center;
        .font-size(30);
        color: #00b7ee;
        .mb(20);
        span {
            .pl(18);
            display: inline-block;
            .width(708);
            text-align: left;
            position: relative;

            &::before {
                content: '';
                display: inline-block;
                .height(27);
                .width(6);
                background-color: #00b7ee;
                position: absolute;
                left: 0;
                .top(7);
            }
        }

    }

    .updateTitle {
        ::after {
            content: '?';
            display: inline-block;
            .width(40);
            .height(40);
            background-color: #1c84b8;
            .border-radius(40);
            position: absolute;
            right: 0;
            top: 0;
            color: #fff;
            text-align: center;
        }
    }

    .bar_box {
        position: relative;
        .mt(20);
        background-color: #083457;
        .height(140);
        .rem(padding, 20);
        .font-size(24);
        text-align: center;
        .mb(70);
        box-shadow: 1px 1px 10px 10px #0b1d2b;
        .bar_box_in {
            display: inline-block;
            .width(580);
            .height(40);
            .ml(20);
            background: url(../../assets/image/pages/account/barBg.jpg) repeat-x;
            background: auto 100%; 
            .font-size(24);
            .line-height(36);
            overflow: hidden;
            transform: rotate(0deg);
            text-align: center;

            span {
                position: relative;
                text-align: center;
                z-index: 2;
            }

            .bar {
                position: absolute;
                background: url(../../assets/image/pages/account/barColor.jpg) repeat-x;
                background: auto 100%; 
                .height(40);
                width: 0%;
                left: 0;
                top: 0;
                z-index: 1;
            }
           
        }

        .btn {
            .width(80);
            .height(40);
            position: absolute;
            right: 0;
            top: 0;
            font-weight: 700;
            text-align: center;
            .line-height(40);
            background-color: #1a8cc4;
        }
        .bar_top,.bar_bottom {
            display: inline-block;
            .width(708);
            text-align: center;
        }
        .bar_top {
            .mb(20);
        }
    }

    .serchTitle {
        font-size: 0;
        width: 100%;
        .height(70);
        background-color: #20679f;

        li {
            font-weight: 700;
            .font-size(30);
            display: inline-block;
            width: 20%;
            .line-height(70)
        }
    }

    .levelInfoTable {
        background-color: #083457;
        text-align: center;
        .font-size(24);
        width: 100%;
        .rem(padding, 20);
        font-weight: 400;

        tr {
            .height(101);
            width: 100%;
        }

        .searchTitle {
            background-color: #20679f;
            .height(88);
            width: 100%;
        }

        th,td {
            width: 20%;
            .font-size(30);
            .height(88);
            .line-height(88);
            border-bottom: 1px solid #0b1d2b;
        }

        td {
            .font-size(24);
        }

        th {
            background-color: #20679f;
            border-bottom: 0;
            .line-height(70);
            .height(70);
            border-left: 1px solid #0b1d2b;
        }
        th:nth-child(1) {
            border: 0;
        }
        tr:last-child{
            td {
                border: 0;
            }   
        }
        tr:nth-child(3) {
            td {
                .pt(10);
                .line-height(40);
            }
        }

        tr:nth-child(1) {
            .height(70);
        }

        tr {
            p {
                .mt(20);
            }
            td:nth-child(2) {
                border-left: 1px solid #0b1d2b;
            }
        }
    }

    .pageWindow {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        z-index: 10;
        background-color: rgba(0, 0, 0, .7);
        text-align: center;
       

        &::after {
            content: '';
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
        }
    
        .window_in {
            .width(606);
            // .height(612);
            display: inline-block;
            background-color: #0b1d2b;
            vertical-align: middle;
            border: 1px solid #2b7ca3;
            box-shadow: 0 0 10px 2px #2b7ca3;

            .header {
                width: 100%;
                .height(100);
                background: url(../../assets/image/pages/account/updateAlertTitle.jpg) center center;
                background-size: 100% 100%;
                text-align: right;

                .window_closeBtn {
                    display: inline-block;
                    .height(100%);
                    .width(185);
                }
            }

            .content {
                .font-size(24);
                width: 100%;
                .rem(padding, 20);

                table {
                    background-color: #083457;
                    font-weight: 400;
                    width: 100%;
                    height: 100%;
                    tr:nth-child(1) {
                        .height(60);
                        background-color: #20679f;
                        .line-height(60);
                    }
                    
                    tr:nth-child(n+2) {
                        .height(100);
                        td {
                            border-bottom: 1px solid #0b1d2b;
                            border-left: 1px solid #0b1d2b;

                            p {
                                .line-height(40);
                                border-bottom: 1px solid #0b1d2b;
                                .rem2(padding, 5, 0);
                            }
                            p:nth-child(2) {
                                border: 0;
                            }
                        }
                        td:nth-child(1),td:nth-child(2) {
                            .line-height(100);
                        }
                    }

                    tr {
                        td:nth-child(1) {
                            border-left: 1px solid #20679f;
                        }
                        td:last-child {
                            border-right: 1px solid #20679f;
                        }
                    }
                    tr:last-child {
                        td {
                            border-bottom: 1px solid #20679f;
                        }
                    }
                    
                }
            }
        }

    }

    .bottom_info {
        .mt(10);
        text-align: center;
        color: #f39800;
    }

    .levelPrivilege {
        transition: all 0.5s linear;
        position: absolute;
        .top(850);
        left: 0;
        z-index: 10;
    }

    .lpActive {
        position: absolute;
        .top(620);
    }
}


.maxLevel {
    top: 0px;
    right: 30%;
}

.lineHeight {
    p {
        .line-height(20);
    }
}

.nowLevelActive {
    width: 100%;
    height: 10% !important;
    position: absolute;
    top: 0;
    left: 0; 
    animation: down 2s linear infinite;
}

.nowLevelActive2 {
    // width: 200%;
    height: 96% !important;
    position: absolute;
    top: -6%;
    left: -12%; 
    animation: rotating 10s linear infinite;
    z-index: -1;

}

.nowLevelAnimate {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -40%;
    animation: bounce 1s linear infinite;
}

@keyframes move {
    form {
        transform: translateX(-50%) translateY(-50%);
    }

    to {
        transform: translateX(-20%) translateY(-50%);
    }
}

@keyframes down {
    form {
        top: 0;
        // transform: translateY(0);
    }

    to {
        top: 100%;
        // transform: translateY(100%);
    }
}

@keyframes rotating {
    form {
        transform: rotateZ(0deg);
    }

    to {
        transform: rotateZ(360deg);
    }
}

@keyframes bounce {
  from, 20%, 53%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -15px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
}

</style>