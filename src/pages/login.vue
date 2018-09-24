<template>
  <div class="login">
    <PageTop
      :title="PageTopTitle"
      :useDefaultCloseFn="false"
      @closeCallBackFn="callBack"
    />
    <div class="main">
      <img class="head_portrait" src="../assets/image/pages/home/headImageLv0.png">
      <div class="box_input">
        <div class="box_input_in">
          <label for="usernameL">游戏账号</label>
          <input id="usernameL" type="text" @keyup="efirst" placeholder="e开头6-10位" v-model="name">
        </div>
      </div>
      <div class="box_input">
        <div class="box_input_in">
          <label for="password">游戏密码</label>
          <input id="password" type="password" @keyup="limitPassword"  placeholder="6-16位" v-model="password" maxlength="16">
        </div>
      </div>
      <div class="box_input smsCode" v-if="showCode">
        <div class="box_input_in">
          <label for="smsCode1">验 证 码</label>
          <input id="smsCode1" @keyup="limitSms" type="text" v-model="code" maxlength="4">
          <img class="codeImg" @click="getCode" :src="codeImg">
        </div>
      </div>
      <input class="loginBtn" type="button" value="立即登录" @click="toDo"/>
      <div class="bottom_box">
        <router-link to="register">
          <span>免费注册</span>
        </router-link>
        <span @click="forgetPassword">忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script>
  import PageTop from '@/components/PageTop';
  import {routerGuard} from '@/assets/js/config/config';
  export default {
      data() {
        return {
          PageTopTitle:'登入',
          flag: false,
          name:'',
          codeImg:null,
          code:'',
          password:'',
          showCode:false,
        }
      },
      components: {
        PageTop
      },

      mounted() {
        if (this.wrongTime > 2) {
          this.showCode = true;
          this.getCode();
        }
      },

      computed: {
        wrongTime() {
          return this.$store.state.loginErrorCount;
        }
      },
      methods: {
        callBack(){
          if (this.flag) {
              this.$router.push('/')
            } else {
              this.$router.go(-1);
            }
        },
        forgetPassword(){
          all.tool.openOnlineCustomer(all.store.state.live800,false)
        },
        getCode(){
          all.tool.send('captcha',null,'player').then(respData=>{
            let code = all.tool.arrayBufferToBase64(respData.data.data);
            this.codeImg='data:image/png;base64,'+code;
          }).catch(error=>{
            all.tool.TipWinShow(error.errorMessage,[{name:'确定'}]);
          });
        },
        autoAddE(){
          if(!this.name){
            this.name='e';
          }else if(this.name.slice(0,1)!=='e' && this.name.length<10){
            this.name='e'+this.name
          }else if(this.name.slice(0,1)!=='e' && this.name.length===10){
            this.name='e'+this.name.slice(0,9)
          }
        },
        efirst(e){
          this.name=this.name.toLowerCase();
          this.name=this.name.match(/[a-z0-9]*/i)[0]
        },
        limitPassword(){
          this.password=this.password.match(/[a-z0-9]*/i)[0]
        },
        limitSms(){
          this.code=this.code.match(/[0-9]*/i)[0]
        },
        toDo(){
          if(all.tool.isCommitForm()){
            let data={
              captcha:this.code,
              clientDomain:window.location.origin || document.domain,
              domain:window.location.origin || document.domain,
              name:this.name,
              password:this.password
            };
            all.tool.send('login',data,'player').then(resData=>{
              all.router.push(all.store.state.enterPath);
              all.tool.setLoginInfo(resData);
              all.tool.send('get',{playerId:resData.data.playerId},'player').then(result=>{
                all.tool.setPhoneNumber(result.data.fullPhoneNumber);
              }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
              }
            ).catch(error=>{
              let message=error.errorMessage;
              if(error.errorMessage==='玩家被禁止登录') message='账号不存在';
              this.$store.commit('setLoginErrorCount', this.wrongTime + 1);
              if(this.wrongTime > 2){
                  this.showCode = true;
                  this.getCode();
              }
              all.tool.TipWinShow(message,[{name:'确定'}]);
            })
          }
        }
      },
      beforeRouteEnter (to, from, next) {
        next( vm => {
          if (!vm.$store.state.isLogin) {
              routerGuard.map(item => {
              if (from.path === item.path) {
                vm.flag = true;
              }
            });
          }
        })
      }
  };
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .login{
    height:100%;
    background:url("../assets/image/pages/login/loginBg.jpg") no-repeat left top;
    background-size:100% auto;

    .main {
      .pt(285);
      text-align: center;

      .head_portrait {
        .width(102);
        .height(102);
        .mb(50);
      }

      .box_input {
        .mb(20);

        .box_input_in {
          text-align: left;
          display: inline-block;
          width:66.666667%;
          .height(78);
          background-color: #060a13;
          .font-size(32);
          .line-height(76);
          border: 1px solid #079ae0;
          label {
            display: inline-block;
            .height(74);
            .line-height(74);
            width:30%;
            color: #1489bf;
            text-align: center;
          }

          input {
            .height(74);
            .line-height(74);
            width:68%;
            .font-size(32);
            background-color: rgba(0,0,0,0);
            color: #fff;
          }
        }
      }
      .smsCode {
        .box_input_in {
          position: relative;
          input {
            .width(150);
              .font-size(32);
          }

          img {
            position: absolute;
            right: 0;
            top: 0;
            .width(166);
            .height(74);
          }
        }
      }
      .loginBtn {
        .mt(120);
        display: inline-block;
        width:66.666667%;
        .height(100);
        background: url("../assets/image/pages/login/loginBtnBg.png") no-repeat center center;
        background-size: 100% 100%;
        color: #fff;
        .font-size(40);
        font-weight: 700;
      }

      .bottom_box {
        .mb(50);
        span {
          display: inline-block;
          color: #1489bf;
          .font-size(30);
          text-decoration: underline;
          font-weight: 700;
          .mt(60);
          .rem2(padding, 0, 43);
        }
      }

    }
  }

  @media (orientation:landscape){
    .login {
      .main {
        .pt(50);
        .loginBtn {
          .mt(20);
        }
      }
    }
  }
</style>
