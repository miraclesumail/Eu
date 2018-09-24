<!-- 基本资料 -->
<template>
    <div class="information">
        <div class="box_showInfo">
           <div class="box_showInfo_in">
                <i class="iconfont icon-msnui-tel"></i>
                <span>联系电话</span>
                <span class="span_two" v-text="encryptionPhoneNumber"></span>
                <router-link to="/changePhoneNum">
                    <span class="span_btn btnPublicBg">修改</span>
                </router-link>
           </div>
        </div>
        <div class="box_showInfo">
            <div class="box_showInfo_in">
                <i class="iconfont icon-icon165"></i>
                <span>开户时间</span>
                <span class="span_two" v-text="registrationTime"></span>
            </div>
        </div>
        <div class="bankCard" v-if="hasBankInfo">
           <div class="bankNameImg" :style="{'background-image': bankNameBg}">
               <span v-text="bankInfo.bankAccountType == 1 ? '信用卡' : '借记卡'"></span>
           </div>
            <p class="bankNumber" v-text="bankAccount"></p>
            <div class="bankCard_bottom">
                <span class="name" v-text="bankInfo.bankAccountName"></span>
                <div class="bb_right">
                    <p v-text="bankInfo.bankAccountCity"></p>
                    <p v-text="bankInfo.bankAddress">深圳分行</p>
                </div>
            </div>
        </div>
        <BaseBtn :value="bondBankCard" @callBackFn="bindBankCardFn"  v-if="!hasBankInfo" style="margin-top:1rem;"/>
        <BaseBtn :value="changeBankCard" @callBackFn="changeBankCardFn"  v-if="hasBankInfo"/>
    </div>
</template>

<script>
import BaseBtn from '../../components/BaseBtn';
import { mapState } from 'vuex';
    export default {
        data () {
            return {
                changeBankCard: '修改银行卡资料',
                bondBankCard: '绑定银行卡资料'
        };
    },
    components: {
        BaseBtn
    },

    computed: {
        ...mapState([
            'encryptionPhoneNumber',
            'bankInfo'
        ]),

        hasBankInfo () {
            let bankInfo = this.$store.state.bankInfo;
            return !all.tool.isObjectEmpty(bankInfo);
        },

        bankAccount () {
            let bankAccount = this.$store.state.bankInfo.bankAccount;
            let tempBankAccount = '';
            let tempArr = bankAccount.split('').forEach((element, index) => {
                if (index === 3 || index === 7 || index === 11) {
                    tempBankAccount += element + ' ';
                } else {
                      tempBankAccount += element;
                } 
            });
          
            return tempBankAccount;
        },

        bankNameBg () {
            let bankNameNum = this.$store.state.bankInfo.bankName;
            let url = 'url('+ require(`../../assets/image/components/public/bank${bankNameNum}.png`)+ ')';
            return url;
        },

        registrationTime () {
            let registrationTime;
            if ( this.$store.state.registrationTime != '') {
                registrationTime = this.$store.state.registrationTime
            } else if (all.tool.getStore('userInfo') != null) {
                registrationTime = all.tool.getStore('userInfo')['registrationTime'];
            }
            
            return registrationTime;
        }

    },

    methods: {
        changeBankCardFn() {
            this.$router.push('/changeBankInfo');
        },
        bindBankCardFn () {
            this.$router.push('/bindBankInfo');
        }
    }
}

</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.information {
    .font-size(36);
    width: 100%;
    height: 100%;
    .rem3(padding, 30, 20, 140); 

    .box_showInfo {
        .mt(20);
        width: 100%;
        text-align: center;
        .font-size(32);
        .box_showInfo_in {
            overflow: hidden;
            .line-height(78);
            text-align: left;
            display: inline-block;
            position: relative;
            .width(708);
            .height(80);
            background-color: #060a13;
            border: 1px solid #079ae0;
            color: #1491bf;
            .pl(20);

            .span_two {
                color: #fff;
                .pl(40);
            }

            .span_btn {
                position: absolute;
                .right(10);
                top: 50%;
                .mt(-30);
                .width(120);
                .height(60);
                color: #fff;
                background-color: #00a0e9;
                text-align: center;
                .line-height(60);
                .font-size(26);
                font-weight: 700;
            }
        }
    }

    .bankCard {
        display: inline-block;
        .mt(60);
        .mb(60);
        .rem(padding, 30);
        .width(714);
        .height(386);
        background: url('../../assets/image/pages/account/bankCardBg.png') no-repeat center center;
        background-size: 100% 100%;

        .bankNameImg {
            width: 100%;
            .height(70);
            // background: url('../../assets/image/pages/account/bank1.png') no-repeat top right;
            background-repeat: no-repeat;
            background-position: top right;
            background-size: auto 100%;
            text-align: left;
            .font-size(30);
            font-weight: 700;
            .line-height(70);
        }

        .bankNumber {
            font-weight: 700;
            .font-size(48);
            .mt(70);
            text-align: right;
        }

        .bankCard_bottom {
            .mt(40);
            overflow: hidden;
            .name {
                float: left;
                .mt(45);
            }

            .bb_right {
                float: right;
                text-align: right;
            }
        }
        
        
    }

    
}
</style>