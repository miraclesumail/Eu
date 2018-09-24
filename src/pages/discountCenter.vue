<template>
    <div class="discount_center">
        <PageTop
            :title="PageTopTitle"
        />
        <div class="main">
            <ul class="main_box">
                <li v-for="item in itemInit" :key="item.index" @click="open(item.callback, item.name)" v-if="item.show">
                    <div class="mb_title" v-if="item.title !== 0" :class="[item.title !== 4 ? 'rightClass' : 'leftClass']">
                        <img :src="item.titleUrl">
                    </div>
                    <div class="mb_bg">
                        <img :src="item.imgUrl" v-show="!item.showAnimate">
                    </div>
                    <p>
                        <img :src="item.textUrl">
                    </p>
                    <transition name="animate-box">
                        <div class="animate_box" v-show="item.showAnimate">
                            <img :src="item.newImg ? item.newImg : item.imgUrl" width="100%" height="100%" class="baseAnimateClass" :class="[item.customizeClass ? item.customizeClass : 'defAnimateCls']">
                        </div>
                    </transition>
                </li>
            </ul>
        </div>

        <transition name="bgbounce">
            <div class="bg_box" v-if="showBg">

                <!-- 开户首存AB -->
                <transition name="bounce">
                    <div class="firstSave" v-if="firstPromoShow">
                        <img class="ImgPic" src="../assets/image/pages/home/firstSave.png"/>
                        <img @click="closeDiscount('firstPromoShow')" class="closeFirst" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>
                        <div class="content">
                            <p>
                                <span class="title"><b v-text="firstDiscountInfo.A.name"></b></span>
                                <span class="text">最低存款<i v-text="firstDiscountInfo.A.info.minTopUpAmount"></i>元</span>
                                <span class="text">最高赠送<i v-text="firstDiscountInfo.A.info.maxRewardInSingleTopUp"></i>元</span>
                                <span><img @click="depisitDetail('A')" src="../assets/image/pages/home/detail.png"/></span>
                            </p>
                            <p>
                                <span class="title"><b v-text="firstDiscountInfo.B.name"></b></span>
                                <span class="text">最低存款<i v-text="firstDiscountInfo.B.info.minTopUpAmount"></i>元</span>
                                <span class="text">最高赠送<i v-text="firstDiscountInfo.B.info.maxRewardInSingleTopUp"></i>元</span>
                                <span><img @click="depisitDetail('B')" src="../assets/image/pages/home/detail.png"/></span>
                            </p>
                        </div>
                        <p class="btnBar">
                            <img @click="getFirstDeposit('A')" src="../assets/image/pages/home/firstBtn.png"/>
                            <img @click="getFirstDeposit('B')" src="../assets/image/pages/home/firstBtn.png"/>
                        </p>
                        <p class="tip">注：新开户首2笔存款均可申请</p>
                    </div>
                </transition>

                <!-- 日首存 -->
                <transition name="bounce">
                    <div v-if="dayFirstShow" class="elsePromo">
                        <img class="imgBg" src="../assets/image/pages/home/elsePromo.png"/>
                        <img class="close" @click="closeDiscount('dayFirstShow')" src="../assets/image/pages/home/elsex.png"/>
                        <span class="minDeposit" v-text="dayFirstInfo.content.minDeposit"></span>
                        <span class="betTimes" v-text="dayFirstInfo.content.betTimes"></span>
                        <span class="promoLimit" v-text="dayFirstInfo.content.promoLimit"></span>
                        <span class="promoRate" v-text="dayFirstInfo.content.promoRate"></span>
                        <img v-if="dayFirstInfo.status" @click="getPromo" class="getPromo" src="../assets/image/pages/home/getPromo.png"/>
                        <img v-if="!dayFirstInfo.status" class="getPromo" src="../assets/image/pages/home/getPromoX.png"/>
                        <img v-if="!dayFirstInfo.status" @click="goPromo" class="goPromo" src="../assets/image/pages/home/goPromo.png"/>
                        <img @click="promoDetail" class="promoDetail" src="../assets/image/pages/home/promoDetail.png"/>
                    </div>
                </transition>


                 <!-- 开户大转盘 -->
                <transition name="bounce">
                    <div class="sendAmountWin" v-if="rotateshow">
                        <img class="bg" src="../assets/image/components/tipWindow/sendAmount.png"/>
                        <!--<p class="amount animaM"><span><img :src="amountNum[Num1]"></span><span><img :src="amountNum[Num2]"></span><span><img :src="amountNum[Num3]"></span></p>-->
                        <p class="amount"><img class="rotate" src="../assets/image/components/tipWindow/sendAmountDisk.png"/></p>
                        <img class="point" src="../assets/image/components/tipWindow/sendAmountPoint.png"/>
                        <img class="close" @click="closeDiscount('rotateshow')" src="../assets/image/components/tipWindow/sendAmountClose.png" height="63" width="56"/>
                        <img class="over" src="../assets/image/components/tipWindow/sendAmountDiskOver.png"/>
                        <span class="getBtn" @click="diskplay"></span>
                    </div>
                </transition>
                <!-- 开户大转盘领奖弹窗 -->
                <transition name="bounce">
                    <div class="firstRegister" v-if="rotateAmount">
                        <div class="sendAmountWin">
                            <img class="prizeGot" src="../assets/image/pages/home/getAmount.png" height="auto" width="100%"/>
                            <img class="bgAnima" src="../assets/image/pages/home/sendAnima.png" height="auto" width="100%"/>
                            <p class="text"><span v-text="rotateInfo.amount + '元体验金！'"></span></p>
                            <span class="closeBtn" @click="closeDiscount('rotateAmount')"></span>
                        </div>
                    </div>
                </transition>

                <!--易博活动-->
                <transition name="bounce">
                    <div class="firstSave" v-if="yiboshow" >
                        <img class="ImgPic" src="../assets/image/pages/home/firstSave-b.png"/>
                        <img @click="closeDiscount('yiboshow')" class="closeFirst" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>
                        <div class="content" >
                            <p>
                                <span class="title"><b>{{ebetInfo.depositA.name}}</b></span>
                                <span class="text">存 <i>{{ebetInfo.depositA.minTopUpAmount}} </i>元</span>
                                <span class="text">送 <i>{{ebetInfo.depositA.maxRewardInSingleTopUp}}</i> 元</span>
                                <span><img @click="depisitDetailebet('A')" src="../assets/image/pages/home/detail.png"/></span>
                            </p>
                            <p>
                                <span class="title"><b>{{ebetInfo.depositB.name}}</b></span>
                                <span class="text">存 <i>{{ebetInfo.depositB.minTopUpAmount}}</i> 元</span>
                                <span clasUs="text">送 <i>{{ebetInfo.depositB.maxRewardInSingleTopUp}}</i> 元</span>
                                <span><img @click="depisitDetailebet('B')" src="../assets/image/pages/home/detail.png"/></span>
                            </p>
                        </div>
                        <p class="btnBar">
                            <img @click="getFirstDepositebet('A')" src="../assets/image/pages/home/firstBtn.png"/>
                            <img @click="getFirstDepositebet('B')" src="../assets/image/pages/home/firstBtn.png"/>
                        </p>
                        <p class="tip">
                            <span>限时优惠时间：2018/ 08/ 20 （周一）中午 12:00 ~ 2018/ 08/ 25 （周六）中午 12:00</span>
                        </p>
                    </div>
                </transition>

                <!--积分加码活动活动-->
                <transition name="bounce">
                    <div class="firstSave" v-if="jifenshow" >
                        <img class="ImgPic jifen" @click="pushTask" src="../assets/image/pages/home/sendJifen.jpg"/>
                        <img @click="closeDiscount('jifenshow')" class="closeFirst closeJifen" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>
                    </div>
                </transition>

                <!--全民夺宝活动-->
                <transition name="bounce">
                    <div class="firstSave" v-if="duobaoshow" >
                        <img class="ImgPic" src="../assets/image/pages/home/firstSave-c.png"/>
                        <img @click="closeDiscount('yiboshow')" class="closeFirst" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>
                        <div class="content" >
                            <p>
                                <span class="title"><b>{{duobaoInfo.depositA.name}}</b></span>
                                <img class="gold_yb" src="../assets/image/pages/home/gold_yb.png" />
                                <span class="text">存 <i>{{duobaoInfo.depositA.minTopUpAmount}} </i>送 <i>{{duobaoInfo.depositA.rewardAmount}} </i></span>
                                <span><img @click="depisitDetailduobao('A')" src="../assets/image/pages/home/detail.png"/></span>
                            </p>
                            <p>
                                <span class="title"><b>{{duobaoInfo.depositB.name}}</b></span>
                                <span class="text">存送<i>{{duobaoInfo.depositB.rewardPercentage*100}}%</i> </span>
                                <span class="text">最低存<i>{{duobaoInfo.depositB.minTopUpAmount}}</i> 元</span>
                                <span class="text">红利高达<i>{{duobaoInfo.depositB.maxRewardInSingleTopUp}}</i> 元</span>
                                <span><img @click="depisitDetailduobao('B')" src="../assets/image/pages/home/detail.png"/></span>
                            </p>
                        </div>
                        <p class="btnBar">
                            <img @click="getFirstDepositduobao('A')" src="../assets/image/pages/home/firstBtn.png"/>
                            <img @click="getFirstDepositduobao('B')" src="../assets/image/pages/home/firstBtn.png"/>
                        </p>
                        <p class="tip">
                            <span>优惠时间:{{duobaoInfo.depositA.validStartTime}}</span>
                        </p>
                    </div>
                </transition>
            </div>
         </transition>
    </div>
