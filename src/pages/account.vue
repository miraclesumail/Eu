<template>
    <div class="account">
        <PageTop
            :title="PageTopTitle"
            :useDefaultCloseFn="false"
            @closeCallBackFn="goToHome"
        />
        <main>
            <div class="box_userInfo">
                <div class="userInfo_left">
                    <img :src="nowLevelImg" alt="">
                </div>
                <div class="userInfo_right">
                    <p v-text="userName" style="color: #f39800;"></p>
                    <p v-text="levelName"></p>
                    <div class="box_money">
                        <div class="box_score" @click="goToScore">
                            <span class="score" v-text="score"></span>
                            <span class="select btnPublicBg selectScore">积分</span>
                        </div>
                        <div class="box_balance" @click="goToGameTransfer">
                            <span class="balance" v-text="balance"></span>
                            <span class="select btnPublicBg selectBalance">额度</span>
                        </div>
                    </div>
                   <div class="bar_box" @click="gotoUpdate">
                        <div class="bar_box_in">
                            <span v-text="textBettingAnchors"></span>
                            <div class="bar" :style="{width: bettingAnchors}"></div>
                        </div>
                        <router-link to="/updateLevel" tag="div" class="btn btnPublicBg">升级</router-link>
                   </div>
                   <img class="finger" src="../assets/image/pages/account/finger.png" alt="" @click="gotoUpdate">
                </div>
            </div>
            <ul class="box_nav">
                <li v-for="(item,index) in navData" :key="item.index" :class="{active: index === num}" @click="tab(index)">
                    <router-link :to="item.to" tag="div">
                        <i v-if="index === 0" class="iconfont icon-weimingpian"></i>
                        <i v-else-if="index === 1" class="iconfont icon-chaxun"></i>
                        <i v-else-if="index === 2" class="iconfont icon-mimazhengque"></i>
                        <i v-else-if="index === 3" class="iconfont icon-shezhi"></i>
                        <i v-else-if="index === 4" class="iconfont icon-qiandai-tianchong"></i>
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import PageTop from '../components/PageTop';
import MoneyBox from '../components/MoneyBox';
import { mapState } from 'vuex';
export default {
    data () {
        return {
            PageTopTitle: '账户',
            num: 0,
            allLevelList: [],
            consumptionAmount: 0,
            nextBetting: 0,
            navData: [
                {
                    name: '基本资料',
                    to: '/account/information?t=0'
                },
                {
                    name: '记录搜索',
                    to: '/account/search?t=1'
                },
                {
                    name: '修改密码',
                    to: '/account/changePassword?t=2'
                },
                {
                    name: '短信设置',
                    to: '/account/smsSettings?t=3'
                },
                {
                    name: '提前洗码',
                    to: '/account/code?t=4'
                }
            ]
        }
    },
    components: {
        PageTop,
        MoneyBox
    },
    methods: {

        goToHome() {
            this.$router.push('/');
        },

        tab(index) {
            this.num = index;
        },

        goToGameTransfer () {
            let This = this;
            this.$router.push('/gameTransfer');
            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '额度'
            });
        },

        gotoUpdate () {
            let This = this;
            this.$router.push('/updateLevel');
            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '升级'
            });
        },

        goToScore () {
            let This = this;
            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '积分'
            });
            // all.tool.TipWinShow('敬请期待', [{name: '确定'}]);
            this.$router.push('/task');
        },

    },
    computed: {
        ...mapState([
            'score',
            'balance',
            'userName',
            'levelName',
        ]),

        nowLevelImg () {
            let This = this;
            let nowLevel = This.$store.state.level;
            let str = require(`../assets/image/pages/account/grade${nowLevel + 1}.png`);
            return str;
        },

        /* 周流水进度条长度 */
        bettingAnchors () {
            let This = this;
            if( This.allLevelList.length === 0)
                return '0';
            let nowLevel = This.$store.state.level;
            if (nowLevel != 4) {
                This.nextBetting = This.allLevelList[nowLevel + 1].levelUpConfig[0].consumptionLimit
            } else {
                This.nextBetting = This.allLevelList[nowLevel].levelUpConfig[0].consumptionLimit
            }
            return This.consumptionAmount / This.nextBetting * 100 + '%';
        },

        /* 进度条内文字 */
        textBettingAnchors() {
            return '周流水 ' + parseFloat(this.bettingAnchors).toFixed(1) + '%';
        }
    },

    mounted () {
        let This = this;
        let storeBankInfo = all.tool.getStore('bankInfo');
        let registrationTime = '';
        let bankInfo = this.$store.state.bankInfo;
        let tempBankInfo = {}
        // if (!storeBankInfo) {
            this.$store.dispatch('getBankInfo');
        // }
        // else {
            // registrationTime =  all.tool.getStore('userInfo')['registrationTime']

            // tempBankInfo.bankAccount = storeBankInfo.bankAccount;
            // tempBankInfo.bankAccountCity = storeBankInfo.bankAccountCity;
            // tempBankInfo.bankAccountCityId = storeBankInfo.bankAccountCityId;
            // tempBankInfo.bankName = storeBankInfo.bankName;
            // tempBankInfo.bankAccountType = storeBankInfo.bankAccountType;
            // tempBankInfo.bankAddress = storeBankInfo.bankAddress;
            // tempBankInfo.bankAccountName = storeBankInfo.bankAccountName;
            // this.$store.commit('setBankInfo', tempBankInfo);
        // }
        if (!this.$store.state.registrationTime) {
            this.$store.commit('setRegistrationTime', registrationTime)
        }
        let playerId = all.tool.getStore('playerId');
         // 获取周记录
        all.tool.send('getPlayerWeekStatus', {
            playerId: playerId
        }).then(result => {
           This.consumptionAmount = parseInt(result.data.consumptionAmount);
        });

        // 获取玩家等级信息
        all.tool.send('getAllLevel', {
            playerId: playerId
        }).then(result => {
            This.allLevelList = result.data;
        })
        let navNameList = ['information', 'search', 'changePassword', 'smsSettings', 'code']
        // 导航定位
        // let navT = this.$router.currentRoute.query.t;
        // console.log(this.$router.currentRoute)
        // if ( navT == undefined ) {
        //     this.tab(0);
        // } else {
        //     this.tab(+navT);
        // }

        let navName = this.$router.currentRoute.name;
        this.tab(navNameList.findIndex((item) => item === navName));


    }
}
</script>

