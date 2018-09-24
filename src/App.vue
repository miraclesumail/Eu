<template>
  <div id="app">
    <my-header v-if="this.$store.state.isHeaderShow"></my-header>
    <router-view class="pageBox"></router-view>
    <my-footer v-if="this.$store.state.isFooterShow"></my-footer>
    <tipWindow v-if="this.$store.state.tipwinShow" :Content="this.$store.state.tipContent" :Title="this.$store.state.tipTitle" :Button="this.$store.state.tipButton" :closeTime="this.$store.state.tipCloseTime" :callBack="this.$store.state.tipCloseCallback" :window="this.$store.state.tipwinType"></tipWindow>
    <Costomer v-if="this.$store.state.isShowCostomer"></Costomer>
    <Loading v-if="this.$store.state.isLoading"></Loading>
  </div>
</template>

<script>

  import Header from '@/components/header'
  import Footer from '@/components/footer'
  import TipWindow from '@/components/tipWindow'
  import Customer from '@/components/CustomerAll'
  import Loading from '@/components/Loading'
export default {
  name: 'App',
  components:{
    "my-header":Header,
    "my-footer":Footer,
    "tipWindow": TipWindow,
    "Costomer": Customer,
    "Loading":Loading,
  },
}

</script>

<style>
#app {
  font-family: 'myFont', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
  .pageBox{
    overflow-y:scroll;
  }
</style>
