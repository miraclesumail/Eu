<template>
  <div class="addtodesk">
    <PageTop
      :title="PageTopTitle"
    />
    <div class="main">
      <p class="btn">
        <img v-if="defaultIos" @click="showIosTeach" src="../assets/image/pages/addtodesk/iosBtn.png"/>
        <img v-if="!defaultIos" @click="showIosTeach" src="../assets/image/pages/addtodesk/iosBtnC.png"/>
        <img v-if="defaultIos" @click="showAndroidTeach" src="../assets/image/pages/addtodesk/androidbtn.png"/>
        <img v-if="!defaultIos" @click="showAndroidTeach" src="../assets/image/pages/addtodesk/androidbtnC.png"/>
      </p>
      <span @click="toleft" class="left">
          <img v-if="ShowNum!==0" src="../assets/image/pages/addtodesk/btnleft.png"/>
          <img v-if="ShowNum===0" src="../assets/image/components/tipWindow/btnleftF.png"/>
      </span>
      <span @click="toright" class="right">
          <img v-if="ShowNum<imgList.length-1" src="../assets/image/pages/addtodesk/btnright.png"/>
          <img v-if="ShowNum===imgList.length-1" src="../assets/image/components/tipWindow/btnrightF.png"/>
      </span>
      <p class="content">
        <span class="teach">
            <transition :name="locat?'bounce':'leftbounce'">
              <img v-show="animate" :src="imgList[ShowNum]"/>
            </transition>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  import PageTop from '@/components/PageTop';
  import {routerGuard} from '@/assets/js/config/config';
  export default {
      data() {
        return {
          PageTopTitle:'加入桌面',
          iosImg:[
            require("../assets/image/pages/addtodesk/ios1.jpg"),
            require("../assets/image/pages/addtodesk/ios2.jpg"),
            require("../assets/image/pages/addtodesk/ios3.jpg")
          ],
          androidImg:[
            require("../assets/image/pages/addtodesk/android1.jpg"),
            require("../assets/image/pages/addtodesk/android2.jpg"),
            require("../assets/image/pages/addtodesk/android3.jpg")
          ],
          imgList:[],
          ShowNum:0,
          animate:true,
          locat:false,
          defaultIos:true,
          defaultAndroid:false,
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
        showIosTeach(){
          this.defaultIos=true;
          this.defaultAndroid=false;
          this.imgList=this.iosImg;
          this.ShowNum=0;
          this.animate=false;
          setTimeout(()=>{
            this.animate=true;
          },10)
        },
        showAndroidTeach(){
          this.defaultIos=false;
          this.defaultAndroid=true;
          this.imgList=this.androidImg;
          this.ShowNum=0;
          this.animate=false;
          setTimeout(()=>{
            this.animate=true;
          },10)
        },
        toleft(){
          this.locat=false;
          if(this.ShowNum>0){
            this.ShowNum=this.ShowNum-1;
            this.animate=false;
            setTimeout(()=>{
              this.animate=true;
            },10)
          }
        },
        toright(){
          this.locat=true;
          if(this.ShowNum<2){
            this.ShowNum=this.ShowNum+1;
            this.animate=false;
            setTimeout(()=>{
              this.animate=true;
            },10)
          }
        }
      },
    mounted(){
        this.imgList=this.iosImg
    }
  };
</script>

<style scoped lang='less'>
 @import (reference) "../assets/css/variable";
 .addtodesk{
    height:100%;
  }
 .main {
   height:92.503748%;
   overflow-y:scroll;
   background:#0c2b42;
   .pt(42);
 }
  .btn img{
    width:33.066667%;
    height:auto
  }
  .content{
    padding:0 2.666667%;
    display:flex;
    justify-content: center;
    align-items: baseline;
    .mt(60);
    height:fit-content;
    .mb(100)
  }
  .left,.right{
    width:13.333333%;
    height:auto;
    position:absolute;
    top:50%;
  }
 .left{
   left:2.666667%
 }
 .right{
   right:2.666667%
 }
  .teach{
    width:70%;
    overflow:hidden;
  }
 .left img,.right img{
   width:100%;
   height:auto
 }
  .teach img{
    width:100%;
    height:auto
  }
 .bounce-enter-active {
   animation: bounce-in .3s;
 }
 .bounce-leave-active {
   animation: bounce-in .3s reverse;
 }
 @keyframes bounce-in {
   0% {
     transform: translateX(100%);
     opacity:0;
   }
   100% {
     transform: translateX(0);
     opacity:1;
   }
 }
 .leftbounce-enter-active {
   animation: leftbounce-in .3s;
 }
 .leftbounce-leave-active {
   animation: leftbounce-in .3s reverse;
 }
 @keyframes leftbounce-in {
   0% {
     transform: translateX(-100%);
     opacity:0;
   }
   100% {
     transform: translateX(0);
     opacity:1;
   }
 }
</style>
