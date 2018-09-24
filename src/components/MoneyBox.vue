/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-12 10:40:25 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-07-26 13:37:00
 */
 
<template>
    
    <div class="money_box">
        <span class="score" v-text="score" :style="{'width': `${width}`, 'background-size': `${size}`}"></span>
        <span class="balance" v-text="balance" :style="{'width': `${width}`, 'background-size': `${size}`}"></span>
    </div>
 
</template>

<script>
    export default {
        data () {
            return {
        };
    },

    props: {
        width: {
            type: String,
        },
        size: {
            type: String
        }
    },

    components: {},

    computed: {
        balance () {
            return this.$store.state.balance;
        },
        score () {
            return this.$store.state.score;
        }
    },

    methods: {}
}

</script>
<style lang='less' scoped>
    @import (reference) '../assets/css/variable.less';
    .money_box {
        display: inline-block;
        .height(42px);
        .font-size(24);
        .mt(28);
        .ml(20);

        span {
            display: inline-block;
            .width(180);
            .height(42px);
            .line-height(43px);
            .pl(50);
            .ml(20);
            text-align: left;
        }
       .balance {
            background: #0b1c29 url('../assets/image/pages/home/iconCoin.png') no-repeat left top;
            background-size: 23% auto;
        }
        .score {
            background: #0b1c29 url('../assets/image/pages/home/iconScore.png') no-repeat left top;
            background-size: 23% auto;
            .ml(10);
        }
        .score,.balance {
            border: 1px solid #0f2c43;
        }

    }
</style>