/*
 * @Author: Reynold Yang 
 * @Date: 2018-03-21 17:52:39 
 * @Last Modified by: Reynold Yang
 * @Last Modified time: 2018-09-03 15:36:11
 */


<!-- 绑定银行卡资料 -->
<template>
    <div class="bindBankInfo">
        <PageTop 
            :title="PageTopTitle"
        />
       <main>
            <div class="box_input" v-if="!realName">
                <div class="box_input_in">
                    <label>账户姓名</label>
                    <input type="text" placeholder="请输入账户姓名" v-model="inputUserBankName" maxlength="12"  @keyup="inputkeyup('inputUserBankName', /[^\u4e00-\u9fa5]/g)">
                </div>
            </div>
            
            <div class="box_showInfo" v-if="realName">
                <div class="box_showInfo_in">
                    <span>账户姓名</span>
                    <span class="span_two" v-text="encryptionRealName"></span>
                    <div>
                        <span class="span_btn btnPublicBg" @click="openOnlineCustomer">修改</span>
                    </div>
                </div>
            </div>

            <div class="box_input">
                <div class="box_input_in">
                    <label>银行账号</label>
                    <input type="text" placeholder="请输入银行账户" v-model="inputBankAccount" maxlength="19" @keyup="inputkeyup('inputBankAccount', /[^\d]/g)">
                </div>
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>银行名称</label>
                    <select name="" id="bankName" v-model="inputBankName">
                        <option value='' disabled selected style='display:none;'>请选择</option> 
                        <option v-for="item in bankTypeList" :key="item.id" :value="item.bankTypeId">{{item.name}}</option>
                    </select>
                </div>
                <!-- <span class="select_arr_box btnPublicBg"></span> -->
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>账户性质</label>
                    <select name="sdf" id="" v-model="inputAccountType"  autocomplete="off">
                        <option value="2">借记卡</option>
                        <option value="1">信用卡</option>
                    </select>
                </div>
                <!-- <span class="select_arr_box btnPublicBg"></span> -->
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>开户省份</label>
                    <select name="" id="" @change="provinceChange($event)" v-model="provinceId">
                        <option value='' disabled selected style='display:none;'>请选择</option> 
                        <option v-for="item in provinceList" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <!-- <span class="select_arr_box btnPublicBg"></span> -->
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>开户城市</label>
                    <select name="" id="" @change="cityChange($event)" v-model="cityId">
                        <option value='' disabled selected style='display:none;'>请选择</option> 
                        <option v-for="item in cityList" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <!-- <span class="select_arr_box btnPublicBg"></span> -->
            </div>
            <div class="box_input" v-show="showDistrict">
                <div class="box_input_in">
                    <label>开户地区</label>
                    <select name="" id="" v-model="district">
                        <option value='' disabled selected style='display:none;'>请选择</option> 
                        <option v-for="item in districtList" :key="item.id" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <!-- <span class="select_arr_box btnPublicBg"></span> -->
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>开户支行</label>
                    <input type="text" placeholder="请输入开户支行" v-model="inputBranch">
                </div>
            </div>
            <div class="box_input smsCode">
                <div class="smsCode_in">
                    <div class="box_input_in">
                        <label for="smsCode">短信验证</label>
                        <input type="text"  placeholder="输入验证码" v-model="smsCode" maxlength="4" @keyup="inputkeyup('smsCode', /[^\d]/g)">
                        <span @click="getSmsCode" v-text="smsCodeText"></span>
                    </div>
                    <a href="javascript:;">收不到?</a>
                </div>
            </div>
            <BaseBtn :value="value" style="margin-top: 1rem;" @callBackFn="callBack"/>
       </main>
    </div>
</template>

