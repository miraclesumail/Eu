/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-22 13:50:47 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-22 17:08:31
 */

<template>
    <div class="game">
        <PageTop
            :title="PageTopTitle"
            :useDefaultCloseFn="false"
            @closeCallBackFn="goToHome"
        />
        <main>
            <!-- <div class="banner">
                <div v-if="showSearch">
                    <input type="text" placeholder="搜索你喜欢的游戏" v-model="gameName">
                    <span @click="searchGame"></span>
                </div>
            </div> -->
            <div class="banner">
                <!-- <el-carousel trigger="click" height="2.53333rem" indicatorPosition="none">
                    <el-carousel-item v-for="item in banner" :key="item.img">
                        <a :href="item.url" target="_blank">
						    <div class="bannerImg" :style="{'background-image':`url(${item.img})`}"></div>
					    </a>
                    </el-carousel-item>
                </el-carousel> -->
                 <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="slide in banner" :key="slide.img">
                            <a :href="slide.url" target="_blank" @click="clickActivity(slide.code)">
                                <div class="bannerImg" :style="{'background-image':`url(${slide.img})`}"></div>
                            </a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="gameNav">
                <div class="Nav_item" v-for="item in navInfo" :key="item.code" v-if="item.show" :class="{active: item.code == num}" @click="tab(item.code)">
                    <img :src="require(`../assets/image/pages/game/nav${item.code}.png`)">
                </div>
                <ul class="platform" v-if="showSelect">
                    <li v-for="item in platformList" :key="item._id" @click="tab(item.code)">{{item.name}}电子<img :src="item.code | itemPlatformImg"></li>
                </ul>
            </div>

            <div v-if="showSearch" class="box_search">
                <input type="text" placeholder="搜索你喜欢的游戏" v-model="gameName" @keyup="searchGameKeyup($event)">
                <span @click="searchGame"></span>
            </div>

            <!-- 不是收藏的游戏时候渲染 -->
            <ul class="gameList" v-if="!isNavFavorite">
                <li v-for="item in gameList" :key="item._id">
                    <div class="box_content">
                        <div class="bc_top" @click="startGame(item.game.gameId)">
                            <img :src="item.game.smallShow" alt="" width="100%" height="100%">
                            <div class="gameOperating">
                                {{item.game.name}}
                                <!-- <div class="box_button">
                                    <p><input type="button" value="免费试玩" class="freeGame"></p>
                                    <p><input type="button" value="开始游戏" class="playGame"  @click="startGame(item.game.gameId)"></p>
                                </div> -->
                            </div>
                        </div>
                        <div class="bc_bottom">
                            <img class="platformImg" :src="require(`../assets/image/pages/game/platform${item.game.provider}.png`)" alt="">
                            <img 
                                class="favorite" 
                                :src="require(`../assets/image/pages/game/heart${item.game.isFavorite ? '2' : '1'}.png`)" 
                                @click="favorite(item.game.isFavorite, item.game.gameId, $event, false)"
                                >
                        </div>
                    </div>
                </li>
            </ul>

            <!-- 是收藏游戏 -->
            <ul class="gameList" v-if="isNavFavorite">
                <li v-for="item in gameList" :key="item._id">
                    <div class="box_content">
                        <div class="bc_top" @click="startGame(item.gameId)">
                            <img :src="item.smallShow" alt="" width="100%" height="100%">
                            <div class="gameOperating">
                                {{item.name}}
                                <!-- <div class="box_button">
                                    <p><input type="button" value="免费试玩" class="freeGame"></p>
                                    <p><input type="button" value="开始游戏" class="playGame"  @click="startGame(item.game.gameId)"></p>
                                </div> -->
                            </div>
                        </div>
                        <div class="bc_bottom">
                            <img class="platformImg" :src="require(`../assets/image/pages/game/platform${item.provider}.png`)" alt="">
                            <img 
                                class="favorite" 
                                :src="require(`../assets/image/pages/game/heart${item.isFavorite ? '2' : '1'}.png`)" 
                                @click="favorite(item.isFavorite, item.gameId, $event, true)"
                                >
                        </div>
                    </div>
                </li>
            </ul>

            <div class="box_paging" v-if="showPaging">
                <div class="box_paging_in">
                    <span class="arrLeft" @click="upOrDownTab(1)"></span>
                    <div class="page_content">
                        <ul>
                            <li v-for="(item,index) in pageList" :key="item.startIndex" @click="tabPage(index, item.startIndex)">第{{index + 1}}页</li>
                        </ul>
                        <div class="box_active" :style="{transform: changePosition}" v-show="pageList.length"></div>
                    </div>        
                    <span class="arrRight" @click="upOrDownTab(2)"></span>
                </div>        
            </div>
        </main>
    </div>
