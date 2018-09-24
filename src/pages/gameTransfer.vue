/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-26 19:58:41 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-08-22 17:21:59
 */
   
<template>
    <div class="gameTransfer">
        <PageTop
            :title="PageTopTitle"
        />
        <div class="main">
            <!-- <div class="box_userInfo"> -->
                <!-- <div class="userImg">
                    <img :src="userImgUrl" alt="">
                </div>
                <div class="box_right">
                    <p v-text="username" style="color: #f39800;"></p>
                    <MoneyBox />
                </div> -->
            <!-- </div> -->
            <ul class="lock-box">
                <li>
                    <img src="../assets/image/pages/gametransfer/lock.png"/>
                    <p style="color: #4cf307;">自由额度</p>
                    <p style="color: #4cf307;" v-text="freeAmount">0</p>
                </li>
                <li v-for="item in lockList" :key="item.nickName">
                    <img src="../assets/image/pages/gametransfer/lock.png"/>
                    <p style="color: #f84242;">{{item.nickName}}</p>
                    <p style="color: #f84242;">{{item.lockCredit | amountFilter}}</p>
                </li>
                <!-- <li>
                    <img src="../assets/image/pages/gametransfer/lock.png"/>
                    <p>真人额度</p>
                    <p v-text="lockAmount.person">0</p>
                </li> -->
            </ul>
            <div class="content">
                 <table cellspacing="0" cellpadding="0">
                    <tr>
                        <th></th>
                        <th>游戏大厅</th>
                        <th>游戏状态</th>
                        <th>游戏额度</th>
                    </tr>
                    <tr :class="{active:num==index}" v-for="(item,index) in gameList" :key="item.providerId" @click="tab(index,item.providerId)">
                        <td>
                            <img src="../assets/image/pages/gametransfer/dui.png" v-if="num==index">
                        </td>
                        <td>{{item.nickName}}</td>
                        <td>{{item.status == 1 ? '正常' : '关闭'}}</td>
                        <td>{{isNaN(item.amount) ? '获取失败' : item.amount}}</td>
                    </tr>
                </table>

                <div class="box_input">
                    <div class="box_input_in">
                        <label>操作方式</label>
                        <select v-model="selectMethods">
                           <option value="1">转入到游戏</option>
                           <option value="2">转出到本地</option>
                        </select>
                        <!-- <span class="select_arr_box btnPublicBg"></span> -->
                    </div>
                </div>

            </div>
            <BaseBtn @callBackFn="submit"/>
        </div>
    </div>
</template>

<script>
import PageTop from '../components/PageTop';
import MoneyBox from '../components/MoneyBox.vue';
import BaseBtn from '../components/BaseBtn.vue';
    export default {
        data () {
            return {
                PageTopTitle: '转 账',
                gameList: [],             // 游戏tr渲染数组
                lockedCreditList: [],     // 游戏被锁额度
                num: -1,
                providerId: -1,
                selectMethods: 1,
                lockAmount: {             // 锁大厅额度
                    free: 0,
                    electronic: 0,
                    person: 0
                },
                freeAmount: 0,
                lockList: []              // 锁大厅组
        };
    },
    mounted() {
       this.getCreditDetail();
    },
    components: {
        PageTop,
        MoneyBox,
        BaseBtn
    },

    computed: {

        /* 用户头像地址 */
        userImgUrl () {
            let str = require(`../assets/image/pages/home/headImageLv${this.$store.state.level + 1}.png`);
            return str;
        },

        /* 用户名 */ 
        username () {
            return this.$store.state.userName;
        },
        
      
    },

    filters: {
        /* 游戏名过滤 */ 
        filterName(value) {
            switch(value) {
                case 'MG-EBET':
                    return 'MG游戏';
                case 'DTOTHS':
                    return 'DT游戏';
                case 'PT':
                    return 'PT游戏';
            }
        },

        amountFilter(value) {
            let _value = Number(value); 
            if (!isNaN(_value)) {
                if (_value === 0) return 0;
                return _value.toFixed(2);
            } else {
                return '---'
            }
        }
    },

    methods: {
        
        /* 选择游戏 */
        tab (index, id) {
            this.num = index;
            this.providerId = id;
        },

        /* 提交转账 */
        submit () {

            if (this.providerId === -1) {
                all.tool.TipWinShow('请选择游戏供应商', [{name: '确定'}]);
                return;
            }

            if (this.selectMethods == 1) {
                // 转入
                let selectItem = this.findObj(this.gameList, 'providerId', this.providerId);
                if (selectItem.useTransfer) {
                    all.tool.send('transferToProvider', {
                        playerId: this.$store.state.playerId,
                        providerId: this.providerId
                    }).then(result => {
                        all.tool.TipWinShow('转账成功', [{name: '确定'}]);
                        this.getCreditDetail();
                    }).catch( (error) => {
                        let errorMessage = error.errorMessage || '未知错误'
                        all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                    })
                } else {
                    all.tool.TipWinShow('该游戏大厅目前禁止转入', [{name: '确定'}]);
                }
            } else if (this.selectMethods == 2) {
                // 转出
                all.tool.send('transferFromProvider', {
                    playerId: this.$store.state.playerId,
                    providerId: this.providerId
                }).then(result => {
                    all.tool.TipWinShow('转账成功', [{name: '确定'}]);
                    this.getCreditDetail();
                }).catch( (error) => {
                    let errorMessage = error.errorMessage || '未知错误'
                    if (error.status == 400)
                        errorMessage = '大厅内余额不足'
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                })
            }
        },

        /* 获取游戏额度信息 */
        getCreditDetail () {
            all.tool.send('getCreditDetail').then(result => {
                let balance = parseInt(result.data.credit);
                this.$store.state.balance = balance;
                this.freeAmount = balance;
                this.lockList =  result.data.lockedCreditList;
                if (this.gameList.length != 0)
                        this.gameList = [];
                result.data.lockedCreditList.map(item => {
                    // this.gameList.push({
                    //     nickName: item.nickName,
                    //     amount: parseFloat(item.list[0].validCredit) + parseFloat(item.lockCredit),
                    //     providerId: item.list[0].providerId,
                    //     status: item.list[0].status
                    // })
                    // if (item.nickName === '电子游戏') {
                    //     this.lockList
                    //     this.lockAmount.electronic = item.lockCredit;
                    // } else if (item.nickName === '易博真人') {
                    //     this.lockAmount.person = item.lockCredit;
                    // }

                    if (Array.isArray(item.list)) {
                        item.list.map(value => {
                            // if (value.nickName !== 'EBETSLOTS') {
                                this.gameList.push({
                                    nickName: this.filterGameName(value.nickName),
                                    amount: parseFloat(value.validCredit),
                                    providerId: value.providerId,
                                    status: value.status,
                                    useTransfer: value.validCredit === 'unknown' ? false : true 
                                });
                            // }
                        });
                    }
                });
            })
        },

        filterGameName (name) {
             switch(name) {
                case 'MG-EBET':
                    return 'MG电子';
                case 'DTOTHS':
                    return 'DT电子';
                case 'PT':
                    return 'PT电子';
                case 'EBET':
                    return '易博真人';
                case 'FISH':
                    return 'AG捕鱼';
                case 'EBETSLOTS':
                    return '易博电子';
                case 'KYBOARD':
                    return 'KY棋牌';
                default: 
                    return '---'
            }
        },

        findObj (list, key, val) {
            if (Array.isArray(list)) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i][key] == val) return list[i]; 
                }
            }
        }
        
        // goAccount() {
        //     this.$router.push('/account');
        // },
    }
}