<script>
import PageTop from '../../components/PageTop';
import BaseBtn from '../../components/BaseBtn';
    export default {
        data () {
            return {
                PageTopTitle: '绑定银行卡资料',
                value: '提交',
                bankTypeList: [],
                provinceList: [],
                cityList: [],
                districtList: [],
                provinceId: '',
                cityId: '',
                district: '',
                smsCode: '',
                smsCodeText: '获取',
                inputUserBankName: '',
                inputBankAccount: '',
                inputBankName: '',
                inputAccountType: 2,
                inputBranch: '',
                submit: true,
                showDistrict: true,        // 显示区输入框
        };
    },

    mounted () {
        console.log(this.realName);
        this.getBankTypeList();
        this.getProvinceList();
    },

    components: {
        PageTop,
        BaseBtn
    },

    computed: {

        /* 银行卡姓名 */ 
        bankAccountName () {
            return this.$store.state.bankInfo.bankAccountName || all.tool.getStore('bankInfo')['bankAccountName'];
        },
        
        /* 真实姓名 */ 
        realName () {
            return all.tool.getStore('userInfo')['realName'];
        },

        /* 真实姓名加密 */
        encryptionRealName () {
            if (!this.realName)
                return '';
            let tempArr = this.realName.split('');
            for (var i = 0; i < tempArr.length; i++) {
                if ( i > 0) {
                    tempArr[i] = '*'
                }
            }
            return tempArr.join('');
        }
    },

    methods: {
        getBankTypeList () {
            let This = this;
            let storeBankTypeList = all.tool.getStore('bankTypeList');
            if ( !storeBankTypeList ) {
                all.tool.send('getBankTypeList').then( result => {
                    This.bankTypeList = result.data;
                    all.tool.setStore('bankTypeList', result.data);
                })
            } else {
                This.bankTypeList = storeBankTypeList;
            }
        },
        
        getProvinceList () {
            let This = this;
            let storeProvinceList = all.tool.getLocal('provinceList');
            if (!storeProvinceList) {
                all.tool.send('getProvinceList').then( result => {
                    This.provinceList = result.data;
                    all.tool.setLocal('provinceList', result.data);
                })
            } else {
                This.provinceList = storeProvinceList;
            }
        },

        provinceChange ($event) {
            this.inputChange($event);
            let This = this;
            all.tool.send('getCityList', {provinceId: This.provinceId}).then( result => {
                This.cityList = result.data;
            })
        },

        cityChange ($event) {
            this.inputChange($event);
            let This = this;
            all.tool.send('getDistrictList', {cityId: This.cityId, provinceId: This.provinceId}).then( result => {
                This.districtList = result.data;
                if (This.districtList.length === 0) {
                    This.showDistrict = false;
                } else {
                    This.showDistrict = true;
                }
            })
        },

        getSmsCode () {
            let This = this;
            this.checkForm();
            if (!this.submit) {
                return;
            }
            all.tool.send('sendSMSCodeToPlayer',{purpose: 'updateBankInfo'}).then(() => {
                all.tool.TipWinShow('验证码发送成功', [{name: '确定'}]);
                This.countdown();
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        countdown () {
            this.smsCodeText = 60;
            let timer = setInterval( () => {
                if (this.smsCodeText === 0) {
                    this.smsCodeText = '获取';
                    clearInterval(timer);
                } else {
                    this.smsCodeText--;
                }
            }, 1000)
        },
        
        checkForm () {
            let va = false;
            if (!this.realName) {
                if (this.inputUserBankName == '' || !this.inputUserBankName.match(/^[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+$/g)) {
                    all.tool.TipWinShow('姓名必须输入中文', [{name: '确定'}]);
                    this.submit = false;
                    let va = false;
                    return;
                }
            }
            
            if (this.inputBankAccount.length != 16 && this.inputBankAccount.length != 19) {
                all.tool.TipWinShow('卡号位数不正确！', [{name: '确定'}]);
                this.submit = false;
                let va = false;
                return;
            }

            if (this.inputBankName == '') {
                all.tool.TipWinShow('请选择银行卡名称', [{name: '确定'}]);
                this.submit = false;
                let va = false;
                return;
            }

            if (this.provinceId == '') {
                all.tool.TipWinShow('请选择开户省份', [{name: '确定'}]);
                this.submit = false;
                let va = false;
                return;
            }

            if (this.cityId == '') {
                all.tool.TipWinShow('请选择开户城市', [{name: '确定'}]);
                this.submit = false;
                let va = false;
                return;
            }

            // if (this.district == '') {
            //     all.tool.TipWinShow('请选择开户地区', [{name: '确定'}]);
            //     this.submit = false;
            //     let va = false;
            //     return;
            // }

            if (this.inputBranch == '') {
                all.tool.TipWinShow('请输入开户支行', [{name: '确定'}]);
                this.submit = false;
                let va = false;
                return;
            }
            this.submit = true;
            va = true;
            return va;
        },

        inputClick ( value, $event ) {
            let temp = value.replace(/input/, 'temp');
            this[value] = this[temp];
            $event.target.style.color = '#fff';
        },

        inputChange ($event) {
            if ($event.target.value != '') {
                $event.target.parentElement.style.border = '1px solid #079ae0';
                $event.target.style.color = '#fff';
            }
        },

        inputkeyup (key, reg) {
            this[key] = this[key].replace(reg, '');
        },

        /* 提交 */
        callBack() {
            let data = {};
            let This = this;
            
            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '绑定银行卡'
            });

            if (!this.checkForm())
                return;


            if (this.smsCode == '') {
                all.tool.TipWinShow('请输入短信验证码', [{name: '确定'}]);
                this.submit = false;
                return;
            } else {
                this.submit = true;
            }

           
            if (this.submit) {
                data.bankAccountName = this.realName ? this.realName : this.inputUserBankName;
                data.bankAccount = this.inputBankAccount;
                data.bankName = this.inputBankName;
                data.bankAccountType = this.inputAccountType
                data.bankAccountProvince = this.provinceId;
                data.bankAccountCity = this.cityId
                data.bankAccountDistrict = this.district
                data.bankAddress = this.inputBranch;
                data.playerId = this.$store.state.playerId;
                data.smsCode = this.smsCode;
                all.tool.send('updatePaymentInfo', data).then(result => {
                    all.tool.TipWinShow('恭喜您绑定成功', [{name: '确定'}]);
                    This.$router.push('/account/information');

                }).catch(error => {
                    let errorMessage = error.errorMessage || '未知错误'
                    all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
                   
                })
            }
        },

        /* 联系客服 */
        openOnlineCustomer () {
            all.tool.openOnlineCustomer(all.store.state.live800);
        }

    },

}



</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.bindBankInfo {
    width: 100%;
    height: 100%;
    .pb(100);
    main {
        .pt(60);

        .box_showInfo {
            .mb(30);
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


        .smsCode {
            text-align: center;
            width: 100%;
            text-align: center;
            .smsCode_in {
                text-align: left;
                display: inline-block;
                .width(708);
            }
            .box_input_in {
                .width(578);

            input {
                .width(296);
                .font-size(24);
                }

            span {
                text-align: center;
                .font-size(24);
                float: right;
                display: inline-block;
                color: #fff;
                font-weight: 700;
                background-color: #1489bf;
                height: 100%;
                .width(120);
                }
            }

            a {
                .line-height(78);
                color: #009fe7;
                .font-size(24);
            }
        }

    }

}

</style>