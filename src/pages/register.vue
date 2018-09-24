<template>
  <div class="register">
    <PageTop
      :title="PageTopTitle"
      :useDefaultCloseFn="false"
      @closeCallBackFn="goToHome"
    />
    <div class="main">
      <div class="box_input">
        <div class="box_input_in">
          <label for="username">申请账号</label>
          <input id="username" v-model="name" @blur="isAvailable" @focus="autoAddE" @keyup="efirst" type="text" placeholder="e开头6-10位小写字母和数字" maxlength="10">
        </div>
      </div>
      <div class="box_input">
        <div class="box_input_in">
          <label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
          <input id="password" @keyup="limitPassword" v-model="password" type="password"  placeholder="6-16位小写字母和数字组合" maxlength="16">
        </div>
      </div>
      <div class="box_input">
        <div class="box_input_in">
          <label for="repassword" >确认密码</label>
          <input id="repassword" @keyup="limitrePassword" v-model="repassword" @blur="isSamePassword" type="password" placeholder="重复输入您的密码" maxlength="16">
        </div>
      </div>
      <div class="box_input">
        <div class="box_input_in">
          <label for="phoneNumber" >手机号码</label>
          <input id="phoneNumber" type="text" @keyup="limitPhone" v-model="phoneNumber" placeholder="请输入您的手机号码" maxlength="11">
        </div>
      </div>
      <div class="box_input smsCode">
        <div class="smsCode_in">
          <div class="box_input_in">
              <label for="smsCode1">短信验证</label>
              <input id="smsCode1" type="text" @keyup="limitSms" v-model="smsCodeVal"  placeholder="输入验证码" maxlength="4">
              <span @click="getSMSCode" v-html="getBtn"></span>
          </div>
          <a href="javascript:;" @click="cantGetCode">收不到?</a>
        </div>
      </div>
       <input class="registerBtn" type="button" value="确认开户" @click="toDo">
    </div>
  </div>
</template>

