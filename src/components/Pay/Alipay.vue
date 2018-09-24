<template>
    <div class="alipay">
        <PageTop
            :title="title"
            :useDefaultCloseFn="false"
            @closeCallBackFn="goToSaving"
        />
        <div class="main" v-if="order">
            <div class="order">
                <img src="./images/orderInfo.png" >
                <div class="accountName colorFont" v-text="order.data.alipayName"></div>
                <div class="amount colorFont">￥<span v-text="order.data.amount"></span></div>
                <div class="username colorFont" v-text="order.creator.name"></div>
            </div>
            <div class="description">
                <h5 class="colorFont">充值流程</h5>
                <p>1. 付款备注请填写：<span class="colorFont" v-text="order.creator.name"></span><input class="copyBtn" type="button" @click="copyName" value="点击复制"/> </p>
                <p>2. 易游支付宝账号：<span class="colorFont" v-text="order.data.alipayAccount"></span>（仅限此笔订单，系统不支持重复转账，请勿保留该账号）</p>
                <p>3. 请在<span class="colorFont"> <span v-text="h"></span>:<span v-text="m"></span>:<span v-text="s"></span> </span>时间内付款，完成后请勿取消订单。</p>
                <p>4. 付款成功将会在<span class="colorFont"> 5 - 10 </span>分钟内添加到账。</p>
            </div>
            <ul class="btn-box">
                <li @click="cancel">
                    <img src="./images/cancel.jpg" width="100%" height="100%">
                </li>
                <li @click="submit">
                    <img src="./images/submit.jpg" width="100%" height="100%">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import PageTop from '../PageTop';
export default {
    data () {
        return {
            title: '支付宝转账详情',
            h: '00',
            m: '00',
            s: '00',
            timer: -1,
            order: null,
            restTime: 0,
        };
    },

    created() {
        all.tool.send('getAlipayTopupRequestList').then(result => {
            if (result.data) {
                let accountName = result.data.data.alipayName;
                if (accountName) {
                    let tempArr = accountName.split('');
                    tempArr[0] = '*';
                    result.data.data.alipayName = tempArr.join('');
                }
                this.order = result.data;
                this.restTime = this.order.restTime;
                this.countTime(this.restTime);
            } else {
                this.$router.push('/deposit');
            }
        }).catch(err => {
            all.tool.TipWinShow(err.errorMessage ? err.errorMessage : '未知错误', [{name:'确定'}]);
        });
    },

    // mounted() {
    //     this.countTime(this.restTime);
    // },

    beforeDestroy () {
        clearTimeout(this.timer);
    },

    components: {
        PageTop
    },

    computed: {},

    methods: {
        cancel () {
            all.alert.confirm('您确定要取消申请吗?', [{name: '返回'}, {name: '联系客服取消', callback: () => {
                all.tool.openOnlineCustomer(all.store.state.live800, all.store.state.level === 4);
                all.tool.clickCount({page:'支付宝订单页面', btn:'联系客服取消'});
            }}]);
        },

        submit () {
            window.open(this.order.data.qrcodeAddress);
        },

        countTime (restTime) {
            if (this.restTime) {
                restTime = this.restTime;
            }
            if (restTime >= 0) {  
                var h = Math.floor( restTime / 60 / 60 % 24 );  
                var m = Math.floor( restTime / 60 % 60 );
                var s = Math.floor( restTime % 60 );    
                this.h = h < 10 ? '0' + h : h;
                this.m = m < 10 ? '0' + m : m;
                this.s = s < 10 ? '0' + s : s;
                this.restTime -= 1;
                this.timer = setTimeout(this.countTime, 1000);
            } else {
                this.h = '00';
                this.m = '00';
                this.s = '00';
                clearTimeout(this.timer);
                all.alert.confirm('订单超时，请您重新提交', [{name: '确定', callback: () => {
                    this.goToSaving();
                }}]);
            }
        },

        copyName () {
            this.$copyText(this.order.creator.name).then(() => {
                all.alert.confirm('复制成功', [{name: '确定'}]);
            });
        },

        goToSaving () {
            this.$router.push('/deposit');
        }
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.alipay {
    width: 100%;
    height: 100%;
}

.main {
    width: 100%;
    height: 92%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}

.order {
    .rem(padding, 20);
    padding-right: 0;
    position: relative;
    img {
        .height(500);
        // width: 100%;
    }
}

.colorFont {
    color: #fa9d03;
}

.accountName,.amount,.username {
    position: absolute;
    .font-size(24);
    font-weight: 700;

}

.accountName {
    .top(244);
    .left(250);
}

.amount {
    .left(140);
    .bottom(190);
}

.username {
    .left(140);
    .bottom(160);
}


.description {
    text-align: left;
    .rem(padding, 20);
    .line-height(40);
    h5 {
        .font-size(32);
        .mb(10);
    }
    p {
        .font-size(24);
    }
    .copyBtn {
        .rem2(padding, 0, 10);
        .ml(10);
        .height(40);
        color: #fff;
        background-color: #fa9d03;
    }
}

.btn-box {
    width: 100%;
    .height(60);
    display: flex;
    justify-content: center;
    .mt(20);
    .mb(20);
    li {
        .width(202);
        .height(64);
        .border-radius(10);
        overflow: hidden;
        .rem2(margin, 0, 30);
    }
}
</style>