</script>
<style lang='less' scoped>
@import (reference) '../assets/css/variable.less';
.gameTransfer {
    width: 100%;
    height: 100%;
    // background-color: red;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .main {
        .font-size(30);
        .rem3(padding, 20, 20, 100);
        .box_userInfo {
            text-align: left;
            width: 100%;
            .height(140);
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
                .ml(-20);
                display: inline-block;
                p {
                    .pl(40);
                    .font-size(24);
                    .height(30);
                }
            }
        }

        table {
            width: 100%;
            text-align: center;
            tr:nth-child(1) {
                background-color: #0f76a0;
                font-weight: 700;
                .height(80);
                .line-height(80);

                th:nth-child(1) {
                    .width(96);
                }
            }

            tr:nth-child(n+2) {
                background-color: #050e15;
                .height(86);
                .line-height(86);
                td {
                    border-bottom: 4px solid #0b1d2b;
                }
                td:nth-child(1) {
                    background: url(../assets/image/pages/gameTransfer/yuan.png) no-repeat center center;
                    background-size: 50%;

                    img {
                        width: 50%;
                        .mt(13);
                        .ml(7);
                    }
                }
            }
        }


        .box_input {
            .mb(58);
            .mt(80);
            
            .box_input_in {
                .pl(20);
                text-align: left;
                display: inline-block;
                .width(708);
                .height(78);
                background-color: #060a13;
                .font-size(30);
                .line-height(78);
                border: 1px solid #079ae0;
                position: relative;

                label {
                    color: #1489bf;
                    .width(130);
                }
                .phoneNumber {
                    .pl(21);
                }

                select,input {
                    height: 100%;
                    .pl(21);
                    .width(520);
                    .font-size(30);
                    background-color: #060a13;
                    color: #fff;
                }

                select {
                    float: right;
                    .pl(34);
                    width: 7.402rem;
                    background: url('../assets/image/components/public/selectArrBg.jpg') no-repeat right top;
                    background-size: auto 100%;
                    background-color: #060a13;
                }

                .select_arr_box {
                    display: inline-block;
                    .height(74);
                    .width(80);
                    position: absolute;
                    right: 0;
                    top: 0;

                    &::after {
                        position: absolute;
                        content: '';
                        display: inline-block;
                        height: 0;
                        width: 0;
                        border-top: 0.3rem solid #fff;
                        border-right: 0.3rem solid transparent;
                        border-bottom: 0.3rem solid transparent;
                        border-left: 0.3rem solid transparent;
                        animation: move 1s infinite linear;
                        left: 50%;
                        top: 50%;
                        transform: translateX(-50%) translateY(-20%);
                    }
                }
            }
        }
        .active {
            background-color: #09425a !important;
        }
    }

    .lock-box {
        width: 100%;
        .height(170);
        display: flex;
        justify-content: space-between;
        .mb(50);
        .font-size(24);
        border-bottom: 1px solid #fff; 
        
        li {
            width: 30%;
            .height(190);
            overflow: hidden;

            img {
                width: 40%;
            }

            p {
                .mt(10);
            }
        }
    }
}
</style>