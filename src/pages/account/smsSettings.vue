<!-- 短信设置 -->
<template>
    <div class="smsSettings">
        <ul>
            <li v-for="(item, index) in smsList" :key="item.smsId">
                <span>{{item.smsName}}</span>
                <div :class="{open: item.status, close: !item.status}" :data-id="item.status" @click="changeStatus(index)">
                    <span></span>
                </div>
            </li>
        </ul>
        <BaseBtn :value="value" @callBackFn="submit" style="margin-top: 0.5rem;"/>
    </div>
</template>

<script>
import BaseBtn from '../../components/BaseBtn';
    export default {
        data () {
            return {
                smsList: [],
                value: '确认修改',
        };
    },

    components: {
        BaseBtn,
    },

    computed: {},

    methods: {
        changeStatus (index) {
            let status = this.smsList[index].status; 
            this.smsList[index].status = !status;
        },
        submit () {
            let data = {};
            let statusArr = [];
            this.smsList.map(item => {
                let str = `${item.smsId}:${item.status ? '1' : '0'}`
                statusArr.push(str);
            })
            data.playerId = this.$store.state.playerId;
            data.status = statusArr.join(','); 
            all.tool.send('setSmsStatus', data).then(result => {
                 all.tool.TipWinShow('您的短信设置已经生效', [{name: '确定'}]);
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        }
    },

    mounted() {
        let This = this;
        all.tool.send('getSmsStatus', {
            playerId: This.$store.state.playerId
        }).then(result => {
            This.smsList = result.data;
        });
    }
}

</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.smsSettings {
    width: 100%;
    height: 100%;
    .rem3(padding, 30, 20, 200); 
    font-weight: 700;

    ul {
        width: 100%;
        height: 100%;
        .font-size(30);

        li {
            display: inline-block;
            .width(708);
            background-color: #050e15;
            .height(100);
            text-align: left;
            .line-height(100);
            .rem2(padding, 0, 30);
            .mt(20);

            .close {
                float: right;
                .width(200);
                .height(60);
                background:  url('../../assets/image/pages/account/sliderBg.png') no-repeat right top;
                background-size: 100% 100%;
                .mt(20);
                .border-radius(30);
                
                span {
                    display: inline-block;
                    .height(60);
                    .width(100);
                    background:  url('../../assets/image/pages/account/sliderBtn.png') no-repeat center center;
                    background-size: 100% 100%;
                }
            }

            .open {
                float: right;
                .width(200);
                .height(60);
                background:  url('../../assets/image/pages/account/sliderBgSuccess.png') no-repeat right top;
                background-size: 100% 100%;
                .mt(20);
                .border-radius(30);
                position: relative;
                
                span {
                    display: inline-block;
                    .height(60);
                    .width(100);
                    background:  url('../../assets/image/pages/account/sliderBtnOpen.png') no-repeat center center;
                    background-size: 100% 100%;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
}



</style>