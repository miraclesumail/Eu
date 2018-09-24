export const Tool = {//工具汇总

  //TODO 本地存储类工具*************************************************************************//

  setStore: (key, val) => sessionStorage.setItem(key, JSON.stringify(val)),//保存本地信息
  getStore: key => JSON.parse(sessionStorage.getItem(key)),//获取本地信息
  clearStore: key => sessionStorage.removeItem(key),  // 清除session
  setCookie: (key, val) => document.cookie = key + '=' + val,//保存本地cookie信息
  getCookie: key => { //获取本地cookie信息
    let val = false;
    document.cookie.split("; ").map(item => {
      if (item.split("=")[0] === key)
        val = item.split("=")[1]
    });
    return val
  },
  delCookie: key => {//删除本地cookie信息
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    if (all.tool.getCookie(key) !== null) {
      all.tool.setCookie(key, all.tool.getCookie(key) + ";expires=" + exp.toGMTString())
    }
  },
  setLocal: (key, val) => localStorage.setItem(key, JSON.stringify(val)), // 设置localStorage
  getLocal: key => JSON.parse(localStorage.getItem(key)),  // 获取localStorage
  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO 屏幕控制类工具*************************************************************************//
  fullScreen: element => {//屏幕全屏工具
    element.requestFullScreen && element.requestFullScreen();
    element.webkitRequestFullScreen && element.webkitRequestFullScreen();
    element.mozRequestFullScreen && element.mozRequestFullScreen();
  },
  exitfullScreen: () => {//退出全屏工具
    document.exitFullscreen && document.exitFullscreen();
    document.msExitFullscreen && document.msExitFullscreen();
    document.mozCancelFullScreen && document.mozCancelFullScreen();
    document.webkitExitFullscreen && document.webkitExitFullscreen()
  },
  isfullScreen: () => document.fullscreenEnabled || document.mozFullscreenElement || document.webkitFullscreenElement,//判断是否全屏工具
  rotationScreenIos: () => {//IOS设备屏幕旋转事件工具
    if (window.location.pathname !== '/') {
      if (window.orientation === -90 || window.orientation === 90) {
        all.router.push(all.store.state.currentPath);
        all.$('body').height(window.screen.width + 1 + "px")
      } else {
        all.router.push('/screenRotateTip')
      }
    }
  },
  rotationScreenAndroid: () => {//Android设备屏幕旋转事件工具
    if (window.location.pathname !== '/') {
      if (window.screen.orientation.angle === 90 || window.screen.orientation.angle === 270) {
        all.router.push(all.store.state.currentPath);
        all.$('body').height(window.screen.height + "px")
      } else {
        all.router.push('/screenRotateTip')
      }
    }
  },

  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO 客户端设备信息类工具********************************************************************//

  clientDevice: () => {//获取设备信息工具
    let u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) === "qq",//是否QQ
      appVersion: app
    }
  },
  clientIos: () => { //判断是否苹果设备工具
    if (window.navigator.platform.slice(0, 2) === 'iP')
      return true;
    return false;
  },
  isApp:()=> {//判断是否App打开
    let isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
    let isAndroidApp=window.native?true:false;
    return isIosApp || isAndroidApp;
  },
  isIosApp:()=>{//判断是否IosApp打开
    return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
  },
  isAndroidApp:()=>{//判断是否AndroidApp打开
    return window.native ? 1 : 0;
  },
  isTestServer: () => {
    return location.host.includes("devtest")|| location.host.includes("-dev") || location.host.includes("cstest") || location.port.length > 3;
  },
  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO Api信息交互工具************************************************************************//

  send: (functionName, data, service) => {
    let serviceName;
    if (service) serviceName = service;
    if (!service) {
      all.apiList.map((item) => {
        item.functionName.map((val) => {
          if (val === functionName) {
            return serviceName = item.service
          }
        })
      });
    }
    return all.net.send({
      service: serviceName,
      functionName: functionName,
      data: data
    })
  },

  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO 通用工具类****************************************************************************//

  regular: (regular, value) => regular.test(value), //正则验证工具
  isType: type => Object.prototype.toString.call(type).slice(8, Object.prototype.toString.call(type).length - 1),//数据类型判断工具
  // 判断是否是空对象
  isObjectEmpty: obj => {
    for (let name in obj) {
      if (obj.hasOwnProperty(name)) {
        return false;
      }
    }
    return true;
  },
  isRouterGuard: path => {// 判断页面是否在路由拦截列表里
    let is = false;
    all.routerGuard.map(item => {
      if (item.path === path) {
        is = true;
      }
    });
    return is;
  },

    /* 埋点分析 */
    clickCount: data => {
        let sendData={
          device: 'H5',
          pageName: data.page,
          buttonName: data.btn,
          hideLoading: true,
        };
        if(all.tool.isApp()){
          sendData.registerClickApp=true
        }else {
          sendData.registerClickH5=true
        }
        all.tool.send('clickCount',sendData)
    },

  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO 控制VueX数据工具类**********************************************************************//


  setNotice:data=>all.store.commit('setNotice',{data:data}),//存储公告内容工具
  isHeaderShow:booler=>all.store.commit('isHeaderShow',{isShow:booler}), //头部组件header显示开关工具
  isFooterShow:booler=>all.store.commit('isFooterShow',{isShow:booler}), //尾部组件footer显示开关工具
  isFirstSaveShow:booler=>{//存放玩家充值记录控制首存优惠显示
    if(booler==='close'){
      all.store.commit('isFirstSaveShow',{isShow:false,isShowIcon:true});
      return
    }
    let data={};
    all.tool.send('getTopupList').then(result=>{console.log(result);
      if(result.data.records.length<3){
        data.isShow=true;
        data.isShowIcon=true;
        if(result.data.records.length!==0)data.recordsId=result.data.records[0]._id;
        all.tool.send('getRewardList').then(result=>{
          result.data.map(item=>{
            if(item.code==='firstdepositA'){
              data.depositA=item.param.rewardParam[0].value[0];
                data.depositA.code=item.code;
                data.depositA.largeSned=item.param.rewardParam[0].value[0].forbidWithdrawIfBalanceAfterUnlock;
              data.depositA.name=item.name;
            }
            if (item.code === 'firstdepositB') {
              data.depositB = item.param.rewardParam[0].value[0];
              data.depositB.code = item.code;
              data.depositB.name = item.name;
            }
          });
          all.store.commit('isFirstSaveShow', data);
        }).catch(err => all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }])); console.log(data);
      }else {
        if(all.store.state.isShowFirstTip){all.tool.TipWinShow('存款笔数不符合领取条件，请参考其他优惠！', [{ name: '确定' }])}
        all.store.commit('isFirstSaveShow',{isShow:false,isShowIcon:false});
      }
    }).catch(err => all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]));
  },
  isCustomerShow: booler => all.store.commit('isCustomerShow', { isShow: booler }), //首页客服窗口显示开关工具
  
  TipWinShow: (content, button, title, time, callback, window) => {
    let buttonVal = null, titleVal = '温馨提示', timeVal = null, callbackVal = null, windowVal = null;
    [button, title, time, callback, window].map(item => {
      if (all.tool.isType(item) === 'Array') buttonVal = item;
      if (all.tool.isType(item) === 'String') titleVal = item;
      if (all.tool.isType(item) === 'Number') timeVal = item;
      if (all.tool.isType(item) === 'Function') callbackVal = item;
      if (all.tool.isType(item) === 'Object') windowVal = item;
    });
    all.store.commit('tipWindow', { isShow: true, content: content, button: buttonVal, title: titleVal, time: timeVal, callback: callbackVal, window: windowVal })
  },
  TipWinClose: () => all.store.commit('tipWindow', { isShow: false, content: null, button: null, title: null, time: null }),//关闭提示窗口
  setLoginStatus: status => all.store.commit('isLogin', { isLogin: status }),//设置登陆状态
  setPlayerId: id => all.store.commit('setPlayerId', { playerId: id }),//设置用户ID
  setUserName: userName => all.store.commit('setUserName', { userName: userName }),//设置用户名
  refreshLevel: level => all.store.commit('refreshLevel', { level: level }),//设置用户等级
  setCustomer: (online, qq) => all.store.commit('setCustomer', { online: online, qq: qq }),//设置用户等级
  setlevelName: levelName => all.store.commit('setlevelName', { levelName: levelName }),//设置用户等级名称
  setBalance: () => {//设置用户账户余额
    all.tool.send('getCreditDetail', { playerId: all.tool.getStore('playerId'), hideLoading: true }).then(result => all.store.commit('setBalance', { balance: parseInt(result.data.credit) })).catch(err => all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]));
  },
  refreshBalance: () => {//刷新余额
    all.tool.send('getCredit').then(result => {
      all.store.commit('setBalance', { balance: result.data.gameCredit })
    })
  },
  setPhoneNumber: number => all.store.commit('setPhoneNumber', { phoneNumber: number }),//设置用户手机号码
  setBankInfo: obj => all.store.commit('setBankInfo', obj), // 设置银行卡信息
  setRegistrationTime: time => all.store.commit('setRegistrationTime', time), // 设置开户时间
  setNewsNum: num => all.store.commit('setNewsNum', num),          // 设置新闻数
  setLoading: isloading => all.store.commit('setLoading', { loading: isloading }), // 设置loading显示
  setSavesend20: data => all.store.commit('setSavesend20', { data: data }), // 设置笔笔存送18数据
  setSavesend38: data => all.store.commit('setSavesend38', { data: data }), // 设置次次存送38数据
  setLevelup: data => all.store.commit('setdatalevel', { datalevel: data }), // 设置用户等级升级经验
  setMessageCount: () => {// 设置用户未读信息数量
    all.tool.send('getMailList', { playerId: all.tool.getStore('playerId') }).then(result => {
      let count = 0;
      result.data.map(item => !item.hasBeenRead && count++);
      all.store.commit('unReadMessageCount', { count: count });
    }).catch(err => all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]));
  },
  SaveAmount: () => {// 设置用户周存款金额
    all.tool.send('getPlayerWeekStatus', { playerId: all.tool.getStore('playerId'),hideLoading: true }).then(result => {
      all.store.commit('weekSaveAmount', { amount: parseInt(result.data.topUpAmount) });
      all.tool.setLevelup(all.store.state.weekSaveAmount / all.store.state.nextUpLevelAmount[all.store.state.level === 4 ? all.store.state.level : all.store.state.level + 1] * 100)
    }).catch(err => all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]));
  },
  UpLevelAmount: () => {// 设置用户升级周存款要求金额
    all.tool.send('getAllLevel', { playerId: all.tool.getStore('playerId') }).then(result => {
      all.store.commit('nextUpLevelAmount', { amount: [result.data[0].levelUpConfig[0].topupLimit, result.data[1].levelUpConfig[0].topupLimit, result.data[2].levelUpConfig[0].topupLimit, result.data[3].levelUpConfig[0].topupLimit, result.data[4].levelUpConfig[0].topupLimit] });
    }).catch(err => all.tool.TipWinShow(err.errorMessage, [{ name: '确定' }]));
  },
  setLoginInfo: data => { //设置用户登录后信息
    all.tool.setLoginStatus(true);
    all.tool.setPlayerId(data.data.playerId);
    all.tool.setUserName(data.data.name);
    all.tool.refreshLevel(data.data.playerLevel.value);
    all.tool.setlevelName(data.data.playerLevel.name);
    all.store.commit('setUserPoint', data.data.userCurrentPoint);
    all.tool.setBalance();
    if (!all.store.state.setRefreshMoney)
      all.store.state.setRefreshMoney = setInterval(() => {
        all.tool.setBalance();
        all.tool.SaveAmount();
      }, 50000);
    all.tool.setPhoneNumber(data.data.fullPhoneNumber);

    data.token && all.tool.setStore('token', data.token);
    all.tool.setStore('playerId', data.data.playerId);
    all.tool.setMessageCount();
    all.tool.SaveAmount();
    all.tool.UpLevelAmount();
    setTimeout(() => { all.tool.setLevelup(all.store.state.weekSaveAmount / all.store.state.nextUpLevelAmount[all.store.state.level === 4 ? all.store.state.level : all.store.state.level + 1] * 100) },3000);
    all.tool.isFirstSaveShow();
    all.tool.setStore('once', true);
    all.tool.send('getPromoCode',{playerId:all.tool.getStore('playerID')}).then(result=>{
      let Count=0;
      result.data.noUseList.map(item=>{
        !item.isViewed && Count++
      });
      all.store.commit('setPromoCount', Count);
    }).catch(err=>all.tool.TipWinShow(err.errorMessage,[{name:'确定'}]));
  },
  setLogoutInfo: () => {  //设置用户登出后信息
    all.tool.setLoginStatus(false);
    all.tool.setPlayerId(null);
    all.tool.setUserName(null);
    all.tool.setPhoneNumber(null);
    all.tool.refreshLevel(0);
    all.tool.setlevelName('LV.0游客');
    all.store.commit('setBalance', { balance: 0 });
    all.store.commit('setUserPoint', 0);
    all.tool.setStore('token', null);
    all.tool.setStore('playerId', null);
    all.tool.delCookie('token');
    all.tool.delCookie('playerId');
    all.tool.clearStore('userInfo');
    all.tool.clearStore('bankInfo');
    all.tool.clearStore('bankTypeList');
    all.tool.setBankInfo({});
    all.tool.setRegistrationTime('');
    all.store.commit('unReadMessageCount', { count: 0 });
    all.store.commit('weekSaveAmount', { amount: 0 });
    all.store.commit('nextUpLevelAmount', { amount: [0, 0, 0, 0, 0] });
    all.tool.setLevelup(0);
    if (all.store.state.setRefreshMoney) {
      clearInterval(all.store.state.setRefreshMoney);
      all.store.state.setRefreshMoney = null
    }
    all.store.commit('isFirstSaveShow',{isShow:false,isShowIcon:true});
    all.tool.setStore('once', true);
    all.store.commit('setPromoCount', 0);
  },
  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO 页面操作工具类**********************************************************************//

  enterPath: path => all.store.commit('setPath', { name: 'enterPath', path: path }), //存储上一页页面路径
  autoShowHeaderFeader: (path) => {  //根据页面path自动显示或隐藏页头页尾
    all.tool.isHeaderShow(false);
    all.tool.isFooterShow(false);
    all.isHeaderShowList.map(item => path === item && all.tool.isHeaderShow(true));
    all.isFooterShowList.map(item => path === item && all.tool.isFooterShow(true));
  },
  openOnlineCustomer: (url, isVip) => {  //打开在线客服页面
    let a;
    if (all.store.state.isLogin && all.store.state.level === 4 && isVip) {
      a = url[1]
    } else {
      a = url[0]
    }
    let b = encodeURIComponent(document.URL),
      c = encodeURIComponent(document.referrer);
    window.open(a + "&enterurl=" + b + "&pagereferrer=" + c);
  },
  openQQService: (qq, isVip) => {  //打开QQ客服
    let a;console.log(qq);
    if (all.store.state.isLogin && all.store.state.level === 4 && isVip) {
      a = qq[1];
      all.tool.TipWinShow("大乔QQ<br>"+a,[{name:'确定'}])
    } else {
      a = qq[0];
      window.open('http://wpd.b.qq.com/page/webchat.html?nameAccount=' + a)
    }
    // window.open('http://wpd.b.qq.com/page/webchat.html?nameAccount=' + a);
  },
  isCommitForm: () => {  //自动判定表单是否符合验证规则
    let commit = true;
    all.$('select,input').each((index, obj) => {
      all.regularList.map(item => {
        if (item.id === obj.id && item.regular.test(all.$(obj).val()) && obj.nodeName === 'SELECT') {
          all.tool.TipWinShow(item.error, [{ name: '确定' }]);
          return commit = false
        }
        if (item.id === obj.id && !item.regular.test(all.$(obj).val()) && obj.nodeName === 'INPUT') {
          if ((item.id === 'bonusCode' && all.$(obj).val() === '') || (item.id === 'bonusCodeA' && all.$(obj).val() === '') || (item.id === 'aliRealname' && all.$(obj).val() === '')) return; //非必填ID，填了就会验证
          if(item.id==='smsCode1'){
            all.tool.TipWinShow('请输入4位数字验证码',[{name:'确定'}]);
          }else {
            all.tool.TipWinShow(item.error,[{name:'确定'}]);
          }
          return commit = false
        }
      });
      if (!commit) {
        return false
      }
    });
    return commit;
  },
  checkFormItem: id => {  //判定单个输入框是否符合验证规则
    let checkItem = true;
    all.regularList.map(item => {
      if (item.id === id && !item.regular.test(all.$('#' + id).val())) {
        checkItem = false
      }
    });
    return checkItem
  },

  //工具类别分割线---------------------------------------------------------------------------------------------//

  //TODO 格式转化工具类**********************************************************************//

  arrayBufferToBase64: buffer => {//Buffer转换成Base64字符串
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  },
  formatTime: (time, withhours) => { //时间格式转化工具
    let locatTime = new Date(time);
    if (withhours) {
      return locatTime.getFullYear() + "-" + ((locatTime.getMonth() + 1) < 10 ? '0' + (locatTime.getMonth() + 1) : (locatTime.getMonth() + 1)) + "-" + (locatTime.getDate() < 10 ? '0' + locatTime.getDate() : locatTime.getDate()) + " " + (locatTime.getHours() < 10 ? '0' + locatTime.getHours() : locatTime.getHours()) + ":" + (locatTime.getMinutes() < 10 ? '0' + locatTime.getMinutes() : locatTime.getMinutes());
    }
    return locatTime.getFullYear() + "-" + ((locatTime.getMonth() + 1) < 10 ? '0' + (locatTime.getMonth() + 1) : (locatTime.getMonth() + 1)) + "-" + (locatTime.getDate() < 10 ? '0' + locatTime.getDate() : locatTime.getDate());
  },

  /**
   * 输入总共秒数返回一个时间数组
   * @param {number} second
   * @param {Boolean} [noZero] true则个位数时间不会在前面加0
   * @returns {*[]}
   */
  countdown: function (second, noZero) {
    var day = '', hour = '', minute = '';
    if (second >= 86400) {
        day = Math.floor(second / 86400);
        day += '';
        second = second % (86400);
    }
    if (second >= 3600) {
        hour = Math.floor(second / 3600);
        hour += '';
        hour = hour.length < 2 && !noZero ? ('0' + hour) : hour;
        second = second % 3600;
    }
    if (second >= 60) {
        minute = Math.floor(second / 60);
        minute += '';
        minute = minute.length < 2 && !noZero ? ('0' + minute) : minute;
        second = second % 60;
    } else {
        minute = '00';
    }
    if (second >= 0) {
        second += '';
        second = second.length < 2 && !noZero ? ('0' + second) : second;
    }
    return [day, hour, minute, second];
},

  //工具类别分割线---------------------------------------------------------------------------------------------//
};
