<template>
    <div class="box__wrapper" v-if="visible">
        <transition name="slide-fade">
            <div class="container" v-if="visibleIn">
                <div class="box_header">{{title}}
                    <i @click="close" class="close_btn" v-if="closeBtnVisible"></i>
                </div>
                <div class="max_content">
                    <div class="box_content">
                        <div class="box_content_msg" v-html="info.content"></div>
                    </div>
                </div>
                <ul class="box_btns">
                    <li v-for="(item, index) in info.btnList" :key="index" @click="close(item.callback)">{{item.name}}</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data () {
            return {
               visible: false,
               visibleIn: false,
            };
        },
        props: {
            title: {
                type: String,
                default: '温 馨 提 示'
            },

            closeBtnVisible: {
                type: Boolean,
                default: true
            },

            config: {
                type: Object,
                default() {
                    return {}
                }
            }
        },

        components: {},

        computed: {
            info() {
                if (!this.isObjectEmpty(this.config)) {
                    let _config = Object.assign({}, this.config);
                    if (!_config.content) {
                        console.error('提示信息不能为空');
                        return;
                    } else {
                        if (!_config.btnList) {
                            _config.btnList = [{name: '确定'}]
                        }
                    }
                    return _config;
                } else {
                    return {
                        content: '1',
                        btnList: [{name: '确定'}]
                    }
                }
            }
        },

        methods: {

            show() {
                this.visible = true;
                setTimeout(() => {
                    this.visibleIn = true;
                }, 100);
            },

            close(cb) {
                this.visibleIn = false;
                setTimeout(() => {
                    this.visible = false;
                    typeof cb === 'function'  && cb();
                }, 500);
            },

            // 判断是否是空对象
            isObjectEmpty(obj) {
                for (let name in obj) {
                    if (obj.hasOwnProperty(name)) {
                        return false;
                    }
                }
                return true;
            },
        }
    }
</script>

<style lang="less" scoped>
@import (reference) "../../assets/css/variable";

.slide-fade-enter-active {
    animation: bounce-in .5s;
}
.slide-fade-leave-active {
    animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: translateY(100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}


    .box__wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 999;

        .container {
            .mt(-200);
            .width(650);
            // .min-height(400);
            display: inline-block;
            vertical-align: middle;
            background-color: #0b1d2b;
            border: 2px solid #2b7ca3;
            box-shadow: 0 0 20px 0px rgba(0, 172, 255, 0.5);

            .box_header {
                position: relative;
                color: #fff;
                .height(80);
                .line-height(80);
                background: url('./images/title.jpg') no-repeat;
                background-size: 100% 100%;
                text-align: center;
                .font-size(36);
                font-weight: 700;

                .close_btn {
                    display: inline-block;
                    .height(80);
                    .width(190);
                    position: absolute;
                    right: 0;
                    top: 0;
                    background: url('./images/closeBtn.png') no-repeat;
                    background-size: 100% 100%;
                }
            }

            .max_content {
                .rem2(margin, 20, 0);
                .max-height(240);
                overflow-y: auto;
            }

            .box_content {
                .min-height(200);
                .font-size(26);
                width: 100%;
                height: 50%;
                color: #fff;
                position: relative;
                display: table;

                .box_content_msg {
                    .rem(padding, 20);
                    height: 100%;
                    width: 100%;
                    display: table-cell;
                    text-align: center;
                    word-wrap: break-word;
                    vertical-align: middle;
                }

                &:after {
                    content: '';
                    display: inline-block;
                    height: 100%;
                    width: 0;
                    vertical-align: middle;
                }
            }

            .box_btns {
                .height(80);
                .mb(20);
                // background-color: red;
                color: #fff;
                display: flex;
                font-size: 0;
                justify-content: space-around;
                width: 100%;
                .rem2(padding, 0, 30);


                li {
                    .rem2(padding, 0, 20);
                    .font-size(28);
                    .min-width(160);
                    display: inline-block;
                    .height(60);
                    .line-height(60);
                }

                li:nth-child(2n+1) {
                    background: url(./images/btn1.png) no-repeat center center/100% 100%;
                }

                li:nth-child(2n) {
                    background: url(./images/btn2.png) no-repeat center center/100% 100%;
                }

            }

        }

        &:after {
            content: '';
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;
        }
    }
</style>
