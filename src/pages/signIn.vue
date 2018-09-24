/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-25 17:33:03 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-06 19:22:51
 */


<template>
    <div class="signIn">
        <PageTop
            :title="PageTopTitle"
        />
        <div class="main">
            <div class="dateTime">
                <p>活动时间:<span v-text="startTime"></span></p>
                <p>至 <span v-text="endTime"></span></p>
            </div>
            <div class="main_content">
                <div class="box_button">
                    <input type="button" :value="refreshText" @click="refresh">
                    <input type="button" value="领取" @click="submit">
                </div>
                 <div class="box_receive">
                    <ul>
                        <li v-for="item in signInfoList" :key="item.step" :class="{last_Li:item.step==7}">
                            <div class="title" v-if="item.status!=1">第{{ item.step | changeDay}}天</div>
                            <div class="title_two" v-if="item.status==1">第{{ item.step | changeDay}}天</div>
                            <div class="receive_c">
                                <img :src="require(`../assets/image/pages/signIn/signInGold${item.status==0 ? '1' : ''}.${item.status==0 ? 'jpg' : 'png'}`)" class="gold">
                                <img src="../assets/image/pages/signIn/goldBg.png" class="light" v-if="item.status==1">
                            </div>
                            <div class="receive_b"><span v-text="item.bonus"></span>元</div>
                            <div class="received" v-if="item.status==2">
                                <img src="../assets/image/pages/signIn/received.png" class="gold">
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="main_info">
                    <p style="margin-top: 0.3rem; color: #fff100;">会员等级越高，签到荣耀奖金赠送越高 <img src="../assets/image//pages/signIn/activityInfo.png" class="activityInfo" @click="showUpdateInfo"></p>
                    <h5>申请步骤:</h5>
                    <ul>
                        <li>
                            <p>当日存款</p>
                            <p class="textColor"><span v-text="deposit"></span>元</p>
                            <p>或以上</p>
                        </li>
                        <li>
                            <p>当日有效投注额    </p>
                            <p class="textColor"><span v-text="effectiveBet"></span>元</p>
                            <p>或以上</p>
                        </li>
                        <li>
                            <p>点击(领取)</p>
                            <p class="textColor">奖金</p>
                            <p>自动添加</p>
                        </li>
                    </ul>
                    <h5>活动条款:</h5>
                    <div class="list">
                        <p>1.签到天数无需连续，一周内只要符合条件皆可累积。</p>
                        <p>2.奖金只需达『<span class="textColor" v-text="requestedTimes"></span>』流水即可提款（不限制大厅）。</p>
                        <p>3.存款、有效投注额（ <span class="textColor">仅限老虎机游戏</span>）累计时间为（每日）凌晨00:00:00至晚间23:59:59。</p>
                        <p>4.当周尚未领取的每日奖金可在下周一重新计算之前，一并领取。</p>
                        <p>5.每周一00：00：00 开始重新计算新的一轮，超出指定时间将（无法）领取上周奖金。</p>
                        <p>6.如经系统检测以任何方式、行为骗取此优惠奖金将无条件取消参与资格。</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="pageWindow" v-if="visible">
            <transition name="slide-fade">
                <div class="window_in" v-if="visibleIn">
                    <div class="header">
                        <div class="window_closeBtn" @click="hideUpdateInfo"></div>
                    </div>
                    <div class="content">
                        <table id="updateInfo" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <th v-for="item in leveNameList" :key="item">{{item}}</th>
                            </tr>
                            <tr v-for="(item,index) in signIn[0]" :key="index">
                                <td>第{{index + 1 | changeDay}}天</td>
                                <td v-for="(v,i) in signIn" :key="i">{{v[index].rewardAmount}}</td>
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
    export default {
        data () {
            return {
                PageTopTitle: '签到荣耀',
                received: false,           // 已经领取
                signInfoList: [],          // 签到信息数组
                startTime: '',             // 活动开始时间
                endTime: '',               // 活动结束时间
                deposit: '',               // 最低存款
                effectiveBet: '',          // 最低流水
                requestedTimes: '',        // 流水倍数
                refreshText: '刷新',       // 刷新按钮文本
                flag: true,                // 刷新按钮锁
                visible: false,            // 显示遮罩层
                visibleIn: false,          // 显示领取详情
                leveNameList: [],          // 等级名称数组
                signIn: [],                // 签到等级详情
        };
    },

    mounted() {
        this.getSignInfo();
        this.getLevelInfo();
        this.getRewardList();
    },

    components: {
        PageTop
    },

    computed: {},

    methods: {
        goToHome() {
            this.$router.push('/');
        },

        /* 获取等级信息 */
        getLevelInfo () {
            let This = this;
            let playerId = This.$store.state.playerId;
            all.tool.send('getAllLevel', {
                playerId: playerId
            }).then(result => {
                This.allLevelList = result.data;
                This.allLevelList.map((item, index) => {
                    This.leveNameList.push(item.name);
                })
            });
        },

        getRewardList () {
               // 获取活动信息
            all.tool.send('getRewardList').then(result => {
                result.data.map(item => {
                    if (item.code === 'attnbonus') {
                        let rewardParam = item.param.rewardParam;
                        rewardParam.map(item => {
                            this.signIn.push(item.value)
                        });
                    }
                })
            });
        },

        /* 获取签到信息 */
        getSignInfo () {
            all.tool.send('getSignInfo').then(result => {
                this.signInfoList = result.data.list;
                this.startTime = all.tool.formatTime(result.data.startTime, true);
                this.endTime = all.tool.formatTime(result.data.endTime, true);
                this.deposit = result.data.deposit;
                this.effectiveBet = result.data.effectiveBet;
                this.requestedTimes = result.data.list[0].requestedTimes + '倍';
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 领取 */
        submit () {
            let This = this;
            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '领取'
            });
            if (this.$store.state.isLogin) {
                all.tool.send('getSignBonus').then(result => {
                    all.tool.TipWinShow('恭喜您，领取成功！', [{name: '确定'}]);
                    this.getSignInfo();
                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    if (error.status == 423)
                        errorMessage = '很抱歉，您目前没有可领取的签到荣耀。注：当日存款300元，及老虎机游戏达3000流水即可免费领取。'
                    all.tool.TipWinShow(errorMessage, [{name: '马上存款', callback:() => {
                        This.$router.push('/deposit');
                    }}, {name: '马上游戏', callback:() => {
                        This.$router.push({
                            path: 'game',
                            query: {
                                page: 11
                            }
                        })
                    }}]);
                })
            } else {
                this.$router.push('/login');
            }
        },

        /* 刷新 */
        refresh () {
            if (this.$store.state.isLogin) {
                if (this.flag) {
                    this.refreshText = 3;
                    let timer = setInterval(() => {
                        if (this.refreshText === 1) {
                            clearInterval(timer);
                            this.refreshText = '刷新'
                            this.flag = true;
                        } else {
                            this.refreshText -= 1;    
                        }
                    },1000);
                    this.flag = false;
                    this.getSignInfo();
                }
            } else {
                this.$router.push('/login');
            }
        },

         // 展示升级降级等级详情
        showUpdateInfo () {
            all.tool.clickCount({
                page: '签到荣耀',
                btn: '签到荣耀领取详情'
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
    },

    filters: {
        changeDay (value) {
            let dayList = ['一', '二', '三', '四', '五', '六', '七'];
            let num = parseInt(value);
            return dayList[num - 1];
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';

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


.signIn {
    widows: 100%;
    height: 100%;
    .pb(100);
    .main {
        width: 100%;
        // .rem3(padding, 43.66%, 20, 100);
        .rem2(padding, 0, 20);
        padding-top: 32%;
        background: url('../assets/image/pages/signIn/mainBg.png') no-repeat top left;
        background-size: 100% auto;
        position: relative;
        text-align: center;
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
            .width(708);
            // .height(612);
            display: inline-block;
            background-color: #0b1d2b;
            vertical-align: middle;
            border: 1px solid #2b7ca3;
            box-shadow: 0 0 10px 2px #2b7ca3;

            .header {
                width: 100%;
                .height(100);
                background: url(../assets/image/pages/signIn/updateAlertTitle.jpg) center center;
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

   

    .dateTime {
        .width(390);
        .height(108);
        background: url('../assets/image/pages/signIn/dateBg.png') no-repeat center center;
        background-size: auto 100%;
        color: #fff100;
        .font-size(24);
        text-align: center;
        .line-height(40);
        margin-left: 18%;
        .pt(18);
    }

    .main_content {
        display: inline-block;
        .width(708);
        height: 100%;

        .box_button {
            width: 100%;
            text-align: right;
            .mt(70);
            input {
                font-weight: 700;
                color: #fff;
                .font-size(26);
                .width(160);
                .height(60);
            }

            input:nth-child(1) {
                background: url('../assets/image/components/public/btn1.png') no-repeat center center;
                background-size: 100% 100%;
                .mr(10);
            }

            input:nth-child(2) {
                background: url('../assets/image/components/public/btn2.png') no-repeat center center;
                background-size: 100% 100%;
            }
        }

    }

    .box_receive {
        width: 100%;
        .height(380);
        border: 2px solid #418cdc;
        background-color: #051421;
        .rem2(padding, 28, 18);
        position: relative;

        ul {
            width: 100%;
            text-align: left;
            font-size: 0;

            li {
                position: relative;
                font-weight: 700;
                text-align: center;
                display: inline-block;
                .height(150);
                .width(150);
                // background: url(../assets/image/pages/signIn/signInGold.png) no-repeat center 48%;
                // background-size: 35%;
                background-color: #195789;
                .font-size(24);
                .mr(20);
                // overflow: hidden;
            }

            li:nth-child(4),li:nth-child(7) {
                margin-right: 0;
            }

            li:nth-child(n+5) {
                .mt(20);
            }
        }

        .title {
            .height(40);
            .line-height(40);
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: url(../assets/image/pages/signIn/titleBg.jpg) repeat-x left top;
            background-size: auto 100%;
            z-index: 3;
        }

        .title_two {
            .height(40);
            .line-height(40);
            .width(170);
            position: absolute;
            top: 0;
            .left(-10);
            background: url(../assets/image/pages/signIn/todayTitle.png) no-repeat center center;
            background-size: 100% 100%;
            z-index: 3;
        }

        .receive_c {
            width: 100%;
            height: 100%;
            text-align: center;
            overflow: hidden;
            position: relative;
            .gold {
                width: 32%;
                .mt(50%);
                position: relative;
                z-index: 2;
            }
            .light {
                width: 100%;
                // height: 100%;
                position: absolute;
                left: 0;
                right: 0;
                // .ml(-50);
                // .mt(-55);
                z-index: 1;
                animation: rotate 10s infinite linear;
            }
        }

        .receive_b {
            position: absolute;
            bottom: 0;
            left: 0;
            .height(40);
            .line-height(44);
            background-color: rgba(0, 0, 0, .4);
            width: 100%;
        }

        .received {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: rgba(0, 0, 0, .4);
            overflow: hidden;
            z-index: 4;
            img {
                position: absolute;
                .right(5);
                .bottom(20);
                width: 40%;
            }
        }

        .last_Li {
            .width(320);
            background-size: 17%;

            .gold {
                width: 15%;
            }
            .light {
                width: 100%;
                // .left(70);
                .top(-80%);
            }
            .title_two {
                width: 106%;
            }
        }
    }

    .main_info {
        .font-size(24);
        h5 {
            .mt(40);
            .mb(25);
            text-align: left;
            .font-size(30);
            color: #1692c6;
        }

        ul{
            width: 100%;
            font-size: 0;

            li:nth-child(n+2) {
                .ml(25);
            }

            li:nth-child(1) {
                background: url('../assets/image/pages/signIn/step1.png') no-repeat  center 4%;
                background-color: #06243b;
                background-size: 90% auto;
            }

            li:nth-child(2) {
                background: url('../assets/image/pages/signIn/step2.png') no-repeat center 4%;
                background-color: #06243b;
                background-size: 90% auto;
            }

            li:nth-child(3) {
                background: url('../assets/image/pages/signIn/step3.png') no-repeat center 4%;
                background-color: #06243b;
                background-size: 90% auto;
            }

            li {
                .font-size(24);
                font-weight: 700;
                display: inline-block;
                .width(200);
                .height(180);
                .pt(53);
                .line-height(35);
            }

            
        }
    }

    .list {
        text-align: left;
        .line-height(50);
    }

    .textColor {
        color: #f39800;
    }

    @keyframes rotate {
        form {
            transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
    }

}

</style>