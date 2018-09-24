<!-- 修改密码 -->
<template>
    <div class="changePassword">

        <ul class="box_nav">
            <li v-for="(item,index) in nav" :key="item.index" :class="{active: index === num}" @click="tab(index)">{{item}}</li>
        </ul>

        <div v-show="num==0" class="box_p">
            <!-- <h5><span>修改易游密码</span></h5> -->
            <div class="box_input">
                <div class="box_input_in">
                    <label>旧密码</label>
                    <input data-type="myInput" type="password" v-model="euOldPassword" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'euOldPassword')" @focus="inputClick($event,'euOldPassword')">
                </div>
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>新密码</label>
                    <input data-type="myInput" type="password" v-model="euNewPassword" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'euNewPassword')" @focus="inputClick($event,'euNewPassword')">
                </div>
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>确认密码</label>
                    <input data-type="myInput" type="password" v-model="euConfirmPass" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'euConfirmPass',1)" @focus="inputClick($event,'euConfirmPass')">
                </div>
            </div>
            <BaseBtn style="margin-bottom: 1rem;" @callBackFn="submitEu"/>
        </div>

        <div v-show="num==1" class="box_p">
            <!-- <h5><span>修改PT密码</span></h5> -->
            <div class="box_input">
                <div class="box_input_in">
                    <label>新密码</label>
                    <input data-type="myInput" type="password" v-model="newPtPassword" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'newPtPassword')" @focus="inputClick($event,'newPtPassword')">
                </div>
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>确认密码</label>
                    <input data-type="myInput" type="password"  v-model="ptConfirmPass" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'ptConfirmPass',2)" @focus="inputClick($event,'ptConfirmPass')">
                </div>
            </div>
            <BaseBtn style="margin-bottom: 1rem;" @callBackFn="submitPt"/>
        </div>

        <div v-show="num==2" class="box_p">
            <!-- <h5><span>修改DT密码</span></h5> -->
            <div class="box_input">
                <div class="box_input_in">
                    <label>新密码</label>
                    <input data-type="myInput" type="password" v-model="newDtPassword" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'newDtPassword')" @focus="inputClick($event,'newDtPassword')">
                </div>
            </div>
            <div class="box_input">
                <div class="box_input_in">
                    <label>确认密码</label>
                    <input data-type="myInput" type="password"  v-model="dtConfirmPass" placeholder="密码为6-16位,小写字母和数字" @blur="inputBlur($event,'dtConfirmPass',3)" @focus="inputClick($event,'dtConfirmPass')">
                </div>
            </div>
            <BaseBtn @callBackFn="submitDt"/>
        </div>
    </div>
</template>