<style scoped lang="less">
@import (reference) '../assets/css/variable.less';
.account {
    width: 100%;
    height: 100%;
    font-family: 'Microsoft YaHei';
    .box_userInfo {
        font-size: 0;
        .height(360);
        background: url('../assets/image/pages/account/userInfoBg.jpg') no-repeat center center;
        background-size: 100% 100%;
        text-align: left;
        .userInfo_left {
            text-align: center;
            display: inline-block;
            width: 36%;
            .height(360);
            img {
                height: 95%;
            }

        }
    }

    .userInfo_right {
        position: relative;
        display: inline-block;
        width: 64%;
        .font-size(24);
        .pt(60);

        p {
            font-weight: 700;
            .width(230);
            .height(44);
            .line-height(44);
            .pl(20);
            background: url('../assets/image/pages/account/textBg.png') no-repeat center center;
            background-size: 100% 100%;
        }

        .box_money {
            .height(100px);
            .font-size(24);
            .mt(20);
            .ml(20);
            .width(440);
            position: relative;

            span {
                display: inline-block;
                // .width(190);
                .height(42px);
                .line-height(43px);
                // .pl(50);
            }

            .balance {
                background:#0a1a26 url('../assets/image/pages/home/iconCoin.png') no-repeat left center;
                background-size: 19% auto;
                .pl(50);
                .width(220);
            }

            .score {
                background: #0a1a26 url('../assets/image/pages/home/iconScore.png') no-repeat left center;
                background-size: 20% auto;
                .width(220);
                .pl(50);
                .mb(20);
            }

            .select {
                display: inline-block;
                .width(60);
                .height(42);
                background-color: #1a8cc4;
                position: absolute;
                right: 0;
                top: 0;
                padding-left: 0;
                text-align: center;
                .font-size(24);
                // &::after {
                //     position: absolute;
                //     content: '';
                //     display: inline-block;
                //     height: 0;
                //     width: 0;
                //     border-top: 0.2rem solid #fff;
                //     border-right: 0.2rem solid transparent;
                //     border-bottom: 0.2rem solid transparent;
                //     border-left: 0.2rem solid transparent;
                //     animation: move 1s infinite linear;
                //     left: 50%;
                //     top: 50%;
                //     transform: translateX(-50%) translateY(-20%);
                // }
            }

            .box_score,.box_balance {
                position: relative;
                .width(280);
            }

            .selectScore,.selectBalance {
                position: absolute;
            }

        }

        .bar_box {
            position: relative;
            .mt(20);
            .width(420);
            .bar_box_in {
                .width(340);
                .height(40);
                .ml(20);
                background: url(../assets/image/pages/account/barBg.jpg) repeat-x;
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
                    background: url(../assets/image/pages/account/barColor.jpg) repeat-x;
                    background: auto 100%;
                    .height(40);
                    width: 0%;
                    left: 0;
                    top: 0;
                    z-index: 1;
                }

            }

            .btn {
                .width(60);
                .height(40);
                position: absolute;
                right: 0;
                top: 0;
                // font-weight: 700;
                text-align: center;
                .line-height(40);
                background-color: #1a8cc4;
                .font-size(24);
            }
        }
    }

    .box_nav {
        color: #00b7ee;
        font-size: 0;
        width: 100%;
        .height(120);
        background-color: #0c2e48;
        font-weight: 700;
        li {
            .font-size(24);
            display: inline-block;
            width: 20%;
            .height(120);
            .pt(20);
            i {
                .font-size(40);
                display: block;
                .mb(14);
            }
        }

        .icon-weimingpian {
            .pt(6);
            .mb(16);
            .font-size(34);
        }
    }

    .finger {
        .width(70);
        position: absolute;
        .left(390);
        .bottom(-60);
        animation: moveFinger 1s linear infinite;
    }

    .active {
        color: #fff;
        background:url('../assets/image/pages/account/activeBg.jpg') center center;
        background-size: 100% 100%;
    }
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
