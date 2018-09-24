/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-21 17:34:55 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-07-31 10:50:11
 */


<template>
  <div class="deposit">
    <PageTop 
      :title="title"
      :useDefaultCloseFn="false"
      @closeCallBackFn="goToHome"
    >
    </PageTop>
    
    <main>
        <div class="box_userInfo">
            <div class="userImg">
                <img :src="userImgUrl" alt="">
            </div>
            <div class="box_right">
                <p><span v-text="username" class="username"></span><span v-text="leveName" class="leveName"></span></p>
                <MoneyBox />
            </div>
            <div class="freeCount">免费提款次数 = <span class="spanText" v-text="freeTimes"></span>次&nbsp;&nbsp;&nbsp;<img src="../assets/image/pages/signIn/activityInfo.png" class="activityInfo" @click="showUpdateInfo"></div>
        </div>
        <div class="freeQuota">
            <span class="name" :class="[freeBar === '100%' ? 'open' : 'close']">自由</span>
            <div class="bar_box">
                <span>{{freeBar}}</span>
                <div class="bar" :class="[freeBar === '100%' ? 'barOpen' : 'barClose']" :style="{width: freeBar}"></div>
            </div>
        </div>
        <h5 v-if="lockList.length!=0"><div>上锁优惠</div></h5>
        <ul>
            <li class="lockPreferential" v-for="item in lockList" :key="item.name">
            <span class="name" :class="[freeBar === '100%' ? 'open' : 'close']">{{item.name}}</span>
            <div class="bar_box">
                <!-- <span>{{item.currentLockAmount/item.lockAmount*100+'%'}}</span> -->
                <span>{{item.currentLockAmount | numberToPer(item.lockAmount)}}</span>
                <div class="bar" :class="[freeBar === '100%' ? 'barOpen' : 'barClose']" :style="{width: item.currentLockAmount/item.lockAmount*100+'%'}"></div>
            </div>
            </li>
        </ul>

        <div class="box_input box_input_one" v-if="hasBankInfo">
            <div class="box_input_in">
            <label for="bankname">收款银行</label>
            <div class="box_bankInfo">
                <span class="bankName" v-text="bankName"></span>
                <span class="bankNumber">尾号:</span>
                <span class="bankNumber" v-text="bankNumLast"></span>
                <span class="goToAccount" id="goToAccount" @click="goToAccount"></span>
            </div>
            </div>
        </div>

        <div class="box_input" style="margin-top: 1rem;">
            <div class="box_input_in">
            <label for="withdrawalAmount">提款金额</label>
            <input id="withdrawalAmount" v-model="amount" autocomplete="off" type="text" placeholder="请输入提款金额(100-20万)">
            </div>
        </div>

        <BaseBtn :value="value" @callBackFn="callBack" style="margin-top: 50px;"/>
    </main>
    <div class="pageWindow" v-if="visible">
        <transition name="slide-fade">
            <div class="window_in" v-if="visibleIn">
                <div class="header">
                    <div class="window_closeBtn" @click="hideUpdateInfo"></div>
                </div>
                <div class="content">
                    <table id="updateInfo" cellspacing="0" cellpadding="0">
                        <tr>
                            <th></th>
                            <th>免费提款次数</th>
                            <th>提款手续费</th>
                        </tr>
                        <tr v-for="item in bonusSetting" :key="item.name">
                            <td>{{item.name}}</td>
                            <td>{{item.bonusCharges}}</td>
                            <td>{{item.bonusPercentageCharges}} %</td>
                        </tr>
                    </table>
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
    import PageTop from '../components/PageTop';
    import MoneyBox from '../components/MoneyBox.vue';
    import BaseBtn from '../components/BaseBtn.vue';
    export default {
    data() {
        return {
            title: '提款',
            value: '确认提款',
            currentFreeAmount: 0,     // 当前自由钱包目前已达投注额(分子)
            freeAmount: 0,            // 自由钱包要求有效投注额(分母)
            lockList: [],             // 锁定优惠列表
            amount: '',               // 输入的提款金额
            visible: false,           // 显示遮罩层
            visibleIn: false,         // 显示领取详情
            freeTimes: 0,             // 免费提款次数
            bonusSetting: null,       // 提款次数和手续费
            bankTypeIds: {
                1: '中国工商银行',
                2: '中国农业银行',
                3: '中国银行',
                4: '中国建设银行',
                5: '交通银行',
                6: '中信银行',
                7: '中国光大银行',
                8: '华夏银行',
                9: '广发银行',
                10: '平安银行',
                11: '招商银行',
                12: '兴业银行',
                13: '上海浦东发展银行',
                161: '中国邮政储蓄银行',
                169: '中国民生银行'
            },
        }
    },

    mounted() {
        let This = this;
        let playerId = all.tool.getStore('playerId');
        all.store.dispatch('getBankInfo');
        This.getWithdrawalInfo();
        This.getPlatformDetails();
    },

    filters: {
        numberToPer(currentLockAmount, lockAmount) {
            if (lockAmount == 0) return '0%';
            let per = (currentLockAmount/lockAmount).toFixed(2) * 100 + '%';
            return per
        }
    },

    computed: {
        /* 用户名 */ 
        username () {
            return this.$store.state.userName;
        },

        /* 等级名 */ 
        leveName () {
            return this.$store.state.levelName;
        },

        /* 自由额度进度条宽度 */ 
        freeBar () {
            if (this.currentFreeAmount == 0)
            return '0%';
            return Math.floor((this.currentFreeAmount/this.freeAmount)* 100) + '%';
            // return 10 + '%';
        },

        /* 是否有绑定银行卡 */ 
        hasBankInfo () {
            let This = this;
            return !all.tool.isObjectEmpty(This.$store.state.bankInfo);
        },

        /* 用户头像地址 */
        userImgUrl () {
            let str = require(`../assets/image/pages/home/headImageLv${this.$store.state.level + 1}.png`);
            return str;
        },

        /* 银行卡名称 */
        bankName () {
            return this.bankTypeIds[this.$store.state.bankInfo.bankName];
        },

        /* 银行卡号后四位 */
        bankNumLast () {
            return this.$store.state.bankInfo.bankAccount.slice(-4);
        }
    }, 
    components: {
        PageTop,
        MoneyBox,
        BaseBtn,
    },

    methods: {
        /* 提交 */
        callBack () {
            let This = this;
            if (!this.hasBankInfo) {
                all.tool.TipWinShow('请您先绑定银行卡', [{name: '前往绑定', callback: function(){
                    This.$router.push('/account');
                }}]);
                return;
            }

            if (this.amount == '') {
                all.tool.TipWinShow('请输入提款金额', [{name: '确定'}]);
                return;
            }

            if (this.amount < 100 || this.amount > 200000) {
                all.tool.TipWinShow('提款金额必须大于100，小于20万', [{name: '确定'}]);
                return;
            }

            all.tool.send('applyBonus', {
                bonusId: '001',
                amount: parseInt(This.amount)
            }, 'payment').then(result => {
                all.tool.TipWinShow('提款成功', [{name: '确定'}]);
                This.getCreditDetail();
                This.getWithdrawalInfo();
            }).catch(error => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
            
        },

        /* 获取余额 */ 
        getCreditDetail () {
            all.tool.send('getCreditDetail').then(result => {
                let balance = result.data.credit;
                // this.lockedCreditList = result.data.lockedCreditList;
                // this.lockedCreditList.map(item => {
                //     console.log(balance);
                //     console.log(item.lockCredit)
                //     console.log(item.list[0].validCredit)
                //     balance += (parseFloat(item.lockCredit) + parseFloat(item.list[0].validCredit));
                // });
                this.$store.state.balance = balance.toFixed(2);
            })
        },

        goToHome () {
            this.$router.push('/');
        },

        goToAccount () {
            this.$router.push('/account')
        },

        getWithdrawalInfo() {
            let This = this;
            all.tool.send('getWithdrawalInfo', ).then(result => {
                This.lockList = result.data.lockList;
                This.currentFreeAmount = result.data.currentFreeAmount;
                This.freeAmount = result.data.freeAmount.toFixed(2);
                This.freeTimes = result.data.freeTimes;
            })
        },

        getPlatformDetails() {
            let This = this;
            all.tool.send('getPlatformDetails', ).then(result => {
                This.bonusSetting = result.data.bonusSetting;
            })
        },

        hideUpdateInfo () {
            this.visibleIn = false;
            setTimeout(() => {
                this.visible = false;
            }, 500);
        },

        // 展示升级降级等级详情
        showUpdateInfo () {
            all.tool.clickCount({
                page: '提款',
                btn: '免费次数详情'
            });
           this.visible = true;
           setTimeout(() => {
               this.visibleIn = true;
           }, 0);
        },
    },

    watch: {
        amount (newVal, oldVal) {
            if (/[^\d]/g.test(newVal)) {
                this.amount = oldVal;
            }
        }
    }

}
</script>

<style scoped lang="less">
  @import (reference) '../assets/css/variable.less';
    .deposit {
        height: 100%;

        .close {
            background: url('../assets/image/pages/deposit/lock1.png') no-repeat 10% 45%;
            background-size: 15% auto;
        }

        .open {
            background: url('../assets/image/pages/deposit/lock2.png') no-repeat 10% 45%;
            background-size: 15% auto;
        }

        .barOpen {
            background: #80c269 !important;
        }

        .barClose {
            background: url(../assets/image/pages/account/barColor.jpg) repeat-x;
            background: auto 100%;
        }


        main {
        .rem3(padding, 40, 20, 120); 
        text-align: center;
        .font-size(30);

        .box_userInfo {
            position: relative;
            text-align: left;
            width: 100%;
            .height(140);
            .userImg {
                .width(102);
                height: 100%;
                display: inline-block;

                img {
                .width(100);
                .height(100);
                }
            }

            .box_right {
                display: inline-block;

                .username {
                    .font-size(26);
                    color: #f39800;
                }

                .leveName {
                    .ml(30);
                    .font-size(24);
                }

                p {
                    .pl(25);
                    .font-size(24);
                    .height(30);
                }
            }

            .freeCount {
                position: absolute;
                .right(20);
                top: 0;
                .font-size(24);
                color:#f39800;
            }
        }


        h5 {
            .mt(40);
            .mb(20);
            .font-size(30);
            text-align: center;
            div {
                display: inline-block;
                .width(710);
                text-align: left;
            }
        }

        li {
            .mb(20);
        }

        .freeQuota,li {
            position: relative;
            display: inline-block;
            .width(710);
            .height(100);
            background: url('../assets/image/pages/deposit/barBg.jpg') no-repeat;
            background-size: 100% 100%;
            .line-height(100);
            overflow: hidden;

            span {
                display: inline-block;
            }

            .name {
                .width(228);
                text-align: left;
                .pl(70);
            }


            .bar_box {
                display: inline-block;
                .width(444);
                .mr(20);
                .top(30);
                background: url(../assets/image/pages/account/barBg.jpg) repeat-x left top;
                background-size: auto 100%;
                border: 2px solid #4798ef;
                .border-radius(20); 
                .font-size(24);
                .line-height(36);
                position: relative;
                overflow: hidden;
                transform: rotate(0deg);

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
                width: 100%;
                left: 0;
                top: 0;
                z-index: 1;
                }

            }
        }

        .box_input {
        .mb(20);

        .box_input_in {
            .pl(20);
            text-align: left;
            display: inline-block;
            .width(708);
            .height(80);
            background-color: #060a13;
            .font-size(30);
            .line-height(78);
            border: 1px solid #079ae0;
            label {
            color: #1489bf;
            .width(130);
            }

            input {
            height: 100%;
            .pl(21);
            .width(520);
            .font-size(28);
            background-color: #060a13;
            color: #fff;
            }
        }
        }

        .box_input_one {
        .mt(20);
        .box_input_in {
            font-weight: 700;
            background-color: #0d283b !important;
            overflow: hidden;
            .box_bankInfo {
            position: relative;
            .width(554);
            span {
                display: inline-block;
                .height(74);
            }
            display: inline-block;
            .pl(21);
            .bankName {
                .font-size(35);
            }
            .bankNumber {
                .font-size(24);
                font-weight: 400;
                .line-height(85);
            }
            .goToAccount {
                .width(80);
                .height(78);
                line-height: 1.3rem;
                background-color: #1b90c8;
                position: absolute;
                .right(-10);
                top: 0;
                text-align: center;
                &::after {
                    content: '';
                    display: inline-block;
                    height: 0;
                    width: 0;
                    border-top: 0.3rem solid transparent;
                    border-right: 0.3rem solid transparent;
                    border-bottom: 0.3rem solid transparent;
                    border-left: 0.3rem solid #fff;
                    .ml(30);
                    animation: move 1s infinite linear;
                }
            }
            }

        }
        }

        }
    }

    .spanText {
        .line-height(38);
    }

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



    @keyframes move {
        from {
        transform: translateX(0);
        }
        to {
        transform: translateX(2px)
        }
    }

    @media (orientation:landscape){ 
        .deposit { 
            #goToAccount {
                .width(80);
                .height(78);
                background-color: #1b90c8;
                position: absolute;
                right: -2px;
                top: 0;
            }
        }
    }

    .activityInfo {
        .width(35);
    }

    .pageWindow {
        position: absolute;
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
            .width(600);
            // .height(612);
            display: inline-block;
            background-color: #0b1d2b;
            vertical-align: middle;
            border: 1px solid #2b7ca3;
            box-shadow: 0 0 10px 2px #2b7ca3;

            .header {
                width: 100%;
                .height(100);
                background: url(../assets/image/components/public/w.jpg) center center;
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
                        .height(60);
                        td {
                            border-bottom: 1px solid #0b1d2b;
                            border-left: 1px solid #0b1d2b;
                            .line-height(60);
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
    
    
    
</style>
