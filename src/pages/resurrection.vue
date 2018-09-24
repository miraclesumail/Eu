/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-27 20:46:15 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-06 19:30:03
 */

<template>
    <div class="resurrection">
         <PageTop
            :title="PageTopTitle"
        />
        <div class="main" :style="{background: pageBg}">
            <div class="content">
                <div class="bgInfo">
                    在这片王者大陆，加冕的英雄，永远受到上天的庇护。当您的能量消耗殆尽，戴上您的<span class="textColor">复活之钻</span>，让自己再次拥有无穷的能量，去统治这片属于您的大陆吧！
                </div>
                <div class="box_start">
                    <ProgressCircle class="progress" :radius="radius" :percent="percent"/>
                    <img :src="require(`../assets/image/pages/resurrection/start${startAmount >= 10 ? 2 : 1}.png`)" alt="">
                    <span class="bar_num" v-text="percentage"></span>
                </div>
                <div class="submit" :style="{background: btnBg}" @click="beforeSubmit">
                    <img src="../assets/image/pages/resurrection/info.png" @click.stop="showInfo">
                </div>
                <p class="title"></p>
                <div class="activityItem">
                    <h5><span>领取步骤</span></h5>
                    <p>1）凡在凌晨 00:00:00 - 23:59:59，单日累积净输值{{getLevelInfo(0, 'minLoseAmount')}}或以上</p>
                    <p>2）进入查看进度条达 100%</p>
                    <p>3）点击（立即复活）即可获得最高 {{getLevelInfo(4, 'rewardPercent')}}% 输值返利。</p>
                    <p style="color: #f39800;">*温馨提醒：不同等级将获增相对应的输值比率</p>
                    <h5><span>计算方式</span></h5>
                    <h5>净输值 = （单日投注输赢 - 优惠金额 - 洗码金额） * {{getLevelInfo(4, 'rewardPercent')}}%（LV.5 刘备）</h5>
                    <p>例1：李白今日输了400元，今日申请优惠50元，今日获得洗码10元，可领取输值返利 =（400-50-10）* {{getLevelInfo(1, 'rewardPercent')}}% = {{(400-50-10) * (getLevelInfo(1, 'rewardPercent') / 100)}}元（LV.2 张飞）</p>
                    <p>例2：李白今日输了400元，今日申请优惠50元，今日获得洗码10元，可领取输值返利 =（400-50-10）* {{getLevelInfo(4, 'rewardPercent')}}% = {{(400-50-10) * (getLevelInfo(4, 'rewardPercent') / 100)}}元（LV.5 刘备）</p>
                    <h5><span>领取规则</span></h5>
                    <p>1）复活之钻须不低于10元方可申请，单日最高上限{{getLevelInfo(4, 'maxReward')}}元，并完成复活之钻的{{getLevelInfo(0, 'spendingTimes')}}倍有效投注额方可申请提款。<span style="color: #f39800;">（不同会员等级将有所不同）。</span></p>
                    <p>2）<span style="color: red;">此活动仅限（老虎机游戏）投注额参与</span>，每日/每人只可领取一次。请在系统收录投注输赢完毕后，再进行领取。</p>
                    <p>3）为避免文字理解之差异，易游拥有最终解释权，并拥有随时修改优惠，终止优惠的权力。</p>
                </div>
            </div>
        </div>

        <div class="pageWindow" v-if="visible">
            <transition name="slide-fade">
                <div class="window_in" v-if="visibleIn">
                    <div class="header">
                        <div class="window_closeBtn" @click="hidden"></div>
                    </div>
                    <div class="content">
                        <table id="updateInfo" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>会员等级</th>
                                <th>输值返利比例</th>
                                <th>最高返利金额</th>
                            </tr>
                            <tr v-for="item in levelList" :key="item.levelId">
                                <td>{{item.levelName}}</td>
                                <td>{{item.value[0].rewardPercent}}%</td>
                                <td>{{item.value[0].maxReward}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>

<script>
import ProgressCircle from '../components/ProgressCircle';
import PageTop from '../components/PageTop';
    export default {
        data () {
            return {
                PageTopTitle: '复活之钻',
                radius: '3.7rem',                  // 进度条直径
                percent: 0,                        // 进度
                startAmount: 0,                    // 复活之钻金额
                minAmount: 10,                     // 最小领取金额
                activityInfo: {},                  // 优惠详情
                visible: false,
                visibleIn: false,
                levelName: ['LV.1 小兵', 'LV.2 张飞', 'LV.3 关羽', 'LV.4 孔明', 'LV.5 刘备']

        };
    },

    created() {
        all.tool.send('getRewardList').then(result => {
            result.data.map(item => {
                if (item.code === 'lostreward') {
                    this.activityInfo = item;
                }
            })
        });
    },

    mounted() {
        all.tool.send('getPlayerAnyDayStatus', {
            startTime: this.getDateStr(0)
        }).then(result => {
            let today = this.getDateStr(0);
            if (all.tool.getLocal('resurrection') == today) {
                return;
            }
            if (result.data.bonusAmount >= 0) 
                return;
            this.startAmount = (Math.abs(result.data.bonusAmount) - result.data.rewardAmount) * (this.getLevelInfo(this.level, 'rewardPercent') / 100);
            let temp = isNaN(this.startAmount / this.minAmount) ? 0 : this.startAmount / this.minAmount;
            this.percent = parseFloat(temp.toFixed(1)) > 1 ? 1 : parseFloat(temp.toFixed(1));
           
        });
    },
    components: {
        PageTop,
        ProgressCircle
    },

    computed: {

        /* 会员当前等级 */ 
        level() {
            return this.$store.state.level
        },

        /* 显示的百分比 */ 
        percentage () {
            return  this.percent * 100 + '%';
        },

        /* 提交按钮背景 */
        btnBg () {
            return 'url(' + require(`../assets/image/pages/resurrection/btn${this.startAmount >= 10 ? 2 : 1}.png`) + ') no-repeat center center/100% 100%';
        },

        /* 页面背景图 */
        pageBg () {
            return 'url(' + require(`../assets/image/pages/resurrection/pageBg${this.startAmount >= 10 ? 2 : 1}.jpg`) + ') no-repeat top center/100% auto'; 
        },

        /* 等级配置信息 */ 
        levelList() {
            if (this.activityInfo.param) {
                let list = this.activityInfo.param.rewardParam;
                list.map((item, i) => {
                    item.levelName = this.levelName[i]
                });
                return list;
            }
        }
    },

    methods: {
        goToHome() {
            this.$router.push('/');
        },

        /* 领取前 */ 
        beforeSubmit() {
            all.tool.TipWinShow('<p style="font-size: 0.4rem;">每人/ 每日 仅限领取一次！</p>注：系统收录投注需（30分钟）请在收录完毕后再领取！',[{name: '否, 稍后领取'}, {name: '是, 现在领取', callback: this.submit}]);
        },

        /* 领取复活之钻 */
        submit () {
            let This = this;
            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '立即复活'
            });
            all.tool.send('applyRewardEvent', {
                code: 'lostreward'
            }).then(result => {
                this.startAmount = 0;
                this.percent = 0;
                all.tool.TipWinShow(null, {type: 'resurrection', data: {
                    resurrectionAmount: result.data.rewardAmount.toFixed(2)
                }}, [{name: '确定'}], '复活之钻');
                all.tool.setLocal('resurrection', This.getDateStr(0));
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 获取从今天起的任何哪一天 */
        getDateStr (num) {
            var dd = new Date();
            dd.setDate(dd.getDate()+num); // 获取AddDayCount天后的日期
            var y = dd.getFullYear();
            var m = dd.getMonth()+1; // 获取当前月份的日期
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        },

        /* 获取等级数据 */
        getLevelInfo(level, key) {
            if (this.levelList) {
                return this.levelList[level] ? this.levelList[level].value[0][key] : 0;
            } else {
                return '---'
            }
        },

        showInfo() {
            this.visible = true;
            setTimeout(() => {
                this.visibleIn = true;
            }, 0);
        },

        hidden () {
            this.visibleIn = false;
            setTimeout(() => {
                this.visible = false;
            }, 500);
        },
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';
.resurrection {
    width: 100%;
    height: 100%;
    text-align: center;
    .font-size(20);
    .main {
        .rem4(padding, 243, 20, 100, 20);
        // background: url('../assets/image/pages/resurrection/pageBg1.jpg') no-repeat top center/100% auto;
        // background-size: 100% auto;
        width: 100%;
        .content {
            display: inline-block;
            .width(708);
            .height(1000);
           
        }
    }

    .bgInfo {
        text-indent: 2em;
        .width(308);
        // .height(220);
        background: url('../assets/image/pages/resurrection/textBg.png') no-repeat center center;
        background-size: 100% 100%;
        text-align: left;
        .rem(padding, 20);
        text-align: justify;
    }

    .textColor {
        color: #f39800;
    }

    .box_start {
        position: relative;
        .mt(136);
        background: url('../assets/image/pages/resurrection/startBg.png') no-repeat center center;
        background-size: 37.6%;

        img {
            position: absolute;
            top: -20%;
            left: 50%;
            transform: translateX(-50%);
            .height(193);
            .width(140);
        }

        .bar_num {
            position: absolute;
            right: 50%;
            bottom: 50%;
            .font-size(52);
            color: #dd8413;
            font-weight: 700;
            transform: translateX(60%) translateY(130%);
        }
    }

    .submit {
        display: inline-block;
        position: relative;
        .mt(73);
        .width(322);
        .height(80);
        // background: url('../assets/image/pages/resurrection/btn1.png') no-repeat center center/100% 100%;
        // background-size: 100% 100%;

        img {
            position: absolute;
            .right(-50);
            .top(-20);
        }

    }

    .title {
        .mt(80);
        .mb(60);
        width: 100%;
        .height(36);
        background: url('../assets/image/pages/resurrection/title.png') no-repeat center center;
        background-size: 100% 100%;
    }

    .activityItem {
        text-align: left;
        h5 {
            color: #f39800;
            .font-size(24);
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
                    background-color: #f39800;
                    position: absolute;
                    left: 0;
                    .top(7);
                }
            }

        }

        p {
            .mb(40);
        }
    }

    .startImg {
       
        position: absolute;
        top: 0;
        left: 0;
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
                background: url(../assets/image/pages/resurrection/alertTitle.jpg) center center;
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
                        .height(50);
                        .line-height(50);

                        td {
                            border-bottom: 1px solid #0b1d2b;
                            border-left: 1px solid #0b1d2b;

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


</style>