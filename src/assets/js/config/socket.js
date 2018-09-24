function Socket(platformId,url,store){
  this.url=url;
  this.connect=null;
  this.tryCount=0;
  this.store=store;
  this.platformId=platformId;
  this.count=1;
  this.timeout=15000;
  this.callback={};
  this.valid=false;
  this.err=false;
  this.sendCount=0;
  this.callbackCount=0;
  this.keepConnectTime=50000;
  this.tryReconnect=true;
  this.init();
}
Socket.prototype = {
  init: function () {
    console.log('开始服务器连接...',new Date());
    this.ws && this.ws.close();
    this.ws = new WebSocket(this.url);
    this.tryCount++;
    this.ws.onopen = this.onOpenCallback.bind(this);
    this.ws.onerror = this.onErrorCallback.bind(this);
    this.ws.onclose = this.onCloseCallback.bind(this);
    this.ws.onmessage = this.onMessageCallback.bind(this);
    return this;
  },
  onOpenCallback:function () {
    console.log('服务器连接成功...',new Date());
    this.store.commit('setLoginErrorCount', 0);
    all.tool.setLoginStatus(false);
    all.tool.send('getPlatformAnnouncements').then(respData=>{ //websocket连接成功后获取平台公告并保存公告内容
      all.tool.setNotice(respData.data);
    }).catch(err=>{console.log(err)});
    
    all.tool.send('addIpDomainLog', {domain: window.origin});

    all.tool.send('getConfig',{device:3}).then(respData=>{ //websocket连接成功后获取平台设置并保存设置详情
      // let online=respData.data.live800[0].content.slice(3,respData.data.live800[0].content.length-3).split('"],["');
      let online=[respData.data.live800[0].content,respData.data.live800[1].content];
      // let qq=respData.data.qqList[0].content.slice(3,respData.data.qqList[0].content.length-3).split('"],["');
      let qq=[respData.data.qqList[0].content,respData.data.qqList[1].content];
      all.tool.setCustomer(online,qq);
      let activityListLength = 0;
      respData.data.activityList.map(item => {
        if (item.code.indexOf('slider') !== -1)
          activityListLength++;
      });
      this.store.commit('setMinDeposit', respData.data.minDepositAmount);
      all.tool.setNewsNum(activityListLength);
      all.tool.setStore('news', activityListLength);
    }).catch(err=>{console.log(err)});
    let self=this;
    all.tool.send('authenticate',{playerId:all.tool.getStore('playerId'),token:all.tool.getStore('token')},'player').then(respData=>{
      all.tool.setLoginStatus(true);
      all.tool.send('get',{playerId:all.tool.getStore('playerId')},'player').then(respData=>all.tool.setLoginInfo(respData)).catch(err=>{console.log(err)});
    }).catch(err=>{console.log(err);
        all.tool.setLogoutInfo();
        if(err.status===400 && all.tool.isRouterGuard(all.router.currentRoute.path)){
            all.router.push('/')
        }
    });
    if(!this.connect){
      this.connect=setInterval(()=>{
        all.tool.send('authenticate',{playerId:all.tool.getStore('playerId'),token:all.tool.getStore('token'),hideLoading:true},'player').catch(err=>{console.log(err);
          all.tool.setLogoutInfo();
          if(err.status===400 && all.tool.isRouterGuard(all.router.currentRoute.path)){
            all.router.push('/')
          }
        })
      },this.keepConnectTime)
    }
  },
  onMessageCallback:function(res){
    let respData=JSON.parse(res.data);
    if(window.location.host.slice(0,3)!=='www')console.log('服务器传来数据...',respData,new Date());
    let name=respData.requestId || null;
    if(respData.functionName==='notifyNewMail'){
        all.tool.setMessageCount(all.store.state.unReadMessageCount+1);
        return
    }
    if(!this.callback[name]['hideLoading']){
      console.log(this.callback)
      if(name){
        this.callbackCount++;
        this.callbackCount===this.sendCount &&  all.tool.setLoading(false);
      }
    }
    let callback=this.callback[name];
    if(respData['data']['status']===420){
      all.tool.send('authenticate',{playerId:all.tool.getStore('playerId'),token:all.tool.getStore('token'),hideLoading:true},'player').catch(err=>{console.log(err);
        all.tool.setLogoutInfo();
        if(err.errorMessage==='令牌未经过身份验证'){
          all.tool.TipWinShow('请先登陆！',[{name:'取消'},{name:'确定',callback:()=>{
            all.router.push('/login')
          }}])
        }else {
          all.tool.TipWinShow(err.errorMessage,[{name:'确定',callback:()=>{
            all.router.push('/login')
          }}])
        }
      });
    }else if(respData['data']['status']===200){console.log('信息交互成功,返回数据...');
      callback.promise.resolve(respData['data'])
    }else {console.log('信息交互失败,返回数据...');
      callback.promise.reject(respData['data']);
    }
    delete this.callback[name];
    if (all.tool.isObjectEmpty(this.callback)) {
      all.tool.setLoading(false);
    }
  },
  onErrorCallback:function(event) {
    console.log(new Date()+':服务器连接发生错误', event);

  },
  onCloseCallback:function() {
    console.log(new Date()+':服务器连接关闭');
    this.sendCount=0;
    this.callbackCount=0;
    setTimeout(()=>{
      if(this.tryReconnect){
        this.init();
        this.tryReconnect=false;
      }
    },this.timeout)
  },
  beforeSend:function(sendData){
    if(sendData.functionName==='authenticate'){
      this.ws.send(JSON.stringify(sendData));
    }else if(all.tool.isRouterGuard(all.router.currentRoute.path) && !all.store.state.isLogin){
      sendData.delaySend=setInterval(()=>{
        if(all.store.state.isLogin){
          clearInterval(sendData.delaySend);
          sendData.delaySend=null;
          delete sendData.delaySend;
          this.ws.send(JSON.stringify(sendData));
        }
      },100)
    }else {
      this.ws.send(JSON.stringify(sendData));
    }
  },
  send:function(sendData){
    let promise=new Promise((resolve,reject)=>{
      this.resolve=resolve;
      this.reject=reject;
    });
    promise.resolve=this.resolve;
    promise.reject=this.reject;
    let index='RQ'+this.count;
    if(!sendData.data) sendData.data={};
    sendData.data.requestId=index;
    sendData.data.platformId=this.platformId;
    this.callback[index]={};
    this.callback[index]['promise']=promise;
    this.callback[index]['data']=sendData;
    if(window.location.host.slice(0,3)!=='www')console.log("发送请求数据...",sendData,new Date());
    if(sendData.data.hideLoading){
      this.callback[index]['hideLoading']=true;
      delete sendData.data.hideLoading;
    }
    if(this.ws.readyState===2 || this.ws.readyState===3){
          this.init();
    }
    if(this.ws.readyState===0){
      let delay=setInterval(()=>{
        if(this.ws.readyState===1){
          this.beforeSend(sendData);
          clearInterval(delay);
          delay=null
        }
      },100)
    }else{
      this.beforeSend(sendData)
    }
    this.count++;
    if(!this.callback[index]['hideLoading']){
      this.sendCount++;
      all.tool.setLoading(true);
    }
    return promise
  }
};
export default  Socket
