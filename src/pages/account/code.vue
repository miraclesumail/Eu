<!-- 提前洗码 -->
<template>
    <div class="code">
        <h5>等级: <span v-text="levelName"></span></h5>
        <table cellspacing="0" cellpadding="0">
            <tr>
                <td v-for="item in allLevelList" :key="item.id">{{item.name}}</td>
            </tr>
            <tr>
                <td v-for="item in proportion" :key="item.index">{{item['14'] | format}}</td>
            </tr>
        </table>
         <p class="warning">*等级LV1，LV2以及LV3的玩家,您昨日中午12点到今天中午12点产生的洗码金额，将在今晚9点系统自动结算并派发到您的账户,请您届时查看,谢谢。</p>
        <div class="box_codeInfo" v-if="allAmount">
            <ul class="serchTitle">
                <li>游戏大厅</li>
                <li>投注金额</li>
                <li>洗码金额</li>
            </ul>
            <table cellspacing="0" cellpadding="0">
                <tr v-for="item in consumeRebateAmount" :key="item.id">
                    <td >{{item.name}}</td>
                    <td >{{item.data.consumptionAmount.toFixed(2)}}</td>
                    <td >{{item.data.returnAmount.toFixed(2)}}</td>
                </tr>
            </table>
        </div>

        <div class="allReturnAmount" v-if="allAmount">
            <span>洗码总额</span>
            <span class="amount" v-text="allAmount"></span>
        </div>
        <p class="nomore" v-if="!allAmount">当前没有可用洗码</p>
        <BaseBtn :value="value" @callBackFn="submit" v-if="allAmount" />
        <p class="warning">*申请的洗码优惠金额必须大于等于100</p>
    </div>
</template>

<script>
import BaseBtn from '../../components/BaseBtn';
    export default {
        data () {
            return {
                value: '提交',
                proportion: {},
                allLevelList: [],
                consumeRebateAmount: [],
                allAmount: 0
        };
    },

    components: {
        BaseBtn
    },

    computed: {
        levelName () {
            return this.$store.state.levelName;
        }
    },

    methods: {
        submit () {
            if (this.$store.state.level < 3) {
                all.tool.TipWinShow('LV.4以下的用户不能提前申请洗码',[{name: '确定'}]);
                return;
            } 

            all.tool.send('applyRewardEvent', {
                code: 'xima'
            }).then(result => {
                all.tool.TipWinShow('恭喜您, 申请成功',[{name: '确定'}]);
                this.allAmount = 0;
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, 1500);
            })
        }
    },

    mounted () {
        let This = this;
        let playerId = This.$store.state.playerId;
        all.tool.send('getAllLevel', {
            playerId: playerId
        }).then(result => {
            This.allLevelList = result.data;
        })
       
        all.tool.send('getRewardList').then(result => {
            result.data.map(item => {
                if (item.code === 'xima') {
                    This.proportion = item.param.ratio;
                }
            })
        });
        all.tool.send('getConsumeRebateAmount', {
            eventCode: 'xima'
        }).then(result => {
        
            let data = {
                DT: result.data['14'],
                PT: result.data['16'],
                MG: result.data['18'],
                AG: result.data['21'],
                EBET: result.data['23'],
            }
            
            This.consumeRebateAmount.push({
                id: '14',
                name: 'DT',
                data: data['DT'],
            });

            This.consumeRebateAmount.push({
                id: '16',
                name: 'PT',
                data: data['PT'],
            });

            This.consumeRebateAmount.push({
                id: '18',
                name: 'MG',
                data: data['MG']
            });

            This.consumeRebateAmount.push({
                id: '21',
                name: 'AG',
                data: data['AG'],
            });

            This.consumeRebateAmount.push({
                id: '23',
                name: 'EBET',
                data: data['EBET'],
            });
            
            This.allAmount = parseFloat((data['DT'].returnAmount + data['PT'].returnAmount + data['MG'].returnAmount + data['AG'].returnAmount + data['EBET'].returnAmount).toFixed(2));
            // This.allAmount = 10;
        })
    },

    filters: {
        format (value) {
            let per = value == '' ? 0 : value * 100;
            return  per.toFixed(1) + '%';
        }
    }
   
    
}

</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.code {
    width: 100%;
    height: 100%;
    .rem3(padding, 30, 20, 200);
    .font-size(24);

    h5 {
        width: 100%;
        .height(86);
        text-align: center;
        .font-size(30);
        .line-height(86);
        background-color: #20679f;
    }

    table {
        .rem2(padding, 0, 10);
        width: 100%;
        background-color: #083457;
        tr {
            width: 100%;
        }
        td {
            white-space: nowrap;
            width: 20%;
            .height(84);
            .line-height(84);
            border-bottom: 1px solid #0b1d2b;
        }
    }


    .box_codeInfo {
        .mt(50);
        .serchTitle {
            font-size: 0;
            width: 100%;
            .height(88);
            background-color: #20679f;

            li {
                font-weight: 700;
                .font-size(24);
                display: inline-block;
                width: 33.3333%;
                .line-height(88)
            }
        }
    }
    
    .warning {
        .mt(40);
        color: #f39800;
    }

    .nomore {
        .font-size(30);
        text-align: center;
        background: url('../../assets/image/pages/account/textBg2.png') no-repeat center center;
        background-size:  auto 90%;
        .height(60);
        .mt(50);
        .mb(68);
        .line-height(50);
    }

    .allReturnAmount {
        .mt(30);
        .mb(30);
        background-color: #ea7322;
        .height(86);
        text-align: left;
        .font-size(30);
        span {
            display: inline-block;
            text-align: center;
            width: 30%;
            height: 100%;
            .line-height(86);
        }
        .amount {
            width: 60%;
            text-align: center;
        }
    }
}


</style>