</template>

<script>
import PageTop from '../components/PageTop';
export default {
    data () {
        return {
            PageTopTitle: '优 惠 中 心',
            ebetGameId: '',                      // ebet真人游戏id
            timer: -1,                           // 保存当前运行动画定时器
            animateIndex: 0,
            depositList: [],                     // 充值记录数组
            showBg: false,
            firstPromoShow: false,               // 显示开户首存AB
            dayFirstShow: false,                 // 显示日首存
            rotateshow: false,                   // 显示开户大转盘
            yiboshow: false,                     // 显示易博奖励
            duobaoshow: false,                     // 显示全民夺宝奖励奖励
            jifenshow: false,                   // 显示积分加码活动

            rotateAmount: false,                 // 显示开户大转盘领奖弹窗
            allDiscount: [],                     // 所有优惠
            allDiscountCode: ['egg','jifen'],    // 所有可用优惠code
            firstDiscountInfo: {                 // 首存AB信息
                A: {},
                B: {}
            },
            ebetInfo: {                          //ebet活动
                depositA:{},
                depositB:{},
            },
            duobaoInfo: {                          //全名夺宝活动
                depositA:{},
                depositB:{},
            },
            dayFirstInfo: {},                    // 存放日首冲信息
            rotateInfo: {                        // 开户大转盘信息
                status: 1,
                amount: 0
            },
            itemInit:[
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemHitEgg.png'),
                    textUrl: require('../assets/image/pages/discountCenter/promohitegg_text.png'),
                    newImg: require('../assets/image/pages/discountCenter/egg_animat.gif'),             // 动画为新图的时候
                    title: 0,                                                                           // 0 无 1 电子  2 真人  3 捕鱼 4 自由
                    titleUrl: '',
                    index: 7,
                    delay: 3000,                                                                        // 动画多久关闭
                    callback: 'eggFn',
                    code: 'egg',
                    name: '砸金蛋',
                    show: true,
                    showAnimate: false,
                    customizeClass: 'eggAnimateClass'                                                   // 自定义类型
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemBox.png'),
                    textUrl: require('../assets/image/pages/discountCenter/promobox_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 5,
                    callback: 'promoboxFn',
                    code: ['depositbonus20', 'depositbonus38'],
                    name: '超值礼盒',
                    show: true,
                    showAnimate: false,
                    customizeClass: 'promoboxClass'
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemFirst.png'),
                    textUrl: require('../assets/image/pages/discountCenter/itemFirst_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 4,
                    callback: 'dayFirstFn',
                    code: 'dailydeposit',
                    name: '每日首存',
                    show: false,
                    showAnimate: false,
                    customizeClass: 'dayFirstClass'
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemFcs.png'),
                    textUrl: require('../assets/image/pages/discountCenter/tree_text.png'),
                    title: 4,
                    titleUrl: '',
                    index: 6,
                    delay: 2000,
                    callback: 'treeFn',
                    code: 'fcs',
                    name: '摇钱树',
                    show: true,
                    showAnimate: false,
                    customizeClass: 'treeClass'
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemLive.png'),
                    textUrl: require('../assets/image/pages/discountCenter/resurrection_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 8,
                    callback: 'resurrectionFn',
                    code: 'lostreward',
                    name: '复活之钻',
                    show: true,
                    showAnimate: false,
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemSign.png'),
                    textUrl: require('../assets/image/pages/discountCenter/signIn_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 9,
                    callback: 'signInFn',
                    code: 'attnbonus',
                    name: '签到荣耀',
                    show: true,
                    showAnimate: false,
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemFirstRegister.png'),
                    textUrl: require('../assets/image/pages/discountCenter/itemFirstRegister_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 3,
                    callback: 'itemFirstRegisterFn',
                    code: ['firstdepositA', 'firstdepositB'],
                    name: '开户首存',
                    show: true,
                    showAnimate: false,
                    customizeClass: 'FirstRegisterCls'
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/rotate.png'),
                    textUrl: require('../assets/image/pages/discountCenter/rotate_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 2,
                    callback: 'rotateFn',
                    code: 'REGISTERBONUS',
                    name: '开户大转盘',
                    show: true,
                    showAnimate: false,
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemebet.png'),
                    textUrl: require('../assets/image/pages/discountCenter/ebet_text.png'),
                    title: 0,
                    titleUrl: '',
                    index: 1,
                    callback: 'renrenInFn',
                    code: ['eBETslot', 'eBETlive'],
                    name: '易博',
                    show: false,
                    showAnimate: false,
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemjifen.png'),
                    textUrl: require('../assets/image/pages/discountCenter/jifen_text.png'),
                    title: 1,                                                                           // 0 无 1 电子  2 真人  3 捕鱼 4 自由
                    titleUrl: '',
                    index: 10,
                    callback: 'jifenInFn',
                    code: 'jifen',
                    name: 'ebet积分加码',
                    show: true,
                    showAnimate: false,
                },
                {
                    imgUrl: require('../assets/image/pages/discountCenter/itemduobao.png'),
                    textUrl: require('../assets/image/pages/discountCenter/duobao_text.png'),
                    title: 1,
                    titleUrl: '',
                    index: 11,
                    callback: 'duobaoInFn',
                    code: ['SYDB','FKDB'],
                    name: '全面夺宝',
                    show: true,
                    showAnimate: false,
                }

            ]
        };
    },

    created() {
        if ( all.tool.getStore('token')) {
            all.tool.send('getTopupList', {
                startIndex: 0,
                requestCount: 10
            }).then(result => {
                this.depositList = result.data.records;
            });
        }

        all.tool.send('getRewardList').then( result => {
            this.allDiscount = result.data;
            let data = {};
            data.isShow = true;

            result.data.map( item => {
                this.allDiscountCode.push(item.code);
                if (item.code==='firstdepositA') {
                    this.$set(this.firstDiscountInfo.A, 'info', item.param.rewardParam[0].value[0]);
                    this.$set(this.firstDiscountInfo.A, 'largeSned', item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock);
                    this.$set(this.firstDiscountInfo.A, 'name', item.name);
                }
                if (item.code === 'firstdepositB') {
                    this.$set(this.firstDiscountInfo.B, 'info', item.param.rewardParam[0].value[0]);
                    this.$set(this.firstDiscountInfo.B, 'name', item.name);
                }
                // if(item.code === 'eBETslot'){
                //     // A电子
                //     data.depositA = item.param.rewardParam[0].value[0];
                //     data.depositA.code = item.code;
                //     data.depositA.largeSned = item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock;
                //     data.depositA.name = item.name;
                // }
                // if (item.code === 'eBETlive') {
                //     // B真人
                //     data.depositB = item.param.rewardParam[0].value[0];
                //     data.depositB.code = item.code;
                //     data.depositB.name = item.name;
                // }
                //

                if(item.code === 'SYDB'){
                    // 十元夺宝
                    data.depositA = item.param.rewardParam[0].value[0];
                    data.depositA.code = item.code;
                    data.depositA.largeSned = item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock;
                    data.depositA.name = item.name;

                    let validStartTime=new Date(item.validStartTime)
                    let validEndTime=new Date(item.validEndTime)

                    data.depositA.validStartTime=`${validStartTime.getFullYear()}/${validStartTime.getMonth()+1}/${validStartTime.getDate()} ${validStartTime.getHours()}:${validStartTime.getMinutes()} - ${validEndTime.getFullYear()}/${validEndTime.getMonth()+1}/${validEndTime.getDate()} ${validEndTime.getHours()}:${validEndTime.getMinutes()}`;
                }
                if (item.code === 'FKDB') {
                    // 疯狂夺宝
                    data.depositB = item.param.rewardParam[0].value[0];
                    data.depositB.code = item.code;
                    data.depositB.name = item.name;
                }

            });
            this.setItems();
            this.interval(() => {
                let animateIndex = this.animateIndex;
                let delay = this.itemInit[animateIndex].delay
                this.itemInit[animateIndex].showAnimate = true;
                setTimeout(() => {
                    this.itemInit[animateIndex].showAnimate = false;
                }, delay ? delay : 1000);
                this.animateIndex++;
                if (this.animateIndex === this.itemInit.length) {
                    this.animateIndex = 0;
                }
            }, 2500, this.setGlobalTimeout);

//ebet活动
//             this.ebetInfo.depositA = data.depositA
//             this.ebetInfo.depositB = data.depositB
// 全名夺宝
            this.duobaoInfo.depositA = data.depositA
            this.duobaoInfo.depositB = data.depositB


        });

        all.tool.send('getGameGroupInfo', {
            code: 61,
            startIndex: 0,
            requestCount: 12
        }).then(result => {
           this.ebetGameId = result.data.games.gameList[0].game.gameId;
        }).catch(error => {
            let errorMessage = error.errorMessage || '未知错误'
            all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
        });

    },

    beforeDestroy() {
        clearTimeout(this.timer);
        console.log('清除定时器:' + this.timer);
    },

    components: {
        PageTop
    },

    computed: {
        // items () {
        //     return this.setItems();
        // },

        isLogin() {
            return this.$store.state.isLogin;
        }
    },

    methods: {
        
        setItems() {
            let processItems = this.itemInit.concat([]);
            let itemCode = '';
            let count = 0;
            for(let i = 0; i < processItems.length; i++) {
                switch(processItems[i].title) {
                    case 1:
                        processItems[i].titleUrl = require('../assets/image/pages/discountCenter/electronic_title.png');
                        break;
                    case 2:
                        processItems[i].titleUrl = require('../assets/image/pages/discountCenter/person_title.png');
                        break;
                    case 3:
                        processItems[i].titleUrl = require('../assets/image/pages/discountCenter/fish_title.png');
                        break;
                    case 4:
                        processItems[i].titleUrl = require('../assets/image/pages/discountCenter/all_title.png');
                        break;
                }
                itemCode = processItems[i].code;
                count = 0;
                if (Array.isArray(itemCode)) {
                    itemCode.map(item => {
                        this.allDiscountCode.includes(item) && count++;
                    });
                    if (count !== itemCode.length) processItems[i].show = false;
                } else {
                    if (!this.allDiscountCode.includes(itemCode)) processItems[i].show = false;
                }

                if (!processItems[i].show) {
                    processItems.splice(i, 1);
                    i--;
                }
            }
            this.itemInit = this.sort(processItems, 'index');
        },

        open (name, btnName) {
            this[name]();
            all.tool.clickCount({page:'优惠中心', btn:btnName});
        },

        eggFn () {
            all.router.push('/promohitegg');
        },

        promoboxFn () {
            all.router.push('/promobox');
        },

        dayFirstFn () {
            all.tool.send('getSlotInfo', {
                code:'dailydeposit',
                hideLoading: true
            }).then( result => {
                let status = result.data.list[0].status === 2 ? false : true;
                this.$set(this.dayFirstInfo, 'status', status);
                this.$set(this.dayFirstInfo, 'content', result.data.list[0]);
                this.showDiscountWin('dayFirstShow');
            }).catch( err => all.tool.TipWinShow(err.errorMessage, [{name:'确定'}]) );
        },

        treeFn () {
            all.router.push('/tree');
        },

        resurrectionFn () {
            all.router.push('/resurrection');
        },

        signInFn () {
            all.router.push('/signIn');
        },

        itemFirstRegisterFn () {
            if (this.depositList.length < 3) {
                this.showDiscountWin('firstPromoShow');
            } else {
                all.tool.TipWinShow('存款笔数不符合领取条件，请参考其他优惠！', [{ name: '确定' }]);
            }
        },

        rotateFn () {
            this.showDiscountWin('rotateshow');
        },
        renrenInFn () {
          this.showDiscountWin('yiboshow');
        },
        duobaoInFn () {
          this.showDiscountWin('duobaoshow');
        },
        jifenInFn () {
          this.showDiscountWin('jifenshow');
        },
        /* 打开优惠弹窗 */
        showDiscountWin (name) {
            this.showBg = true;
            setTimeout(() => {
                this[name] = true;
            }, 100);
        },

        /* 关闭优惠弹窗 */
        closeDiscount (name) {
            this[name] = false;
            setTimeout(() => {
                this.showBg = false;
            }, 300);
        },

        /* 切换弹窗 */
        changeWin(closeWinName, openWinName) {
            this[closeWinName] = false;
            setTimeout(() => {
                this[openWinName] = true;
            }, 200);
        },

        /* 点击首存AB下方问号 */
        depisitDetail(type) {
            if (type === 'A') {
                all.tool.clickCount({
                    page:'优惠中心',
                    btn:'首存A优惠详情'
                });


            } else {
                all.tool.clickCount({
                    page:'优惠中心',
                    btn:'首存B优惠详情'
                });
            }

            let str = `<ul style='text-align:left;font-size:0.32rem;line-height:0.5rem'>
                            <li>1. 此优惠仅限新会员[首笔存款]后，[尚未投注]前申请有效，过期无法领取。</li>
                            <li>
                                2. 此优惠仅需完成${ type === 'A' ? this.firstDiscountInfo.A.info.spendingTimes : this.firstDiscountInfo.B.info.spendingTimes}倍流水方可提款，
                                如：存款${ type === 'A' ? '10' : '100' })元，领取优惠${ type === 'A' ? '10' : '100'}元，
                                需完成${ type==='A' ? '(10+10)*' + this.firstDiscountInfo.A.info.spendingTimes + '=' + parseInt(this.firstDiscountInfo.A.info.spendingTimes) * 20 : '(100+100)*' + this.firstDiscountInfo.B.info.spendingTimes + '='+parseInt(this.firstDiscountInfo.B.info.spendingTimes) * 200}
                            </li>
                            <li style='display: ${ type === 'A' ? 'block' : 'none' }'>
                                3. 领取优惠后最高提款上限${this.firstDiscountInfo.A.largeSned}元，提款时系统将会扣除多出余额。<br/>
                                4. 领取优惠后仅限参与电子厅，真人游戏、捕鱼厅无法参与此优惠。
                            </li>
                            <li style='display: ${type === 'B' ? 'block' : 'none'}'>
                                3. 领取优惠后仅限参与电子厅，真人游戏、捕鱼厅无法参与此优惠。
                            </li>
                        </ul>`

            all.tool.TipWinShow(str, [{name:'确定'}], '优惠详情');
        },

        /* 点击ebetAB下方问号 */
        depisitDetailebet(type) {
          let str=""
            if (type === 'A') {
                all.tool.clickCount({
                  page:'优惠中心',
                  btn:'首存A优惠详情'
                });
              str=`<ul class="dielog_bon" style='text-align: left;font-size: 14px'>
          <li>1. 此优惠仅限在（存款成功）后，（尚未投注）前，申请才为有效。</li>
          <li>2. 优惠名额： 限每日前100位会员申请 ； 每人/每日仅限一次。 </li>
          <li>3. 此优惠仅需完成（存款 + 优惠金额）的 ${this.ebetInfo.depositA.spendingTimes} 倍流水方可提款。如：存款 ${this.ebetInfo.depositA.minTopUpAmount}元，领取优惠 ${this.ebetInfo.depositA.maxRewardInSingleTopUp}元，需完成（${this.ebetInfo.depositA.minTopUpAmount} +${this.ebetInfo.depositA.maxRewardInSingleTopUp}）* ${this.ebetInfo.depositA.spendingTimes} = ${(this.ebetInfo.depositA.minTopUpAmount+this.ebetInfo.depositA.maxRewardInSingleTopUp)*this.ebetInfo.depositA.spendingTimes} 流水才可提款。</li>
          <li>4. 领取优惠后需在（${this.ebetInfo.depositA.name}）达到指定流水才可提款。</li>
          <li>5. 严禁在本网站进行对投，系统检测后将自动禁用会员账号。</li>
          </ul>`

            } else {
                all.tool.clickCount({
                  page:'优惠中心',
                  btn:'首存B优惠详情'
                });
              str=`<ul class="dielog_bon" style='text-align: left;font-size: 14px'>
          <li>1. 此优惠仅限在（存款成功）后，（尚未投注）前，申请才为有效。</li>
          <li>2. 优惠名额： 限每日前100位会员申请 ； 每人/每日仅限一次。   </li>
          <li>3. 此优惠仅需完成（存款 + 优惠金额）的 ${this.ebetInfo.depositB.spendingTimes} 倍流水方可提款。如：存款 ${this.ebetInfo.depositB.minTopUpAmount}，领取优惠 ${this.ebetInfo.depositB.maxRewardInSingleTopUp}元，需完成（${this.ebetInfo.depositB.minTopUpAmount} +${this.ebetInfo.depositB.maxRewardInSingleTopUp}）* ${this.ebetInfo.depositB.spendingTimes} = ${(this.ebetInfo.depositB.minTopUpAmount+this.ebetInfo.depositB.maxRewardInSingleTopUp)*this.ebetInfo.depositB.spendingTimes} 流水才可提款。</li>
          <li>4. 领取优惠后需在（${this.ebetInfo.depositB.name}）达到指定流水才可提款。</li>
          <li>5. 严禁在本网站进行对投，系统检测后将自动禁用会员账号。</li>
          </ul>`
            }

          all.alert.confirm(str, [{name: '确定'}]);
        },

        /* 点击全面夺宝下方问号 */
        depisitDetailduobao(type) {
          let str=""
            if (type === 'A') {
                all.tool.clickCount({
                  page:'优惠中心',
                  btn:'十元夺宝'
                });
              str=`<ul class="dielog_bon" style='text-align: left;font-size: 14px'>
          <li>1. 此优惠可在（任意）游戏厅投注。</li>
          <li>2. 每人均可领取一次。 </li>
          <li>3. 领取优惠后，只需达到（${this.duobaoInfo.depositA.spendingTimesOnReward*this.duobaoInfo.depositA.rewardAmount}）流水即可提款。</li>
          <li>4. 此优惠提款上限：${this.duobaoInfo.depositA.forbidWithdrawIfBalanceAfterUnlock}元。提款时系统将扣除多出余额。</li>
          </ul>`
            } else {
                all.tool.clickCount({
                  page:'优惠中心',
                  btn:'疯狂夺宝'
                });
              str=`<ul class="dielog_bon" style='text-align: left;font-size: 14px'>
          <li>1. 此优惠仅限存款成功后，[尚未投注]前申请才有效。过期或存款后已投注，将无法领取。</li>
          <li>2. 每人均可领取一次。</li>
          <li>3. 此优惠仅限（电子游戏）投注。真人、捕鱼、棋牌无法参与此优惠！</li>
          <li>4.领取优惠后，需达到（${this.duobaoInfo.depositB.spendingTimes}）倍流水方可提款。如：存款500元，领取优惠750元， 需完成（500 + 750）*38倍 = 47500流水才可提款。</li>
          <li>5. 此优惠提款上限：${this.duobaoInfo.depositB.forbidWithdrawIfBalanceAfterUnlock}元。提款时系统将扣除多出余额。</li>
          </ul>`
            }

          all.alert.confirm(str, [{name: '确定'}]);
        },


        /* 领取首存AB */
        getFirstDeposit (code) {

            if (!this.isLogin) {
                this.closeDiscount('firstPromoShow');
                all.alert.confirm('是否为真钱会员', [{name: '是，去登陆', callback: () => {
                    this.$router.push('/login');
                }}, {name: '否，去注册', callback: () => {
                    this.$router.push('/register');
                }}]);
                return;
            }

            let type = code === 'A' ? 'firstdepositA' : 'firstdepositB';

          if (type === 'firstdepositA') {
            all.tool.clickCount({
              page: '优惠中心',
              btn: '首A领取'
            });
          } else {
            all.tool.clickCount({
              page: '优惠中心',
              btn: '首B领取'
            });
          }


          if (this.depositList.length === 0) {
                this.closeDiscount('firstPromoShow');
                all.alert.confirm('您需要有一笔新存款才可以领取哦', [{name: '去充值', callback: () => {
                    all.router.push({
                        name: 'deposit',
                        params: {
                            code: type,
                            promoSend: true
                        }
                    });
                }}]);
                return;
            }

            all.tool.send('applyRewardEvent', {
                code: type,
                data: {
                        topUpRecordId: this.depositList[0]._id
                    }
                }).then(result => {
                    all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:()=>{
                        all.router.push({path: '/game', query: {
                            page: 11
                        }});
                    }}]);
                }).catch(err => {
                    if (err.status === 423) {
                        let messageTip=err.errorMessage;

                        if( err.errorMessage === '无法找到此存款记录，详情请联系客服') messageTip='需有最新一笔存款才可申请，请马上存款即可领取！';

                        if( err.errorMessage === '您需要有新存款（100）元才能领取此优惠，千万别错过了！') messageTip='需有新存款（100）元起，才能申请此优惠，请马上存款即可领取！';

                        if( err.errorMessage === '该充值记录已被使用') messageTip='需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';

                        all.tool.TipWinShow(messageTip, [{name: '取消'}, {
                            name:'去充值',
                            callback: () => {
                                all.store.commit('isFirstSaveShow', {
                                    isShow: false,
                                    isShowIcon:true
                                });

                                all.router.push({
                                    name: 'deposit',
                                    params: {
                                        code: type,
                                        promoSend: true
                                    }
                                });
                            }
                        }]);
                    } else {
                        all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]);
                    }
                });
        },

        /* 领取ebet */ 
        getFirstDepositebet (code) {

            if (!this.isLogin) {
                this.closeDiscount('firstPromoShow');
                all.alert.confirm('是否为真钱会员', [{name: '是，去登陆', callback: () => {
                    this.$router.push('/login');
                }}, {name: '否，去注册', callback: () => {
                    this.$router.push('/register');
                }}]);
                return;
            }

            let type = code === 'A' ? 'eBETslot' : 'eBETlive';

            if (type === 'eBETlive') {
                all.tool.clickCount({
                    page: '优惠中心',
                    btn: '易博真人领取'
                });
            } else {
                all.tool.clickCount({
                    page: '优惠中心',
                    btn: '易博电子领取'
                });
            }

            if (this.depositList.length === 0) {
                this.closeDiscount('firstPromoShow');
                all.alert.confirm('您需要有一笔新存款才可以领取哦', [{name: '去充值', callback: () => {
                    all.router.push({
                        name: 'deposit',
                        params: {
                            code: type,
                            promoSend: true
                        }
                    });
                }}]);
                return;
            }

            
                  

    all.tool.send('applyRewardEvent', {
        code: type,
        data: {
                topUpRecordId: this.depositList[0]._id
            }
        }).then(result => {
            all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:() => {
                
                if (type === 'eBETslot') {
                    all.router.push({path: '/game', query: {
                        page: 11
                    }});
                } else {
                    all.tool.send('getLoginURL', {
                        gameId: this.ebetGameId,
                        clientDomainName: window.location.origin,
                        clientType: 2,
                    }).then(result => {
                        all.alert.confirm('是否前往游戏', [{name: '否'}, {name: '是', callback: () => {
                            window.open(result.data.gameURL);
                        }}]);
                    }).catch(error => {
                        let errorMessage = error.errorMessage || '未知错误'
                        if (error.status == 425 || error.status == 402)
                            errorMessage = '游戏正在维护中，请稍后再试';
                        all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                    });
                }
            }}]);
        }).catch(err => {
            if (err.status === 423) {
                let messageTip=err.errorMessage;

                if( err.errorMessage === '无法找到此存款记录，详情请联系客服') messageTip='需有最新一笔存款才可申请，请马上存款即可领取！';

                if( err.errorMessage === '您需要有新存款（100）元才能领取此优惠，千万别错过了！') messageTip='需有新存款（100）元起，才能申请此优惠，请马上存款即可领取！';

                if( err.errorMessage === '该充值记录已被使用') messageTip='需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';

                all.tool.TipWinShow(messageTip, [{name: '取消'}, {
                    name:'去充值',
                    callback: () => {
                        all.store.commit('isFirstSaveShow', {
                            isShow: false,
                            isShowIcon:true
                        });

                        all.router.push({
                            name: 'deposit',
                            params: {
                                code: type,
                                promoSend: true
                            }
                        });
                    }
                }]);
            } else {
                all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]);
            }
        });
        },

        /* 领取全民夺宝 */
        getFirstDepositduobao (code) {

            if (!this.isLogin) {
                all.alert.confirm('是否为真钱会员', [{name: '是，去登陆', callback: () => {
                    this.$router.push('/login');
                }}, {name: '否，去注册', callback: () => {
                    this.$router.push('/register');
                }}]);
                return;
            }

            let type = code === 'A' ? 'SYDB' : 'FKDB';

            if (type === 'SYDB') {
                all.tool.clickCount({
                    page: '优惠中心',
                    btn: '十元夺宝'
                });
            } else {
                all.tool.clickCount({
                    page: '优惠中心',
                    btn: '疯狂夺宝'
                });
            }

            if (this.depositList.length === 0) {
                all.alert.confirm('您需要有一笔新存款才可以领取哦', [{name: '去充值', callback: () => {
                    all.router.push({
                        name: 'deposit',
                        params: {
                            code: type,
                            promoSend: true
                        }
                    });
                }}]);
                return;
            }

    all.tool.send('applyRewardEvent', {
        code: type,
        data: {
                topUpRecordId: this.depositList[0]._id
            }
        }).then(result => {
            all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:() => {
            all.router.push({path: '/game', query: {
                    page: 11
                }});
            }}]);

        }).catch(err => {

            if (err.status === 423) {
                let messageTip=err.errorMessage;

                if( err.errorMessage === '无法找到此存款记录，详情请联系客服') messageTip='需有最新一笔存款才可申请，请马上存款即可领取！';

                if( err.errorMessage === '您需要有新存款（100）元才能领取此优惠，千万别错过了！') messageTip='需有新存款（100）元起，才能申请此优惠，请马上存款即可领取！';

                if( err.errorMessage === '该充值记录已被使用') messageTip='需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';

                all.tool.TipWinShow(messageTip, [{name: '取消'}, {
                    name:'去充值',
                    callback: () => {
                        all.store.commit('isFirstSaveShow', {
                            isShow: false,
                            isShowIcon:true
                        });

                        all.router.push({
                            name: 'deposit',
                            params: {
                                code: type,
                                promoSend: true
                            }
                        });
                    }
                }]);
            } else {
                all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]);
            }
        });
        },

        /* 日首冲活动条款 */
        promoDetail() {
            all.tool.clickCount({
                page: '活动中心',
                btn: '日首存优惠详情'
            });
            let Dom = `<p style="text-align:left;margin-top:20px">
                            1. 此优惠仅限【老虎机游戏】参与，每位会员每天仅限领取1次。<br/>
                            2. 会员需在[每日首笔]存款后，[尚未投注]前申请有效。若存款后已投注将无法领取。<br/>
                            3. 此优惠仅需完成${ this.dayFirstInfo.content.betTimes }倍流水方可提款，
                            如：存款10元，领取优惠${ 10 * parseInt(this.dayFirstInfo.content.promoRate.slice(0, this.dayFirstInfo.content.promoRate.length - 1)) / 100 }元，
                            需完成（10+${ 10 * parseInt(this.dayFirstInfo.content.promoRate.slice(0, this.dayFirstInfo.content.promoRate.length - 1)) / 100 }）* ${ this.dayFirstInfo.content.betTimes } = ${(10 + 10 * parseInt(this.dayFirstInfo.content.promoRate.slice(0, this.dayFirstInfo.content.promoRate.length-1)) / 100) * this.dayFirstInfo.content.betTimes}。<br/>
                            4. 领取优惠后最高提款上限2000元，提款时系统将会扣除多出余额。
                        </p>`;
            all.tool.TipWinShow(Dom, {type:'withCloseTip'}, '优惠详情');
        },

        /* 领取日首存 */
        getPromo() {
            let code = 'dailydeposit';
            all.tool.send('getValidTopUpReturnRecordList', {
                requestCount: 100,
                sort: false,
                startIndex:0
            }).then(result => {
                if (result.data.records.length === 0) {
                    all.tool.TipWinShow('需有最新一笔存款才可申请，请马上存款即可领取！', [{name: '取消'}, {name: '去存款', callback: () => {
                        all.router.push({name: 'deposit', params: { code: code, promoSend: true }});
                    }}])
                }
                if (result.data.records.length > 0) {
                all.tool.send('applyRewardEvent', {
                    code: code,
                    data: {
                            topUpRecordId: result.data.records[0]._id
                        }
                }).then(result=>{
                    all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！', [{name:'前往游戏', callback: () => {
                        all.router.push({path: '/game', query: {
                            page: 11
                        }})
                    }}])
                }).catch(err => {
                    if( err.status === 423){
                        let messageTip = err.errorMessage;
                        if(err.errorMessage === '无法找到此存款记录，详情请联系客服') messageTip = '需有最新一笔存款才可申请，请马上存款即可领取！';
                        if(err.errorMessage === '您需要有新存款（100）元才能领取此优惠，千万别错过了！') messageTip = '需有新存款（100）元起，才能申请此优惠，请马上存款即可领取！';
                        if(err.errorMessage === '该充值记录已被使用') messageTip = '需有最新一笔存款才能申请此优惠，请您马上存款即可享受！';
                        all.tool.TipWinShow(messageTip, [{name: '取消'}, {name: '去存款', callback: () => {
                            all.router.push({name:'deposit', params:{code: code, promoSend: true}})
                        }}])
                    }else{
                        all.tool.TipWinShow(err.errorMessage, [{name: '确定'}])
                    }
                });
                }
            }).catch(err=>all.tool.TipWinShow(err.errorMessage, [{name: '确定'}]));
        },

        /* 领取开户大转盘 */
        diskplay() {
            if (!this.rotateInfo.status) return;
            this.rotateInfo.status = 0;
            all.tool.clickCount({
                page:'优惠中心',
                btn:'体验金领取'
            });

            all.tool.send('applyRewardEvent', {
                code: 'REGISTERBONUS',
                hideLoading: true
            }).then(result => {
                this.rotateInfo.amount = result.data.rewardAmount;
                let R = Math.ceil(Math.random() * 10) + 10;
                let T = [2, 5, 7, 9][Math.floor((Math.random() * [2, 5, 7, 9].length))];
                let time = 5000;
                let self = this;
                all.$(".rotate").animate({
                    rotate: 360 * R + 36 * T
                },{
                    step: function(now, fx){
                        all.$(".rotate").css({
                            "top": "16%",
                            "left": "9%",
                            "transform": "rotate(" + now + "deg)"
                        });
                        if (fx.end === fx.now) {
                            fx.now = 0;
                            setTimeout(()=>{
                                self.changeWin('rotateshow', 'rotateAmount');
                                all.tool.setBalance();
                                self.rotateInfo.status = 1;
                            },1000);
                        }
                    },
                    duration: time
                });
            }).catch(error => {
                this.rotateInfo.status = 1;
                let message = error.errorMessage;
                if (error.errorMessage === '此电话已经达到了该优惠周期内的申请上限') message = '一个电话仅限领取一次';
                all.tool.TipWinShow(message, [{name:'确定'}]);
            });
        },

        setGlobalTimeout(timer) {
            this.timer = timer;
        },

        sort (arr, key, index) {
            let tempArr = arr;
            for(let i = 0; i < tempArr.length - 1; i++) {
                for(let j = 0; j < tempArr.length -1; j++) {
                    if (index === undefined) {
                        if (tempArr[j][key] > tempArr[j + 1][key]) {
                            let tempItem = tempArr[j];
                            tempArr[j] = tempArr[j + 1];
                            tempArr[j + 1] = tempItem;
                        }
                    } else {
                        if (tempArr[j][key][index] > tempArr[j + 1][key][index]) {
                            let tempItem = tempArr[j];
                            tempArr[j] = tempArr[j + 1];
                            tempArr[j + 1] = tempItem;
                        }
                    }
                }
            }

            return tempArr;
        },

        interval(cb, time, getTimerCb) {
            let intervalFn = function(t) {
                cb && cb();
                t && clearTimeout(t);
                let timer = setTimeout(() => {
                    intervalFn(timer);
                }, time ? time : 2000);
                // console.log('当前定时器id: ' + timer);
                getTimerCb && getTimerCb(timer);
            }
            // setTimeout(intervalFn, time)
            intervalFn();
        },
        pushTask(){
            this.$router.push({path:'/task',query:{type:"jifen"}});
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';
.discount_center {
    width: 100%;
}

.main {
    width: 100%;
}

.main_box {
    width: 100%;
    .rem2(padding, 50, 64);
    // display: flex;
    // justify-content: space-between;
    font-size: 0;
    text-align: left;

    li {
        .width(168);
        .height(220);
        position: relative;
        display: inline-block;
        .mr(55);
        .mb(30);

        .mb_title {
            .width(100);
            .height(100);
            position: absolute;

            img {
                width: 100%;
            }
        }

        .leftClass {
            .left(-5);
            .top(-5);
        }

        .rightClass {
            .right(-5);
            .top(-5);
        }

        .mb_bg {
            width: 100%;
            .height(170);
            .mb(10);
            background: url(../assets/image/pages/home/bottom_navBg.png) no-repeat center center/100% 100%;
            text-align: center;
            .rem(padding, 10);
            img {
                width: 100%;
                // height: 90%;
            }
        }

        p {
            .height(40);

            img {
                width: 100%;
            }
        }
    }

    li:nth-child(3n) {
        margin-right: 0;
    }
}

.bg_box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.animate_box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 100%;
    // background-color: rgba(255, 255, 255, 0.5);
    transform: translateX(-50%) translateY(-50%);
}


