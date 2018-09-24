/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-26 15:55:32 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-05-25 11:35:14
 */


<!-- 记录搜索 -->
<template>
    <div class="search">
        <ul class="box_nav">
            <li v-for="(item,index) in nav" :key="item.index" :class="{active: index === num}" @click="tab(index)">{{item}}</li>
        </ul>
        <div class="box_input">
            <div class="box_input_in">
                <label v-text="labelText"></label>
                <select name="" id="" v-model="topUpType">
                    <option v-for="item in selectArr" :key="item.value" :value="item.value">{{item.text}}</option>
                </select>
                <!-- <span class="select_arr_box btnPublicBg"></span> -->
            </div>
        </div>
        <div class="box_input">
            <div class="box_input_in">
                <label>开始时间</label>
                <input id="startTime" type="datetime-local" v-model="startDateTime" class="dateInput">
            </div>
        </div>
        <div class="box_input">
            <div class="box_input_in">
                <label>结束时间</label>
                <input id="endTime" type="datetime-local" v-model="endDateTime" class="dateInput">
            </div>
        </div>
        <BaseBtn :value="value" style="margin: 0.8rem 0;" @callBackFn="submit"/>
        <ul class="serchTitle" v-if="showTitle">
            <li v-for="item in searchNav" :key="item.index" :style="{width: liWidth}">{{item}}</li>
        </ul>
        <p class="nomore" v-if="showNomore">查无记录</p>
        <table cellspacing="0" cellpadding="0" v-if="num===0 && topupHistory.length!=0">
            <tr v-for="item in topupHistory" :key="item._id">
                <td class="createTime">{{item.createTime | processingTime}} <br /> {{item.createTime | processingMM}}</td>
                <td>{{item.type | typeFilter}}</td>
                <td>{{item.data.amount}}</td>
                <td>{{item.status | processingStatus}}</td>
            </tr>
        </table>
        <table cellspacing="0" cellpadding="0" v-if="num===1 && bonusRequestList.length!=0">
            <tr v-for="item in bonusRequestList" :key="item._id">
                <td class="createTime">{{item.createTime | processingTime}} <br /> {{item.createTime | processingMM}}</td>
                <td>{{item.data.amount}}</td>
                <td>{{item.status | processingStatus}}</td>
                <td>
                    <span class="cancel" :class="{use: !selectBg(item.status), not: selectBg(item.status)}" @click="cancelDraw(item.status, item.proposalId)"></span>
                </td>
            </tr>
        </table>
        <table cellspacing="0" cellpadding="0" v-if="num===2 && playerRewardList.length!=0">
            <tr v-for="item in playerRewardList" :key="item._id">
                <td>{{item.eventName}}</td>
                <td>{{item.rewardAmount && item.rewardAmount.toFixed(2)}}</td>
                <td>{{item.status | processingStatus}}</td>
                <td class="createTime">{{item.createTime | processingTime}} <br /> {{item.createTime | processingMM}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import BaseBtn from '../../components/BaseBtn';
    export default {
        data () {
            return {
                nav: ['充值记录', '提款记录', '优惠记录'],
                searchNav: ['时间', '充值方式', '充值金额', '状态'],
                allowCancellation: ['Pending', 'AutoAudit', 'CsPending'],     // 提款允许取消的状态
                num: 0,
                topUpType: 2,                    // select框默认选项
                startDateTime: '',               // 开始时间
                endDateTime: '',                 // 结束时间
                topupHistory: [],                // 充值记录数组
                bonusRequestList: [],            // 提款记录数组
                playerRewardList: [],            // 优惠记录数组
                showTitle: false,                // 是否展示搜索记录的标题栏
                showNomore: false,               
                isCancel: [true, false],
                selectArr: [
                    {
                        value: '1',
                        text: '手工充值'
                    },
                    {
                        value: '2',
                        text: '在线充值'
                    },
                    {
                        value: '3',
                        text: '支付宝充值'
                    },
                    {
                        value: '4',
                        text: '微信充值'
                    },
                    {
                        value: '5',
                        text: '快捷充值'
                    }
                ],
                value: '查询',
                labelText: '充值类型'            // 选择框label值
        };
    },

    mounted () {
        let date = new Date();
        let today = new Date();
        let yesterday = date.setDate(date.getDate() - 1);
        this.startDateTime = all.tool.formatTime(yesterday) + 'T00:00';
        this.endDateTime = all.tool.formatTime(today) + 'T23:59';
    },
    filters: {

        processingTime(value) {
            let resultTime = all.tool.formatTime(value);
            return resultTime;
        },

        processingMM(value) {
            let resultTime = all.tool.formatTime(value, true);
            return resultTime.split(' ')[1];
        },

        processingStatus(value) {
            let statusType = {
                Success: '提案成功',
                Fail: '提案失败',
                Pending: '待审批',
                PrePending: '系统异常',
                Approved: '审批通过',
                Rejected: '审批拒绝',
                Cancel:'已取消',
                Processing: '处理中',
                AutoAudit: '自动审核',
                Undetermined: '提款待定',
                Recover: '恢复处理',
                CsPending: '待审核'
            }
            return statusType[value]
        },
        
        /* 充值类型过滤 */ 
        typeFilter (type) {
            let tempObj = {
                1: '手工充值',
                2: '在线充值',
                3: '支付宝充值',
                4: '微信充值',
                5: '快捷充值'
            };
            return tempObj[type];
        }
    },

    components: {
        BaseBtn
    },

    computed: {
        liWidth () {
            return 100/this.searchNav.length + '%'
        }
    },

    methods: {
        /* 切换查询种类 */
        tab(index) {
            this.num = index;
            this.showNomore = false;

            // 充值记录
            if (index === 0) {
                this. selectArr = [
                    {
                        value: '1',
                        text: '手工充值'
                    },
                    {
                        value: '2',
                        text: '在线充值'
                    },
                    {
                        value: '3',
                        text: '支付宝充值'
                    },
                    {
                        value: '4',
                        text: '微信充值'
                    },
                    {
                        value: '5',
                        text: '快捷充值'
                    }
                ];
                this.topUpType = 2;
                this.labelText = '充值类型'
                this.searchNav = ['时间', '充值方式', '充值金额', '状态'];
                if (this.topupHistory.length === 0) {
                    this.showTitle = false;
                } else {
                    this.showTitle = true;
                }
            }

            // 提案记录
            if (index === 1) {
                this.selectArr = [
                    {
                        value: '',
                        text: '全部'
                    },
                    // {
                    //     value: 'Success',
                    //     text: '提案成功'
                    // },
                    // {
                    //     value: 'Fail',
                    //     text: '提案失败'
                    // },
                    // {
                    //     value: 'Pending',
                    //     text: '待审批'
                    // },
                    // {
                    //     value: 'PrePending',
                    //     text: '系统异常'
                    // },
                    // {
                    //     value: 'Approved',
                    //     text: '审批通过'
                    // },
                    // {
                    //     value: 'Rejected',
                    //     text: '审批拒绝'
                    // },
                    // {
                    //     value: 'Cancel',
                    //     text: '已取消'
                    // },
                    // {
                    //     value: 'Processing',
                    //     text: '处理中'
                    // },
                    // {
                    //     value: 'AutoAudit',
                    //     text: '自动审核'
                    // },
                    // {
                    //     value: 'Undetermined',
                    //     text: '提款待定'
                    // },
                    // {
                    //     value: 'Recover',
                    //     text: '提款恢复处理'
                    // },
                ]
                this.topUpType = '';
                this.labelText = '提案类型'
                this.searchNav = ['时间', '提款金额', '状态', '操作'];
                if (this.bonusRequestList.length === 0) {
                    this.showTitle = false;
                } else {
                    this.showTitle = true;
                }
            }

            // 优惠记录
            if (index === 2) {
                 this.selectArr = [
                     {
                         value: '全部',
                         text: '全部'
                     }
                 ]
                this.topUpType = '全部';
                this.labelText = '优惠类型';
                this.searchNav = ['优惠类型', '优惠金额', '状态', '参与时间'];
                if (this.playerRewardList.length === 0) {
                    this.showTitle = false;
                } else {
                    this.showTitle = true;
                }
            }
        },

        triggerClick($event) {
            $event.target.previousElementSibling.click();
        },

        /* 提交 */ 
        submit () {
            let This = this;
            if (!This.startDateTime) {
                all.tool.TipWinShow('请选择开始时间', [{name: '确定'}]);
                return;
            }

            if(!This.endDateTime) {
                all.tool.TipWinShow('请选择结束时间', [{name: '确定'}]);
                return;
            }
            
            if((new Date().valueOf()/1000/60/60/24)-(new Date(This.startDateTime).valueOf()/1000/60/60/24) >15) {
                all.tool.TipWinShow('您输入的起止时间应该在14天以内', 1500);
                return;
            }
            let stertTime = all.tool.formatTime(This.startDateTime, true) + ':00';
            let endTime = all.tool.formatTime(This.endDateTime, true) + ':00';
            if (This.num === 0) {
                This.getTopupHistory(stertTime, endTime);
            } else if (This.num === 1) {
                This.getBonusRequestList(stertTime, endTime);
            } else if (This.num === 2) {
                This.getPlayerRewardList(stertTime, endTime);
            }
        },

        /* 获取充值记录 */
        getTopupHistory (stertTime, endTime) {
            let This = this;
            let data = {};
            data.topUpType = this.topUpType;
            data.startTime = stertTime;
            data.endTime = endTime;
            data.startIndex = 0;
            data.sort = false;
            all.tool.send('getTopupHistory', data).then(result => {
                if (result.data.records == '') {
                    This.showNomore = true;
                    This.topupHistory = [];
                    This.showTitle = false;
                } else {
                    This.showNomore = false;
                    This.showTitle = true;
                    This.topupHistory = result.data.records;
                }
                
                /*------------------------- 测试代码 -----------------------------*/ 
                // This.topupHistory = [
                //     {
                //         createTime: '2018-03-07T06:47:42.281Z',
                //         type: 1,
                //         status: 'Success',
                //         data: {
                //             amount: 100
                //         }
                //     }
                // ]
            })
        },

        /* 获取提款记录 */
        getBonusRequestList (stertTime, endTime) {
            let This = this;
            let data = {};
            data.status = this.topUpType;
            data.startTime = stertTime;
            data.endTime = endTime;
            all.tool.send('getBonusRequestList', data, 'payment').then(result => {
                if (result.data.records == '') {
                    This.showNomore = true;
                    This.bonusRequestList = [];
                    This.showTitle = false;
                } else {
                    This.showTitle = true;
                    This.bonusRequestList = result.data.records;
                }

                /*------------------------- 测试代码 -----------------------------*/ 
                // This.bonusRequestList = [
                //     {
                //         createTime: '2018-03-07T06:47:42.281Z',
                //         status: 'Pending',
                //         proposalId: '123443211',
                //         data: {
                //             amount: 999
                //         }
                //     }
                // ]
            })
        },

        /* 获取优惠记录 */
        getPlayerRewardList (stertTime, endTime) {
            let This = this;
            let data = {};
            data.startTime = stertTime;
            data.endTime = endTime;
            data.startIndex = 0;
            data.playerId = This.$store.state.playerId;
            data.sort = false;
            all.tool.send('getPlayerRewardList', data).then(result => {
                if (result.data.records == '') {
                    This.showNomore = true;
                    This.playerRewardList = [];
                    This.showTitle = false;
                } else {
                    This.showTitle = true;
                    This.playerRewardList = result.data.records;
                }

                /*------------------------- 测试代码 -----------------------------*/ 
                // This.playerRewardList = [
                //     {
                //         createTime: '2018-03-07T06:47:42.281Z',
                //         eventName: '优惠代码',
                //         data: {
                //             amount: 100
                //         }
                //     }
                // ]
            })
        },

        /* 取消提款申请 */
        cancelDraw (status, proposalId) {
            let This = this;
            if (this.allowCancellation.includes( status )) {
                all.tool.send('cancelBonusRequest', {
                    proposalId: proposalId
                }, 'payment').then(result => {
                    all.tool.TipWinShow('取消成功', [{name: '确定'}]);
                    let stertTime = all.tool.formatTime(This.startDateTime, true) + ':00';
                    let endTime = all.tool.formatTime(This.endDateTime, true) + ':00';
                    This.getBonusRequestList(stertTime, endTime);
                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                })
            } else {
                all.tool.TipWinShow('该笔提款已经不能取消', [{name: '确定'}]);
            }
        },

        /* 提款记录取消按钮背景图 */
        selectBg (status) {
            return !this.allowCancellation.includes( status )
        } 
    }
}

</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.search {

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

    .active {
        background-color: #0c2e48;
        color: #fff;
    }

    .font-size(30);
    width: 100%;
    height: 100%;
    .rem3(padding, 30, 20, 200); 

    .box_nav {
        width: 100%;
        font-size: 0;
        .height(80);
        color: #00b7ee;
        border-bottom: 4px solid #0c2e48;
        .mb(20);

        li {
            display: inline-block;
            .font-size(30);
            width: 33.33333%;
            .height(76);
            .line-height(76);
            font-weight: 700;
        }
    }

    .box_input {
        .mb(20);

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
                background: url('../../assets/image/components/public/selectArrBg.jpg') no-repeat right top;
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

    .dateInput {
        width: 7.3rem !important;
        &::-webkit-calendar-picker-indicator {
           background-color: #060a13;
           .width(40);
           .height(25);
        }
    }
    table {
        background-color: #083457;
        text-align: center;
        .font-size(24);
        width: 100%;
        .rem2(padding, 0, 10);
    
        tr {
            .height(101);
            width: 100%;
        }

        .searchTitle {
            background-color: #20679f;
            .height(88);
            width: 100%;
        }

        th,td {
            width: 20%;
            .height(88);
            .line-height(88);
            border-bottom: 1px solid #0b1d2b;
        }
       
        .createTime {
            .pt(10);
            .line-height(40);
        }
        
    }

    .serchTitle {
        font-size: 0;
        width: 100%;
        .height(88);
        background-color: #20679f;

        li {
            font-weight: 700;
            .font-size(24);
            display: inline-block;
            width: 0%;
            .line-height(88)
        }
    }

    .cancel {
        font-weight: 700;
        display: inline-block;
        .width(120);
        .height(60);
        // background: url('../../assets/image/components/tipWindow/tipWinCancelBtn.png') no-repeat center center;
        // background-size: 100% 100%;
        .mt(20);
        .line-height(60);
    }

    .use {
        background: url('../../assets/image/components/public/cancelBtn1.jpg') no-repeat center center;
        background-size: 100% 100%;
    }

    .not {
        background: url('../../assets/image/components/public/cancelBtn2.jpg') no-repeat center center;
        background-size: 100% 100%;
    }

}
</style>