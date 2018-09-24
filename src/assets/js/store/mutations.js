export default {
  setPath(state,payload){   //设置页面跳转路径
    switch (payload.name){
      case "currentPath":
        state.currentPath=payload.path;
        break;
      case "enterPath":
        state.enterPath=payload.path;
        break;
      case "backPath":
        state.backPath=payload.path;
        break;
    }
  },
  tipWindow(state,payload){   //设置提示信息窗口
    state.tipwinShow=payload.isShow;
    state.tipContent=payload.content;
    state.tipButton=payload.button;
    state.tipTitle=payload.title;
    state.tipCloseTime=payload.time;
    state.tipCloseCallback=payload.callback;
    state.tipwinType=payload.window
  },
  setNotice(state,payload){  //设置公告信息
    state.notice=payload.data
  },
  refreshLevel(state,payload){  //刷新等级信息
    state.level=payload.level
  },
  isHeaderShow(state,payload){  //设置头部组件header显示开关
    state.isHeaderShow=payload.isShow
  },
  isFirstSaveShow(state,payload){  //设置存放首存优惠数据
    state.firstDeposit=payload
  },
  isFirstTip(state,payload){  //设置存放首存优惠数据
    state.isShowFirstTip=payload
  },
  isFooterShow(state,payload){  //设置尾部组件footer显示开关
    state.isFooterShow=payload.isShow
  },
  isCustomerShow(state,payload){  //设置尾部组件footer显示开关
  state.isShowCostomer=payload.isShow
  },
  isLogin(state,payload){ //设置登陆状态
    state.isLogin=payload.isLogin
  },
  setPlayerId(state,payload){ //设置用户ID
    state.playerId=payload.playerId
  },
  setUserName(state,payload){ //设置用户名
    state.userName=payload.userName
  },
  setCustomer(state,payload){ //设置用户名
    state.live800=payload.online;
    state.qqService=payload.qq
  },
  setlevelName(state,payload){ //设置用户等级名称
    state.levelName=payload.levelName
  },
  setdatalevel(state,payload){ //设置用户等级升级经验
      state.datalevel=payload.datalevel
  },
  setBalance(state,payload){ //设置用户账户余额
    state.balance=payload.balance
  },
  setBankInfo(state, bankInfo) { // 设置用户银行卡资料
    state.bankInfo = bankInfo;
  },
  setPhoneNumber(state,payload){ //设置用户手机号码
    state.phoneNumber=payload.phoneNumber
  },
  setRegistrationTime(state, time) {  // 设置用户开户时间
    state.registrationTime = time;
  },
  setNewsNum(state, num) {  // 设置最新优惠活动数量
    state.news = num;
  },
  setLoading(state, payload) {  // 设置Loading显示
      state.isLoading = payload.loading;
  },
  setSavesend20(state, payload) {  // 设置笔笔存送18数据
      state.savesend20 = payload.data;
  },
  setSavesend38(state, payload) {  // 设置次次存送38数据
      state.savesend38 = payload.data;
  },
  unReadMessageCount(state, payload) {  // 设置未读信息数量
      state.unReadMessageCount = payload.count;
  },
  weekSaveAmount(state, payload) {  // 设置用户周存款金额
      state.weekSaveAmount = payload.amount;
  },
  nextUpLevelAmount(state, payload) {  // 设置用户升级周存款要求金额
      state.nextUpLevelAmount = payload.amount;
  },
  encryptionPhoneNumber(state, num) {   // 加密电话号码
    state.encryptionPhoneNumber = num;
  },
  setLevel (state, level) {    // 设置用户等级
    state.level = level;
  },
  setPromoCount(state, num) { // 设置用户加密电话
    state.promoCodeCount = num;
  },
  setUserPoint(state, num) {    // 设置用户积分
    state.score = num;
  },
  setUserBalance (state, num) {  // 设置金额
    state.balance = num;
  },
  setAlipayOrder (state, info) {  // 设置支付宝订单信息
    state.alipayOrder = info;
  },
  setMinDeposit (state, num) {  // 设置最低存款
    state.minDepositAmount = num;
  },
  setLoginErrorCount (state, count) {  // 设置用户登陆错误次数
    state.loginErrorCount = count;
  },
  setfirstduobaoShow (state) {  // 关闭首页弹窗
    state.firstduobaoShow = false;
  },
}