.firstSave .ImgPic{
    .width(750);
    height: auto;
    .mt(100);
    &.jifen{
    .mt(400);
    }
}

.firstSave .content{
    position:absolute;
    width:100%;
    .top(590);
    left:0;
    .font-size(28);
    display:flex;
    justify-content: center;
    .height(200);
    .gold_yb{
        .width(124);
        margin: 0 auto;
    }
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
.firstSave .tip{
    position:absolute;
    color:yellow;
    .font-size(24);
    .top(870);
    left:50%;
    transform: translateX(-50%);
}
.firstSave .btnBar img{
    .width(160);
    height:auto;
    .ml(48);
    .mr(48)
}

.elsePromo {
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    z-index: 100;
    display:flex;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;
    .pl(40);
  }

.elsePromo .imgBg{
    .width(710);
    height:auto
}

.elsePromo .close{
    .width(56);
    height:auto;
    position:absolute;
    top:50%;
    left:50%;
    .translate(275,-242);
}

.elsePromo span{
    position:absolute;
    font-family: "Microsoft YaHei";
    font-weight: bold;
}

.elsePromo .promoRate{
    top:50%;
    left:50%;
    .translate(-90,-155);
    .font-size(84);
    text-shadow:0 4px 0 rgba(126,33,19,0.5);
}

.elsePromo .minDeposit{
    color:#fff100;
    .font-size(55);
    top:50%;
    left:50%;
    .translate(-270,20);
}

.elsePromo .promoLimit{
    color:#fff100;
    .font-size(55);
    top:50%;
    left:50%;
    .translate(-160,20);
}

.elsePromo .betTimes{
    color:#fff100;
    .font-size(55);
    top:50%;
    left:50%;
    .translate(-50,20);
}

.elsePromo .getPromo{
    .width(284);
    height:auto;
    position:absolute;
    top:50%;
    left:50%;
    .translate(-255,135);
}

.elsePromo .goPromo{
    .width(219);
    height:auto;
    position:absolute;
    top:50%;
    left:50%;
    .translate(-225,195);
}

.elsePromo .promoDetail{
    .width(57);
    height:auto;
    position:absolute;
    top:50%;
    left:50%;
    .translate(235,60);
}

.sendAmountWin{
    position: absolute;
    .mt(200);
}
.sendAmountWin .bg{
    .width(750);
    height:auto;
}
.sendAmountWin .point{
    position:absolute;
    top:18%;
    left:57%;
    .width(148);
    height:auto
}
.sendAmountWin .close{
    position:absolute;
    top:0;
    left:90%;
    .width(56);
    .height(63);
    cursor: pointer;
    z-index: 3;
}
.sendAmountWin .over{
    position:absolute;
    top:0;
    left:0;
    .width(750);
    height:auto
}
.sendAmountWin .getBtn{
    position:absolute;
    .width(130);
    .height(130);
    border-radius:50%;
    top:45%;
    left:68.4%;
    .translateX(-75%);
}
.sendAmountWin .closeBtn{
    position:absolute;
    .width(240);
    .height(80);
    top:68.5%;
    left:40%;
    .translateX(-50%);
    z-index: 5;
}
.sendAmountWin .prizeGot{
    position:relative;
    z-index:1;
    .width(750);
    height:auto;
}
.sendAmountWin .bgAnima{
    position:absolute;
    top:0;
    left:0;
    animation:rotate 5s infinite linear;
}
.sendAmountWin .text{
    .pl(40);
    width:100%;
    .font-size(24);
    .line-height(40);
    position:absolute;
    bottom:34%;
    left:50%;
    transform: translateX(-50%);
    font-weight: bold;
    z-index:2;
}
.sendAmountWin .text span{
    .font-size(40);
    color:#fff;
    text-shadow:2px 3px 2px rgba(172,7,57,0.5);
    margin:0 10px;
}
.sendAmountWin .amount{
    position:absolute;
    .width(412);
    top:20.5%;
    left:39.5%;
    .height(412);
    display:flex;
    align-items:center;
    justify-content: center;
    overflow: hidden;
}
.sendAmountWin .amount img{
    width:100%;
    height:auto;
}
.sendAmountWin .amount span{
    display:flex;
    width:8%;
    height:50%;
    margin:0 5.65%;
    justify-content: center;
}
.sendAmountWin .amount span img{
    width:100%;
}


.bgbounce-enter-active {
    animation: bg-in .3s;
}

.bgbounce-leave-active {
    animation: bg-in .3s reverse;
}

.bounce-enter-active {
    animation: bounce-in .3s;
}

.bounce-leave-active {
    animation: bounce-in .3s reverse;
}


.animate-box-enter-active {
    animation: opacityA .5s;
}

.animate-box-leave-active {
    animation: opacityA .5s reverse;
}


.baseAnimateClass {
    .mt(-20);
}

.defAnimateCls {
    animation: zoomIn 1.5s linear;
}

.eggAnimateClass {
    .mt(-40);
}

.FirstRegisterCls {
    animation: rubberBand 1s linear infinite;
}

.dayFirstClass {
    animation: bounce 1s linear infinite;
}

.treeClass {
    animation: wobble 1s linear infinite;
}

.promoboxClass {
    animation: tada 1s linear infinite;
}

@keyframes bg-in {
    0% {
        opacity: 0.1;
    }

    100% {
        opacity: 1;
    }
}

@keyframes opacityA {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes bounce-in {
    0% {
        transform: translateY(100%);
        opacity: 0.1;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes rotate{
    0%{
        transform: rotateZ(0)
    }

    100%{
        transform: rotateZ(180deg)
    }
}

@keyframes bounce {
    from, 20%, 53%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0,0,0);
    }

    40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -30px, 0);
    }

    70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -15px, 0);
    }

    90% {
        transform: translate3d(0,-4px,0);
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale3d(.6, .6, .6);
    }

    75% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }

}

