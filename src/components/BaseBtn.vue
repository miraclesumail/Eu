/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-12 10:57:49 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-03-15 19:24:14
 *
 * Usage
 * <BaseBtn :value="value" @callBackFn="callBack"/>
 *  methods: {
 *      callBack () {
 *          console.log('父组件函数')
 *       }
 *  }
 *
 */
<!-- 公用按钮 -->
<template>
    <div class="baseBtn">
        <input type="button" :value="value" @click="callBackFn">
    </div>
</template>

<script>
    export default {
        data () {
            return {
        };
    },

    props: {
        value: {
            type: String,
            default: '确定'
        }
    },

    components: {},

    computed: {},

    methods: {
        callBackFn () {
            this.$emit('callBackFn')
        }
    }
}

</script>
<style lang='less' scoped>
@import (reference) "../assets/css/variable";
.baseBtn {
    width: 100%;
    text-align: center;
    input {
        .width(500);
        .height(100);
        background: url("../assets/image/pages/login/loginBtnBg.png") no-repeat center center;
        background-size: 100% 100%;
        color: #fff;
        .font-size(40);
        font-weight: 700;
    }
}
</style>