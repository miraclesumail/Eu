<template>
    <div class="home">
        <div class="accountDetails" v-if="this.$store.state.isLogin">
            <div class="leftbar">
                <img :src="this.$store.state.isLogin?levelImg[this.$store.state.level+1]:levelImg[this.$store.state.level]" height="100%" width="auto"/>
                <ul class="name_level">
                    <li class="userName" v-text="this.$store.state.userName?this.$store.state.userName:'游客'"></li>
                    <li class="level" v-text="this.$store.state.levelName"></li>
                </ul>
            </div>
            <div class="rightbar">
                <div class="score_amount">
                    <p class="score" @click="waiting">
                        <span><img src="../assets/image/pages/home/iconScore.png" height="100%" width="100%"/></span>
                        <i v-text="this.$store.state.score"></i>
                        <span class="drawDown"><img src="../assets/image/pages/home/btnScore.png" height="100%" width="auto"/></span>
                    </p>
                    <p class="balance" @click="gotransferPage">
                        <span><img class="coin" src="../assets/image/pages/home/iconCoin.png" height="100%"/></span>
                        <i v-text="this.$store.state.balance"></i>
                        <span><img class="drawDown" src="../assets/image/pages/home/iconDrawdown.png" height="100%" width="auto"/></span>
                    </p>
                </div>
                <div class="update">
                    <p class="dataLevel"><i :style="{width:this.$store.state.datalevel+'%'}"></i><b v-text="this.$store.state.weekSaveAmount+' / '+this.$store.state.nextUpLevelAmount[this.$store.state.level===4?this.$store.state.level:this.$store.state.level+1]"></b></p>
                    <span @click="autoUpLevel"><img class="autoUpdate" src="../assets/image/pages/home/iconUpdate.png" height="100%" width="auto"/></span>
                </div>
            </div>
        </div>
        <div class="notice" @click="showNoticeWin">
            <marquee class="noticeContent" scrollamount="3" behavior="scroll" direction="left" v-html="!this.$store.state.isLogin?showMessage():showMessage()"></marquee>
        </div>
        <div v-if="isRegisterProShow && defaultProShow && !this.$store.state.isLogin" class="registerBanner">
            <img src="../assets/image/pages/home/registerPromo01.jpg" height="auto" width="100%"/>
            <img src="../assets/image/pages/home/promotext01.png"/>
            <img @click="gotoRegister" src="../assets/image/pages/home/registerPromoOver.png" height="auto" width="100%"/>
            <img @click="hideBanner" src="../assets/image/pages/home/promoCloseBtn.png"/>
        </div>
        <!-- APP下载活动 start -->
        <div class="appDownLoadingActivity"  @click="showAppAcitvity" v-if="this.$store.state.isLogin && showAppBaner">
            <img src="../assets/image/pages/home/appDownLoad_text.png" >
        </div>
        <!-- APP下载活动 end -->

        <!-- 首页游戏页面 -->
        <!-- <div class="gameBox" v-if="!isApp">
            <p class="leftGamebar" @click="goToEbetGame">
                <img src="../assets/image/pages/home/hotGame.jpg" height="auto" width="100%"/>
                <img src="../assets/image/pages/home/hotAnima.gif" height="auto" width="100%"/>
            </p>
            <p class="rightGamebar">
                <img src="../assets/image/pages/home/lotteryPoolGame.jpg" height="auto" width="100%" @click="goToGame(11)"/>
                <img src="../assets/image/pages/home/newGame.jpg" height="auto" width="100%" @click="gotoFish"/>
            </p>
        </div>
        <div class="gameBox" v-if="isApp">
            <p class="leftGamebar" @click="goToEbetGame">
                <img src="../assets/image/pages/home/hotGameA.jpg" height="auto" width="100%"/>
                <img src="../assets/image/pages/home/hotAnimaA.gif" height="auto" width="100%"/>
            </p>
            <p class="rightGamebar">
                <img src="../assets/image/pages/home/lotteryPoolGameA.jpg" height="auto" width="100%" @click="goToGame(11)"/>
                <img src="../assets/image/pages/home/newGameA.jpg" height="auto" width="100%" @click="gotoFish"/>
            </p>
        </div> -->

         <!-- 首页游戏页面 H5-->
        <div class="game-box" v-if="!isApp">
            <!-- 真人 -->
            <div class="game-box-left" @click="goToEbetGame">
                <img src="../assets/image/pages/home/ebet_loge.png" class="ebet_loge"/>
                <img src="../assets/image/pages/home/person_game_bg.jpg" class="person-bg" />
                <img src="../assets/image/pages/home/person1.png" class="person-img" />
                <div class="person-name">
                    <img src="../assets/image/pages/home/person_text.png" width="100%" height="100%" />
                </div>
            </div>

            <div class="game-box-right">
                <!-- 电子 -->
                <div class="gbr-top" @click="goToGame(11)">
                    <img src="../assets/image/pages/home/electronic_img.png" class="electronic-img">
                    <img src="../assets/image/pages/home/electronic_center_bg.png" class="e-center-bg">
                    <img src="../assets/image/pages/home/electronic_bg1.jpg" class="electronic-bg">
                    <div class="electronic-name">
                        <img src="../assets/image/pages/home/electronic_text.png" width="100%" height="100%">
                    </div>
                </div>
                <!-- 捕鱼 -->
                <div class="gbr-bottom" @click="gotoFish">
                    <img src="../assets/image/pages/home/fish_bg.jpg" class="electronic-bg">
                    <div class="fish-name">
                        <img src="../assets/image/pages/home/fish_text.png" width="100%" height="100%">
                    </div>
                    <!-- <div class="fish-animate-box" :style="{transform: fishTransform}">
                        <img src="../assets/image/pages/home/fish_game2.png" class="fish-game-two">
                        <img src="../assets/image/pages/home/fish_game1.png" class="fish-game-one">
                    </div> -->
                </div>
            </div>
        </div>

        <!-- 首页游戏页面 APP中-->
        <div class="game-box" v-if="isApp">
            <!-- 真人 -->
            <div class="game-box-left" @click="goToEbetGame">
                <img src="../assets/image/pages/home/ebet_loge.png" class="ebet_loge"/>
                <img src="../assets/image/pages/home/person_game_bg.jpg" class="person-bg" />
                <img src="../assets/image/pages/home/person2.png" height="100%" class="person-img" />
                <div class="person-name">
                    <img src="../assets/image/pages/home/person_text.png" width="100%" height="100%" />
                </div>
            </div>

            <div class="game-box-right">
                <!-- 电子 -->
                <div class="gbr-top" @click="goToGame(11)">
                    <img src="../assets/image/pages/home/electronic_img.png" class="electronic-img">
                    <img src="../assets/image/pages/home/electronic_center_bg.png" class="e-center-bg">
                    <img src="../assets/image/pages/home/electronic_bg1.jpg" class="electronic-bg">
                    <div class="electronic-name">
                        <img src="../assets/image/pages/home/electronic_text.png" width="100%" height="100%">
                    </div>
                </div>
                <!-- 捕鱼 -->
                <div class="gbr-bottom" @click="gotoFish">
                    <img src="../assets/image/pages/home/fish_bg.jpg" class="electronic-bg">
                    <div class="fish-name">
                        <img src="../assets/image/pages/home/fish_text.png" width="100%" height="100%" />
                    </div>
                    <!-- <div class="fish-animate-box" :style="{transform: fishTransform}">
                        <img src="../assets/image/pages/home/fish_game2.png" class="fish-game-two">
                        <img src="../assets/image/pages/home/fish_game1.png" class="fish-game-one">
                    </div> -->
                </div>
            </div>
        </div>

        <!-- 首页下方四个框 -->
        <ul class="main_bottom_nav">
            <li @click="showActivity">
                <div class="mvn_bg_box">
                    <div class="new" v-text="news" v-if="showNews"></div>
                    <img src="../assets/image/pages/home/promotion_01.png">
                </div>
                <p></p>
            </li>
            <li @click="gotoDiscountCenter">
                <div class="mvn_bg_box">
                    <img src="../assets/image/pages/home/discountCenter.png">
                </div>
                <p></p>
            </li>
            <li @click="goToDownload">
                <div class="mvn_bg_box">
                    <img src="../assets/image/pages/home/downloadCenter.png">
                </div>
                <p></p>
            </li>
            <!--合作代理-->
            <!--<li @click="openUrl">
                <div class="mvn_bg_box">
                    <img src="../assets/image/pages/home/proxyCenter.png">
                </div>
                <p></p>
            </li>-->
        </ul>
        <!-- <div class="itemMenuBox">
        <div class="new" v-text="news" v-if="showNews"></div>
        <img class="promotion" src="../assets/image/pages/home/promotion.png" height="auto" width="28.4%" @click="showActivity"/>
        <div class="itembar">
            <img src="../assets/image/pages/home/bgItem.png" height="auto" width="100%"/>
            <div class="item">
                <img @click="enterItem('promohitegg')"  src="../assets/image/pages/home/itemHitEgg.png" height="84%" width="auto"/>
                <img @click="enterItem('promobox')" src="../assets/image/pages/home/itemBox.png" height="84%" width="auto"/>
                <img @click="showFirstCharge" src="../assets/image/pages/home/itemFirstRegister.png" height="84%" width="auto" v-if="this.$store.state.firstDeposit.isShowIcon"/>
            <img @click="showElsePromo" src="../assets/image/pages/home/itemFirst.png" height="84%" width="auto" v-if="this.$store.state.isLogin && !this.$store.state.firstDeposit.isShowIcon"/>
            <img @click="enterItem('tree')"  src="../assets/image/pages/home/itemFcs.png" height="84%" width="auto"/>
            <img @click="enterItem('resurrection')"  src="../assets/image/pages/home/itemLive.png" height="84%" width="auto"/>
            <img @click="enterItem('signIn')"  src="../assets/image/pages/home/itemSign.png" height="84%" width="auto"/>
            <i @click="enterItem('promohitegg')" class="newCode" :class="{'leftMove':this.$store.state.isLogin && !this.$store.state.firstDeposit.isShowIcon}" v-text="this.$store.state.promoCodeCount" v-if="this.$store.state.promoCodeCount!==0"></i>
            </div>
            <img class="toRight" src="../assets/image/pages/home/toRight.png"/>
        </div>
        </div> -->
        <!-- <div class="farstMenu">
        <router-link to="/downLoad"><img class="downloadImg" @click="appLoad" src="../assets/image/pages/home/btnDownload.png" height="auto" width="30%"/></router-link>
        <router-link to="/addTodesk"><img @click="addDesk" src="../assets/image/pages/home/btnAddDesk.png" height="auto" width="30%"/></router-link>
        <img @click="openUrl" src="../assets/image/pages/home/btnPC.png" height="auto" width="30%"/>
        </div> -->
        <NewActivity :show="activity"/>

        <!-- 开户首存AB -->
        <!--<transition name="bounce">-->
            <!--<div v-show="this.$store.state.firstDeposit.isShow && firstPromoShow && delayShow" class="firstSave">-->
                <!--<img class="ImgPic" src="../assets/image/pages/home/firstSave.png"/>-->
                <!--<img @click="closeFirst" class="closeFirst" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>-->
                <!--<div class="content" v-if="this.$store.state.firstDeposit.isShow && firstPromoShow">-->
                    <!--<p>-->
                        <!--<span class="title"><b v-text="this.$store.state.firstDeposit.depositA.name"></b></span>-->
                        <!--<span class="text">最低存款<i v-text="this.$store.state.firstDeposit.depositA.minTopUpAmount"></i>元</span>-->
                        <!--<span class="text">最高赠送<i v-text="this.$store.state.firstDeposit.depositA.maxRewardInSingleTopUp"></i>元</span>-->
                        <!--<span><img @click="depisitDetail('A')" src="../assets/image/pages/home/detail.png"/></span>-->
                    <!--</p>-->
                    <!--<p>-->
                        <!--<span class="title"><b v-text="this.$store.state.firstDeposit.depositB.name"></b></span>-->
                        <!--<span class="text">最低存款<i v-text="this.$store.state.firstDeposit.depositB.minTopUpAmount"></i>元</span>-->
                        <!--<span class="text">最高赠送<i v-text="this.$store.state.firstDeposit.depositB.maxRewardInSingleTopUp"></i>元</span>-->
                        <!--<span><img @click="depisitDetail('B')" src="../assets/image/pages/home/detail.png"/></span>-->
                    <!--</p>-->
                <!--</div>-->
                <!--<p class="btnBar">-->
                    <!--<img @click="getFirstDeposit('A')" src="../assets/image/pages/home/firstBtn.png"/>-->
                    <!--<img @click="getFirstDeposit('B')" src="../assets/image/pages/home/firstBtn.png"/>-->
                <!--</p>-->
                <!--<p class="tip">注：新开户首2笔存款均可申请</p>-->
            <!--</div>-->
        <!--</transition>-->


        <!--全面夺宝活动-->
        <transition name="bounce">
            <div  class="firstSave" v-show="showeduobao && firstduobaoShow">
                <img class="ImgPic" src="../assets/image/pages/home/firstSave-c.png"/>
                <img @click="closeduobao" class="closeFirst" src="../assets/image/pages/home/firstSaveCloseBtn.png"/>
                <div class="content" v-if="showeduobao">
                    <p>
                      <span class="title"><b>{{ebetInfo.depositAebet.name}}</b></span>
                        <img class="gold_yb" src="../assets/image/pages/home/gold_yb.png" />
                        <span class="text">存 <i>{{ebetInfo.depositAebet.minTopUpAmount}}</i>送<i>{{ebetInfo.depositAebet.rewardAmount}}</i></span>
                        <span><img @click="depisitDetailebet('A')" src="../assets/image/pages/home/detail.png"/></span>
                    </p>
                    <p>
                      <span class="title"><b>{{ebetInfo.depositBebet.name}}</b></span>
                      <span class="text">存送<i>{{ebetInfo.depositBebet.rewardPercentage*100}}%</i> </span>
                      <span class="text">最低存<i>{{ebetInfo.depositBebet.minTopUpAmount}}</i> 元</span>
                      <span class="text">红利高达<i>{{ebetInfo.depositBebet.maxRewardInSingleTopUp}}</i> 元</span>
                      <span><img @click="depisitDetailebet('B')" src="../assets/image/pages/home/detail.png"/></span>
                    </p>
                </div>
                <p class="btnBar">
                    <img @click="getFirstDepositebet('A')" src="../assets/image/pages/home/firstBtn.png"/>
                    <img @click="getFirstDepositebet('B')" src="../assets/image/pages/home/firstBtn.png"/>
                </p>
              <p class="tip">
                    <span>优惠时间:{{ebetInfo.depositAebet.validStartTime}}
                    </span>
              </p>
            </div>
        </transition>

        <!-- 开户大转盘 -->
        <transition name="bounce">
            <div class="firstRegister" v-show="sendAmount">
                <div class="sendAmountWin">
                    <img class="bg" src="../assets/image/components/tipWindow/sendAmount.png"/>
                    <!--<p class="amount animaM"><span><img :src="amountNum[Num1]"></span><span><img :src="amountNum[Num2]"></span><span><img :src="amountNum[Num3]"></span></p>-->
                    <p class="amount"><img class="rotate" src="../assets/image/components/tipWindow/sendAmountDisk.png"/></p>
                    <img class="point" src="../assets/image/components/tipWindow/sendAmountPoint.png"/>
                    <img class="close" @click="closeRegisterAmount" src="../assets/image/components/tipWindow/sendAmountClose.png" height="63" width="56"/>
                    <img class="over" src="../assets/image/components/tipWindow/sendAmountDiskOver.png"/>
                    <span class="getBtn" @click="diskplay"></span>
                </div>
            </div>
        </transition>
        <transition name="bounce">
            <div class="firstRegister" v-if="getAmount">
                <div class="sendAmountWin">
                    <img class="prizeGot" src="../assets/image/pages/home/getAmount.png" height="auto" width="100%"/>
                    <img class="bgAnima" src="../assets/image/pages/home/sendAnima.png" height="auto" width="100%"/>
                    <p class="text"><span v-text="registerAmount+'元体验金！'"></span></p>
                    <span class="closeBtn" @click="closeSure"></span>
                </div>
            </div>
        </transition>

        <!-- 日首冲 -->
        <transition name="bounce">
            <div v-show="!this.$store.state.firstDeposit.isShow && elsePromo" class="elsePromo">
                <img class="imgBg" src="../assets/image/pages/home/elsePromo.png"/>
                <img class="close" @click="closePromo" src="../assets/image/pages/home/elsex.png"/>
                <span class="minDeposit" v-text="minDeposit"></span>
                <span class="betTimes" v-text="betTimes"></span>
                <span class="promoLimit" v-text="promoLimit"></span>
                <span class="promoRate" v-text="promoRate"></span>
                <img v-if="promoStatus" @click="getPromo" class="getPromo" src="../assets/image/pages/home/getPromo.png"/>
                <img v-if="!promoStatus" class="getPromo" src="../assets/image/pages/home/getPromoX.png"/>
                <img v-if="!promoStatus" @click="goPromo" class="goPromo" src="../assets/image/pages/home/goPromo.png"/>
                <img @click="promoDetail" class="promoDetail" src="../assets/image/pages/home/promoDetail.png"/>
            </div>
        </transition>

        <!-- APP下载优惠弹窗 -->
        <transition name="bounce">
            <div class="firstRegister" v-if="isShowAppAcitvity">
                <div class="sendAmountWin">
                    <div class="win_content">
                    <div class="appCloseBtn" @click="closeAppAlert"></div>
                        <div class="appSumitBtn" @click="APPActivity"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import NewActivity from '../components/NewActivity.vue'
