<template>
  <div class="message">
    <PageTop
      :title="title"
      :useDefaultCloseFn="false"
      @closeCallBackFn="goToHome"
    >
    </PageTop>
    <main class="main">
      <p class="topbar">
        <span class="unread active" @click="changeBox">未读</span><span class="read" @click="changeBox">已读</span><span @click="delAll" class="del"><img src="../assets/image/pages/message/trash.png"/>清空</span>
      </p>
      <div v-if="unreadBox" class="unreadBox">
        <p v-if="unreadList.length===0" class="noMessage"><img src="../assets/image/pages/message/noMessage.png"/></p>
        <ul>
          <li v-for="item in unreadList" @click="readMail(item._id)"><span class="title" v-text="item.title"></span><span class="time" v-text="changeTime(item.createTime)"></span></li>
        </ul>
      </div>
      <div v-if="readBox" class="readBox">
        <p v-if="readList.length===0" class="noMessage"><img src="../assets/image/pages/message/noMessage.png"/></p>
        <ul>
          <li v-for="item in readList" @click="readMail(item._id)"><span class="title" v-text="item.title"></span><span class="time" v-text="changeTime(item.createTime)"></span></li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
  import PageTop from '../components/PageTop';
  export default {
    data() {
      return {
        title: '通知消息',
        unreadList:[],
        readList:[],
        unreadBox:true,
        readBox:false,
      }
    },
    components: {
      PageTop,
    },
    methods: {
      goToHome () {
        this.$router.push('/');
      },
      getMailList(){
        all.tool.send('getMailList',{playerId:all.tool.getStore('playerId')}).then(result=>{
          this.readList=[];
          this.unreadList=[];
          result.data.map(item=>{
            if(item.hasBeenRead){this.readList.push(item)}else {this.unreadList.push(item)}
          })
        }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      },
      changeBox(e){
        all.$(e.target).addClass('active').siblings().removeClass('active');
        this.getMailList();
        if(all.$(e.target)[0].classList[0]==='unread'){
          this.unreadBox=true;this.readBox=false;
          all.tool.clickCount({page:'信息',btn:'未读'})
        }else {
          this.unreadBox=false;this.readBox=true;
          all.tool.clickCount({page:'信息',btn:'已读'})
        }
      },
      changeTime(time){
        return all.tool.formatTime(time)
      },
      readMail(id){
        all.tool.send('readMail',{mailObjId:id}).then(result=>{console.log(result.data);
            all.tool.setMessageCount(all.store.state.unReadMessageCount-1);
            all.tool.TipWinShow(null,{type:'withCloseTip',data:result.data},[{name:'删除',callback:()=>{
            all.tool.send('deleteMail',{mailObjId:id}).then(result=>all.tool.TipWinShow('删除成功！',[{name:'确定',callback:()=>this.getMailList()}])).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
          },align:'right'},{name:'确定',callback:()=>this.getMailList()}],"消息详情",this.getMailList)
        }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
      },
      delAll(){
        all.tool.clickCount({page:'信息',btn:'清空'});
        if(this.unreadList.length>0 || this.readList.length>0){
          all.tool.TipWinShow('确定要删除全部站内信？',[{name:'取消'},{name:'确定',callback:()=>{
            all.tool.send('deleteAllMail').then(()=>{
                all.tool.setMessageCount(0);
                all.tool.TipWinShow('信息已删除',[{name:'确定',callback:()=>this.getMailList()}])
            })
          }}])
        }else {
          all.tool.TipWinShow('您还没有消息！',[{name:'确定'}])
        }
      }
    },
    created(){
      this.getMailList()
    }
}
</script>

<style scoped lang="less">
  @import (reference) '../assets/css/variable.less';
  .message {
    height: 100%;
  }
  .main{
    height:92.503748%;
    overflow-y:scroll;
    background:#0c2b42 !important;
  }
  .topbar{
    .height(120);
    background:#0b1d2b;
    .pt(40);
    display:flex;
  }
  .topbar span{
    flex: 1;
    .font-size(30);
    font-weight:bold;
    .height(80);
    display:inline-flex;
    align-items: center;
    justify-content: center;
    border-bottom:2px solid #083250;
  }
  .topbar .unread{
    background:#083250;
    .border-lt(20)
  }
  .topbar .read{
    background:#083250;
    .border-rt(20)
  }
  .topbar span.active{
    background:linear-gradient(rgb(8, 50, 80), rgb(8, 73, 107), rgb(7, 112, 152));
    border:2px solid #069ecd;
    color:#1d90d1;
    font-weight:bold;
  }
  .topbar img{
    .height(36);
    width:auto;
    .mr(10);
  }
  .noMessage img{
    .width(269);
    height:auto;
    .mt(100)
  }
  .unreadBox ul,.readBox ul{
    padding:2.666667%
  }
  .unreadBox li{
    background:url("../assets/image/pages/message/unreadBg.png") no-repeat;
    background-size:100% 100%;
    .height(100);
    .mb(20);
    .font-size(30);
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-left:12%;
    padding-right:8%
  }
  .readBox li{
    background:url("../assets/image/pages/message/readBg.png") no-repeat;
    background-size:100% 100%;
    .height(100);
    .mb(20);
    .font-size(30);
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding-left:12%;
    padding-right:8%;
    color:#138fc2
  }
</style>
