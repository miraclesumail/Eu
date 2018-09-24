<template xmlns:v-touch="http://www.w3.org/1999/xhtml">
  <div class="banner">
    <transition :name="animate" v-for="(item,index) in banner">
      <img v-touch:left="leftgo" v-if="index===showIndex" v-touch:right="rightgo" :src="item.url" height="100%" width="100%" :style="{position:'absolute',top:0,left:0}"/>
    </transition>
    <p class="btn"><span v-for="(item,index) in banner" :class="{active:index===showIndex}"></span></p>
  </div>
</template>

<script>
  import banner_1 from '../assets/image/components/banner/banner_1.jpg'
  import banner_2 from '../assets/image/components/banner/banner_2.jpg'
  import banner_3 from '../assets/image/components/banner/banner_3.jpg'
export default {
  props:['Title'],
  data(){
    return {
      showIndex:0,
      animate:'left',
      autoRun:null,
      autoRunTime:8000,
      banner:[
        {url:banner_1},
        {url:banner_2},
        {url:banner_3},
      ]
    }
  },
  methods:{
    leftgo(){
      this.animate='left';
      this.showIndex+1===this.banner.length?this.showIndex=0:this.showIndex++;
      clearInterval(this.autoRun);
      this.autoRun=setInterval(()=>{
        this.animate='left';
        this.showIndex+1===this.banner.length?this.showIndex=0:this.showIndex++;
      },this.autoRunTime);
    },
    rightgo(){
      this.animate='right';
      this.showIndex===0?this.showIndex=this.banner.length-1:this.showIndex--;
      clearInterval(this.autoRun);
      this.autoRun=setInterval(()=>{
        this.animate='left';
        this.showIndex+1===this.banner.length?this.showIndex=0:this.showIndex++;
      },this.autoRunTime);
    },
  },
  created(){
    this.autoRun=setInterval(()=>{
      this.animate='left';
      this.showIndex+1===this.banner.length?this.showIndex=0:this.showIndex++;
    },this.autoRunTime)
  },
  beforeDestroy(){
    clearInterval(this.autoRun);
    this.autoRun=null
  }
}
</script>

<style scoped>
.banner{
  width:100%;
  height:34.111311%;
  position:relative;

}
.btn{
  position:absolute;
  width:100%;
  height:2.325581%;
  bottom:10%
}
span{
  display:inline-block;
  height:15px;
  width:15px;
  background: #000000;
  border-radius:50%;
  margin-right:2.082334%;
  }
span.active{
  background:#ffffff;
}
.left-enter-active {
  animation: left-in 0.7s;
}
.left-leave-active {
  animation: left-out 1s;
}
.right-enter-active {
  animation: right-in 0.7s;
}
.right-leave-active {
  animation: right-out 1s;
}
@keyframes left-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes left-in {
  0% {
    transform: translateX(100%);
    opacity:0;
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: translateX(0%) scale(1);
    opacity: 1;
  }
}
@keyframes right-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes right-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: translateX(0%) scale(1);
    opacity: 1;
  }
}
</style>
