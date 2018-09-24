/*
 * @Author: Reynold Yang 
 * @Date: 2018-05-03 09:59:39 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-17 15:21:31
 */

<template>
    <div class="task">
         <PageTop
            :title="PageTopTitle"
        />

        <div class="box_userInfo">
            <div class="userImg">
                <img :src="userImgUrl" alt="">
            </div>
            <div class="box_right">
                <p><span v-text="username" class="username"></span></p>
                <MoneyBox style="margin-left: -0.1rem;"/>
            </div>
            <img src="../assets/image/components/public/infoText.png" class="bu_img" @click="openTaskInfo">
        </div>

        <div class="box_info">
            <div class="box_input">
                <div class="box_input_in">
                    <label>积分</label>
                    <input v-model="integral" autocomplete="off" type="text" placeholder="请输入">
                </div>
            </div>
            <div class="infoText">
                <p>比例&nbsp;&nbsp;<span v-text="proportion"></span> : 1</p>
                <p>真钱&nbsp;&nbsp;<span v-text="amount" class="orangeText"></span></p>
            </div>
            <div class="box_btn">
                <input type="button" @click="applyPoint">
            </div>
        </div>

        <ul class="box_nav">
            <li v-for="(item, index) in navList" :key="item" @click="tab(index)" :class="{navActive: num == index}">{{item}}</li>
        </ul>

        <!-- 登入 -->
        <div class="signIn" v-show="num==0">
            <div class="day oneDay" :class="{activeAnimate: animateList[0],open:openList[0]}" :style="{background: oneDayBg}" @click="receivePoint(0)"></div>
            <div class="day twoDay" :class="{activeAnimate: animateList[1],open:openList[1]}" :style="{background: twoDayBg}" @click="receivePoint(1)"></div>
            <div class="day threeDay" :class="{activeAnimate: animateList[2],open:openList[2]}" :style="{background: threeDayBg}" @click="receivePoint(2)"></div>
            <div class="day fourDay" :class="{activeAnimate: animateList[3],open:openList[3]}" :style="{background: fourDayBg}" @click="receivePoint(3)"></div>
            <div class="day fiveDay" :class="{activeAnimate: animateList[4],open:openList[4]}" :style="{background: fiveDayBg}" @click="receivePoint(4)"></div>
            <div class="day sixDay" :class="{activeAnimate: animateList[5],open:openList[5]}" :style="{background: sixDayBg}" @click="receivePoint(5)"></div>
            <div class="day sevenDay" :class="{activeAnimate: animateList[6],open:openList[6]}" :style="{background: sevenDayBg}" @click="receivePoint(6)"></div>
            <p class="orangeText directions" @click="showUpdateInfo">注：在一周内登入7天，即可获得最后的积分宝箱。<img src="../assets/image/components/public/infoText.png" alt=""></p>
        </div>

        <!-- 存款 -->
        <div class="saving" v-show="num==1">
            <div class="saving_content">
                <!-- <ul class="savingNav">
                    <li v-for="(item, index) in savingList" 
                        :key="item" 
                        @click="savingTab(index, item)" 
                        :class="{savingActive: savingNum == index}" 
                        :style="{width: savingNavLiWidth}"
                    >
                        <i v-if="item=='银行卡'" class="iconfont icon-zaixianchongzhi"><span class="fontSize">{{item}}</span></i>
                        <i v-if="item=='在线'" class="iconfont icon-shoujichongzhishi"><span class="fontSize">{{item}}</span></i>
                        <i v-if="item=='微信'" class="iconfont icon-weixin"><span class="fontSize">{{item}}</span></i>
                        <i v-if="item=='支付宝'" class="iconfont icon-zhifubao"><span class="fontSize">{{item}}</span></i>
                    </li>
                </ul> -->
                <ul class="items-box">
                    <li v-for="item in savingShowList[0]" :key="item.id">
                        <div class="box_icon" :style="{background: savingItemBg}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveSavingPoint(item.status, item.id)">
                        </div>
                    </li>
                    <li v-for="item in savingShowList[1]" :key="item.id">
                        <div class="box_icon" :style="{background: savingItemBg}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveSavingPoint(item.status, item.id)">
                        </div>
                    </li>
                    <li v-for="item in savingShowList[2]" :key="item.id">
                        <div class="box_icon" :style="{background: savingItemBg}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveSavingPoint(item.status, item.id)">
                        </div>
                    </li>
                    <!-- <li v-for="item in rechargePointList" :key="item.id">
                        <div class="box_icon" :style="{background: savingItemBg}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveSavingPoint(item.status, item.id)">
                        </div>
                    </li> -->
                </ul>
            </div>
            <div class="bottomText">
                注：若你累计存款1000元是使用同一种存款方式，不仅能领取1000元的积分奖励，还可领取100元和500元的积分奖励
                <img src="../assets/image/components/public/infoText.png" alt="" @click="showUpdateInfo">
            </div>
        </div>

        <!-- 游戏 -->
        <div class="game" v-show="num==2">
             <div class="saving_content">
                <ul class="gameNav">
                    <li v-for="(item, index) in gameList" :key="item.groupName" @click="gameTab(index)" :class="{savingActive: gameNum == index}">
                        <!-- <i v-if="index==0"><span class="fontSize">{{item}}</span></i>
                        <i v-if="index==1"><span class="fontSize">{{item}}</span></i>
                        <i v-if="index==2"><span class="fontSize">{{item}}</span></i> -->
                        {{item.groupName}}
                    </li>
                </ul>
                <ul class="gameNav-children">
                    <li v-for="(value, i) in gameList[gameNum].children" :key="value" @click="gameChildrenTab(i)" :class="{savingActive: gameChildren === i}">
                        <span class="gameNav-children-icon" v-if="gameList[gameNum].children[i] === '易博电子'">新</span>
                        {{value}}
                    </li>
                </ul>
                <ul class="items-box game-items-box">
                    <li v-for="item in gameShowList[0]" :key="item.id">
                        <div class="box_icon" :style="{background: gameItemBg(item.dailyRequestBetCountsAndAmount[1])}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveGamePoint(item.status, item.id, item.providerId[0])">
                        </div>
                    </li>
                    <li v-for="item in gameShowList[1]" :key="item.id">
                        <div class="box_icon" :style="{background: gameItemBg(item.dailyRequestBetCountsAndAmount[1])}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveGamePoint(item.status, item.id, item.providerId[0])">
                        </div>
                    </li>
                    <li v-for="item in gameShowList[2]" :key="item.id">
                        <div class="box_icon" :style="{background: gameItemBg(item.dailyRequestBetCountsAndAmount[1])}"></div>
                        <div class="item_info">
                            <p>{{item.title}}</p>
                            <p>{{item.content}}</p>
                            <p> X <span>{{item.point}}</span></p>
                        </div>
                        <div class="item_btn">
                            <input type="button" :style="{background: btnBg(item.status)}" @click="receiveGamePoint(item.status, item.id, item.providerId[0])">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottomText">
                注：若你今日在PT累计下注100笔，每注超过2元，不仅能领取100笔2元投注的积分奖励，还可领取100笔1元投注的积分奖励
            </div>
        </div>

        <div class="pageWindow" v-if="visible">
            <transition name="slide-fade">
                <div class="window_in" v-if="visibleIn">
                    <div class="header">
                        <div class="window_closeBtn" @click="hideUpdateInfo"></div>
                    </div>
                    <div class="content" v-if="num==0">
                        <table id="updateInfo" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>第一天</th>
                                <th>第二天</th>
                                <th>第三天</th>
                                <th>第四天</th>
                                <th>第五天</th>
                                <th>第六天</th>
                                <th>第七天</th>
                            </tr>
                            <tr>
                                <td v-for="item in loginPointList" :key="item.id">{{item.point}}</td>
                            </tr>
                            <!-- <tr>
                                <td v-text="levelOneInfo.login[0] ? levelOneInfo.login[0].gradeName : 'lv.1 小兵'"></td>
                                <td v-for="item in levelOneInfo.login" :key="item.id">{{item.point}}</td>
                            </tr>
                            <tr>
                                <td v-text="levelTwoInfo.login[0] ? levelTwoInfo.login[0].gradeName : 'lv.2 张飞'"></td>
                                <td v-for="item in levelTwoInfo.login" :key="item.id">{{item.point}}</td>
                            </tr>
                            <tr>
                                <td v-text="levelThreeInfo.login[0] ? levelThreeInfo.login[0].gradeName : 'lv.3 关羽'"></td>
                                <td v-for="item in levelThreeInfo.login" :key="item.id">{{item.point}}</td>
                            </tr>
                            <tr>
                                <td v-text="levelFourInfo.login[0] ? levelFourInfo.login[0].gradeName : 'lv.4 孔明'"></td>
                                <td v-for="item in levelFourInfo.login" :key="item.id">{{item.point}}</td>
                            </tr>
                            <tr>
                                <td v-text="levelFiveInfo.login[0] ? levelFiveInfo.login[0].gradeName : 'lv.5 刘备'"></td>
                                <td v-for="item in levelFiveInfo.login" :key="item.id">{{item.point}}</td>
                            </tr> -->
                        </table>
                        <p style="margin:0.3rem 0;">一周内登入的天数越多，获取的积分就越多</p>
                    </div>
                    <div class="content saving_content" v-if="num==1">
                        <p>积分领取说明：</p>
                        <p>1. 该积分以<span class="orangeText">日为周期</span>，根据存款方式完成存款，即可领取对应积分。</p>
                        <p>2. 积分规则根据不同等级、金额、存款方式等，对应积分值不同。</p>
                        <p>3. 可阶梯式领取对应积分，如：银行卡存款方式存款1000元，可同时领取此存款方式的100元及500元存款积分。</p>
                        <p class="orangeText">4. 当天存款后未领取的积分将在每日0点时清零，清零后则无法领取，请留意。</p>
                    </div>
                </div>
            </transition>
        </div> 

         <div class="pageWindow" v-if="visibleTask">
            <transition name="slide-fade">
                <div class="window_in task_in" v-if="visibleInTask">
                    <div class="header">
                        <div class="window_closeBtn" @click="hideTaskInfo"></div>
                    </div>
                    <div class="content">
                        <table id="updateInfo" cellspacing="0" cellpadding="0">
                            <tr>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <th>LV.1</th>
                                <th>LV.2</th>
                                <th>LV.3</th>
                                <th>LV.4</th>
                                <th>LV.5</th>
                            </tr>
                            <tr>
                                <td>当日最高获得</td>
                                <td v-for="item in rewardPointsList" :key="item.gradeName">{{item.dailyGetMaxPoint}}</td>
                            </tr>
                            <tr>
                                <td>当日最高兑换</td>
                                <td v-for="item in rewardPointsList" :key="item.gradeName">{{item.preDailyExchangeMaxPoint}}</td>
                            </tr>
                            <tr>
                                <td>提前兑换比例</td>
                                <td v-for="item in rewardPointsList" :key="item.gradeName">{{item.preExchangeRate}}</td>
                            </tr>
                            <tr>
                                <td>到期兑换比例</td>
                                <td v-for="item in rewardPointsList" :key="item.gradeName">{{item.endExchangeRate}}</td>
                            </tr>
                            <tr>
                                <td>真钱流水倍数</td>
                                <td v-for="item in rewardPointsList" :key="item.gradeName">{{item.requestedValidBetTimes}}</td>
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
    export default {
        data () {
            return {
                PageTopTitle: '任 务 奖 励',
                integral: '',                            // 输入的积分
                proportion: '--',                        // 兑换比例
                amount: 0,                               // 真钱
                navList: ['登 入', '存 款', '游 戏'],     // 导航数组
                num: 0,                                  // 主导航选择
                savingNum: 0,                                                   // 存款导航选择
                svaingActiveName: 'bankcard',
                gameNum: 0,                                                     // 游戏导航选择
                gameChildren: 0,                                                // 游戏子导航选择
                ebetGameId: '',
                fishGameId: '',
                savingList: ['银行卡', '在线', '微信', '支付宝'],                 // 存款导航
                savingIconList: ['bankcard', 'online', 'wechat', 'ailpay'],     // 存款item图片名称,也控制存款导航切换显示数组的
                gameList: [                                                     // 游戏导航
                    {                                                    
                        groupName: '真人',
                        children: ['eBET 真人']
                    }, {
                        groupName: '电子',
                        children: ['易博电子', 'PT游戏', 'MG游戏', 'DT游戏']
                    }, {
                        groupName: '捕鱼',
                        children: ['AG捕鱼']
                    }
                ],                              
                gameIconList:['PT', 'MG', 'DT'],                                
                rewardPointsList: null,                                                   // 积分详情数组
                levelList: ['levelOneInfo', 'levelTwoInfo', 'levelThreeInfo', 'levelFourInfo', 'levelFiveInfo'],
                savingShowList: [[], [], []],                                             // 存款展示数组
                gameShowList: [],                                                         // 游戏展示数组
                animateList: [false, false, false, false, false, false, false],           // 控制签到动画显示
                openList: [false, false, false, false, false, false, false],              // 控制领取过渡动画显示
                loginPointList: [],
                rechargePointList: [],
                gamePointList: {                                                           // 游戏页面数据存储
                    person: {
                        eBET: [[], [], []]
                    },
                    electronic: {
                        PT: [[], [], []],
                        MG: [[], [], []],
                        DT: [[], [], []],
                        EBETSLOTS: [[], [], []],
                    },
                    fish: {
                        AG: [[], [], []]
                    }

                },
                gameListMapping: [                                                          // 存储数据映射 方便获取
                    {
                        groupName: 'person',
                        childrenName: ['eBET']
                    }, {
                        groupName: 'electronic',
                        childrenName: ['EBETSLOTS', 'PT', 'MG', 'DT']
                    }, {
                        groupName: 'fish',
                        childrenName: ['AG']
                    }
                ],
                visible: false,
                visibleIn: false,
                visibleTask: false,
                visibleInTask: false,
                levelOneInfo: {
                    login: [],
                    game: {
                        PT: [[], [], []],
                        MG: [[], [], []],
                        DT: [[], [], []]
                    },
                    saving: {
                        bankcard: [[], [], []],
                        online: [[], [], []],
                        wechat: [[], [], []],
                        ailpay: [[], [], []]
                    },
                },                                               
                levelTwoInfo: {
                    login: [],
                    game: {
                        PT: [[], [], []],
                        MG: [[], [], []],
                        DT: [[], [], []]
                    },
                    saving: {
                        bankcard: [[], [], []],
                        online: [[], [], []],
                        wechat: [[], [], []],
                        ailpay: [[], [], []]
                    },
                },
                levelThreeInfo: {
                    login: [],
                    game: {
                        PT: [[], [], []],
                        MG: [[], [], []],
                        DT: [[], [], []]
                    },
                    saving: {
                        bankcard: [[], [], []],
                        online: [[], [], []],
                        wechat: [[], [], []],
                        ailpay: [[], [], []]
                    },
                },
                levelFourInfo: {
                    login: [],
                    game: {
                        PT: [[], [], []],
                        MG: [[], [], []],
                        DT: [[], [], []]
                    },
                    saving: {
                        bankcard: [[], [], []],
                        online: [[], [], []],
                        wechat: [[], [], []],
                        ailpay: [[], [], []]
                    },
                },
                levelFiveInfo: {
                    login: [],
                    game: {
                        PT: [[], [], []],
                        MG: [[], [], []],
                        DT: [[], [], []]
                    },
                    saving: {
                        bankcard: [[], [], []],
                        online: [[], [], []],
                        wechat: [[], [], []],
                        ailpay: [[], [], []]
                    },
                },

        };
    },

    created() {
        if(this.$route.query.type=="jifen"){
                this.tab(2)
            this.gameTab(1)
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

    mounted () {
        this.getPointRule();
        this.getMissonList();
    },

    components: {
        PageTop,
        MoneyBox
    },

    computed: {
        
        /* 用户头像地址 */
        userImgUrl () {
            let str = require(`../assets/image/pages/home/headImageLv${this.$store.state.level + 1}.png`);
            return str;
        },

        /* 当前用户等级 */
        userLevel () {
            return this.$store.state.level;
        },

        /* 用户名 */ 
        username () {
            return this.$store.state.userName;
        },

        /* 等级名 */ 
        leveName () {
            return this.$store.state.levelName;
        },

        /* 签到背景图 */
        oneDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][0] ? This[levelInfo]['login'][0].status : 0;
            let imgName = this.loginPointList[0] ? this.loginPointList[0].status : 0;
            return 'url(' + require(`../assets/image/pages/task/1-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        twoDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][1] ? This[levelInfo]['login'][1].status : 0;
            let imgName = this.loginPointList[1] ? this.loginPointList[1].status : 0;
            return 'url(' + require(`../assets/image/pages/task/2-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        threeDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][2] ? This[levelInfo]['login'][2].status : 0;
            let imgName = this.loginPointList[2] ? this.loginPointList[2].status : 0;
            return 'url(' + require(`../assets/image/pages/task/3-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        fourDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][3] ? This[levelInfo]['login'][3].status : 0;
            let imgName = this.loginPointList[3] ? this.loginPointList[3].status : 0;
            return 'url(' + require(`../assets/image/pages/task/4-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        fiveDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][4] ? This[levelInfo]['login'][4].status : 0;
            let imgName = this.loginPointList[4] ? this.loginPointList[4].status : 0;
            return 'url(' + require(`../assets/image/pages/task/5-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        sixDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][5] ? This[levelInfo]['login'][5].status : 0;
            let imgName = this.loginPointList[5] ? this.loginPointList[5].status : 0;
            return 'url(' + require(`../assets/image/pages/task/6-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        sevenDayBg () {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let imgName =  This[levelInfo]['login'][6] ? This[levelInfo]['login'][6].status : 0;
            let imgName = this.loginPointList[6] ? this.loginPointList[6].status : 0;
            return 'url(' + require(`../assets/image/pages/task/7-${imgName + 1}.png`) + ') no-repeat center center/100% 100%';
        },

        /* 存款item 的 icon */ 
        savingItemBg () {
            return 'url(' + require(`../assets/image/pages/task/saving.png`) + ') no-repeat center center/100% 100%';
        },

        /* 存款li宽度 */
        savingNavLiWidth () {
            let navLength = this.savingList.length;
            return 100/navLength - 3 + '%';
        } 

        /* 提交按钮背景图 */
        // btnBg () {
        //     return 'url(' + require(`../assets/image/pages/task/btn${0}.jpg`) + ') no-repeat center center/100% 100%';
        // } 
    },

    methods: {
        tab (index) {
            this.num = index;
            if (index == 1) {
                this.savingTab(0);
            } else if (index == 2) {
                this.gameTab(0, 0);
            }
        },

        getLoginUrl (gameId, gameName) {
            if (this.$store.state.isLogin) {
                all.tool.send('getLoginURL', {
                    gameId: gameId,
                    clientDomainName: window.location.origin,
                    clientType: 2,
                }).then(result => {
                    all.tool.TipWinShow('是否前往游戏', [{name: '否'}, {name: '是', callback: function() {
                        window.open(result.data.gameURL);
                    }}]);
                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    if (error.status == 425 || error.status == 402)
                        errorMessage = '游戏正在维护中，请稍后再试';
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                });
            } else {
                if (gameName !== 'ebetGame') {
                    all.tool.TipWinShow('请您先登录', [{name: '前往登陆', callback: () => {
                        this.$router.push('/login');
                    }}]);
                } else {
                    all.tool.TipWinShow('真钱游戏，请登入易游会员账号', [{name: '免费试玩', callback: () => {
                        window.open('http://hk.oplive.info:8080/?infoUrl=h5/3cba28&mode=trial');
                    }}, {name: '前往登陆', callback: () => {
                        this.$router.push('/login');
                    }}]);
                }
            }
        },

        /* 存款导航切换 */ 
        savingTab (index, item) {
            // let This = this;
            // let iconName = '';
            // if (item == '银行卡' || item === undefined) 
            //     iconName = This.savingIconList[0]
            // if (item == '在线') 
            //     iconName = This.savingIconList[1]
            // if (item == '微信') 
            //     iconName = This.savingIconList[2]
            // if (item == '支付宝') 
            //     iconName = This.savingIconList[3]
                
            // This.svaingActiveName = iconName;
            // This.savingNum = index;
            // let levelInfo = This.levelList[This.userLevel];
            // This.savingShowList = This[levelInfo].saving[iconName];
        },

        /* 游戏导航切换 */ 
        gameTab (index, childrenIndex) {
            // let This = this;
            // This.gameNum = index;
            // let levelInfo = This.levelList[This.userLevel];
            // This.gameShowList = This[levelInfo].game[This.gameList[index]];
            this.gameNum = index;
            this.gameChildrenTab(childrenIndex);
        },

        /* 游戏子导航切换 */ 
        gameChildrenTab(childrenIndex) {
            childrenIndex = childrenIndex ? childrenIndex : 0;
            this.gameChildren = childrenIndex;
            // this.gameChildren = childrenIndex ? childrenIndex : 0;
            let name = this.gameListMapping[this.gameNum].groupName;
            let childrenName = this.gameListMapping[this.gameNum].childrenName[childrenIndex];
            this.gameShowList = this.gamePointList[name][childrenName];
        },

        /* 打开积分规则 */
        openTaskInfo () {
            this.visibleTask = true;
            setTimeout(() => {
                this.visibleInTask = true;
            }, 100);
        },

        /* 获取积分信息 */
        getPointRule () {
            // let This = this;
            all.tool.send('getPointRule').then(result => {
                this.rewardPointsList = result.data.list;
                this.proportion = this.rewardPointsList[this.userLevel].preExchangeRate;
            });
        },

        /* 获取任务信息 */
        getMissonList () {
            let This = this;
            all.tool.send('getMissonList').then(result => {

                // 处理登入积分
                this.loginPointList = result.data.loginPointList;
                
                // loginPointList.map(item => {
                    // let tempItemOne = This.searchObj(item, 'gradeLimit', 0);
                    // if (tempItemOne) 
                    //     This.levelOneInfo.login.push(tempItemOne);
                    
                    // let tempItemTwo = This.searchObj(item, 'gradeLimit', 1);
                    // if (tempItemTwo)
                    //     This.levelTwoInfo.login.push(tempItemTwo);

                    // let tempItemThree = This.searchObj(item, 'gradeLimit', 2);
                    // if (tempItemThree)
                    //     This.levelThreeInfo.login.push(tempItemThree);

                    // let tempItemFour = This.searchObj(item, 'gradeLimit', 3);
                    // if (tempItemFour)
                    //     This.levelFourInfo.login.push(tempItemFour);

                    // let tempItemFive = This.searchObj(item, 'gradeLimit', 4);
                    // if (tempItemFive)
                    //     This.levelFiveInfo.login.push(tempItemFive);
                    
                // });
                
                // This.levelOneInfo.login = This.sort(This.levelOneInfo.login, 'goal');
                // This.levelTwoInfo.login = This.sort(This.levelTwoInfo.login, 'goal');
                // This.levelThreeInfo.login = This.sort(This.levelThreeInfo.login, 'goal');
                // This.levelFourInfo.login = This.sort(This.levelFourInfo.login, 'goal');
                // This.levelFiveInfo.login = This.sort(This.levelFiveInfo.login, 'goal');

               
                // let levelInfo = This.levelList[This.userLevel];
                
                // for(let i = 0; i < 5; i++) {
                //     This.animateList[i] = This[levelInfo]['login'][i].status === 1 ? true : false;
                // }


                this.loginPointList.map((item, i) => {
                    this.animateList[i] = this.loginPointList[i].status === 1 ? true : false;
                });
                

                // 处理存款积分
                // let rechargePointList = result.data.rechargePointList;
                // let levelOneSaving = [];
                // let levelTwoSaving = [];
                // let levelThreeSaving = [];
                // let levelFourSaving = [];
                // let levelFiveSaving = [];
                // rechargePointList.map(item => {
                //     let tempItemOne = This.searchObj(item, 'gradeLimit', 0);
                //     if (tempItemOne)
                //         levelOneSaving.push(tempItemOne);
                    
                //     let tempItemTwo = This.searchObj(item, 'gradeLimit', 1);
                //     if (tempItemTwo)
                //         levelTwoSaving.push(tempItemTwo);

                //     let tempItemThree = This.searchObj(item, 'gradeLimit', 2);
                //     if (tempItemThree)
                //         levelThreeSaving.push(tempItemThree);

                //     let tempItemFour = This.searchObj(item, 'gradeLimit', 3);
                //     if (tempItemFour)
                //         levelFourSaving.push(tempItemFour);

                //     let tempItemFive = This.searchObj(item, 'gradeLimit', 4);
                //     if (tempItemFive)
                //         levelFiveSaving.push(tempItemFive);
                // });

                // // 存款类型分类
                // This.sortSaving(levelOneSaving, 'levelOneInfo');
                // This.sortSaving(levelTwoSaving, 'levelTwoInfo');
                // This.sortSaving(levelThreeSaving, 'levelThreeInfo');
                // This.sortSaving(levelFourSaving, 'levelFourInfo');
                // This.sortSaving(levelFiveSaving, 'levelFiveInfo');
    

                // // 当前等级各种存款方式的条目数量
                // let nowLeveSaving = This[levelInfo].saving;
                // let bankcardLength = 0;
                // let onlineLength = 0;
                // let wechatLength = 0;
                // let ailpayLength = 0;

                // nowLeveSaving.bankcard.map(item => {
                //     bankcardLength += item.length;
                // });
                // nowLeveSaving.online.map(item => {
                //     onlineLength += item.length;
                // });
                // nowLeveSaving.wechat.map(item => {
                //     wechatLength += item.length;
                // });
                // nowLeveSaving.ailpay.map(item => {
                //     ailpayLength += item.length;
                // });
                
                // if (bankcardLength == 0) 
                //     This.changeNav('savingList', '银行卡');
                // if (onlineLength == 0) 
                //     This.changeNav('savingList', '在线');
                // if (wechatLength == 0) 
                //     This.changeNav('savingList', '微信');
                // if (ailpayLength == 0) 
                //     This.changeNav('savingList', '支付宝');
                
                
                result.data.rechargePointList.map(item => {
                    this.sortItem(this.savingShowList, item);
                })





                // 处理游戏积分
                // let gamePointList = result.data.gamePointList;
                // let levelOneGame = [];
                // let levelTwoGame = [];
                // let levelThreeGame = [];
                // let levelFourGame = [];
                // let levelFiveGame = [];
                // gamePointList.map(item => {
                //     if (item.gradeLimit == 0) {
                //         levelOneGame.push(item);
                //     }else if (item.gradeLimit == 1) {
                //         levelTwoGame.push(item);
                //     }else if (item.gradeLimit == 2) {
                //         levelThreeGame.push(item);
                //     }else if (item.gradeLimit == 3) {
                //         levelFourGame.push(item);
                //     }else if (item.gradeLimit == 4) {
                //         levelFiveGame.push(item);
                //     }
                // });

                // This.sortGame(levelOneGame, 'levelOneInfo');
                // This.sortGame(levelTwoGame, 'levelTwoInfo');
                // This.sortGame(levelThreeGame, 'levelThreeInfo');
                // This.sortGame(levelFourGame, 'levelFourInfo');
                // This.sortGame(levelFiveGame, 'levelFiveInfo');

                this.sortGame(result.data.gamePointList);
                
            });
        },

        /* 领取签到积分 */
        receivePoint (index) {
            // let This = this;
            // let levelInfo = This.levelList[This.userLevel];
            // let _thisInfo = This[levelInfo]['login'][index];
            // let status = _thisInfo.status
            let status = this.loginPointList[index].status;
            let id = this.loginPointList[index].id;
            if (status == 1) {
                // This.applyRewardPoint(_thisInfo.id, result => {
                //     This.openList[index] = true;
                //     This.animateList[index] = false;
                //     This[levelInfo]['login'][index].status = 2;
                //     setTimeout(() => {
                //         This.openList[index] = false;
                //         all.tool.TipWinShow('恭喜您成功领取' + result.data.amount + '积分', [{name: '确定'}]);
                //     }, 900);
                // })

                this.applyRewardPoint(id, result => {
                    this.openList[index] = true;
                    this.animateList[index] = false;
                    this.loginPointList[index].status = 2;
                    setTimeout(() => {
                        this.openList[index] = false;
                        all.tool.TipWinShow('恭喜您成功领取' + result.data.amount + '积分', [{name: '确定'}]);
                    }, 900);
                });

            }
        },

        /* 领取存款积分 */        
        receiveSavingPoint (status, id) {
            // let This = this;
            // if (status == 0) {
            //     This.$router.push('/deposit');
            // } else if (status == 1) {
            //     This.applyRewardPoint(id, result => { 
            //         let index = This.savingShowList[0].findIndex( v => {
            //             return v.id == id;
            //         });
            //         all.tool.TipWinShow('恭喜您成功领取' + result.data.amount + '积分', [{name: '确定'}]);
            //         This.savingShowList[0][index].status = 2;
            //         This.savingShowList[2].push(This.savingShowList[0].splice(index, 1)[0]);
            //     });
            // }

            if (status == 0) {
                this.$router.push('/deposit');
            } else if (status == 1) {
                this.applyRewardPoint(id, result => { 
                    let index = this.savingShowList[0].findIndex( v => {
                        return v.id == id;
                    });
                    all.tool.TipWinShow('恭喜您成功领取' + result.data.amount + '积分', [{name: '确定'}]);
                    this.savingShowList[0][index].status = 2;
                    this.savingShowList[2].push(this.savingShowList[0].splice(index, 1)[0]);
                });
            }
        },

        /* 领取游戏积分 */
        receiveGamePoint (status, id, providerId) {
            if (status == 0) {
                if (providerId == '20') {
                    this.getLoginUrl(this.fishGameId);
                } else if (providerId == '56') {
                    this.getLoginUrl(this.ebetGameId, 'ebetGame');
                } else {
                    this.$router.push({path:'/game', query: {
                        page: 11
                    }})
                }
            } else if (status == 1) {
                this.applyRewardPoint(id, result => {
                    let index = this.gameShowList[0].findIndex( v => {
                        return v.id == id;
                    });
                    all.tool.TipWinShow('恭喜您成功领取' + result.data.amount + '积分', [{name: '确定'}]);
                    this.gameShowList[0][index].status = 2;
                    this.gameShowList[2].push(this.gameShowList[0].splice(index, 1)[0]);
                });
            } 
        },

        /* 领取积分 */
        applyRewardPoint (id, cb) {
            // let This = this;
            all.tool.send('applyRewardPoint', {
                eventObjectId: id
            }).then(result => {
                cb && cb(result);
                this.$store.dispatch('setUserPoint');
            }).catch(error => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 领取按钮背景图 */ 
        btnBg (status) {
            return 'url(' + require(`../assets/image/pages/task/btn${status}.jpg`) + ') no-repeat center center/100% 100%';
        },

        /* 游戏item 的 icon */
        gameItemBg (amount) {
            if (amount < 1) {
                amount = 1;
            } else if (amount < 5 && amount > 2) {
                amount = 2
            } else if (amount > 5){
                amount = 5;
            }
            return 'url(' + require(`../assets/image/pages/task/gameAmount${amount}.png`) + ') no-repeat center center/100% 100%';
        },

        /* 查找符合条件的对象 */ 
        searchObj (obj, key, val) { 
            if (!obj) 
                return;
            if (obj[key] == val) 
                return obj;
        },

        /* 数组排序 */
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

        /* 存款分类 */
        sortSaving (arr, level) {
            let This = this;
            arr.map(item => {
                if (item.depositType == '手工存款') {
                    // This[level].saving.bankcard.push(item);
                    This.sortItem(This[level].saving.bankcard, item);
                } else if (item.depositType == '在线充值') {
                    // This[level].saving.online.push(item);
                    This.sortItem(This[level].saving.online, item);
                } else if (item.depositType == '个人微信') {
                    // This[level].saving.wechat.push(item);
                    This.sortItem(This[level].saving.wechat, item);
                } else if (item.depositType == '个人支付宝') {
                    // This[level].saving.ailpay.push(item);
                    This.sortItem(This[level].saving.ailpay, item);
                }
            });

            // 按照金额大小排序
            This.savingIconList.map(name => {
                This[level].saving[name].map(itemArr => {
                    itemArr = This.sort(itemArr, 'dailyRequestDeposit');
                });
            });
        },

        /* 领取分类 */
        sortItem (arr, item) {
            if (item.status == 0) {
                arr[1].push(item);
            } else if (item.status == 1) {
                arr[0].push(item)
            } else if (item.status == 2) {
                arr[2].push(item);
            }
        },

        /* 游戏分类 */
        sortGame (arr, level) {
            // let This = this;
            arr.map(item => {
                switch(item.providerId[0]) {
                    case '18':
                        this.sortItem(this.gamePointList.electronic.PT, item);
                        break;
                    case '41':
                        this.sortItem(this.gamePointList.electronic.MG, item);
                        break;
                    case '45':
                        this.sortItem(this.gamePointList.electronic.DT, item);
                        break;
                    case '72':
                        this.sortItem(this.gamePointList.electronic.EBETSLOTS, item);
                        break;
                    case '56':
                        this.sortItem(this.gamePointList.person.eBET, item);
                        break;
                    case '20':
                        this.sortItem(this.gamePointList.fish.AG, item);
                        break;
                }
                // if (item.providerId[0] == '18') {
                //     This.sortItem(This[level].game.PT, item);
                // } else if (item.providerId[0] == '41') {
                //     This.sortItem(This[level].game.MG, item);
                // } else if (item.providerId[0] == '45') {
                //     This.sortItem(This[level].game.DT, item);
                // }
            });

            // 按照每笔金额排序
            // This.gameIconList.map(name => {
            //     This[level].game[name].map(itemArr => {
            //         itemArr = This.sort(itemArr, 'dailyRequestBetCountsAndAmount', 1);
            //     });
            // });
        },

        /* 兑换积分 */ 
        applyPoint () {
            let This = this;
            if (This.integral == '') {
                all.tool.TipWinShow('请输入要兑换的积分', [{name: '确定'}]);
                return;
            }
            all.tool.send('applyPointToCredit', {
                point: This.integral
            }).then(result => {
                This.$store.dispatch('setUserPoint');
                This.$store.dispatch('setUserBalance');
                all.tool.TipWinShow(result.data.message, [{name: '确定'}]);
            }).catch(error => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 导航控制 */
        changeNav (navList, value) {
            let nameIndex = this[navList].findIndex(name => {
                return name == value;
            });
            this[navList].splice(nameIndex, 1);
        },

        // 展示升级降级等级详情
        showUpdateInfo () {
           this.visible = true;
           setTimeout(() => {
               this.visibleIn = true;
           }, 100);
        },

        hideUpdateInfo () {
            this.visibleIn = false;
            setTimeout(() => {
                this.visible = false;
            }, 500);
        },

        hideTaskInfo () {
            this.visibleInTask = false;
            setTimeout(() => {
                this.visibleTask = false;
            }, 500);
        }
    },

    watch: {
        integral(newVal, oldVal) {
            if (!newVal) 
                return;
            if (/[^\d]/g.test(newVal))
                this.integral = oldVal;
            if (oldVal == '')
                return;
            this.amount = Math.floor(parseInt(newVal)/this.proportion);
        },

        userLevel(newVal, oldVal) {
            if (this.rewardPointsList == null) 
                return;
            this.proportion = this.rewardPointsList[newVal].preExchangeRate;
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

.task {
    width: 100%;
    height: 100%;
}

.box_userInfo {
    position: relative;
    text-align: left;
    width: 100%;
    .height(140);
    .rem(padding, 20);

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
            // .ml(30);
            .font-size(24);
        }

        p {
            // .pl(25);
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

    .bu_img {
        .rem(margin, 20);
        .width(46);
        position: absolute;
        right: 0;
        .top(54);
    }
}

.box_info {
    text-align: left;
    .rem2(padding, 0, 20);
    .height(70);
    overflow: hidden;
}

.box_input {
    float: left;
    .pt(5);
    
    .box_input_in {
        .pl(20);
        text-align: left;
        display: inline-block;
        .width(318);
        .height(60);
        background-color: #060a13;
        .font-size(30);
        .line-height(60);
        border: 1px solid #079ae0;

        label {
            color: #fff;
            .width(130);
        }

        input {
            height: 100%;
            .pl(21);
            .width(200);
            .font-size(28);
            background-color: #060a13;
            color: #fff;
        }
    }
}

.infoText {
    float: left;
    .font-size(24);
    .width(214);
    .pl(40);

    p {
        width: 100%;
        span {
            .line-height(37);
        }
    }
}

.box_btn {
    float: right;
    .pt(5);
    input {
        .width(160);
        .height(60);
        background: url(../assets/image/pages/task/exchange.jpg) no-repeat center center/100% 100%;
    }
}

.box_nav {
    width: 100%;
    .height(80);
    .line-height(80);
    background-color: #083250;
    font-size: 0;
    .mt(16);
    border-radius: 15px 15px 0 0;
    font-weight: 700;
    text-shadow: 0 0 5px #00b7ee;

    li {
        .font-size(30);
        display: inline-block;
        width: 33.3333%;
        height: 100%;
    }
}

.orangeText {
    font-weight: 700;
    color: #f39800 !important;
}


.signIn {
    position: relative;
    width: 100%;
    .height(920);
    background: url(../assets/image/pages/task/sigInBg.jpg) no-repeat center center/100% 100%;

    .day {
        position: absolute;
        .width(150);
        .height(192);
        background-color: red;
    }

    .oneDay {
        .top(56);
        .left(76);
    }

    .twoDay {
        top: 0;
        .right(238);
    }

    .threeDay {
        .top(170);
        .right(100);
    }

    .fourDay {
        .top(280);
        .left(240);
    }

    .fiveDay {
        .top(460);
        .left(76);
    }

    .sixDay {
        .top(550);
        .left(260);
    }

    .sevenDay {
        .top(530);
        .right(100);
    }

    p {
        .font-size(24);
        position: absolute;
        .bottom(80);
        text-align: center;
        width: 100%;
    }
}

.saving_content {
    .rem3(padding, 20, 20, 0);
}
.savingNav,.gameNav{
    width: 100%;
    .height(64);
    // .mt(40);
    .mb(20);
    .font-size(32);

    .iconfont {
        position: absolute;
        .font-size(40);
        left: 0;
        top: 0;
        width: 100%;
    }

    li {
        position: relative;
        display: inline-block;
        width: 22.8%;
        .height(62);
        .line-height(62);
        background-color: #0e283c;
        border: 1px solid #2b7ca3;
    }

    li:nth-child(n+2) {
        .ml(20);
    }

    .icon-zhifubao {
        .font-size(32);
    }

    .fontSize {
        .font-size(24);
        font-weight: 700;
        .pl(20);
    }

}

.gameNav {
    // .height(134);
    li {
        width: 31%;
        position: relative;
        .pl(10);

        i {
            display: inline-block;
            width: 100%;
        }
    }

    // li:nth-child(1) {
    //     i {
    //         background: url(../assets/image/pages/task/PT.png) no-repeat left center/auto 70%;
    //     }
    // }

    // li:nth-child(2) {
    //     i {
    //         background: url(../assets/image/pages/task/MG.png) no-repeat left center/auto 70%;
    //     }
    // }

    // li:nth-child(3) {
    //     i {
    //         background: url(../assets/image/pages/task/DT.png) no-repeat left center/auto 70%;
    //     }
    // }
}

.gameNav-children {
    // position: absolute;
    // .bottom(-100);
    // left: 0;
    // .width();
    .height(60);
    font-size: 0;
    text-align: left;
    .mb(20);
    display: flex;
    justify-content: space-between;

    li {
        position: relative;
        display: inline-block;
        .font-size(24);
        .width(220);
        .height(60);
        .line-height(60);
        text-align: center;
        .border-radius(30);
        // .mr(24);
        .rem2(margin, 0, 10);
        background-color: #0e283c;
        border: 1px solid #2b7ca3;
    }

    .gameNav-children-icon {
        position: absolute;
        .width(40);
        .height(40);
        .line-height(40);
        background-color: red;
        .left(-10);
        .top(-10);
        .border-radius(30);
    }
}


.items-box {
    width: 100%;
    .height(730);
    overflow-y: auto;

    li {
        text-align: left;
        width: 100%;
        .height(180);
        background: url(../assets/image/pages/task/itemBg.png) no-repeat center center/100% 100%;
        .mb(20);
        .rem(padding, 20);
        .pt(10);
        position: relative;
        overflow: hidden;
    }

    .box_icon {
        .width(160);
        .height(160);
        display: inline-block;
    }

    .item_info {
        display: inline-block;
        p {
            .line-height(50);
        }
        p:nth-child(1) {
            .font-size(30);
            font-weight: 700;
        }
        p:nth-child(2) {
            .font-size(24);
            .width(360);
            .line-height(30);
            .height(60);
        }
        p:nth-child(3) {
            .height(44);
            .font-size(24);
            .pl(50);
            .mt(10);
            background: url(../assets/image/components/public/integralIcon.png) no-repeat left top/auto 100%;
        }
    }
}

.game-items-box {
    .height(610);
}


.item_btn {
    position: absolute;
    .right(20);
    .top(55);
    input {
        .width(120);
        .height(60);
    }
}

.bottomText {
    position: relative;
    .font-size(24);
    color: #f39800;
    .line-height(40);
    .rem3(padding, 30, 30, 0);
    background: url(../assets/image/pages/task/bottomTextBg.png) no-repeat center top/100% 100%;

    img {
        position: absolute;
        .right(20);
        bottom: 0;
        .width(40);
    }
}

.navActive {
    background: url(../assets/image/pages/task/navActiveBg.png) no-repeat center center/100% 100%;
}

.savingActive {
    background-color: #f39800 !important;
    border: 1px solid #f39800 !important;
}

.directions {
    width: 100%;
    position: relative;

    img {
        position: absolute;
        .right(40);
        .top(-10);
        .width(46);
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
                    .height(50);
                    td {
                        .line-height(50);
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

        .saving_content {
            text-align: left;
            .line-height(40);
            
            p {
                .mb(10);
            }
        }
    }

    .task_in {
        .width(700);
    }

}

.activeAnimate {
    animation: tada 1s linear infinite;
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

.open {
    animation: open 1s;
}

@keyframes open {
    0% {
        opacity: 1;
        transform-origin: 50% 50%;
        transform: scale(1,1);
        filter: blur(0px);
    }

    100% {
        opacity: 0;
        transform-origin: 50% 50%;
        transform: scale(2,2);
        filter: blur(2px);
    }
}
</style>