export default {
    data(){
        return {
            getTopupList:[],
            fishTransform: 'rotateZ(0deg)',
            levelImg:[
                require("../assets/image/pages/home/headImageLv0.jpg"),
                require("../assets/image/pages/home/headImageLv1.jpg"),
                require("../assets/image/pages/home/headImageLv2.jpg"),
                require("../assets/image/pages/home/headImageLv3.jpg"),
                require("../assets/image/pages/home/headImageLv4.jpg"),
                require("../assets/image/pages/home/headImageLv5.jpg")
            ],
            itemImg:[
                require("../assets/image/pages/home/itemFcs.png"),
                require("../assets/image/pages/home/itemHitEgg.png"),
        //        require("../assets/image/pages/home/itemmoneyBag.png"),
                require("../assets/image/pages/home/itemLive.png"),
                require("../assets/image/pages/home/itemSign.png"),
            ],
            farstMenuImg:[
                require("../assets/image/pages/home/btnDownload.png"),
                require("../assets/image/pages/home/btnAddDesk.png"),
                require("../assets/image/pages/home/btnPC.png")
            ],
            showNews: true,
            activity: false,
            isRegisterProShow:true,
            sendAmount:false,
            NumCount:null,
            amountNum:[
                require('../assets/image/components/tipWindow/0.png'),
                require('../assets/image/components/tipWindow/1.png'),
                require('../assets/image/components/tipWindow/2.png'),
                require('../assets/image/components/tipWindow/3.png'),
                require('../assets/image/components/tipWindow/4.png'),
                require('../assets/image/components/tipWindow/5.png'),
                require('../assets/image/components/tipWindow/6.png'),
                require('../assets/image/components/tipWindow/7.png'),
                require('../assets/image/components/tipWindow/8.png'),
                require('../assets/image/components/tipWindow/9.png'),
            ],
            Num1:0,
            Num2:0,
            Num3:0,
            runTime:200,
            endCount:0,
            registerAmount:0,
            delayShow:true,
            getAmount:false,
            changeNum1:true,
            changeNum2:true,
            changeNum3:true,
            elsePromo:false,
            betTimes:0,
            minDeposit:0,
            promoLimit:0,
            promoRate:0,
            promoStatus:true,
            isApp:all.tool.isApp(),
            isShowAppAcitvity: false,
            start:true,
            flag: true,
            showAppBaner: true,
            ebetGameId: '',
            fishGameId: '',
            ebetFreeGameUrl: 'http://hk.oplive.info:8080/?infoUrl=h5/3cba28&mode=trial',
            timer: -1,
            ebetInfo:{
                depositAebet:{},
                depositBebet:{}
            },
            showebet:false,
            showeduobao:false
        }
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

        all.tool.send('getGameGroupInfo', {
            code: 70,
            startIndex: 0,
            requestCount: 12
        }).then(result => {
           this.fishGameId = result.data.games.gameList[0].game.gameId;
        }).catch(error => {
            let errorMessage = error.errorMessage || '未知错误'
            all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
        });

    },

    mounted() {
        if (!all.tool.getStore('news')) {
            this.showNews = false;
        }
        if(this.$route.params.send)this.sendAmount=true;
        if(this.sendAmount){
            this.delayShow=false;
            /*this.NumCount=setInterval(()=>{
                if(this.changeNum1)this.Num1=Math.floor(Math.random()*10);
                if(this.changeNum2)this.Num2=Math.floor(Math.random()*10);
                if(this.changeNum3)this.Num3=Math.floor(Math.random()*10);
            },this.runTime)*/
        }
        all.store.commit('isFirstSaveShow',{isShow:false,isShowIcon:true});
        // all.tool.send('getRewardList').then(result => {
        //       result.data.map(item => {
        //           if (item.code === 'app') {
        //               this.showAppBaner = true;
        //           }
        //       })
        // });

        // this.interval(() => {
        //     let randomNum =  Math.floor(Math.random() * 365 + 1);
        //     this.fishTransform = `rotateZ(${randomNum}deg)`;
        // }, 4000, this.setGlobalTimeout);


        if (!all.tool.getStore('token') || this.firstduobaoShow) {
            // 全民夺宝
            let SYDB = false
            let FKDB = false
            // 全民夺宝
            let data = {}
            let dataebet = {}
            data.isShow = true;
            all.tool.send('getRewardList').then(result => {
                console.log(result.data, 9)

                result.data.map(item => {
                    if (item.code === 'SYDB') {
                        SYDB = true
                        dataebet.depositA = item.param.rewardParam[0].value[0];
                        dataebet.depositA.code = item.code;
                        dataebet.depositA.largeSned = item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock;
                        dataebet.depositA.name = item.name;

                        let validStartTime = new Date(item.validStartTime)
                        let validEndTime = new Date(item.validEndTime)

                        dataebet.depositA.validStartTime = `${validStartTime.getFullYear()}/${validStartTime.getMonth() + 1}/${validStartTime.getDate()} ${validStartTime.getHours()}:${validStartTime.getMinutes()} - ${validEndTime.getFullYear()}/${validEndTime.getMonth() + 1}/${validEndTime.getDate()} ${validEndTime.getHours()}:${validEndTime.getMinutes()}`;

                    }
                    if (item.code === 'FKDB') {
                        FKDB = true
                        dataebet.depositB = item.param.rewardParam[0].value[0];
                        dataebet.depositB.code = item.code;
                        dataebet.depositB.name = item.name;
                    }
                });
                this.ebetInfo.depositAebet = dataebet.depositA
                this.ebetInfo.depositBebet = dataebet.depositB
                this.showeduobao = (SYDB && FKDB) ? true : false
                all.store.commit('isFirstSaveShow', data);
            }).catch(err => all.tool.TipWinShow(err.errorMessage, [{name: '确定'}]));
        }

    },

    beforeDestroy() {
        clearTimeout(this.timer);
    },

    methods:{
        showElsePromo(){
            all.tool.send('getSlotInfo',{code:'dailydeposit',hideLoading: true}).then(result=>{console.log(result);
                if(result.data.list[0].status===1)this.promoStatus=true;
                if(result.data.list[0].status===0)this.promoStatus=true;
                if(result.data.list[0].status===2)this.promoStatus=false;
                this.minDeposit=result.data.list[0].minDeposit;
                this.betTimes=result.data.list[0].betTimes;
                this.promoLimit=result.data.list[0].promoLimit;
                this.promoRate=result.data.list[0].promoRate;
                this.elsePromo=true;
            }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
        },
        showFirstCharge(){
            all.tool.clickCount({page:'首页',btn:'首充'});
            all.store.commit('isFirstTip',true);
            all.tool.isFirstSaveShow();
            all.tool.setStore('once',true);
        },
        waiting(){
            // all.tool.TipWinShow('即将推出，敬请期待！',[{name:'确定'}])
            this.$router.push('/task');
        },
        openUrl(){
            window.open('https://www.eu7.me');
            all.tool.clickCount({page:'首页',btn:'代理合作'});
        },
        goPromo(){
            all.router.push('/promobox');
            this.elsePromo=false
        },
        promoDetail(){
            all.tool.clickCount({page:'日首充',btn:'优惠详情'});
            let Dom='<p style="text-align:left;margin-top:20px">1.此优惠每位会员/每天仅限1次。<br/>2.会员需在[每日首笔]存款后，[尚未投注]前申请才能申请。若存款后已投注将无法领取。<br/>3.此优惠仅需完成'+this.betTimes+'倍流水方可提款，如：存款10元，领取优惠'+(10*parseInt(this.promoRate.slice(0,this.promoRate.length-1))/100)+'元，需完成（10+'+(10*parseInt(this.promoRate.slice(0,this.promoRate.length-1))/100)+'）*'+this.betTimes+'='+((10+10*parseInt(this.promoRate.slice(0,this.promoRate.length-1))/100)*this.betTimes)+'。<br/>4.领取优惠后最高提款上限2000元，提款时系统将会扣除多出余额。</p>';
            all.tool.TipWinShow(Dom,{type:'withCloseTip'},'优惠详情')
        },
        closePromo(){
            this.elsePromo=false
        },
        getPromo(){
            let code='dailydeposit';
            all.tool.send('getValidTopUpReturnRecordList',{requestCount:100,sort:false,startIndex:0}).then(result=>{
                if(result.data.records.length===0){
                all.tool.TipWinShow('需有最新一笔存款才可申请，请马上存款即可领取！',[{name:'取消'},{name:'去存款',callback:()=>{
                    all.router.push({name:'deposit',params:{code:code,promoSend:true}})
                }}])
                }
                if(result.data.records.length>0){
                all.tool.send('applyRewardEvent',{code:code,data:{topUpRecordId:result.data.records[0]._id}}).then(result=>{
                    all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:()=>{
                        all.router.push({path:'/game', query: {
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
        },
        gotoRegister(){
            all.tool.clickCount({page:'首页',btn:'注册送体验金'});
            all.router.push('/register')
        },
        showMessage(){
            let message='';
            let index=1;
            if(!all.store.state.notice){
                return '暂无最新公告！'
            }
            if(all.store.state.isLogin && all.store.state.level!==4){
                all.store.state.notice.map(item=>{
                    if(item.reach==='players' || item.reach==='all'){
                        message=message+'<b style="margin-right:50px"></b>'+index+'、'+item.content+'    ';
                        index++;
                    }
                })
            }
            if(all.store.state.isLogin && all.store.state.level===4){
                all.store.state.notice.map(item=>{
                    if(item.reach==='conditional' || item.reach==='players' || item.reach==='all'){
                        message=message+'<b style="margin-right:50px"></b>'+index+'、'+item.content+'    ';
                        index++;
                    }
                })
            }
            if(!all.store.state.isLogin){
                all.store.state.notice.map(item=>{
                    if(item.reach==='all'){
                        message=message+'<b style="margin-right:50px"></b>'+index+'、'+item.content+'    ';
                        index++;
                    }
                })
            }
            return message;
        },
        closeRegisterAmount(){
            this.sendAmount=false
        },
        diskplay(){
            if(!this.start)return;
            this.start=false;
            all.tool.clickCount({page:'首页',btn:'体验金领取'});
            all.tool.send('applyRewardEvent',{code:'REGISTERBONUS',hideLoading: true }).then(result=>{
                this.registerAmount=result.data.rewardAmount;
                let R= Math.ceil(Math.random()*10)+10;
                let T=[2,5,7,9][Math.floor((Math.random()*[2,5,7,9].length))];
                let time=5000;
                let self=this;
                all.$(".rotate").animate({
                    rotate:360*R+36*T
                },{
                    step:function(now,fx){
                        all.$(".rotate").css({"top":"16%","left":"9%","transform":"rotate("+now+"deg)"});
                        if(fx.end===fx.now){
                            fx.now=0;
                            setTimeout(()=>{
                                self.start=true;
                                self.sendAmount=false;
                                self.getAmount=true;
                                all.tool.setBalance()
                            },1000);
                        }
                    },
                    duration:time
                });
            }).catch(error=>{
                this.start=true;
                let message=error.errorMessage;
                if(error.errorMessage==='此电话已经达到了该优惠周期内的申请上限')message='一个电话仅限领取一次';
                all.tool.TipWinShow(message,[{name:'确定',callback:()=>{all.router.push('/home')}}]);
            });

        },
        getProm(){
            all.tool.clickCount({page:'首页',btn:'体验金领取'});
            all.$('.sendAmountWin .amount').removeClass('animaM').addClass('animaA animaB animaC');
        setTimeout(()=>{
            this.Num1=this.$route.params.send<100?0:String(this.$route.params.send).slice(String(this.$route.params.send).length-3,String(this.$route.params.send).length-2);
            this.changeNum1=false;
            all.$('.sendAmountWin .amount').removeClass('animaA')
        },1000);
        setTimeout(()=>{
            this.Num2=this.$route.params.send<10?0:String(this.$route.params.send).slice(String(this.$route.params.send).length-2,String(this.$route.params.send).length-1);
            this.changeNum2=false;
            all.$('.sendAmountWin .amount').removeClass('animaB')
        },2000);
        setTimeout(()=>{
            this.Num3=this.$route.params.send<10?this.$route.params.send:String(this.$route.params.send).slice(String(this.$route.params.send).length-1,String(this.$route.params.send).length);
            this.changeNum3=false;
            all.$('.sendAmountWin .amount').removeClass('animaC');
            clearInterval(this.NumCount);
            this.NumCount=null;
            setTimeout(()=>{
            this.sendAmount=false;
            this.getAmount=true;
            all.tool.setBalance()
                },1500);
            },3000);
        },
        closeSure(){
            this.getAmount=false;
        setTimeout(()=>{this.delayShow=true;},2000)
        },
        gotransferPage(){
            all.router.push('/gameTransfer')
        },
        hideBanner(){
            all.tool.setStore('registerPromo',false);
            this.isRegisterProShow=false
        },
        showNoticeWin(){
            let noticeList=[];
            if(all.store.state.isLogin && all.store.state.level!==4){
                all.store.state.notice.map(item=>{
                    if(item.reach==='players' || item.reach==='all')noticeList.push(item)
                })
            }
            if(all.store.state.isLogin && all.store.state.level===4){
                all.store.state.notice.map(item=>{
                    if(item.reach==='conditional' || item.reach==='players' || item.reach==='all')noticeList.push(item)
                })
            }
            if(!all.store.state.isLogin){
                all.store.state.notice.map(item=>{
                    if(item.reach==='all')noticeList.push(item)
                })
            }
            all.store.state.notice?all.tool.TipWinShow(null,{type:'noticeTip',data:noticeList},"最新公告"):all.tool.TipWinShow("暂无最新公告！",[{name:'确定'}])
        },
        autoUpLevel(){
            all.router.push('/updateLevel')
        },
        enterItem(index){
            if(index==='tree'){
                all.router.push('/tree');
                all.tool.clickCount({page:'首页',btn:'摇钱树'})
            }
            /*if(index===0){h
                if(!all.store.state.isLogin){
                all.tool.TipWinShow('请先登录！',[{name:'确定',callback:()=>{all.router.push('/login')}}])
                }
                this.sendAmount=true
            }*/
            if(index==='promohitegg'){
                all.router.push('/promohitegg');
                all.tool.clickCount({page:'首页',btn:'砸金蛋'})
            }
            if(index==='promobox'){
                all.router.push('/promobox');
                all.tool.clickCount({page:'首页',btn:'超值礼盒'})
            }
            if(index==='resurrection'){
                all.router.push('/resurrection');
                all.tool.clickCount({page:'首页',btn:'复活之钻'})
            }
            if(index==='signIn'){
                all.router.push('/signIn');
                all.tool.clickCount({page:'首页',btn:'签到荣耀'})
            }
        },
        depisitDetail(type){
            if(type==='A'){
                all.tool.clickCount({page:'首存A',btn:'优惠详情'});
            }else{
                all.tool.clickCount({page:'首存B',btn:'优惠详情'});
            }
            all.tool.TipWinShow("<ul style='text-align: left;font-size:13px;line-height: 16px'><li>1.此优惠仅限新会员[首笔存款]后，[尚未投注]前申请有效，过期无法领取。</li><li>2.此优惠仅需完成"+(type==='A'?all.store.state.firstDeposit.depositA.spendingTimes:all.store.state.firstDeposit.depositB.spendingTimes)+"倍流水方可提款，如：存款"+(type==='A'?'10':'100')+"元，领取优惠"+(type==='A'?'10':'100')+"元，需完成"+(type==='A'?'(10+10)*'+all.store.state.firstDeposit.depositA.spendingTimes+'='+parseInt(all.store.state.firstDeposit.depositA.spendingTimes)*20:'(100+100)*'+all.store.state.firstDeposit.depositB.spendingTimes+'='+parseInt(all.store.state.firstDeposit.depositB.spendingTimes)*200)+"。</li><li style='display:"+(type==='A'?'block':'none')+"'>3.领取优惠后最高提款上限"+all.store.state.firstDeposit.depositA.largeSned+"元，提款时系统将会扣除多出余额。</li></ul>",[{name:'确定'}],'优惠详情')
        },
    depisitDetailebet(type){
      let str=""
      if (type === 'A') {
        all.tool.clickCount({
          page:'优惠中心',
          btn:'十元夺宝'
        });
        str=`<ul class="dielog_bon" style='text-align: left;font-size: 14px'>
          <li>1. 此优惠可在（任意）游戏厅投注。</li>
          <li>2. 每人均可领取一次。 </li>
          <li>3. 领取优惠后，只需达到（${this.ebetInfo.depositAebet.spendingTimesOnReward*this.ebetInfo.depositAebet.rewardAmount}）流水即可提款。</li>
          <li>4. 此优惠提款上限：${this.ebetInfo.depositAebet.forbidWithdrawIfBalanceAfterUnlock}元。提款时系统将扣除多出余额。</li>
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
          <li>4.领取优惠后，需达到（${this.ebetInfo.depositBebet.spendingTimes}）倍流水方可提款。如：存款500元，领取优惠750元， 需完成（500 + 750）*38倍 = 47500流水才可提款。</li>
          <li>5. 此优惠提款上限：${this.ebetInfo.depositBebet.forbidWithdrawIfBalanceAfterUnlock}元。提款时系统将扣除多出余额。</li>
          </ul>`
      }

      all.alert.confirm(str, [{name: '确定'}]);
    },
    closeDiscount (name) {
      this[name] = false;
      setTimeout(() => {
        this.showBg = false;
      }, 300);
    },
    getFirstDepositebet (code) {


        if (!this.$store.state.isLogin ) {
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
        all.tool.TipWinShow('恭喜您成功领取，祝您多多盈利！',[{name:'前往游戏',callback:()=>{
            if (type === 'eBETslot') {
                all.router.push({path: '/game', query: {
                    page: 11
                }});
            } else {
                this.getLoginUrl(this.ebetGameId, 'ebetGame');
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
        appLoad(){
            all.tool.clickCount({page:'首页',btn:'APP下载'})
        },
        addDesk(){
            all.tool.clickCount({page:'首页',btn:'加入桌面'})
        },
        closeFirst(){
            all.tool.isFirstSaveShow('close');
            all.tool.setStore('once',false);
        },

        closeduobao(){
            all.tool.isFirstSaveShow('close');
            all.tool.setStore('once',false);
            this.$store.commit("setfirstduobaoShow")
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
            if(code==='A')all.tool.clickCount({page:'首页',btn:'首存A'});
            if(code==='B')all.tool.clickCount({page:'首页',btn:'首存B'});
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
        goToGame (type) {
            this.$router.push({path:'/game', query: {
                page: type
            }})
        },
        showActivity () {
            this.activity = !this.activity;
            this.showNews = false;
            all.tool.setStore('news', 0);
        },

        /* 领取APP体验金 */
        APPActivity () {
        // if (this.isApp) {
            // if (!this.$store.state.isLogin) {
            //   all.tool.TipWinShow('请您先登录', [{name: '前往登陆', callback: () => {
            //       this.$router.push('/login');
            //   }}]);
            //   return;
            // }
        //   if (this.flag) {
        //     this.flag = false;
        //     all.tool.send('applyRewardEvent', {
        //       code: 'app'
        //     }).then(result => {
        //       this.flag = true;
        //       all.tool.TipWinShow('恭喜您获得8元彩金！',[{name:'确定'}]);
        //     }).catch(err => {
        //       this.flag = true;
        //       all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]);
        //     });
        //   }
        // } else {
        //   all.tool.TipWinShow('此活动仅限APP内领取！',[{name:'确定'}]);
        // }
        },

        showAppAcitvity () {
            all.tool.clickCount({page:'首页',btn:'APP下载活动'});
            this.$router.push('/downloadAPP');
        // this.isShowAppAcitvity = true;
        },

        closeAppAlert () {
            this.isShowAppAcitvity = false;
        },

        goToDownload () {
            all.tool.clickCount({page:'首页',btn:'APP下载'});
            this.$router.push('/download');
        },

        gotoDiscountCenter() {
            this.$router.push('/discountCenter');
        },

        goToEbetGame () {
            all.tool.clickCount({page:'首页', btn:'真人厅'});
            this.getLoginUrl(this.ebetGameId, 'ebetGame');
        },

        gotoFish () {
            all.tool.clickCount({page:'首页', btn:'棋牌'});
            // this.getLoginUrl(this.fishGameId);
            this.$router.push('/gameLobbyKY');
        },

        getLoginUrl (gameId, gameName) {
            if (this.$store.state.isLogin) {
                all.tool.send('getLoginURL', {
                    gameId: gameId,
                    clientDomainName: window.location.origin,
                    clientType: 2,
                }).then(result => {
                    if (gameName !== 'ebetGame') {
                        // window.open(result.data.gameURL);
                        all.alert.confirm('是否前往游戏', [{name: '否'}, {name: '是', callback: () => {
                            window.open(result.data.gameURL);
                        }}]);
                    } else {
                        all.alert.confirm('请选择游戏模式', [{name: '免费试玩', callback: () => {
                            all.tool.clickCount({page:'首页', btn:'真人登陆后免费试玩'});
                            window.open(this.ebetFreeGameUrl);
                        }}, {name: '真钱游戏', callback: () => {
                            window.open(result.data.gameURL);
                        }}]);
                    }

                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    if (error.status == 425 || error.status == 402)
                        errorMessage = '游戏正在维护中，请稍后再试';
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                });
            } else {
                if (gameName !== 'ebetGame') {
                    all.alert.confirm('请您先登录', [{name: '前往登陆', callback: () => {
                        this.$router.push('/login');
                    }}]);
                } else {
                   all.alert.confirm('真钱游戏，请登入易游会员账号', [{name: '免费试玩', callback: () => {
                        all.tool.clickCount({page:'首页', btn:'真人未登录免费试玩'});
                        window.open(this.ebetFreeGameUrl);
                    }}, {name: '前往登陆', callback: () => {
                        this.$router.push('/login');
                    }}]);
                }
            }
        },

        setGlobalTimeout(timer) {
            this.timer = timer;
        },

        interval(cb, time, getTimerCb) {
            let intervalFn = function(t) {
                cb && cb();
                t && clearTimeout(t);
                let timer = setTimeout(() => {
                    intervalFn(timer);
                }, time ? time : 2000);
                getTimerCb && getTimerCb(timer);
            }
            // setTimeout(intervalFn, time)
            intervalFn();
        }

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
        },
        firstduobaoShow(){
            return this.$store.state.firstduobaoShow;
        }
},
    components: {
        NewActivity,
    }
}
</script>

<style scoped lang='less'>
  @import (reference) "../assets/css/variable";
  .home{
    height:83.508246%;
    background:url("../assets/image/pages/home/bgHome.jpg") no-repeat left top;
    background-size:100% auto;
    .pb(80);
  }
  .accountDetails{
    display:flex;
    justify-content:space-between;
    align-items:center;
    .height(130);
    background:url("../assets/image/pages/home/accountDetailsLine.png") no-repeat center bottom rgba(22,58,86,0.8);
    background-size:100% 2px;
    font-size:2.4rem;
  }

  .appDownLoadingActivity {
    width: 100%;
    .height(100);
    background: url(../assets/image/pages/home/appDownLoadBanner_01.jpg) no-repeat center center/100% 100%;
    position: relative;

    img {
        .width(196);
        .height(94);
        position: absolute;
        left: 50%;
        .ml(-70);
        animation: jitter 2s linear infinite;
    }
    // img {
    //   .width(410);
    //   .height(68);
    //   position: absolute;
    //   .left(200);
    //   .top(10);
    //   animation: bounceInRight 1s 1s linear;
    // }

  }

  .leftbar{
    display:flex;
    justify-content:flex-start;
    width:30.43662%;
    height:71.428571%;
    margin-left:2.666667%
  }
  .rightbar{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:63.56338%;
    height:71.428571%;
    margin-right:2.666667%
  }
  .name_level{
    margin-left:7.042254%;
    text-align:left;
  }
  .userName,.level{
    display:flex;
    align-items:center;
    height:50%;
    .font-size(24);
  }
  .userName{
      color:#f39800
  }
  .score_amount{
    display:flex;
    justify-content:space-between;
    height:40%;
    .font-size(24);
  }
  .score_amount i{
    margin-left: 5.095%
  }
  .score_amount span{
    height:100%;
    width:fit-content
  }
  .score{
    display:flex;
    align-items:center;
    width:44.186047%;
    background:#0b1d2b;
    box-shadow:-1px 1px 5px rgba(11,28,41,0.5) inset;
    position:relative;
  }
  .score span:first-child{
      display:flex;
      .width(37);
      height:100%;
      position:relative;
  }
  .score i{
      position:relative;
  }
  .score_amount .score .drawDown{
      position:absolute;
      right:0;
      top:0;
      width:auto;
  }
  .balance{
    display:flex;
    align-items:center;
    width:51.162791%;
    background:#0b1d2b;
    box-shadow:-1px 1px 5px rgba(11,28,41,0.5) inset;
    position:relative;
  }
  .balance .coin{
      .width(37)
  }
  .balance .drawDown{
    position:absolute;
    right:0;
    top:0;
  }
  .update{
    height:40%;
    display:flex;
    justify-content:space-between;
  }
  .update span{
    width:fit-content;
    height:100%;
  }
  .dataLevel{
    display:flex;
    align-items:center;
    justify-content: center;
    flex:1;
    background:#0b1d2b;
    position:relative;
    box-shadow:-1px 1px 5px rgba(11,28,41,0.5) inset;
    .font-size(24);
  }
  .dataLevel i{
    height:100%;
    background:linear-gradient(to right,#c27e25,#edb02e);
    position:absolute;
    left:0;
    max-width:100%;
  }
  .dataLevel b{
    position:absolute;
    z-index:1;
  }
  .notice{
    display:flex;
    align-items:center;
    justify-content:flex-end;
    .height(56);
    background:url("../assets/image/pages/home/iconNotice.png") no-repeat 2.666667% center rgba(22,58,86,0.3);
    background-size:auto 60%;
  }
  .noticeContent{
     .font-size(24);
    width:92%
  }
  .registerBanner{
      position:relative;
      display:flex;
      align-items: center;
  }
  .registerBanner img:nth-child(3){
      position:absolute;
      left:0;
      top:0;
      animation:mymove 3s infinite;
  }
  .registerBanner img:nth-child(2){
      position:absolute;
      height:100%;
      width:auto;
      .right(100);
      animation:textmove 10s infinite;
  }
  .registerBanner img:last-child{
      .width(66);
      height:auto;
      position:absolute;
      top:50%;
      transform:translateY(-50%);
      .right(20);
  }
  .toRight{
      .height(80);
      width:auto;
      position:absolute;
      right:10px;
      z-index:10;
      animation:updown 2s infinite linear;
  }
  @keyframes updown{
      0%,100%{transform:translateX(5px);opacity: 0}
      50%{transform:translateX(-5px);opacity: 1}
  }
  @keyframes mymove{
      0%,100%{opacity:0.2}
      25%,75%{opacity:1}
      50%{opacity:0.5}
  }
  @keyframes textmove{
      0%,100%{right:0;transform:scale(0.6)}
      25%,75%{right:20%;transform:scale(0.9)}
      50%{right:10%;transform:scale(0.8)}
  }


    .game-box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .height(560);
        .rem2(padding, 0, 20);
        .mt(40);
    }

    .game-box-left,.game-box-right {
        position: relative;
    }

    .game-box-left {
        // .width(416);
        width: 58%;
        .border-radius(20);
        height: 100%;
        overflow: hidden;
    }

    .person-bg {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        animation: moveBg 8s linear infinite;
        animation-direction: alternate;
    }

    .ebet_loge {
        .width(150);
        position: absolute;
        z-index: 3;
        .top(10);
        .left(10);
    }

    .person-img {
        width: 100%;
        height: 98%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        animation: Shake 5s linear infinite;
    }

    .person-name,.electronic-name,.fish-name {
        position: absolute;
        z-index: 3;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .person-name {
        .height(122);
    }

    .electronic-name {
        .height(90);
    }

    .fish-name {
        .height(80);
    }

    .game-box-right {
        // .width(276);
        width: 39%;
        height: 100%;
        position: relative;
    }

    .gbr-top,.gbr-bottom {
        width: 100%;
        .border-radius(15);
    }

    .gbr-top {
        position: absolute;
        top: 0;
        left: 0;
        .height(340);
        overflow: hidden;
    }

    .electronic-bg {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .e-center-bg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 150%;
        z-index: 2;
        animation: bullet 5s linear infinite;
    }

    .electronic-img {
        position: absolute;
        left: 50%;
        bottom: 0;
        height: 100%;
        z-index: 3;
        transform: translateX(-50%);
    }

    .gbr-bottom {
        position: absolute;
        left: 0;
        bottom: 0;
        .height(200);
        overflow: hidden;
    }

    .fish-animate-box {
        position: absolute;
        .width(320);
        .height(320);
        top: 50%;
        left: 50%;
        .mt(-160);
        .ml(-160);
        z-index: 4;
    }

    .fish-game-one {
        position: absolute;
        .width(140);
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        animation: openW 3s linear infinite;
        z-index: 2;
    }

    .fish-game-two {
        position: absolute;
        .right(80);
        top: 50%;
        transform: translateY(-50%) translateX(100%);
        .width(50);
        animation: fire 3s linear infinite;
        z-index: 1;
    }


    .gameBox{
        display:flex;
        justify-content:space-between;
        padding:0 2.666667%;
        margin-top:5.067%
    }
    .gameBox img{
        .border-radius(10);
        overflow:hidden;
    }
    .leftGamebar{
        width:58.450704%;
        position:relative;
    }
    .leftGamebar img:last-child{
        position:absolute;
        top:0;
        left:0
    }
    .rightGamebar{
        width:38.732394%
    }
    .rightGamebar img:first-child{
        margin-bottom:7.275%;
    }
    .itemMenuBox{
        position:relative;
        display:flex;
        align-items: flex-end;
        margin-top:6%;
    }
    .new {
        position: absolute;
        .width(42);
        .height(42);
        background-color: #dc1a23;
        .top(-20);
        .right(10);
        z-index: 10;
        .border-radius(42);
        .font-size(26);
        .line-height(42);
        font-weight: 700;
    }
  .newCode {
      position: absolute;
      .width(42);
      .height(42);
      background-color: #dc1a23;
      left: 19.7333%;
      top: 0;
      z-index: 10;
      .border-radius(42);
      .font-size(26);
      .line-height(45);
      font-weight: 700;
  }
  .leftMove{
      left:19.7333%
  }
  .itembar{
    width:100%;
    position:relative;
    display:flex;
    align-items:center;
  }
  .promotion{
    position:absolute;
    bottom:0;
    left:0;
    z-index:2;
  }
  .item{
    position:absolute;
    right:0;
    height:100%;
    width:73.335%;
    display:flex;
    align-items: center;
    overflow-x:scroll;
  }
  .item img{
    margin-left:3%;
  }
  .farstMenu{
    width:100%;
    padding:0 2.666667%;
    margin:5.335% 0;
  }

  .downloadImg {
    .mt(-4);
  }

  .farstMenu img:nth-child(2){
    margin:0 1%;
  }
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
      .top(583);
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
    overflow: hidden;
    &>span{
      display: block;
      white-space:nowrap;
      /*animation:marquee 20s infinite linear;*/
        /*滚动跑马灯*/
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
 .elsePromo{
      position:absolute;
      width:100%;
      height:100%;
      left:0;
      top:0;
      background:rgba(0,0,0,0.8);
      z-index: 100;
      display:flex;
      align-items: center;
      justify-content: center;
      overflow-y: scroll;
     .pl(40)
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
      .translate(-20, 20);
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
      position:relative;
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

  .win_content {
    .mt(-200);
    .width(630);
    .height(740);
    position: relative;
    background: url('../assets/image/pages/home/appAlertBg.png') no-repeat center center/100% 100%;

    .appSumitBtn {
      .width(250);
      .height(70);
      position: absolute;
      .bottom(180);
      left: 50%;
      .ml(-125);
      background: url('../assets/image/pages/home/appSubmit.png') no-repeat center center/100% 100%;
    }

    .appCloseBtn {
      .width(68);
      .height(68);
      background: url('../assets/image/pages/home/promoCloseBtn.png') no-repeat center center/100% 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
    .main_bottom_nav {
        width: 100%;
        .height(220);
        font-size: 0;
        .rem2(padding, 0, 20);
        display: flex;
        justify-content: space-between;
        .mt(40);

        li {
            display: inline-block;
            .width(166);
            .height(220);

            .mvn_bg_box {
                position: relative;
                width: 100%;
                .height(166);
                background: url(../assets/image/pages/home/bottom_navBg.png) no-repeat center center/100% 100%;
            }

            img {
                .width(166);
            }

            p {
                .mt(14);
                width: 100%;
                .height(36);
            }
        }

        li:nth-child(1) {
            p {
                background: url(../assets/image/pages/home/promotion_01_text.png) no-repeat center center/100% 100%;
            }
        }

        li:nth-child(2) {
            p {
                background: url(../assets/image/pages/home/activity_text.png) no-repeat center center/100% 100%;
            }
        }

        li:nth-child(3) {
            p {
                background: url(../assets/image/pages/home/downLoad_text.png) no-repeat center center/100% 100%;
            }
        }

        li:nth-child(4) {
            p {
                background: url(../assets/image/pages/home/proxy_text.png) no-repeat center center/100% 100%;
            }
        }
    }


    @keyframes rotate{
        0%{transform:rotateZ(0)}
        100%{transform:rotateZ(180deg)}
    }
    @keyframes numMove{
        0%{margin-top:-50%}
        50%{margin-top:0}
        100%{margin-top:50%}
    }
    .sendAmountWin .animaM span:nth-child(1){
        animation:numMove 0.3s infinite linear;
    }
    .sendAmountWin .animaM span:nth-child(2){
        animation:numMove 0.4s infinite linear;
    }
    .sendAmountWin .animaM span:nth-child(3){
        animation:numMove 0.5s infinite linear;
    }
    .sendAmountWin .animaA span:nth-child(1){
        animation:numMove 0.15s infinite linear;
    }
    .sendAmountWin .animaB span:nth-child(2){
        animation:numMove 0.25s infinite linear;
    }
    .sendAmountWin .animaC span:nth-child(3){
        animation:numMove 0.4s infinite linear;
    }
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

    @keyframes bounceInRight {
        from, 60%, 75%, 90%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        }

        from {
        opacity: 0;
        transform: translate3d(3000px, 0, 0);
        }

        60% {
        opacity: 1;
        transform: translate3d(-25px, 0, 0);
        }

        75% {
        transform: translate3d(10px, 0, 0);
        }

        90% {
        transform: translate3d(-5px, 0, 0);
        }

        to {
        transform: none;
        }
    }

    @keyframes moveBg {
        from {
            .top(-220);
        }

        to {
            top: 0;
        }
    }

    @keyframes openW {
        0% {
            transform: translateX(-50%) translateY(-50%) scale(0);
            opacity: 0;
        }


        70% {
            transform: translateX(-50%) translateY(-50%) scale(0);
            opacity: 0;
        }

        91% {
            transform: translateX(-50%) translateY(-50%) scale(1);
            opacity: 1;
        }

        to {
            opacity: 0;
        }
    }

    @keyframes fire {
        0% {
            .right(-80);
            opacity: 1;
        }

        60% {
            .right(-80);
            opacity: 1;
        }

        70% {
            right: 50%;
            opacity: 0.8;
        }

        to {
            right: 50%;
            opacity: 0;
        }
    }

    @keyframes bullet {
        0% {
            left: 100%;
            bottom: 100%;
            opacity: 1;
        }

        60% {
            left: 100%;
            bottom: 100%;
            opacity: 1;
        }

        100% {
            left: -120%;
            bottom: -120%;
            opacity: 0;
        }
    }

    @keyframes Shake {
        0%,100% {
            transform: translateY(0) translateX(0) scale(1)
        }

        50% {
            transform:translateY(-2%) translateX(-2%) scale(1.05);
        }
    }

    @keyframes jitter {
        20% {
            transform: rotate3d(0, 0, 1, 15deg);
        }

        40% {
            transform: rotate3d(0, 0, 1, -10deg);
        }

        60% {
            transform: rotate3d(0, 0, 1, 5deg);
        }

        80% {
            transform: rotate3d(0, 0, 1, -5deg);
        }

        to {
            transform: rotate3d(0, 0, 1, 0deg);
        }
    }

    @media screen and (max-height: 444px) {
        .accountDetails{
        background-size:100% 1px;
        }
    }
</style>
