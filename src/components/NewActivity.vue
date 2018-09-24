/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-24 17:29:23 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-17 14:17:51
 */

<template>
    <div class="newActivity" v-if="childShow">
        <div class="main">
            <!-- <div class="block">
                <el-carousel trigger="click" height="4.93333rem"  arrow="always" indicator-position="outside">
                    <el-carousel-item v-for="item in banner" :key="item.img">
                        <a :href="item.url" target="_blank">
						    <div class="bannerImg" :style="{'background-image':`url(${item.img})`}"></div>
					    </a>
                    </el-carousel-item>
                </el-carousel>
                <img class="left" src="../assets/image/components/NewActivity/left.png"/>
                <img class="right" src="../assets/image/components/NewActivity/right.png"/>
            </div>
            <div class="close" @click="hideNewActivity"></div> -->
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="slide in banner" :key="slide.img">
                        <a :href="slide.url" target="_blank" @click="open(slide.code)">
						    <div class="bannerImg" :style="{'background-image':`url(${slide.img})`}"></div>
					    </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="close" @click="hideNewActivity"></div>
        </div>
    </div>
</template>

<script>
// import Vue from 'vue'; 
// import { Carousel,  CarouselItem } from 'element-ui';
//     Vue.use(Carousel);
//     Vue.use(CarouselItem);

// import 'swiper/dist/css/swiper.css';
// import { swiper, swiperSlide } from 'vue-awesome-swiper';


export default {
    data () {
        return {
            banner: [],
            childShow: false,
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
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },

    watch: {
        show(newVal, oldVal) {
            this.childShow = !this.childShow;
        }
    },

    mounted() {
        let This = this;
    
        all.tool.send('getConfig', {
            device: 3
        }).then((result => {
            result.data.activityList.map(item => {
                if (item.status == 1) {
                    if (item.code.indexOf('slider') != -1) {
                        This.banner.push({
                            img: item.bannerImg,
                            url: item.extString,
                            code: item.code
                        });
                    }
                }
            })
        }))

    },

    components: {
        // swiper,
        // swiperSlide
    },

    computed: {},

    methods: {
        /** 关闭窗口 */
        hideNewActivity () {
            this.childShow = false;
        },

        /** 关闭按钮回调 */
        callback () {
            this.$emit('closeCallBack');
        },

        /* 打开活动页面 */ 
        open(code) {
            this.clickActivity(code);
            if (code) {
                if (code.indexOf('EBETSLOTS') !== -1) {
                    this.$router.push({path:'/task',query:{type:"jifen"}});
                }
            }
        },
        
        /* 埋点 */
        clickActivity (code) {
            all.tool.clickCount({
                page: '最新优惠',
                btn: code
            });
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';
.newActivity {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1001;

    .main {
        position: absolute;
        .width(730);
        .height(520);
        background:url(../assets/image/components/NewActivity/NewActivityBg.png) no-repeat center center;
        background-size: 100% 100%;
        top: 50%;
        left: 50%;
        .mt(-320);
        .ml(-365);
        .pt(140);
        text-align: center;

        .close {
            .width(120);
            .height(75);
            position: absolute;
            .right(70);
            .top(60);
        }
    }

    .swiper-container {
        display: inline-block;
        .width(602);
        .height(370);
        position: relative;

        a {
            display: block;
            width: 100%;
           .height(370);
        }

        .bannerImg {
            // width: 100%;
            .width(602);
            .height(370);
            background-position: center center;
            background-size: 100% auto;
            background-repeat: no-repeat;
            margin: 0;
        }

        .left,.right {
            position: absolute;
            .width(84);
            .height(54);
            z-index: 999;
            .bottom(-8)
        }
        .left {
            .left(-8);
        }
        .right {
            .right(-8);
        }

        .swiper-pagination {
            position: absolute;
            bottom: 0;
            left: 0;
            .height(20);
        }

    }



    .block {
        display: inline-block;
        .width(602);
        .height(370);
        position: relative;
        a {
            display: block;
            width: 100%;
           .height(390);
        }
        .bannerImg {
            width: 100%;
            .height(390);
            background-position: center center;
            background-size: 100% auto;
            background-repeat: no-repeat;

        }

        .left,.right {
            position: absolute;
            .width(84);
            .height(54);
            z-index: 999;
            .bottom(-8)
        }
        .left {
            .left(-8);
        }
        .right {
            .right(-8);
        }
    }
    
}
</style>