<script>
  import PageTop from '@/components/PageTop';
  export default {
      data() {
        return {
          PageTopTitle:'注册',
          name:null,
          password:null,
          repassword:null,
          smsCodeVal:null,
          isOkUsername:false,
          phoneNumber:null,
          getBtn:'获取',
          isCanGetCode:true
        }
      },
      components: {
        PageTop
      },
      methods: {
        goToHome() {
          this.$router.push('/');
        },
        cantGetCode(){
          all.tool.openOnlineCustomer(all.store.state.live800,false)
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
        limitPassword(){
          this.password=this.password.match(/[a-z0-9]*/i)[0]
        },
        limitrePassword(){
          this.repassword=this.repassword.match(/[a-z0-9]*/i)[0]
        },
        limitPhone(){
          this.phoneNumber=this.phoneNumber.match(/[0-9]*/i)[0]
        },
        limitSms(){
          this.smsCodeVal=this.smsCodeVal.match(/[0-9]*/i)[0]
        },
        efirst(){
          if(this.name.slice(0,1)!=='e'){
            this.name='e'
          }
          this.name=this.name.toLowerCase();
          this.name=this.name.match(/[a-z0-9]*/i)[0]
        },
        isAvailable(){
          if(all.tool.checkFormItem('username')){
            all.tool.send('isValidUsername',{name:this.name},'player').then(()=>this.isOkUsername=true).catch(err=>{
              all.tool.TipWinShow(err.errorMessage,[{name:'确定',callback:()=>{this.name=null;this.isOkUsername=false}}])
            })
          }
        },
        isSamePassword(){
          if(this.password && this.repassword && this.repassword!==this.password){
            all.$('#repassword').attr('type','text').css('color','red');
            all.$('#repassword').parent().css('borderColor','red');
            this.repassword='请输入相同的密码';
            all.$('#repassword').val(this.repassword);
            return false
          }
          if(this.password && this.repassword===this.password){
            return true
          }
        },
        getSMSCode(){
          if(!this.isOkUsername){
            all.tool.TipWinShow('请输入正确可用的用户账号',[{name:'确定'}]);
            return
          }
          if(!all.tool.checkFormItem('phoneNumber')){
            all.tool.TipWinShow('请输入正确的11位手机号码',[{name:'确定'}]);
            return
          }
          if(this.isOkUsername && all.tool.checkFormItem('phoneNumber') && this.isCanGetCode){
            all.tool.send('getSMSCode',{name:this.name,phoneNumber:this.phoneNumber,purpose:'registration'},'player').then(()=>{
              let time=60;
              this.isCanGetCode=false;
              let runTime=setInterval(()=>{
                this.getBtn='<b style="color:red">'+time+'</b>秒';
                time--;
                if(time===0){
                  clearInterval(runTime);
                  runTime=null;
                  this.getBtn='获取';
                  this.isCanGetCode=true
                }
              },1000)
            }).catch(error=>{
              let message=error.errorMessage;
              if(error.errorMessage==='该号码已经被使用，请使用其他手机号。'){
                message='该号码已注册账号，不支持重复开户。';
                all.tool.TipWinShow(message,[{name:'取消'},{name:'忘记信息',callback:()=>{
                  all.tool.openOnlineCustomer(all.store.state.live800,false);
                }}])
              }else {
                all.tool.TipWinShow(message,[{name:'确定'}])
              }
            });
          }
        },

        // 添加代理id参数
        toDo(){
          if(all.tool.isCommitForm()){
            all.tool.clickCount({page:'注册页面',btn:'确认开户'});
            let data={
              name:this.name,
              password:this.password,
              confirmPassword:this.repassword,
              phoneNumber:this.phoneNumber,
              smsCode:this.smsCodeVal,
              domain:window.location.origin || document.domain,
              sourceUrl:document.referrer || window.location.origin
            };

            let partnerId = all.tool.getStore('partnerId'); 
            if (partnerId) {
              data.partnerId = partnerId;
            }

            all.tool.send('create',data,'player').then(()=>{
                let data={
                  captcha:'',
                  clientDomain:window.location.origin || document.domain,
                  domain:window.location.origin || document.domain,
                  name:this.name,
                  password:this.password
                };
                all.tool.send('login',data,'player').then(resData=>{
                  all.tool.setLoginInfo(resData);
                  all.tool.send('get',{playerId:resData.data.playerId},'player').then(result=>{
                    all.tool.setPhoneNumber(result.data.fullPhoneNumber);
                    all.router.push({name:'home',params:{send:true}});
                  }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
                  /*all.tool.send('applyRewardEvent',{code:'REGISTERBONUS'}).then(result=>{
                    all.router.push({name:'home',params:{send:result.data.rewardAmount}});
                  }).catch(error=>{
                    let message=error.errorMessage;
                    if(error.errorMessage==='此电话已经达到了该优惠周期内的申请上限')message='一个电话仅限领取一次';
                    all.tool.TipWinShow(message,[{name:'确定',callback:()=>{all.router.push('/home')}}]);
                    /!*all.tool.send('applyRewardEvent',{code:'1dollarbonus'}).then(result=>{
                      all.router.push({name:'home',params:{send:result.data.rewardAmount}});
                    }).catch(error=>all.tool.TipWinShow(error.errorMessage,[{name:'确定'}]));*!/
                  });*/
                }).catch(error=>all.tool.TipWinShow(error.errorMessage,[{name:'确定'}]));
            }).catch(error=>all.tool.TipWinShow(error.errorMessage,[{name:'确定'}]));
          }
        }
      },
  };
</script>

<style scoped lang='less'>
  @import (reference) "../assets/css/variable";
  .register {
    height: 100%;
    background:url("../assets/image/pages/register/registerBg.jpg") no-repeat left bottom;
    background-size: 100% auto;
    .main {
      .pt(40);
      .box_input {
      .mb(20);
       padding:0 2.666667%;
        .box_input_in {
          text-align: left;
          display: inline-block;
          width:100%;
          .height(78);
          background-color: #060a13;
          .font-size(32);
          .line-height(76);
          border: 1px solid #079ae0;
          label {
            display: inline-block;
            color: #1489bf;
            width:20%;
            text-align:center;
            .height(74);
            .line-height(74);
          }

          input {
            .height(74);
            .line-height(74);
            width:78%;
            .font-size(32);
            background-color: rgba(0,0,0,0);
            color: #fff;
          }
        }
      }

      .smsCode {
        text-align: center;
        width: 100%;
        .smsCode_in {
          text-align: left;
          display: inline-block;
          width:100%;
        }
        .box_input_in {
          width:80%;

          input {
            .width(296);
            .font-size(32);
          }
          label{
            width:25.01%
          }
          span {
            text-align: center;
            .font-size(24);
            float: right;
            display: inline-block;
            color: #fff;
            font-weight: 700;
            background-color: #1489bf;
            .height(74);
            .width(110);
          }
        }

        a {
          .line-height(78);
          color: #009fe7;
          .font-size(30);
            display:block;
            position:absolute;
            font-weight:bold;
            left:64%;
        }
      }

      .registerBtn {
        .mt(120);
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

</style>