<script>
import BaseBtn from '../../components/BaseBtn';
    export default {
        data () {
            return {
                euOldPassword: '',
                euNewPassword: '',
                euConfirmPass: '',
                newPtPassword: '',
                ptConfirmPass: '',
                newDtPassword: '',
                dtConfirmPass: '',
                nav: ['易游密码', 'PT密码', 'DT密码'],
                num: 0
        };
    },
    components: {
        BaseBtn
    },
    mounted() {

        let type = this.$router.currentRoute.params.type
        if (type !== undefined) {
            type=="DT" ? this.tab(2) : this.tab(1)
        }
    },
    computed: {},

    methods: {
        inputBlur ($event, modelName, type) {
            if (/[^a-z\d]/g.test($event.target.value)) {
                $event.target.parentElement.style.border = '1px solid red';
                $event.target.style.color = 'red';
                $event.target.type = 'text';
                this[modelName] = '密码为6-16位,小写字母和数字'
            }
            if (type === 1) {
                if (this.euNewPassword !== this.euConfirmPass) {
                    $event.target.parentElement.style.border = '1px solid red';
                    $event.target.style.color = 'red';
                    $event.target.type = 'text';
                    this[modelName] = '两次密码不一致'
                }
            } else if (type === 2) {
                if (this.newPtPassword !== this.ptConfirmPass) {
                    $event.target.parentElement.style.border = '1px solid red';
                    $event.target.style.color = 'red';
                    $event.target.type = 'text';
                    this[modelName] = '两次密码不一致'
                }
            } else if (type === 3) {
                if (this.newDtPassword !== this.dtConfirmPass) {
                    $event.target.parentElement.style.border = '1px solid red';
                    $event.target.style.color = 'red';
                    $event.target.type = 'text';
                    this[modelName] = '两次密码不一致'
                }
            }
        },
        inputClick ($event, modelName) {
            $event.target.type = 'password';
            if (/[^a-z\d]/g.test($event.target.value)) {
               this[modelName] = '';
               $event.target.parentElement.style.border = '1px solid #079ae0';
               $event.target.style.color = '#fff';
            }
        },

        tab (index) {
            this.num = index;
        },
        /* 修改EU密码 */
        submitEu () {
            let This = this;
            let data = {};
            all.tool.clickCount({
                page: '账户',
                btn: '修改易游密码'
            });

            if (/[^a-z\d]/g.test(This.euOldPassword) || This.euOldPassword === '') {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (This.euNewPassword.length > 16 || This.euNewPassword.length < 6) {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (/[^a-z\d]/g.test(This.euNewPassword) || This.euNewPassword === '') {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (This.euNewPassword !== This.euConfirmPass) {
                all.tool.TipWinShow('两次密码不一致', [{name: '确定'}]);
                return;
            }
            data.oldPassword = This.euOldPassword;
            data.newPassword = This.euNewPassword;
            data.playerId = This.$store.state.playerId;
            all.tool.send('updatePassword', data, 'player').then(result => {
                all.tool.TipWinShow('易游密码修改成功', [{name: '确定'}]);
                this.euOldPassword = '';
                this.euNewPassword = '';
                this.euConfirmPass = '';
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误';
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 修改PT密码 */
        submitPt () {
            let This = this;
            let data = {};
            all.tool.clickCount({
                page: '账户',
                btn: '修改PT密码'
            });

            if (/[^a-z\d]/g.test(This.newPtPassword) || This.newPtPassword === '') {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (This.newPtPassword.length > 16 || This.newPtPassword.length < 6) {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (This.newPtPassword !== This.ptConfirmPass) {
                all.tool.TipWinShow('两次密码不一致', [{name: '确定'}]);
                return;
            }
            data.newPassword = This.ptConfirmPass;
            data.providerId = 18;
            all.tool.send('modifyGamePassword', data).then(result => {
                this.newPtPassword = '',
                this.ptConfirmPass = ''
                all.tool.TipWinShow('PT密码修改成功', [{name: '确定'}]);
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        },

        /* 修改DT密码 */
        submitDt () {
            let This = this;
            let data = {};
            all.tool.clickCount({
                page: '账户',
                btn: '修改DT密码'
            });

            if (/[^a-z\d]/g.test(This.newDtPassword) || This.newDtPassword === '') {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (This.newDtPassword.length > 16 || This.newDtPassword.length < 6) {
                all.tool.TipWinShow('密码为6-16位,小写字母和数字', [{name: '确定'}]);
                return;
            }
            if (This.newDtPassword !== This.dtConfirmPass) {
                all.tool.TipWinShow('两次密码不一致', [{name: '确定'}]);
                return;
            }
            data.newPassword = This.dtConfirmPass;
            data.providerId = 45;
            all.tool.send('modifyGamePassword', data).then(result => {
                this.newDtPassword = '',
                this.dtConfirmPass = ''
                all.tool.TipWinShow('DT密码修改成功', [{name: '确定'}]);
            }).catch( (error) => {
                let errorMessage = error.errorMessage || '未知错误'
                all.tool.TipWinShow(errorMessage, [{name: '确定'}]);
            })
        }
    }
}

</script>
<style lang='less' scoped>
@import (reference) '../../assets/css/variable.less';
.changePassword {
    width: 100%;
    height: 100%;
    .rem3(padding, 30, 20, 200);

    .active {
        background-color: #0c2e48;
        color: #fff;
    }

    .box_p {
        .pt(20);
    }

    h5 {
        text-align: center;
        .font-size(30);
        color: #00b7ee;
        .mb(20);

        span {
            .pl(18);
            display: inline-block;
            .width(708);
            text-align: left;
            position: relative;

            &::before {
                content: '';
                display: inline-block;
                .height(27);
                .width(6);
                background-color: #00b7ee;
                position: absolute;
                left: 0;
                .top(7);
            }
        }
    }

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
                .height(74);
                .pl(21);
                .width(520);
                .font-size(30);
                background-color: #060a13;
                color: #fff;
            }

        }
    }

}
</style>
