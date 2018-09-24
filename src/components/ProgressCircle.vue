<template>  
  <div class="progress-circle">  
    <svg :width="radius" :height="radius" viewBox="0 0 100 100">  
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>  
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"  
              :stroke-dashoffset="dashOffset"/>  
    </svg>  
    <slot></slot>  
  </div>  
</template>  
  
<script type="text/ecmascript-6">  
  export default {  
    props: {  
      radius: {  
        type: String,  
        default: '0.32rem'  
      },  
      percent: {  
        type: Number,  
        default: 0  
      }  
    },  
    data() {  
      return {  
        dashArray: Math.PI * 100  
      }  
    },  
    computed: {  
      dashOffset() {  
        return (1 - this.percent) * this.dashArray  
      }  
    }  
  }  
</script>  
  
<style scoped lang="less">  
  .progress-circle{
     position: relative;
    circle {
      stroke-width: 0.09rem;  
      transform-origin: center;  
      &.progress-background {
        transform: scale(0.9);  
        // stroke: rgba(255, 205, 49, 0.5); 
        stroke: #0d3b5e;  
      }
       
      &.progress-bar {
        transform: scale(0.9) rotate(-90deg);
        // stroke: #ffcd32;
        stroke: #f6b100;
      }
    }    
  }
   
</style>  