</template>

<script>
import PageTop from '../components/PageTop';
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default {
        data () {
            return {
                PageTopTitle: '游戏大厅',
                num: 11,
                showSelect: false,         // 控制平台菜单
                navInfo: [{code: 11, show: false}, {code: 12, show: false}, {code: 13, show: false}, {code: 99, show: true}, {code: 14, show: false}],  // 控制导航显示
                codes: [],                 // 存放游戏分组信息code
                gameList: [],              // 游戏渲染数组
                isNavFavorite: false,      // 是否选择了收藏Nav
                platformList: [],          // 平台数组
                nowPage: 0,                // 分页时当前在第几页
                nowStartIndex: 0,          // 获取下一页时候发送的start
                pageList: [],              // 分页数组
                nowCode: 0,                // 当前选中的游戏组 
                allPage: 0,                // 总共页数
                nowGameFavoriteStatus: 0,  // 当前点击的游戏的收藏状态
                showPaging: true,          // 显示分页栏
                gameName: '',              // 搜索游戏名称
                showSearch: true,          // 是否显示搜索栏
                banner: [],                // 活动图信息
                navName: {
                    11: '热门',
                    12: '彩池',
                    13: '最新'
                },
                swiperOption: {
                    // notNextTick: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay: {
                        disableOnInteraction: false,   // 触摸后不停止自动播放
                    },
                    // loop: true,
                },
        };
    },

    mounted () {
        this.getGameGroupTreeInfo();
        this.onloadPage();
        this.getConfig();
    },

    components: {
        PageTop,
        // swiper,
        // swiperSlide
    },

    computed: {
        changePosition () {
            return `translateX(${this.nowPage*100}%)`;
        }
    },

    filters: {
        itemPlatformImg (value) {
            let index = 0;
            if (value == 15) {
                index = 18;
            } else if (value == 16) {
                index = 41;
            } else if (value == 18) {
                index = 72;
            } else {
                index = 45;
            }

            return require(`../assets/image/pages/game/platform${index}.png`);
        }
    },

    methods: {
        
        goToHome () {
            this.$router.push('/');
        },
        /* 导航tab切换 */
        tab (code) {
            let This = this;
            This.pageList = [];
            This.nowCode = code;

            if (code <= 13) {
                all.tool.clickCount({
                    page: '游戏',
                    btn: This.navName[code]
                });
            }

            if (code <= 14 || code == 99) {
                This.num = code;
            }
            if (code === 14) {
                This.showSelect = !This.showSelect;
                return;
            } else {
                This.gameList = [];
                This.showSelect = false;
            }
            // 如果不是收藏游戏
            if ( code !== 99) {
                This.isNavFavorite = false;
                 This.showSearch = true;
                 This.showPaging = true;
                all.tool.send('getGameGroupInfo', {
                    code: code,
                    startIndex: 0,
                    requestCount: 12
                }).then(result => {
                   This.setPageList(result);
                });
            } else {
                if (!This.$store.state.isLogin) {
                    This.$router.push('/login');
                    return;
                }
                This.showSearch = false;
                This.showPaging = false;
                This.isNavFavorite = true;
                all.tool.send('getFavoriteGames').then(result => {
                    // This.gameList = result.data;
                    result.data.map(item => {
                        if (item.provider != '20' && item.provider != '83') {
                            This.gameList.push(item);
                        }
                    });
                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                })
            }
          
        },

        /* 设置分页数组 */
        setPageList (result) {
            this.gameList = result.data.games.gameList;
            let allPage = Math.ceil(result.data.games.stats.totalCount/12);
            this.allPage = allPage;
            for(let i = 0; i < allPage; i++) {
                let data = {
                    startIndex: i * 12
                }
                this.pageList.push(data);
            }
        },

        /* 获取游戏分组信息 */ 
        getGameGroupTreeInfo () {
            let This = this;
            all.tool.send('getGameGroupTreeInfo', {
                code: 10
            }).then(result => {
                This.gameGroupTreeInfo = result.data.gameGroups[0]['children'];
                This.gameGroupTreeInfo.map(item => {
                    This.codes.push(item.code);
                    if (item.code == 14) {
                        This.platformList = item['children'];
                    }
                })

                This.navInfo.map(item => {
                    if (item.code !== 99)
                        item.show = This.codes.includes(item.code);
                })
            })
        },

        /* 路由参数分析加载不同游戏 */
        onloadPage () {
            let This = this;
            let code = This.$router.currentRoute.query.page;
            this.num = code;
            this.nowCode = code;
            all.tool.send('getGameGroupInfo', {
                code: code,
                startIndex: 0,
                requestCount: 12
            }).then(result => {
                This.gameList = result.data.games.gameList;
                This.setPageList(result);
            })
            
        },

        /* 开始游戏 */
        startGame (gameId, $event) {
            if (this.$store.state.isLogin) {
                let This = this;
                // let open = window.open('');
                // let open = window.open(window.location.origin + '/loadingPage');
                all.tool.send('getLoginURL', {
                    gameId: gameId,
                    clientDomainName: window.location.origin,
                    clientType: 2,
                }).then(result => {
                    // open.location.href = result.data.gameURL;
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
                all.tool.TipWinShow('请您先登录', [{name: '前往登陆', callback: () => {
                    this.$router.push('/login');
                }}]);
            }
            
        },

        /* 收藏和取消收藏游戏 */ 
        favorite (status, gameId, $event, isFavorite) {
            let This = this;
            if (!This.$store.state.isLogin) {
                This.$router.push('/login');
                return;
            }
            if (!status) {
                all.tool.send('addFavoriteGame', {
                    gameId: gameId
                }).then(result => {
                    This.gameList.map(item => {
                        // if (item.game.gameId === gameId) {
                        //     This.$set(item.game, 'isFavorite', true);
                        // }
                        if (isFavorite) {
                            if (item.gameId === gameId) {
                                This.$set(item, 'isFavorite', true);
                            }
                        } else {
                            if (item.game.gameId === gameId) {
                                This.$set(item.game, 'isFavorite', true);
                            }
                        }
                    })
                    // $event.target.src = require('../assets/image/pages/game/heart2.png')
                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                })
            } else {
                all.tool.send('removeFavoriteGame', {
                    gameId: gameId
                }).then(result => {
                    This.gameList.map(item => {
                        // if (item.gameId === gameId) {
                        //     This.$set(item, 'isFavorite', false);
                        // }
                        if (isFavorite) {
                            if (item.gameId === gameId) {
                                // item.game.isFavorite = false; 
                                This.$set(item, 'isFavorite', false);
                            }
                        } else {
                            if (item.game.gameId === gameId) {
                                // item.game.isFavorite = false; 
                                This.$set(item.game, 'isFavorite', false);
                            }
                        }
                    })
                    // $event.target.src = require('../assets/image/pages/game/heart1.png')
                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                })
            }
        },

        /* 热门、最新、彩池分页切换 */
        tabPage (index, startIndex) {
            let This = this;
            let code = This.nowCode;
            This.nowPage = index;
            This.nowStartIndex = startIndex;
            all.tool.send('getGameGroupInfo', {
                startIndex: startIndex,
                requestCount: 12,
                code: code,
            }).then(result => {
                This.gameList = result.data.games.gameList;
            });
        },

        /* 点击上下页 */
        upOrDownTab (type) {
            if (this.nowPage != 0 && type == 1) {
                this.tabPage(this.nowPage - 1, this.nowStartIndex - 12);
            }
            if (this.nowPage != this.allPage - 1 && type == 2) {
                this.tabPage(this.nowPage + 1, this.nowStartIndex + 12);
            }
        },

        /* 搜索游戏 */
        searchGame () {
            all.tool.send('searchGame', {
                // groupCode: this.nowCode,
                playGameType: 2,
                name: this.gameName
            }).then(result => {
                
                this.isNavFavorite = true;
                this.showPaging = false;
                this.gameList = result.data;
            }).catch(error => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 获取活动信息图 */
        getConfig () {
            let This = this;
            all.tool.send('getConfig', { 
                device: 3
            }).then((result => {
                result.data.activityList.map(item => {
                    if (item.status == 1) {
                        if (item.code.indexOf('game') != -1) {
                            This.banner.push({
                                img: item.bannerImg,
                                url: item.extString,
                                code: item.code
                            })
                        }
                    }
                })
            }))
        },

        /* 键盘抬起后自动搜索 */
        searchGameKeyup ($event) {
            let This = this;
            This.timeStamp = $event.timeStamp;
            setTimeout(function () {
                if (This.timeStamp - $event.timeStamp == 0) {
                    This.searchGame(); 
                }
            }, 300);
        },

        /* 埋点 */
        clickActivity (code) {
            all.tool.clickCount({
                page: '游戏',
                btn: code
            });
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';

.game {
    width: 100%;
    height: 100%;
    .pb(50);
    .active {
        background: url(../assets/image/pages/game/activeBg.png) repeat-x left top !important;
        background-size: auto 100%; 
    }

    main {
        .pb(50);
        .banner {
            width: 100%;
            .height(190);
            // background: url(../assets/image/pages/game/gameBannerBg.jpg) no-repeat center center;
            // background-size: 100% 100%;
            position: relative;
            a {
                display: block;
                width: 100%;
                .height(190);
            }
            .bannerImg {
                width: 100%;
                .height(190);
                background-position: center center;
                background-size: 100% 100%;
                background-repeat: no-repeat;

            }
            
        }

        .swiper-pagination {
            position: absolute;
            bottom: 0;
            left: 0;
            .height(20);
        }

        .box_search {
            .mt(10);
            .mr(30);
            .width(354);
            .height(61);
            float: right;
            overflow: hidden;
            input {
                color: #fff !important;
                float: left;
                height: 100%;
                .width(294);
                background-color: #060a13;
                .pl(22);
            }

            span {
                float: left;
                .width(60);
                height: 100%;
                background:url(../assets/image/pages/game/searchBtn.jpg);
                background-size: 100% 100%;
            }
        }

        .gameNav {
            font-size: 0;
            background: url(../assets/image/pages/game/gameNavBg.jpg) repeat-x left top;
            background-size: 100% 100%;
            position: relative;
            text-align: left;

            .Nav_item {
                text-align: center;
                display: inline-block;
                width: 20%;
                .height(121);
                background-color: pink;
                background: url(../assets/image/components/footer/itemLine.png) no-repeat right center;
                background-size: auto 100%;
                vertical-align: middle;
                img {
                    height: 70%;
                    vertical-align: middle;
                }
                &::after {
                    content: '';
                    display: inline-block;
                    vertical-align: middle;
                    width: 0;
                    height: 100%;
                }
            }
            
        }
        .platform {
            position: absolute;
            right: 0;
            bottom: 0;
             z-index: 99;
            .width(300);
            // .height(350);
            background: url(../assets/image/pages/game/selectBg.png) no-repeat center center;
            background-size: 100% 100%;
            transform: translateY(103%);

            li {
                font-weight: 700;
                text-align: left;
                width: 100%;
                position: relative;
                .font-size(24);
                background: url(../assets/image/pages/game/selectItemBg.png) no-repeat bottom center;
                background-size: 100% auto; 
                .height(114);
                .line-height(120);
                .pl(124);

                img {
                    // width: 100%;
                    height: 60%;
                    position: absolute;
                    .bottom(28);
                    .left(40);
                }
            }

        
            &::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                position: absolute;
                .top(-40%);
                .right(50%);
                border-top: 0.3rem solid transparent;
                border-right: 0.3rem solid transparent;
                border-bottom: 0.3rem solid rgba(33, 42, 72, .9);
                // border-bottom: 0.3rem solid red;
                border-left: 0.3rem solid transparent;
            }
            

        }

        .gameList {
            width: 100%;
            height: 100%;
            .rem2(padding, 10, 20); 
            font-size: 0;
            overflow: hidden;

            li {
                float: left;
                width: 33.333%;
                height: 100%;
                .font-size(24);
                .rem(padding, 10);

                .box_content {
                    height: 100%;
                    width: 100%;
                    background: url(../assets/image/pages/game/gameItemBg.png) no-repeat center center;
                    background-size: 100% 100%;
                    box-shadow: 2px 2px 2px 2px #061019;
                }
            }
        }

        .bc_top {
            width: 100%;
            .height(218);
            position: relative;
            overflow: hidden;
            .gameOperating {
                width: 100%;
                height: 100%;
                position: absolute;
                // bottom: 0;
                top: 80%;
                left: 0;
                // .height(50);
                background-color: rgba(0, 0, 0, .7);
                .line-height(55);
                overflow: hidden;
                transition: all 1s ease;
                // transform: translateY(78%);


                .box_button {
                    width: 100%;
                    text-align: center;
                    .mt(10);
                    
                    input {
                        display: inline-block;
                        font-weight: 700;
                        color: #fff;
                        .font-size(26);
                        .width(160);
                        .height(60);
                    }

                    .freeGame {
                        background: url('../assets/image/components/public/btn1.png') no-repeat center center;
                        background-size: 100% 100%;
                        .mb(10);
                    }

                    .playGame {
                        background: url('../assets/image/components/public/btn2.png') no-repeat center center;
                        background-size: 100% 100%;
                    }
                }

            }
        }

        .bc_bottom {
            width: 100%;
            .height(64);
            overflow: hidden;
            position: relative;
            .platformImg {
                height: 80%;
                float: left;
                .ml(20);
                .mt(4);
            }

            .favorite {
                height: 50%;
                float: right;
                .mt(16);
                .mr(24);
            }
        }


        .box_paging {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            .height(70);
            .rem(padding, 0, 20);
            font-size: 0;

            .box_paging_in {
                display: inline-block;
                background-color: #02090f;
                // .width(708);
                width: 100%;
                height: 100%;

                span {
                    display: inline-block;
                    .width(60);
                    height: 100%;
                }

                .arrLeft {
                    background: url(../assets/image/components/public/arrLeft.jpg) no-repeat center center;
                    background-size: 100% 100%;
                }

                .arrRight {
                    background: url(../assets/image/components/public/arrRight.jpg) no-repeat center center;
                    background-size: 100% 100%;
                }

                .page_content {
                    display: inline-block;
                    height: 100%;
                    width: 76%;
                    border: 1px solid #116692;
                    .font-size(24);
                    position: relative;
                    overflow-x: scroll;
                    ul {
                        font-size: 0;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        white-space: nowrap;
                        text-align: left;

                        li {
                            text-align: center;
                            position: relative;
                            display: inline-block;
                            .font-size(24);
                            width: 20%;
                            height: 100%;
                            .line-height(70);
                            z-index: 2;
                        }
                    }
                }

                .box_active {
                    content: '';
                    display: inline-block;
                    width: 20%;
                    height: 100%;
                    background: url(../assets/image/components/public/sbtnBg.jpg) repeat-x left top !important;
                    background-size: auto 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 1;
                    transition: all 0.8s ease;
                }

            }
          
           
        }


    }
}

</style>