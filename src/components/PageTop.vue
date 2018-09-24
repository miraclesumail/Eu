/*
 * @Author: Reynold Yang
 * @Date: 2018-03-07 13:09:49
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-03-08 16:52:31
 * 页面顶部标题组件
 * Usage:
 * 引入后再父组件中注册
 * template 中 <PageTop :title="PageTopTitle" :useDefaultCloseFn="false" @closeCallBackFn="fn"/>
 * data() {
 *     return {
 *          PageTopTitle: '登入'
 *      }
 *   }
 * useDefaultCloseFn 为 true 时 关闭按钮默认行为为返回上一页  为 false 时调用 closeCallBackFn 传入的函数
 *
 */

<template>
    <div class="pageTop">
        <slot></slot>
        <div class="title" v-text="title"></div>
        <div class="closeBtn" @click="selectCloseFn"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
        };
    },

    props: {
        title: {
            type: String,
            required: true
        },

        useDefaultCloseFn: {
            type: Boolean,
            default: true
        }
    },

    components: {},

    computed: {},

    methods: {
        defaultCloseFn(){
            this.$router.go(-1);
        },
        closeFn() {
            this.$emit('closeCallBackFn');
        },
        selectCloseFn() {
            if (this.useDefaultCloseFn)
                this.defaultCloseFn();
            else
                this.closeFn();
        }
    }
}

</script>
<style lang='less' scoped>
    @import (reference) "../assets/css/variable";
    .pageTop {
        width: 100%;
        .height(100);
        background: url("../assets/image/components/pageTop/pageTopBg.jpg") no-repeat center center;
        background-size: 100% 100%;
        color: #fff;
        .line-height(100);
        position: relative;
    }

    .title {
        .font-size(36);
        font-weight: 700;
    }

    .closeBtn {
        position:absolute;
        .width(194);
        height: 100%;
        background: url("../assets/image/components/pageTop/closeBtn.png") no-repeat center center;
        background-size: 100% 100%;
        right: 0;
        top: 0;
    }


</style>
