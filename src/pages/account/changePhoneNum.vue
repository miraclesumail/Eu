<!-- 修改手机号 -->
<template>
    <div class="changePhoneNum">
         <PageTop
            :title="PageTopTitle"
            :useDefaultCloseFn="false"
            @closeCallBackFn="goToAccount"
        />
        <div class="box_top">
            <img src="../../assets/image/pages/account/changeNum.png" alt="">
        </div>

        <!-- 验证旧手机 -->
        <div v-if="!showNewPhoneInput">
            <div class="box_input">
            <div class="box_input_in">
                <label>手机号码</label>
                <span class="phoneNumber" v-text="phoneNumber"></span>
                </div>
            </div>
            <div class="box_input smsCode">
                <div class="smsCode_in">
                    <div class="box_input_in">
                        <label for="smsCode">短信验证</label>
                        <input data-type="myInput" type="text" maxlength="4" placeholder="输入验证码" v-model="smsCode" autocomplete="off">
                        <span @click="getSmsCode" v-text="smsCodeText"></span>
                    </div>
                    <a href="javascript:;" @click.prevent="openOnlineCustomer">收不到?</a>
                </div>
            </div>
            <BaseBtn @callBackFn="oldPhoneFn" style="margin-top: 1rem;"/>
        </div>

        <!-- 验证新手机 -->
        <div v-if="showNewPhoneInput">
            <div class="box_input">
            <div class="box_input_in">
                <label>新手机号码</label>
                <input data-type="myInput" type="text" maxlength="11" v-model="newPhoneNumber" placeholder="请输入新手机号码" autocomplete="off">
                </div>
            </div>
            <div class="box_input smsCode">
                <div class="smsCode_in">
                    <div class="box_input_in">
                        <label for="smsCode">短信验证</label>
                        <input data-type="myInput" type="text" maxlength="4" placeholder="输入验证码" v-model="newSmsCode" autocomplete="off">
                        <span @click="getNewSmsCode" v-text="smsNewCodeText"></span>
                    </div>
                    <a href="javascript:;" @click.prevent="openOnlineCustomer">收不到?</a>
                </div>
            </div>
            <BaseBtn @callBackFn="callBack" style="margin-top: 1rem;"/>
        </div>
        
    </div>
</template>

<script>
import BaseBtn from '../../components/BaseBtn';
import PageTop from '../../components/PageTop';
export default {
        data () {
            return {
                PageTopTitle: '修改手机号码',
                smsCodeText: '获取',
                smsNewCodeText: '获取',
                smsCode: '',
                newSmsCode: '',
                newPhoneNumber: '',
                showNewPhoneInput: false
        };
    },

    components: {
        BaseBtn,
        PageTop
    },

    computed: {
        phoneNumber () {
            return this.$store.state.encryptionPhoneNumber
        }
    },

    methods: {

        goToAccount() {
            this.$router.push('/account');
        },

        getSmsCode () {
            let This = this;
            all.tool.send('sendSMSCodeToPlayer',{purpose: 'oldPhoneNumber'}).then(() => {
                all.tool.TipWinShow('验证码发送成功', [{name: '确定'}]);
                This.countdown(0);
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        getNewSmsCode () {
            let This = this;
            all.tool.send('getSMSCode', 
                {
                    phoneNumber : this.newPhoneNumber, 
                    purpose: 'newPhoneNumber', 
                    // name: this.$store.state.userName
                },
                'player'
            ).then(() => {
                all.tool.TipWinShow('验证码发送成功', [{name: '确定'}]);
                This.countdown(1);
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },
        
        countdown (num) {
            let textArr = ['smsCodeText', 'smsNewCodeText'];
            this[textArr[num]] = 60;
            let timer = setInterval( () => {
                if (this[textArr[num]] === 0) {
                    this[textArr[num]] = '获取';
                    clearInterval(timer);
                } else {
                    this[textArr[num]]--;
                }
            }, 1000);
        },

        oldPhoneFn () {
            // this.showNewPhoneInput = true;
            if (this.smsCode.length < 4) {
                all.tool.TipWinShow('请输入四位数验证码', [{name: '确定'}]);
                return;
            }

            all.tool.send('verifyPhoneNumberBySMSCode', {smsCode: this.smsCode}).then(() => {
                all.tool.TipWinShow('旧手机号码验证成功,请您验证并修改新的手机号码', [{name: '确定'}]);
                this.showNewPhoneInput = true;
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            });
        },

        callBack () {
            let data = {};
            let This = this
            let tempNum = [];

            all.tool.clickCount({
                page: This.PageTopTitle,
                btn: '修改手机号'
            });

            if (this.newPhoneNumber == '') {
                all.tool.TipWinShow('请输入新手机号', [{name: '确定'}]);
                return;
            }
            
            if (!/1[\d]{10}/.test(This.newPhoneNumber)) {
                all.tool.TipWinShow('新手机号码格式错误，请您重新输入', [{name: '确定'}]);
                return;
            }

            if (this.newSmsCode.length < 4) {
                all.tool.TipWinShow('请输入四位数验证码', [{name: '确定'}]);
                return;
            }


            if (This.newPhoneNumber) {
                tempNum = This.newPhoneNumber.split('');
                tempNum.map((v, i) => {
                    if (i >= 3 && i <= 6 ) {
                        tempNum[i] = '*'
                    }
                });
            }
            
            data.smsCode =  this.newSmsCode;
            data.playerId = this.$store.state.playerId;
            // data.newPhoneNumber = this.newPhoneNumber;
            // data.smsCode
           
            all.tool.send('updatePhoneNumberWithSMS', data, 'player').then(() => {
                all.tool.TipWinShow('修改成功', [{name: '确定'}]);
                This.$store.commit('encryptionPhoneNumber', tempNum.join(''));
                this.$router.push('/account/information');
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            });
            
        },

        openOnlineCustomer () {
            all.tool.openOnlineCustomer(all.store.state.live800);
        }
    },

    watch: {
        smsCode(newVal, oldVal) {
            if(/[^\d]/g.test(newVal)) {
                this.smsCode = oldVal;
            }
        },

        newSmsCode(newVal, oldVal) {
            console.log(newVal)
            console.log(oldVal)
            if(/[^\d]/g.test(newVal)) {
                this.newSmsCode = oldVal;
            }
        },

        newPhoneNumber(newVal, oldVal) {
            if(/[^\d]/g.test(newVal)) {
                this.newPhoneNumber = oldVal;
            }
        }
    }
}

</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.changePhoneNum {
    width: 100%;
    height: 100%;
    .box_top {
        .pt(90);
        .mb(72);
        img {
            .width(174);
            .height(174);
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
            label {
                color: #1489bf;
                .width(130);
            }
            .phoneNumber {
                .pl(21);
            }

            input{
                .height(74);
                .pl(21);
                .width(520);
                .font-size(24);
                background-color: #060a13;
                color: #fff;
            }
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
            .width(200);
            .font-size(24);
          }

        span {
            text-align: center;
            .font-size(24);
            float: right;
            // display: inline-block;
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
</style>