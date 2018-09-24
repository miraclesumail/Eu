<template>
    <div class="loading">
        <div class="loadingBox">
            <vue-loading type="spiningDubbles" color="rgb(90, 193, 221)" :size="{ width: '50px', height: '50px' }"></vue-loading>
        </div>
    </div>
</template>

<script>
import vueLoading from 'vue-loading-template'
export default {
    components:{
        vueLoading
    }
}
</script>

<style lang='less' scoped>
@import (reference) "../assets/css/variable";
.loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    // height: 100%;
    .height(1210);
    // background-color: rgba(0, 0, 0, .3);
    // background-color: red;
    z-index:1000;
}
.loadingBox{
    position: absolute;
    .width(100);
    .height(100);
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
}
</style>
