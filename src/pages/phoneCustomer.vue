<template>
  <div class="phoneCustomer">
    <PageTop
      :title="PageTopTitle"
    />
    <div class="main">
      <div class="box_input">
        <div class="box_input_in">
          <label for="phoneNumberS">电话号码</label>
          <input id="phoneNumberS" @keyup="limitPhone" type="text" placeholder="请输入您的联系方式" v-model="phone">
        </div>
      </div>
      <div class="box_input smsCode">
        <div class="box_input_in">
          <label for="smsCode">验 证 码</label>
          <input id="smsCode" @focus="getNewCode" @keyup="limitSms" type="text" v-model="code">
          <img class="codeImg" :src="src" @click="getNewCode">
        </div>
      </div>
      <input class="todoBtn" @click="toDo" type="button" value="确认" />
    </div>
  </div>
</template>

<script>
  import PageTop from '@/components/PageTop';
  import {routerGuard} from '@/assets/js/config/config';
  export default {
      data() {
        return {
          PageTopTitle:'请求回电',
          phone:null,
          code:null,
          randomNum:0.27982107939566814,
          src:"http://www.phoneapichat.com/servlet/GetMaCode?random="
        }
      },
      components: {
        PageTop
      },
      methods: {
        callBack(){
          if (this.flag) {
              this.$router.go(-2);
            } else {
              this.$router.go(-1);
            }
        },
        limitPhone(){
          this.phone=this.phone.match(/[0-9]*/i)[0]
        },
        limitSms(){
          this.code=this.code.match(/[0-9]*/i)[0]
        },
        getNewCode(){
          this.randomNum=Math.random();
          this.src='http://www.phoneapichat.com/servlet/GetMaCode?random='+this.randomNum
        },
        /*toDo(){
          if(all.tool.isCommitForm()){
            let head = window.location.origin.indexOf('https') !== -1 ? 'https' : 'http';
            all.$.ajax({
              url: head + "://www.phoneapichat.com/servlet/TelephoneApplication",
              dataType: "jsonp",
              type: "get",
              data: {
                phone: (all.store.state.phoneNumber && this.phone===all.store.state.phoneNumber.slice(0,3)+'****'+all.store.state.phoneNumber.slice(7,all.store.state.phoneNumber.length))?all.store.state.phoneNumber:this.phone,
                captcha: this.code,
                platform: "eu888",
                random: this.randomNum
              },
              success: function (e) {
                let message;
                message = e.code === "0" ? "正在呼叫，请等待..." : e.msg;
                all.tool.TipWinShow(message,[{name:'确定'}]);
              },
              error: function (e) {
                all.tool.TipWinShow('网络异常,请稍后重试',[{name:'确定'}]);
              }
            });
          }
        }*/
        toDo(){
          if(all.tool.isCommitForm()){
            let data={
              phoneNumber:(all.store.state.phoneNumber && this.phone===all.store.state.phoneNumber.slice(0,3)+'****'+all.store.state.phoneNumber.slice(7,all.store.state.phoneNumber.length))?all.store.state.phoneNumber:this.phone,
              captcha: this.code,
              lineId: "8888",
              randomNumber: this.randomNum
            };
            all.tool.send('callBackToUser',data).then(result=>{
              all.tool.TipWinShow("正在呼叫，请等待...",[{name:'确定'}]);
            }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
          }
        }
      },
    mounted(){
        this.src=this.src+this.randomNum;
    },
    created(){
      if(all.store.state.phoneNumber)this.phone=all.store.state.phoneNumber.slice(0,3)+'****'+all.store.state.phoneNumber.slice(7,all.store.state.phoneNumber.length)
    }
  };
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .phoneCustomer{
    height:100%;
    background:url("../assets/image/pages/login/loginBg.jpg") no-repeat left top;
    background-size:100% auto;

    .main {
      .pt(41);
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
          .pl(17);
          display: inline-block;
          .width(709);
          .height(78);
          background-color: #060a13;
          .font-size(32);
          .line-height(78);
          border: 1px solid #079ae0;
          label {
            display: inline-block;
            .height(74);
            .width(130);
            color: #1489bf;
          }

          input {
            .height(74);
            .width(520);
            .pl(21);
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
            .width(350);
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
      .todoBtn {
        .mt(72);
        display: inline-block;
        .width(500);
        .height(100);
        background: url("../assets/image/pages/login/loginBtnBg.png") no-repeat center center;
        background-size: 100% 100%;
        color: #fff;
        .font-size(40);
        font-weight: 700;
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