@keyframes wobble {
    from {
        transform: none;
    }

    15% {
        transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
    }

    30% {
        transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
    }

    45% {
        transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
    }

    60% {
        transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
    }

    75% {
        transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
    }

    to {
        transform: none;
    }
}

@keyframes rubberBand {
    from {
        transform: scale3d(1, 1, 1);
    }

    30% {
        transform: scale3d(1.25, 0.75, 1);
    }

    40% {
        transform: scale3d(0.75, 1.25, 1);
    }

    50% {
        transform: scale3d(1.15, 0.85, 1);
    }

    65% {
        transform: scale3d(.95, 1.05, 1);
    }

    75% {
        transform: scale3d(1.05, .95, 1);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}

@keyframes tada {
    from {
        transform: scale3d(1, 1, 1);
    }

    10%, 20% {
        transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    }

    30%, 50%, 70%, 90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%, 60%, 80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}



.firstSave{
  position:absolute;
  width:100%;
  height:100%;
  left:0;
  top:0;
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
.firstSave .closeJifen{
  position:absolute;
  left:90%;
  top:23%;
  .width(55);
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
    transform: translateX(130%);
  }
  100%{
    transform: translateX(-160%);
  }
}
.firstSave .tip{
  position:absolute;
  color:yellow;
  .font-size(24);
  .top(870);
  left:50%;
  transform: translateX(-50%);
  width: 80%;
  /*overflow: hidden;*/

  &>span{
    display: block;
    white-space:nowrap;
    /*animation:marquee 20s infinite linear;*/
    /*跑马灯动画*/
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
